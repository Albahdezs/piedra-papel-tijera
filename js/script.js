document.addEventListener('DOMContentLoaded', function() {
    // Variables iniciales
    let contadorComputadora = 0;
    let contadorPersona = 0;
    let rondasJugadas = 0;

    // Obtener el número de rondas desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const numRondas = parseInt(urlParams.get('rondas'), 10);

    // Verificar si el número de rondas es válido
    if (isNaN(numRondas) || numRondas < 1 || numRondas > 10) {
        alert('Número de rondas no válido. Redirigiendo al inicio.');
        window.location.href = './index.html'; // Si no es válido, redirige al inicio
    }

    // Inicializamos los contadores
    document.querySelector('.comp-p').textContent = 'Computadora: ' + contadorComputadora;
    document.querySelector('.pers-p').textContent = 'Persona: ' + contadorPersona;

    let ultimo = ''; // Última jugada de la computadora

    function generarAleatorio(minimo, maximo) {
        return Math.floor(Math.random() * (maximo - minimo) + minimo);
    }

    function tems(texto) {
        // Función para generar la jugada de la computadora
        function alea() {
            var gene = generarAleatorio(0, 3);
            if (gene == 0) {
                ultimo = 'piedra';
                return '✊';
            }
            if (gene == 1) {
                ultimo = 'papel';
                return '✋';
            }
            if (gene == 2) {
                ultimo = 'tijera';
                return '✌';
            }
        }

        // Mostrar jugada de la persona
        const contenedor1 = document.querySelector('.persona');
        const template = document.querySelector('#p').content;
        const fragment1 = document.createDocumentFragment();
        const pcontent1 = [{ p: texto }];

        pcontent1.forEach(el => {
            template.querySelector('p').textContent = el.p;
            let clone1 = document.importNode(template, true);
            fragment1.appendChild(clone1);
        });
        contenedor1.appendChild(fragment1);

        // Mostrar jugada de la computadora
        const contenedor2 = document.querySelector('.computadora');
        const fragment2 = document.createDocumentFragment();
        const pcontent2 = [{ p: alea() }];

        pcontent2.forEach(el => {
            template.querySelector('p').textContent = el.p;
            let clone2 = document.importNode(template, true);
            fragment2.appendChild(clone2);
        });
        contenedor2.appendChild(fragment2);
    }

    // Función para verificar el estado del juego
    function verificarGanador() {
        console.log('Verificando ganador...');
        if (rondasJugadas >= numRondas) {
            console.log('Juego finalizado. Determinando ganador...');
            const contenedorJuego = document.querySelector('.juego');
            const resultadoFinal = document.createElement('h2');
            resultadoFinal.style.textAlign = 'center';

            if (contadorPersona > contadorComputadora) {
                resultadoFinal.textContent = '🎉 ¡Ganaste la partida! 🎉';
                resultadoFinal.style.color = 'green';
            } else if (contadorPersona < contadorComputadora) {
                resultadoFinal.textContent = '😢 La máquina ganó la partida. 😢';
                resultadoFinal.style.color = 'red';
            } else {
                resultadoFinal.textContent = '🤝 Es un empate. 🤝';
                resultadoFinal.style.color = 'orange';
            }

            // Insertar el mensaje y el botón en el contenedor del juego
            const reiniciarBoton = document.createElement('button');
            reiniciarBoton.textContent = 'Reiniciar Juego';
            reiniciarBoton.style.display = 'block';
            reiniciarBoton.style.margin = '20px auto';
            reiniciarBoton.style.padding = '10px 20px';
            reiniciarBoton.style.fontSize = '16px';
            reiniciarBoton.style.cursor = 'pointer';
            reiniciarBoton.style.background = 'black';
            reiniciarBoton.style.color = '#f2d072';
            reiniciarBoton.style.borderRadius = '10px';
            reiniciarBoton.addEventListener('click', () => {
                window.location.href = './index.html'; // Redirige a la pantalla inicial
            });

            contenedorJuego.appendChild(resultadoFinal);
            contenedorJuego.appendChild(reiniciarBoton);

            // Deshabilitar las opciones
            document.querySelector('.opciones').style.display = 'none';
        }
    }

    // Eventos de click para las opciones
    document.querySelector('.piedra').addEventListener('click', () => {
        if (rondasJugadas < numRondas) {
            jugar('✊', 'tijera', 'papel');
        }
    });
    document.querySelector('.papel').addEventListener('click', () => {
        if (rondasJugadas < numRondas) {
            jugar('✋', 'piedra', 'tijera');
        }
    });
    document.querySelector('.tijera').addEventListener('click', () => {
        if (rondasJugadas < numRondas) {
            jugar('✌', 'papel', 'piedra');
        }
    });

    // Función para procesar cada jugada
    function jugar(eleccionPersona, ganaA, pierdeCon) {
        document.querySelector('.persona').innerHTML = '';
        document.querySelector('.computadora').innerHTML = '';
        tems(eleccionPersona);

        if (ultimo === ganaA) {
            contadorPersona++;
        } else if (ultimo === pierdeCon) {
            contadorComputadora++;
        }

        rondasJugadas++;

        // Actualizamos los contadores en pantalla
        document.querySelector('.pers-p').textContent = 'Persona: ' + contadorPersona;
        document.querySelector('.comp-p').textContent = 'Computadora: ' + contadorComputadora;

        // Actualizamos los colores según el ganador
        if (contadorComputadora < contadorPersona) {
            document.querySelector('.comp-p').style.color = '#ed0933';
            document.querySelector('.pers-p').style.color = '#03701d';
        } else if (contadorComputadora > contadorPersona) {
            document.querySelector('.comp-p').style.color = '#03701d';
            document.querySelector('.pers-p').style.color = '#ed0933';
        } else {
            document.querySelector('.comp-p').style.color = 'black';
            document.querySelector('.pers-p').style.color = 'black';
        }
        // Verifica si está contando las rondas
        console.log('Rondas jugadas:', rondasJugadas, '/', numRondas);

        verificarGanador(); // Verificamos si se alcanzaron las rondas
    }
});
