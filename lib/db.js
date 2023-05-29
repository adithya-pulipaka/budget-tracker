const PLAN_COLLECTION = "plans";

/**
 *
 * @returns List of current Monthly Budgets created order by year descending
 */
export async function getAllPlans() {
  try {
    const q = query(
      collection(db, "plan"),
      orderBy("period.year", "desc"),
      orderBy("period.month", "desc")
    );
    const querySnap = await getDocs(q);
    const docs = querySnap.docs;
    const response = [];
    docs.forEach((doc) => {
      response.push({ id: doc.id, ...doc.data() });
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * @param plan plan object to create
 * @returns id of the new plan created
 */
export async function addBudgetPlan(plan) {
  try {
    const q = query(
      collection(db, "plan"),
      where("period", "==", plan.period),
      limit(1)
    );
    const existingRef = await getDocs(q);
    if (existingRef.size > 0) {
      throw new Error("Duplicate Period");
    }
    const ref = await addDoc(collection(db, "plan"), plan);
    return ref.id;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getBudgetInfo(period) {
  try {
    const q = query(
      collection(db, "plan"),
      where("period", "==", period),
      limit(1)
    );
    const ref = await getDocs(q);
    const docs = ref.docs[0];
    const data = docs.data();
    const resp = { id: docs.id, ...data };
    return resp;
  } catch (err) {
    console.log(err);
  }
}

export async function getTransactionsforPeriod(planId) {
  try {
    const q = query(
      collection(db, "transactions"),
      where("planId", "==", planId)
    );
    const querySnap = await getDocs(q);
    const response = [];
    querySnap.forEach((doc) => {
      response.push({ id: doc.id, ...doc.data() });
    });
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function addPlanTransaction(transaction) {
  try {
    const ref = await addDoc(collection(db, "transactions"), transaction);
    return ref.id;
  } catch (err) {
    console.log(err);
  }
}

export async function getPlanById(id) {
  try {
    const q = query(collection(db, "plan"));
    const docRef = doc(db, "plan", id);
    const ref = await getDoc(docRef);
    return ref.data();
  } catch (err) {
    console.log(err);
  }
}
