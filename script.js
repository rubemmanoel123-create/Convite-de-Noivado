document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const video = document.getElementById('background-video');
    const playButtonContainer = document.getElementById('play-button-container');
    const playButton = document.getElementById('play-button');
    const rsvpFormContainer = document.getElementById('rsvp-form-container');
    
    // Referências necessárias para o envio e sucesso
    const rsvpForm = document.getElementById('rsvp-form');
    const successContainer = document.getElementById('already-submitted-container');

    // PAUSA o vídeo na inicialização (vai começar a tocar no clique do botão).
    video.pause(); 
    
    // --- Lógica do Botão "Continuar" (COM FADE OUT e FADE IN) ---

    playButton.addEventListener('click', () => {
        // CORREÇÃO/ADICIONAL: Inicia a reprodução do vídeo no clique do botão.
        video.play();

        // 1. Inicia o FADE OUT do botão atual
        playButtonContainer.classList.remove('fade-in');
        
        // 2. Após 500ms, esconde o botão e inicia o FADE IN do formulário
        setTimeout(() => {
            playButtonContainer.classList.add('hidden'); // Usa display: none
            rsvpFormContainer.classList.remove('hidden'); // Remove display: none
            
            // Força o reflow para garantir a transição
            void rsvpFormContainer.offsetWidth; 
            
            // 3. Aplica o FADE IN ao formulário
            rsvpFormContainer.classList.add('fade-in');
            
        }, 500); // 500ms é o tempo de transição no CSS
    });

    // --- Lógica do Formulário (Gerenciar Envio e Transição de Sucesso) ---

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão (para usar o Fetch)
        
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
            // Reativa o botão
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
                // ERRO
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
