import {
  convertTimestampToDate,
  convertTimestampToPeriodDate,
} from "@/utils/date-fns";
import "./firebase_setup";
import {
  getFirestore,
  connectFirestoreEmulator,
  getDocs,
  getDoc,
  query,
  orderBy,
  setDoc,
  doc,
  where,
} from "@firebase/firestore";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const db = getFirestore();
if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 9090);
}

const PLAN_INFO_COLLECTION = "plan_info";
const CATEGORIES_COLLECTION = "categories";
const TRANSACTIONS_COLLECTION = "transactions";

export const getAllCategories = async () => {
  try {
    const docRef = await getDocs(collection(db, CATEGORIES_COLLECTION));
    console.log("Number of Categories", docRef.docs.length);
    const result = docRef.docs.map((doc) => {
      return { name: doc.data().name, catId: doc.id };
    });
    return result;
  } catch (e) {
    console.error("Error Retrieving Documents", e);
  }
};

export const getAllPlans = async (todo) => {
  try {
    const queryRef = query(
      collection(db, PLAN_INFO_COLLECTION),
      orderBy("period", "desc")
    );
    const docRef = await getDocs(queryRef);
    console.log("Number of Plans", docRef.docs.length);
    const result = docRef.docs.map((doc) => {
      return {
        ...doc.data(),
        planId: doc.id,
        period: convertTimestampToPeriodDate(doc.data().period),
      };
    });
    return result;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getTransactionsForPlan = async (planId) => {
  try {
    const queryRef = query(
      collection(db, TRANSACTIONS_COLLECTION),
      orderBy("tranDate", "desc")
    );
    const docRef = await getDocs(queryRef);
    console.log("Number of Transactions", docRef.docs.length);
    const result = docRef.docs.map((doc) => {
      return {
        ...doc.data(),
        tranId: doc.id,
      };
    });
    console.log(result);
    return result;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getPlanById = async (planId) => {
  try {
    const ref = doc(db, PLAN_INFO_COLLECTION, planId);
    const docRef = await getDoc(ref);
    console.log("Plan Exists", docRef.exists());
    return { ...docRef.data(), planId: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addTransaction = async (transaction) => {
  try {
    const ref = await addDoc(
      collection(db, TRANSACTIONS_COLLECTION, transaction)
    );
    console.log("Document written with ID: ", ref.id);
    return ref;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//END//

export const createTask = async (todo) => {
  try {
    const docRef = await addDoc(collection(db, TODOS_COLLECTION), todo);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getTasks = async () => {
  try {
    const queryRef = query(
      collection(db, TODOS_COLLECTION),
      where("active", "!=", false),
      orderBy("active"),
      orderBy("created", "desc")
    );
    const snap = await getDocs(queryRef);
    const result = snap.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return result;
  } catch (e) {
    console.error("Error retrieving documents: ", e);
  }
};

export const deleteTask = async (id) => {
  try {
    const docRef = doc(db, TODOS_COLLECTION, id);
    await setDoc(docRef, { active: false }, { merge: true });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const markAsCompleted = async (id) => {
  try {
    const docRef = doc(db, TODOS_COLLECTION, id);
    await setDoc(docRef, { completed: true }, { merge: true });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
