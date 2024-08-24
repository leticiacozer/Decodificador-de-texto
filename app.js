// Seleciona os elementos do DOM
const areaText = document.querySelector(".areaText");
const areaMensagem = document.querySelector(".areaMensagem");
const criptoBot = document.getElementById("criptoBot");
const decriptoBot = document.getElementById("decriptoBot");
const copiarBot = document.getElementById("copiarBot");
const mensagemBusca = document.querySelector(".mensagemBusca");
const mensagemInformativa = document.querySelector(".mensagemInformativa");

// Define a matriz de código
const matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

// Função de criptografia
function encriptar(stringEncriptada) {
    let resultado = stringEncriptada;
    matrizCodigo.forEach(([original, substituto]) => {
        const regex = new RegExp(original, 'g');
        resultado = resultado.replace(regex, substituto);
    });
    return resultado;
}

// Função de descriptografia
function decriptar(stringDesencriptada) {
    let resultado = stringDesencriptada;
    matrizCodigo.slice().reverse().forEach(([original, substituto]) => {
        const regex = new RegExp(substituto, 'g');
        resultado = resultado.replace(regex, original);
    });
    return resultado;
}

// Função de criptografia
function botCripto() {
    const texto = areaText.value;
    const textoEncriptado = encriptar(texto);
    areaMensagem.value = textoEncriptado;
    areaMensagem.classList.add('sem-imagem');
    atualizarMensagens();
}

// Função de descriptografia
function botDescripto() {
    const textoCriptografado = areaMensagem.value;
    areaMensagem.classList.add('sem-imagem');
    if (textoCriptografado.trim() !== "") {
        const textoDesencriptado = decriptar(textoCriptografado);
        areaText.value = textoDesencriptado;
    } else {
        // Se a área de mensagem estiver vazia, limpa a área de mensagem
        areaMensagem.classList.add('sem-imagem'); // Remove a imagem de fundo
        areaMensagem.value = ""; // Limpa o conteúdo da áreaMensagem

        // Opcional: Se você quiser descriptografar o conteúdo da áreaText e atualizar a áreaText
        const textoCriptografadoOriginal = areaText.value.trim(); // Obter o texto atual de areaText
        const textoDesencriptado = decriptar(textoCriptografadoOriginal);
        areaText.value = textoDesencriptado;
    }

    // Atualiza a visibilidade das mensagens
    atualizarMensagens();

}

// Atualiza a visibilidade das mensagens
function atualizarMensagens() {
    const textoAreaText = areaText.value.trim();
    const textoAreaMensagem = areaMensagem.value.trim();

    if (textoAreaText !== "" || textoAreaMensagem !== "") {
        mensagemBusca.style.display = "none";
        mensagemInformativa.style.display = "none";
    } else {
        mensagemBusca.style.display = "block";
        mensagemInformativa.style.display = "block";
    }
}

// Adiciona ouvintes de eventos aos botões
criptoBot.addEventListener("click", () => {
    botCripto();
});

decriptoBot.addEventListener("click", () => {
    botDescripto();
});

copiarBot.addEventListener("click", () => {
    const textoParaCopiar = areaMensagem.value;
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        console.log("Texto copiado com sucesso!");
    }).catch(err => {
        console.error("Falha ao copiar o texto: ", err);
    });
});

// Atualiza a visibilidade inicial das mensagens
atualizarMensagens();
