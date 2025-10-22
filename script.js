document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const video = document.getElementById('background-video');
    const playButtonContainer = document.getElementById('play-button-container');
    const playButton = document.getElementById('play-button');
    const rsvpFormContainer = document.getElementById('rsvp-form-container');
    
    // Referências necessárias para o envio
    const rsvpForm = document.getElementById('rsvp-form');
    const successContainer = document.getElementById('already-submitted-container');

    // Função para mostrar o botão "Continuar" (COM FADE IN)
    const showPlayButton = () => {
        if (playButtonContainer.classList.contains('hidden')) {
            
            // 1. Remove 'hidden' para exibir o elemento
            playButtonContainer.classList.remove('hidden');
            
            // 2. Truque para forçar o navegador a renderizar as mudanças de CSS
            void playButtonContainer.offsetWidth; 
            
            // 3. Adiciona 'fade-in' para disparar a transição suave
            playButtonContainer.classList.add('fade-in');

            video.pause(); // Pausa o vídeo
        }
    };

    // --- Lógica de Transição do Vídeo ---

    // 1. Usa o evento 'ended' do vídeo
    video.addEventListener('ended', showPlayButton);

    // 2. Fallback de 3 segundos (temporizador ajustado)
    setTimeout(showPlayButton, 3000);

    // --- Lógica do Botão "Continuar" (COM FADE OUT e FADE IN) ---

    playButton.addEventListener('click', () => {
        // 1. Inicia o FADE OUT do botão atual
        playButtonContainer.classList.remove('fade-in');
        
        // 2. Após 500ms, esconde o botão e inicia o FADE IN do formulário
        setTimeout(() => {
            playButtonContainer.classList.add('hidden');
            rsvpFormContainer.classList.remove('hidden');
            
            void rsvpFormContainer.offsetWidth; 
            
            // 3. Aplica o FADE IN ao formulário
            rsvpFormContainer.classList.add('fade-in');
            
        }, 500); // 500ms é o tempo de transição no CSS
    });

    // --- Lógica do Formulário (Gerenciar Envio e Transição de Sucesso) ---

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão (para evitar o 404 e usar o Fetch)
        
        // Desativa o botão e exibe "Enviando..."
        const submitButton = rsvpForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Envia o formulário usando Fetch
        fetch(rsvpForm.action, {
            method: rsvpForm.method,
            body: new FormData(rsvpForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            // Reativa o botão (em caso de erro ou sucesso)
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Confirmação';

            if (response.ok) {
                // SUCESSO: Oculta o formulário e mostra a caixa de sucesso
                
                // 1. Inicia o FADE OUT do formulário
                rsvpFormContainer.classList.remove('fade-in');
                
                // 2. Após 500ms, faz a troca de containers
                setTimeout(() => {
                    // Esconde o formulário
                    rsvpFormContainer.classList.add('hidden');
                    
                    // Exibe a caixa de sucesso (o container "#already-submitted-container")
                    successContainer.classList.remove('hidden');
                    
                    // Aplica o FADE IN à caixa de sucesso
                    void successContainer.offsetWidth; 
                    successContainer.classList.add('fade-in');
                    
                }, 500); // 500ms é o tempo de transição no CSS
                
            } else {
                // ERRO: Algum problema com o FormSubmit (mesmo ativado)
                alert("Ocorreu um erro ao enviar a confirmação. Por favor, tente novamente.");
            }
        })
        .catch(error => {
            // Erro de rede/conexão
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Confirmação';
            alert("Erro de conexão. Verifique sua rede e tente novamente.");
            console.error('Erro de rede:', error);
        });
    });
});
