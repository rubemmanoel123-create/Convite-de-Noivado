document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const video = document.getElementById('background-video');
    const playButtonContainer = document.getElementById('play-button-container');
    const playButton = document.getElementById('play-button');
    const rsvpFormContainer = document.getElementById('rsvp-form-container');
    const rsvpForm = document.getElementById('rsvp-form');
    const feedbackMessage = document.getElementById('message');

    // Função para mostrar o botão "Continuar" (COM FADE IN CORRIGIDO)
    const showPlayButton = () => {
        if (playButtonContainer.classList.contains('hidden')) {
            
            // 1. Remove 'hidden' para exibir o elemento (ele já está com opacity: 0 no CSS)
            playButtonContainer.classList.remove('hidden');
            
            // 2. Truque para forçar o navegador a renderizar as mudanças de CSS
            // antes de aplicar a próxima classe. Isso garante que a transição ocorra.
            void playButtonContainer.offsetWidth; 
            
            // 3. Adiciona 'fade-in' para disparar a transição suave de 0.5s
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
        
        // 2. Após 500ms (tempo da transição CSS), esconde e inicia o FADE IN do formulário
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

    // --- Lógica do Formulário (COM VALIDAÇÃO) ---

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const nomeCompleto = document.getElementById('nome').value.trim();
        const confirmou = document.getElementById('confirmar').checked;
        const nomeInput = document.getElementById('nome');

        // 1. VERIFICAÇÃO PRINCIPAL: Confirmação de Presença
        if (!confirmou) {
            feedbackMessage.textContent = '⚠️ Por favor, selecione a caixa para confirmar sua presença.';
            feedbackMessage.style.color = '#FF9800'; 
            feedbackMessage.classList.remove('hidden');
            return; 
        }
        
        // 2. VERIFICAÇÃO SECUNDÁRIA: Nome Vazio
        if (nomeCompleto === '') {
            feedbackMessage.textContent = '⚠️ Por favor, preencha seu nome completo.';
            feedbackMessage.style.color = '#FF9800'; 
            feedbackMessage.classList.remove('hidden');
            nomeInput.focus(); 
            return; 
        }

        // Se as validações passaram: Sucesso
        let messageText = '';
        messageText = `🎉 ${nomeCompleto}, sua presença está confirmada! Nos vemos lá.`;
        feedbackMessage.style.color = '#4CAF50'; 
        
        // Limpa e exibe a mensagem
        rsvpForm.reset(); 
        feedbackMessage.textContent = messageText;
        feedbackMessage.classList.remove('hidden');
        
        // Esconde o formulário principal
        rsvpForm.style.display = 'none';
    });
});