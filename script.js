document.addEventListener('DOMContentLoaded', () => {
    // ---------------------- Variável de Controle de Cookies ----------------------
    const HAS_SUBMITTED_COOKIE = 'rsvp_submitted';

    // Referências aos elementos do DOM
    const video = document.getElementById('background-video');
    const playButtonContainer = document.getElementById('play-button-container');
    const playButton = document.getElementById('play-button');
    const rsvpFormContainer = document.getElementById('rsvp-form-container');
    const rsvpForm = document.getElementById('rsvp-form');
    // Este container é o que mostra "Sua confirmação já foi registrada"
    const alreadySubmittedContainer = document.getElementById('already-submitted-container');

    // ---------------------- Funções de Cookie ----------------------

    // Verifica se o cookie existe
    const checkSubmissionStatus = () => {
        return document.cookie.includes(HAS_SUBMITTED_COOKIE);
    };

    // Define o cookie para expirar em 365 dias
    const setSubmittedCookie = () => {
        const date = new Date();
        // Define a data de expiração para 365 dias
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); 
        
        // **PARTE REFORÇADA:** Garantia de persistência no domínio
        document.cookie = `${HAS_SUBMITTED_COOKIE}=true; expires=${date.toUTCString()}; path=/; SameSite=Lax; Secure`;
    };

    // ---------------------- Ação de BLOQUEIO IMEDIATO ----------------------
    if (checkSubmissionStatus()) {
        // Se o cookie existir (já enviou), bloqueia TUDO imediatamente.
        
        // 1. Esconde o vídeo (para que a mensagem apareça mais rápido)
        if (video) video.style.display = 'none';
        
        // 2. Exibe o container de mensagem "Já Enviado"
        if (alreadySubmittedContainer) {
            alreadySubmittedContainer.classList.remove('hidden');
            
            // Força a aplicação do fade-in se a classe existir
            void alreadySubmittedContainer.offsetWidth; 
            alreadySubmittedContainer.classList.add('fade-in'); 
        }

        // Para a execução do restante do script (não precisamos do botão Continuar/Formulário)
        return; 
    }
    // ---------------------- Fim do Bloqueio Imediato ----------------------


    // ---------------------- Lógica de Exibição Normal (SÓ SE NÃO HOUVER COOKIE) ----------------------

    // Função para mostrar o botão "Continuar" (COM FADE IN)
    const showPlayButton = () => {
        if (playButtonContainer && playButtonContainer.classList.contains('hidden')) {
            
            // Comportamento normal: mostra o botão "CONTINUAR"
            playButtonContainer.classList.remove('hidden');
            void playButtonContainer.offsetWidth; 
            playButtonContainer.classList.add('fade-in');
            
            if (video) video.pause(); // Pausa o vídeo
        }
    };

    // --- Lógica de Transição do Vídeo ---
    if (video) {
        video.addEventListener('ended', showPlayButton);
    }
    setTimeout(showPlayButton, 3000); // Fallback de 3 segundos

    // --- Lógica do Botão "Continuar" ---
    if (playButton) {
        playButton.addEventListener('click', () => {
            // 1. Inicia o FADE OUT do botão atual
            playButtonContainer.classList.remove('fade-in');
            
            // 2. Após 500ms...
            setTimeout(() => {
                playButtonContainer.classList.add('hidden');
                rsvpFormContainer.classList.remove('hidden');
                void rsvpFormContainer.offsetWidth; 
                rsvpFormContainer.classList.add('fade-in');
                
            }, 500); 
        });
    }
    
    // ---------------------- Lógica de Envio e Cookie ----------------------
    
    // Esta função será chamada ANTES do formulário ser enviado ao FormSubmit
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', () => {
            // Define o cookie ANTES de redirecionar para o obrigado.html
            setSubmittedCookie();
        });
    }
});
