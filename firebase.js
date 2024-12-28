import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyDP1SN7ipE0U4cfNYsHLGnBBOt4DBTtows",
    authDomain: "sonus-cbda6.firebaseapp.com",
    projectId: "sonus-cbda6",
    storageBucket: "sonus-cbda6.firebasestorage.app",
    messagingSenderId: "694525983687",
    appId: "1:694525983687:web:683d56e297e5b91ab637e2",
    measurementId: "G-MP8HYLWGMX"
  };

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

const generateSleepReport = httpsCallable(functions, "generateSleepReport");

// eslint-disable-next-line no-unused-vars
const handleGenerateReport = async (formData) => {
  try {
    const result = await generateSleepReport(formData);
    console.log("Recomendações:", result.data.recommendations);
  } catch (error) {
    console.error("Erro ao gerar relatório:", error.message);
  }
};
