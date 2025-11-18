// --- IMPORTS E CONFIGURAÇÃO (Mantenha igual ao anterior) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// !!! COLE SUA CONFIGURAÇÃO DO FIREBASE AQUI NOVAMENTE !!!
const firebaseConfig = {
  apiKey: "AIzaSyA4SslC43Olpbfzl0iWiC-TawK2yCipJg8",
  authDomain: "progfront2025.firebaseapp.com",
  projectId: "progfront2025",
  storageBucket: "progfront2025.firebasestorage.app",
  messagingSenderId: "700911646324",
  appId: "1:700911646324:web:6e62e58338f90b7e850321",
  measurementId: "G-LRKRZZC604"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('studentForm');
const btnSubmit = document.getElementById('btnSubmit');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btnSubmit.textContent = "Processando perfil...";
    btnSubmit.disabled = true;

    // Coleta dos Checkboxes (Tecnologias)
    const techsSelecionadas = [];
    document.querySelectorAll('input[name="techs"]:checked').forEach((checkbox) => {
        techsSelecionadas.push(checkbox.value);
    });

    // Coleta do Objeto Completo
    const dadosAluno = {
        // Pessoal / Profissional
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        situacao_trabalho: document.getElementById('trabalha').value,
        cargo_detalhe: document.getElementById('cargo').value || "Não aplicável",
        hobbies: document.getElementById('hobbies').value,
        
        // Técnico
        experiencia_dev: document.getElementById('experiencia_dev').value,
        conhecimentos_tech: techsSelecionadas, // Array com as techs marcadas
        infraestrutura_casa: document.getElementById('infra_casa').value,
        github_portfolio: document.getElementById('github_user').value,

        // Pedagógico
        estilo_aprendizado: document.getElementById('estilo_aprendizado').value,
        expectativa_disciplina: document.getElementById('expectativa').value,

        // Feedback
        ritmo_aula: document.querySelector('input[name="ritmo"]:checked')?.value || "Não informado",
        satisfacao: document.querySelector('input[name="satisfacao"]:checked')?.value || "0",
        feedback_livre: document.getElementById('feedbackAberto').value,
        
        data_envio: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "alunos_senai_v2"), dadosAluno);
        
        // Feedback de Sucesso Visual
        alert("Perfil Recebido! Obrigado por compartilhar.");
        form.reset();
        btnSubmit.textContent = "DADOS ENVIADOS COM SUCESSO!";
        btnSubmit.style.background = "#2ecc71"; 
        
        setTimeout(() => {
            btnSubmit.textContent = "ENVIAR DADOS >>";
            btnSubmit.disabled = false;
            btnSubmit.style.background = ""; 
        }, 3000);

    } catch (error) {
        console.error("Erro: ", error);
        alert("Erro ao enviar. Verifique a conexão.");
        btnSubmit.textContent = "Erro. Tente novamente.";
        btnSubmit.disabled = false;
    }
});
