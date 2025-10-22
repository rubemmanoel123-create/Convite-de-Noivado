document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const video = document.getElementById('background-video');
    const playButtonContainer = document.getElementById('play-button-container');
    const playButton = document.getElementById('play-button');
    const rsvpFormContainer = document.getElementById('rsvp-form-container');
    // const rsvpForm = document.getElementById('rsvp-form'); // Não é mais necessário para o envio
    // const feedbackMessage = document.getElementById('message'); // Não é mais necessário para a mensagem de sucesso

    // Função para mostrar o botão "Continuar" (COM FADE IN)
    const showPlayButton = () => {
        if (playButtonContainer.classList.contains('hidden')) {
            
            // 1. Remove 'hidden' para exibir o elemento (ele já está com opacity: 0 no CSS)
            playButtonContainer.classList.remove('hidden');
            
            // 2. Truque para forçar o navegador a renderizar as mudanças de CSS (garante a transição)
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
    setTimeout(showPlayButton, 3000); // 3000 milissegundos = 3 segundos

    // --- Lógica do Botão "Continuar" (COM FADE OUT e FADE IN) ---

    playButton.addEventListener('click', () => {
        // 1. Inicia o FADE OUT do botão atual
        playButtonContainer.classList.remove('fade-in');
        
        // 2. Após 500ms (ajuste este valor no CSS se quiser uma transição mais lenta),
        //    esconde o botão e inicia o FADE IN do formulário
        setTimeout(() => {
            // Esconde o container do botão (DOM)
            playButtonContainer.classList.add('hidden');
            
            // Exibe o container do formulário (DOM)
            rsvpFormContainer.classList.remove('hidden');
            
            // Truque para forçar o navegador a reconhecer o elemento antes de aplicar a transição
            void rsvpFormContainer.offsetWidth; 
            
            // 3. Aplica o FADE IN ao formulário
            rsvpFormContainer.classList.add('fade-in');
            
        }, 500); // O tempo aqui (500ms) deve ser igual ao tempo de transição no CSS
    });

    // --- Lógica do Formulário (Gerenciar Envio) ---
    const rsvpForm = document.getElementById('rsvp-form');
    const alreadySubmittedContainer = document.getElementById('already-submitted-container');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão para gerenciar com JS
        
        // 1. Envia o formulário usando Fetch API (necessário para o FormSubmit sem redirecionamento)
        fetch(rsvpForm.action, {
            method: rsvpForm.method,
            body: new FormData(rsvpForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Se o envio for OK:
                
                // 2. Inicia o FADE OUT do formulário atual
                rsvpFormContainer.classList.remove('fade-in');
                
                // 3. Após a transição, esconde o formulário e mostra a caixa de sucesso
                setTimeout(() => {
                    // Esconde o formulário
                    rsvpFormContainer.classList.add('hidden');
                    
                    // Exibe a caixa de sucesso (o container "#already-submitted-container")
                    alreadySubmittedContainer.classList.remove('hidden');
                    
                    // Aplica o FADE IN à caixa de sucesso
                    void alreadySubmittedContainer.offsetWidth; 
                    alreadySubmittedContainer.classList.add('fade-in');
                    
                }, 500); // 500ms é o tempo de transição do CSS.
            } else {
                // Caso haja erro (como a falta de ativação):
                alert("Ocorreu um erro ao enviar a confirmação. Por favor, verifique se ativou o formulário ou tente novamente mais tarde.");
            }
        })
        .catch(error => console.error('Erro:', error));
    });
    // --- FIM Lógica do Formulário ---

