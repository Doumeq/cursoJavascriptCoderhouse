function iniciarJuego(){
    const numeroSecreto = 16;
    let intentos = 0;
    const maxIntentos = 5;
    const mensajes = ["Respuesta correcta :D", "Respuesta incorrecta :("];
    let acerto = false;

    while (intentos < maxIntentos && acerto === false) {
        const entrada = prompt("Intento " + (intentos + 1) + " de " + maxIntentos + "\nAdivina el número (entre 1 y 20): ");
        const numero = parseInt(entrada, 10);
        if (numero === numeroSecreto) {
            alert(mensajes[0]);
            acerto = true;
        } else {
            alert(mensajes[1]);
        }
        intentos = intentos + 1;
    }

    if (acerto === false) {
        alert("Se acabaron tus intentos! El número secreto era " + numeroSecreto);
    }
}

iniciarJuego();
