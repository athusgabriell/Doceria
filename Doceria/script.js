// ======= FUNÇÃO 1 - Leitor de Tela (CÓDIGO CORRIGIDO) =======
let readModeActive = false;
let speech = window.speechSynthesis;
let lastSpokenElement = null; // Para evitar repetição

// Função para ativar/desativar
document.getElementById("readModeBtn").addEventListener("click", () => {
    readModeActive = !readModeActive;
    speech.cancel(); // Para a fala ao desativar

    if (readModeActive) {
        alert("Leitor ativado! Passe o mouse sobre o texto ou imagens.");
    } else {
        lastSpokenElement = null; // Limpa a memória
        alert("Leitor desativado.");
    }
});

// O "ouvidor" inteligente
document.body.addEventListener("mouseover", (e) => {
    if (!readModeActive) return; // Sai se o modo não estiver ativo

    const target = e.target;
    let textToSpeak = '';

    // 1. Evita ler o mesmo elemento de novo se o mouse tremer
    if (target === lastSpokenElement) {
        return;
    }

    // 2. Procura o texto correto
    // Se for uma IMAGEM, leia o 'alt' text
    if (target.tagName === 'IMG' && target.alt) {
        textToSpeak = target.alt;
    } 
    // Se for uma tag de TEXTO, leia o 'innerText'
    else if (['P', 'H1', 'H2', 'H3', 'A', 'BUTTON', 'LI', 'SPAN'].includes(target.tagName) && target.innerText) {
        textToSpeak = target.innerText;
    }
    // IMPORTANTE: Se for um DIV, NAV, HEADER, etc., ele será ignorado!

    // 3. Se encontrou algo, fale
    if (textToSpeak) {
        speech.cancel(); // Para a fala anterior
        let utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = "pt-BR";
        speech.speak(utterance);
        lastSpokenElement = target; // Marca como "lido"
        e.stopPropagation(); // Impede o evento de borbulhar para o <header>
    }
});

// 4. Para a fala quando o mouse sai do elemento
document.body.addEventListener("mouseout", (e) => {
    if (readModeActive && lastSpokenElement === e.target) {
        lastSpokenElement = null;
        speech.cancel();
    }
});

// ======= FUNÇÃO 2 - Alternar Tema =======
document.getElementById("themeToggleBtn").addEventListener("click", () => {
   document.body.classList.toggle("invert-colors"); // <-- Mude para esta classe
});

// ======= FUNÇÃO 3 - Fotossensibilidade =======
document.getElementById("photoSensitivityBtn").addEventListener("click", () => {
  document.body.classList.toggle("photosensitivity");
});

// ======= FUNÇÃO 4 - Aumentar/Diminuir Texto =======
let fontSize = 100;
document.getElementById("textIncreaseBtn").addEventListener("click", () => {
  fontSize += 10;
  document.body.style.fontSize = fontSize + "%";
});

document.getElementById("textDecreaseBtn").addEventListener("click", () => {
  fontSize = Math.max(50, fontSize - 10);
  document.body.style.fontSize = fontSize + "%";
});

// ======= FUNÇÃO 5 - Ancoragem =======
document.getElementById("anchorMenuBtn").addEventListener("click", () => {
  document.getElementById("anchorMenu").classList.toggle("hidden");
});
