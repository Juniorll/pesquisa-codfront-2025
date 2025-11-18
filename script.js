// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- COLE AQUI A SUA CONFIGURAÇÃO DO FIREBASE ---
// Substitua todo o objeto abaixo pelo que você copiou no console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4SslC43Olpbfzl0iWiC-TawK2yCipJg8",
  authDomain: "progfront2025.firebaseapp.com",
  projectId: "progfront2025",
  storageBucket: "progfront2025.firebasestorage.app",
  messagingSenderId: "700911646324",
  appId: "1:700911646324:web:6e62e58338f90b7e850321",
  measurementId: "G-LRKRZZC604"
};
// ------------------------------------------------

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('studentForm');
const btnSubmit = document.getElementById('btnSubmit');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Feedback visual de carregamento
    btnSubmit.textContent = "Enviando dados para a nuvem...";
    btnSubmit.disabled = true;

    // Coleta os dados do formulário
    const dadosAluno = {
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        hobbies: document.getElementById('hobbies').value,
        genero_geek: document.getElementById('genero').value,
        motivo_ti: document.getElementById('motivoTI').value,
        objetivo_frontend: document.getElementById('objetivoFrontend').value,
        nivel_confianca: document.getElementById('nivel').value,
        ritmo_aula: document.querySelector('input[name="ritmo"]:checked')?.value || "Não informado",
        satisfacao: document.querySelector('input[name="satisfacao"]:checked')?.value || "0",
        feedback_aberto: document.getElementById('feedbackAberto').value,
        data_envio: serverTimestamp() // Marca o horário do envio
    };

    try {
        // Salva na coleção "alunos_senai"
        await addDoc(collection(db, "alunos_senai"), dadosAluno);
        
        alert("Sucesso! Dados recebidos. Vamos codar!");
        form.reset();
        btnSubmit.textContent = "ENVIADO COM SUCESSO!";
        btnSubmit.style.background = "#2ecc71"; // Verde
        
        // Restaura o botão após 3 segundos
        setTimeout(() => {
            btnSubmit.textContent = "ENVIAR DADOS >>";
            btnSubmit.disabled = false;
            btnSubmit.style.background = ""; 
        }, 3000);

    } catch (error) {
        console.error("Erro ao adicionar documento: ", error);
        alert("Erro ao enviar. Verifique o console (F12) para mais detalhes.");
        btnSubmit.textContent = "Erro. Tente novamente.";
        btnSubmit.disabled = false;
    }
});
