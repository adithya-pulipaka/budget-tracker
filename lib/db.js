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
} from "firebase/firestore";
import firebase from "./firebase";

const env = process.env.NODE_ENV;
const db = getFirestore(env !== "development" ? firebase.getApp() : undefined);

const EMULATORS_STARTED = "EMULATORS_STARTED";
function startEmulators() {
  if (!global[EMULATORS_STARTED]) {
    global[EMULATORS_STARTED] = true;
    connectFirestoreEmulator(db, "localhost", "8090");
  }
}

if (process.env.NODE_ENV === "development") {
  startEmulators();
}

export async function addBudgetPlan(plan) {
  try {
    const ref = await addDoc(collection(db, "plan"), plan);
    return ref.id;
  } catch (err) {
    console.log(err);
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

export async function getAllPlans() {
  try {
    const q = query(collection(db, "plan"));
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
