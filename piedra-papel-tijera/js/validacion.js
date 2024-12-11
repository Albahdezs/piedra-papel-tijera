document.getElementById('start-game').addEventListener('click', function() {
    // Obtener el número de rondas introducido
    const numRondas = document.getElementById('num-rondas').value;

    // Validar el número de rondas
    if (numRondas >= 1 && numRondas <= 10) {
        // Redirigir directamente a juego.html con el número de rondas en la URL
        window.location.href = `./juego.html?rondas=${numRondas}`;
    } else {
        // Mostrar mensaje de error si el número de rondas es inválido
        const errorMsg = document.getElementById('error-msg');
        errorMsg.style.display = 'block';
    }
});
