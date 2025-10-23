document.addEventListener('DOMContentLoaded', () => {
    // Chave para armazenar o status no LocalStorage
    const SUBMITTED_KEY = 'rsvpSubmitted';
    
    // Referências aos elementos do DOM
    const video = document.getElementById('background-video');
    const playButtonContainer = document.getElementById('play-button-container');
    const playButton = document.getElementById('play-button');
    const rsvpFormContainer = document.getElementById('rsvp-form-container');
    const rsvpForm = document.getElementById('rsvp-form');
    const successContainer = document.getElementById('already-submitted-container');

    // --- FUNÇÕES DE ESTADO DA PÁGINA ---

    // Função para exibir a tela de sucesso e ocultar as outras
    const showSuccessScreen = () => {
        // Esconde o botão e o formulário, se estiverem visíveis
        playButtonContainer.classList.add('hidden');
        rsvpFormContainer.classList.add('hidden');
        
        // Exibe a tela de sucesso
        successContainer.classList.remove('hidden');
        void successContainer.offsetWidth; 
        successContainer.classList.add('fade-in');
        
        video.pause();
    };

    // Função para exibir o botão "CONTINUAR"
    const showPlayButtonScreen = () => {
        rsvpFormContainer.classList.add('hidden');
        successContainer.classList.add('hidden');
        
        playButtonContainer.classList.remove('hidden');
        void playButtonContainer.offsetWidth;
        playButtonContainer.classList.add('fade-in');
        
        video.pause();
    };
    
    // --- LÓGICA DE INICIALIZAÇÃO (CHECA O LOCALSTORAGE) ---
    
    // 1. Verifica o estado no LocalStorage
    if (localStorage.getItem(SUBMITTED_KEY) === 'true') {
        // Se já submeteu, vai direto para a tela de sucesso
        showSuccessScreen();
        
    } else {
        // Se não submeteu, exibe a tela inicial (o botão "CONTINUAR")
        showPlayButtonScreen(); 
    }

    // --- EVENT LISTENERS ---

    // Lógica do Botão "Continuar" (Transição para o Formulário)
    playButton.addEventListener('click', () => {
        // Fade Out do botão
        playButtonContainer.classList.remove('fade-in');
        
        setTimeout(() => {
            playButtonContainer.classList.add('hidden');
            rsvpFormContainer.classList.remove('hidden');
            
            // Fade In do Formulário
            void rsvpFormContainer.offsetWidth; 
            rsvpFormContainer.classList.add('fade-in');
            
        }, 500); 
    });

    // Lógica do Formulário (Gerenciar Envio e Transição de Sucesso)
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const submitButton = rsvpForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        fetch(rsvpForm.action, {
            method: rsvpForm.method,
            body: new FormData(rsvpForm),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Confirmação';

            if (response.ok) {
                // SUCESSO: Define a flag no LocalStorage
                localStorage.setItem(SUBMITTED_KEY, 'true'); 
                
                // Fade Out do Formulário
                rsvpFormContainer.classList.remove('fade-in');
                
                setTimeout(() => {
                    // Transiciona para a tela de sucesso usando a nova função
                    showSuccessScreen();
                }, 500); 
                
            } else {
                // ERRO
                alert("Ocorreu um erro ao enviar a confirmação. Por favor, tente novamente.");
            }
        })
        .catch(error => {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Confirmação';
            alert("Erro de conexão. Verifique sua rede e tente novamente.");
            console.error('Erro de rede:', error);
        });
    });
});
