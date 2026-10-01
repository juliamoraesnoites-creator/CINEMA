javascript
// ========================================
// CONFIGURAÇÕES
// ========================================

const PRECO_INGRESSO = 25;


// ========================================
// ELEMENTOS DO HTML
// ========================================

const botoesFiltro =
    document.querySelectorAll(".filtro");

const filmes =
    document.querySelectorAll(".filme-card");

const botoesComprar =
    document.querySelectorAll(".comprar-btn");

const selectFilme =
    document.getElementById("filme");

const quantidade =
    document.getElementById("quantidade");

const total =
    document.getElementById("total");

const formulario =
    document.getElementById("formCompra");

const modal =
    document.getElementById("modal");

const fecharModal =
    document.getElementById("fecharModal");

const modalOk =
    document.getElementById("modalOk");

const mensagemCompra =
    document.getElementById("mensagemCompra");

const temaBtn =
    document.getElementById("temaBtn");


// ========================================
// FILTRO DE FILMES
// ========================================

botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesFiltro.forEach(btn => {
            btn.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        const generoSelecionado =
            botao.dataset.genero;

        filmes.forEach(filme => {

            const generoFilme =
                filme.dataset.genero;

            const mostrar =
                generoSelecionado === "todos" ||
                generoSelecionado === generoFilme;

            filme.style.display =
                mostrar ? "" : "none";

        });

    });

});


// ========================================
// SELEÇÃO DO FILME
// ========================================

botoesComprar.forEach(botao => {

    botao.addEventListener("click", () => {

        const filmeSelecionado =
            botao.dataset.filme;

        selectFilme.value =
            filmeSelecionado;

        document
            .getElementById("ingressos")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


// ========================================
// CÁLCULO DO TOTAL
// ========================================

function atualizarTotal() {

    let qtd =
        Number(quantidade.value);

    if (!Number.isFinite(qtd)) {
        qtd = 1;
    }

    qtd = Math.floor(qtd);

    if (qtd < 1) {
        qtd = 1;
    }

    if (qtd > 10) {
        qtd = 10;
    }

    quantidade.value = qtd;

    const valor =
        qtd * PRECO_INGRESSO;

    total.textContent =
        `R$ ${valor.toFixed(2).replace(".", ",")}`;

}


quantidade.addEventListener(
    "input",
    atualizarTotal
);


// ========================================
// ABRIR MODAL
// ========================================

function abrirModal() {

    modal.classList.add("aberto");

    document.body.classList.add("modal-aberto");

}


// ========================================
// FECHAR MODAL
// ========================================

function fechar() {

    modal.classList.remove("aberto");

    document.body.classList.remove("modal-aberto");

}


// ========================================
// FORMULÁRIO
// ========================================

formulario.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const nome =
            document
                .getElementById("nome")
                .value
                .trim();

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const filmeSelecionado =
            selectFilme.value;

        const sessao =
            document
                .getElementById("sessao")
                .value;

        let qtd =
            Number(quantidade.value);


        // ------------------------------
        // VALIDAÇÃO DO NOME
        // ------------------------------

        if (nome.length < 2) {

            alert(
                "Digite um nome válido."
            );

            document
                .getElementById("nome")
                .focus();

            return;

        }


        // ------------------------------
        // VALIDAÇÃO DO E-MAIL
        // ------------------------------

        if (!email) {

            alert(
                "Digite seu e-mail."
            );

            document
                .getElementById("email")
                .focus();

            return;

        }


        // ------------------------------
        // VALIDAÇÃO DO FILME
        // ------------------------------

        if (!filmeSelecionado) {

            alert(
                "Selecione um filme."
            );

            selectFilme.focus();

            return;

        }


        // ------------------------------
        // VALIDAÇÃO DA SESSÃO
        // ------------------------------

        if (!sessao) {

            alert(
                "Selecione uma sessão."
            );

            document
                .getElementById("sessao")
                .focus();

            return;

        }


        // ------------------------------
        // VALIDAÇÃO DA QUANTIDADE
        // ------------------------------

        if (
            !Number.isInteger(qtd) ||
            qtd < 1 ||
            qtd > 10
        ) {

            alert(
                "Escolha entre 1 e 10 ingressos."
            );

            quantidade.focus();

            return;

        }


        // ------------------------------
        // CÁLCULO
        // ------------------------------

        const valorTotal =
            qtd * PRECO_INGRESSO;

        const valorFormatado =
            valorTotal
                .toFixed(2)
                .replace(".", ",");


        // ------------------------------
        // MENSAGEM
        // ------------------------------

        mensagemCompra.textContent =
            `${nome}, sua reserva para "${filmeSelecionado}" foi realizada com sucesso. Sessão: ${sessao}. Quantidade: ${qtd} ingresso(s). Total: R$ ${valorFormatado}.`;


        abrirModal();

    }
);


// ========================================
// FECHAR MODAL
// ========================================

fecharModal.addEventListener(
    "click",
    fechar
);


modalOk.addEventListener(
    "click",
    () => {

        fechar();

        formulario.reset();

        quantidade.value = 1;

        atualizarTotal();

    }
);


// ========================================
// CLICAR FORA DO MODAL
// ========================================

modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {
            fechar();
        }

    }
);


// ========================================
// TECLA ESC
// ========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("aberto")
        ) {

            fechar();

        }

    }
);


// ========================================
// TEMA
// ========================================

function aplicarTema(tema) {

    const modoClaro =
        tema === "claro";

    document.body.classList.toggle(
        "claro",
        modoClaro
    );

    temaBtn.textContent =
        modoClaro ? "☀️" : "🌙";

    temaBtn.setAttribute(
        "aria-label",
        modoClaro
            ? "Ativar modo escuro"
            : "Ativar modo claro"
    );

}


// ========================================
// CARREGAR TEMA SALVO
// ========================================

const temaSalvo =
    localStorage.getItem("tema") || "escuro";

aplicarTema(temaSalvo);


// ========================================
// ALTERAR TEMA
// ========================================

temaBtn.addEventListener(
    "click",
    () => {

        const modoClaro =
            document.body.classList.contains("claro");

        const novoTema =
            modoClaro
                ? "escuro"
                : "claro";

        aplicarTema(novoTema);

        localStorage.setItem(
            "tema",
            novoTema
        );

    }
);


// ========================================
// INICIALIZAÇÃO
// ========================================

atualizarTotal();
