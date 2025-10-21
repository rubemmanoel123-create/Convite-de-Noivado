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

    // --- Lógica do Formulário (REMOVIDA) ---
    // O rsvpForm.addEventListener('submit', ...) foi REMOVIDO
    // O envio de dados agora é tratado diretamente pelo FormSubmit
    // configurado no atributo 'action' do seu arquivo index.html.
});
