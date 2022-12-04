import { getApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  addDoc,
  collection,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import firebase from "./firebase";

const env = process.env.NODE_ENV;
const db = getFirestore(env !== "development" ? getApp() : undefined);

const EMULATORS_STARTED = "EMULATORS_STARTED";
function startEmulators() {
  if (!global[EMULATORS_STARTED]) {
    global[EMULATORS_STARTED] = true;
    connectFirestoreEmulator(db, "localhost", "8095");
  }
}
if (env === "development") {
  startEmulators();
}

/**
 *
 * @returns List of current Monthly Budgets created order by year descending
 */
export async function getAllPlans() {
  try {
    const q = query(collection(db, "plan"), orderBy("period.year", "desc"));
    const ref = await getDocs(q);
    const docs = ref.docs;
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
    const ref = await getDocs(q);
    const response = [];
    ref.forEach((doc) => {
      response.push({ id: doc.id, ...doc.data() });
    });
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
