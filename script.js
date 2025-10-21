document.addEventListener('DOMContentLoaded', () => {
    // ---------------------- Variável de Controle de Cookies ----------------------
    const HAS_SUBMITTED_COOKIE = 'rsvp_submitted';

    // Referências aos elementos do DOM
    const video = document.getElementById('background-video');
    const playButtonContainer = document.getElementById('play-button-container');
    const playButton = document.getElementById('play-button');
    const rsvpFormContainer = document.getElementById('rsvp-form-container');
    const rsvpForm = document.getElementById('rsvp-form');
    // Adicionamos um novo container para a mensagem "Já enviou"
    const alreadySubmittedContainer = document.getElementById('already-submitted-container');

    // ---------------------- Funções de Cookie ----------------------

    // Verifica se o cookie existe
    const checkSubmissionStatus = () => {
        return document.cookie.includes(HAS_SUBMITTED_COOKIE);
    };

    // Define o cookie para expirar em 365 dias
    const setSubmittedCookie = () => {
        const date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // 365 dias
        document.cookie = `${HAS_SUBMITTED_COOKIE}=true; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    };

    // ---------------------- Lógica de Exibição ----------------------

    // Função para mostrar o botão "Continuar" (COM FADE IN)
    const showPlayButton = () => {
        if (playButtonContainer.classList.contains('hidden')) {
            
            // 1. ABRIMOS A EXCEÇÃO: Se já enviou, mostre a mensagem de "já enviou"
            if (checkSubmissionStatus()) {
                // Esconde o botão e mostra a mensagem de já submetido
                playButtonContainer.classList.add('hidden'); 
                alreadySubmittedContainer.classList.remove('hidden');
                
                // Força o fade-in na mensagem de já enviado
                void alreadySubmittedContainer.offsetWidth; 
                alreadySubmittedContainer.classList.add('fade-in'); 
                
            } else {
                // Comportamento normal: mostra o botão "CONTINUAR"
                playButtonContainer.classList.remove('hidden');
                void playButtonContainer.offsetWidth; 
                playButtonContainer.classList.add('fade-in');
            }

            video.pause(); // Pausa o vídeo
        }
    };

    // --- Lógica de Transição do Vídeo ---
    video.addEventListener('ended', showPlayButton);
    setTimeout(showPlayButton, 3000); // Fallback de 3 segundos

    // --- Lógica do Botão "Continuar" ---
    playButton.addEventListener('click', () => {
        // Se já enviou (o que não deve acontecer se a lógica acima estiver certa, mas é seguro checar)
        if (checkSubmissionStatus()) return; 

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
    
    // ---------------------- Lógica de Envio e Cookie ----------------------
    
    // Esta função será chamada ANTES do formulário ser enviado ao FormSubmit
    rsvpForm.addEventListener('submit', () => {
        // Define o cookie ANTES de redirecionar para o obrigado.html
        setSubmittedCookie();
    });

    // ---------------------- Verificação no Carregamento ----------------------
    // Verifica logo de início se a pessoa já enviou para pular o vídeo e ir para a mensagem
    if (checkSubmissionStatus()) {
        video.style.display = 'none'; // Esconde o vídeo
        showPlayButton(); // Força a exibição da mensagem "Já Enviou"
    }
});
