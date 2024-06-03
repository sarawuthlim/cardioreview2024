import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const companyList = [
  { id: 1, name: "Boehringer Ingelheim", product: "Jardiance", quota: 15 },
  { id: 2, name: "AstraZeneca", product: "Forxiga", quota: 15 },
  { id: 3, name: "Novo Nordisk", product: "Rybelsus", quota: 15 },
  { id: 4, name: "Novartis", product: "Entresto", quota: 15 },
  { id: 5, name: "Daiichi Sankyo", product: "Lixiana", quota: 15 },
  { id: 6, name: "Daiichi Sankyo", product: "Nexletol", quota: 15 },
  { id: 7, name: "Bayer Thai", product: "Gadovist", quota: 15 },
  { id: 8, name: "Abbott Medical", product: "Rytmonorm", quota: 15 },
  { id: 9, name: "Boehringer Ingelheim", product: "Pradaxa", quota: 10 },
  { id: 10, name: "Bayer Thai", product: "Firialta", quota: 10 },
  { id: 11, name: "Biopharm", product: "Parmodia", quota: 10 },
  { id: 12, name: "Amgen", product: "Repatha", quota: 10 },
  { id: 13, name: "Organon", product: "", quota: 5 },
  { id: 14, name: "Thai Otsuka", product: "", quota: 5 },
  { id: 15, name: "Berlin", product: "", quota: 5 },
  { id: 16, name: "Viatris", product: "", quota: 5 },
  { id: 17, name: "Zuellig Pharma", product: "", quota: 5 },
  { id: 18, name: "Asahi Intecc", product: "", quota: 5 },
  {
    id: 19,
    name: "Boston Scientific",
    product: "",
    quota: 5,
  },
  { id: 20, name: "American Taiwan Biopharm", product: "Amtel", quota: 5 },
  { id: 21, name: "Abbott Medical", product: "Xience", quota: 5 },
  { id: 22, name: "Servier", product: "Colaran", quota: 5 },
  { id: 23, name: "Pfizer", product: "", quota: 5 },
  { id: 24, name: "Medtronic", product: "", quota: 5 },
  { id: 25, name: "A. Menarini", product: "Ranexa", quota: 5 },
  { id: 26, name: "LG Chem", product: "Zemiglo", quota: 5 },
  { id: 27, name: "Roche Diagnostics", product: "", quota: 5 },
];

export const getComanyById = (id) => {
  return companyList.find((item) => item.id == id);
};

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function fetchDataFromFirebase() {
  const querySnapshot = await getDocs(collection(db, "register"));
  const fetchedData = [];
  querySnapshot.forEach((doc) => {
    fetchedData.push({ id: doc.id, ...doc.data() });
  });
  return fetchedData;
}


export function filterBySponsor(data, companyId) {
  return data.filter((item) => item.sponsor == companyId && item.applyType == "sponsor");
}

export function filterByOverQuota(data, companyId) {
  return data.filter((item) => item.sponsor == companyId && item.applyType == "overQuota");
}

export function getCurrentBKKTime() {
  const now = new Date();
  const options = {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const bangkokDateString = now.toLocaleString("en-CA", options);
  return bangkokDateString;
}

export function getSponsorCount(data, companyId) {
  return data.filter(
    (item) => item.sponsor == companyId && item.applyType == "sponsor"
  ).length;
}

export function isEmailRegistered(email, emailArray) {
  return emailArray.includes(email);
}

export function likeFilter(array, pattern) {
  const regex = new RegExp(`.*${pattern}.*`, 'i');
  return array.filter(item => regex.test(item));
}
