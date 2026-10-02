const login = document.getElementById("login");

document.getElementById("formLogin").addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (usuario && senha) {
        login.classList.add("oculto");
    }
});


const carrinho = [];

const itens = document.getElementById("itensCarrinho");
const quantidade = document.getElementById("quantidade");
const total = document.getElementById("total");

const painel = document.getElementById("painelCarrinho");
const fundo = document.getElementById("fundo");


document.querySelectorAll(".adicionar").forEach(function (botao) {

    botao.addEventListener("click", function () {

        carrinho.push({
            nome: botao.dataset.nome,
            preco: Number(botao.dataset.preco)
        });

        atualizarCarrinho();

        botao.textContent = "Adicionado!";

        setTimeout(function () {
            botao.textContent = "Adicionar ao carrinho";
        }, 800);

    });

});


function atualizarCarrinho() {

    itens.innerHTML = "";

    if (carrinho.length === 0) {

        itens.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

    } else {

        carrinho.forEach(function (produto, indice) {

            const div = document.createElement("div");

            div.className = "item";

            div.innerHTML = `
                <div class="item-linha">

                    <strong>
                        ${produto.nome}
                    </strong>

                    <button
                        class="remover"
                        onclick="removerProduto(${indice})"
                    >
                        Remover
                    </button>

                </div>

                <p>
                    ${preco(produto.preco)}
                </p>
            `;

            itens.appendChild(div);

        });

    }


    quantidade.textContent = carrinho.length;


    const soma = carrinho.reduce(function (valor, produto) {

        return valor + produto.preco;

    }, 0);


    total.textContent = preco(soma);

}


function removerProduto(indice) {

    carrinho.splice(indice, 1);

    atualizarCarrinho();

}


function preco(valor) {

    return valor.toLocaleString("pt-BR", {

        style: "currency",
        currency: "BRL"

    });

}


function abrir() {

    painel.classList.add("aberto");

    fundo.classList.add("ativo");

    document.body.classList.add("travado");

}


function fechar() {

    painel.classList.remove("aberto");

    fundo.classList.remove("ativo");

    document.body.classList.remove("travado");

}


document
    .getElementById("abrirCarrinho")
    .addEventListener("click", abrir);


document
    .getElementById("fecharCarrinho")
    .addEventListener("click", fechar);


fundo.addEventListener("click", fechar);


document
    .getElementById("finalizar")
    .addEventListener("click", function () {

        if (carrinho.length === 0) {

            alert("Seu carrinho está vazio.");

            return;

        }

        alert("Compra simulada com sucesso!");

        carrinho.length = 0;

        atualizarCarrinho();

        fechar();

    });


document.querySelectorAll(".filtro").forEach(function (filtro) {

    filtro.addEventListener("click", function () {

        document.querySelectorAll(".filtro").forEach(function (botao) {

            botao.classList.remove("ativo");

        });


        filtro.classList.add("ativo");


        const categoria = filtro.dataset.cat;


        document.querySelectorAll(".produto").forEach(function (produto) {

            produto.classList.toggle(

                "oculto",

                categoria !== "todos" &&
                produto.dataset.cat !== categoria

            );

        });

    });

});