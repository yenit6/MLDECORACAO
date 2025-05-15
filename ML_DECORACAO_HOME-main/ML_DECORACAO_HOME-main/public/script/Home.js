
const H4FooterCreditos = document.getElementById('H4FooterCreditos')
const SpanCategoriasUm = document.getElementById('SpanCategoriasUm')
const SpanCategoriasDois = document.getElementById('SpanCategoriasDois')
const SpanCategoriasTrez = document.getElementById('SpanCategoriasTrez')
const BtnToggleCategorias = document.querySelectorAll('#BtnToggleCategorias')
const MenuFloat = document.getElementById('MenuFloat')
const InsertProdutosHome = document.getElementById("InsertProdutosHome")

const ProdutosList = []

function GerarListaDeProdutos() {
    InsertProdutosHome.innerHTML = ''

    ProdutosList.forEach(Produto => {
        const CardProdutosHome = document.createElement('div')
        CardProdutosHome.classList = 'CardProdutosHome'

        const Top = document.createElement("div")
        Top.classList = 'Top'

        const Img = document.createElement('img')
        if (!Produto.Src) Img.src = 'https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'
        else Img.src = Produto.Src

        const Ptitle = document.createElement("p")
        Ptitle.textContent = Produto.Title

        const Bottom = document.createElement('div')
        Bottom.classList = 'Bottom'

        const Ppreco = document.createElement('p')
        Ppreco.textContent = Produto.Preco

        const BtnVerMais = document.createElement('button')
        BtnVerMais.textContent = 'Ver mais'
        
        InsertProdutosHome.appendChild(CardProdutosHome)
        CardProdutosHome.appendChild(Top)
        Top.appendChild(Img)
        Top.appendChild(Ptitle)
        CardProdutosHome.appendChild(Bottom)
        Bottom.appendChild(Ppreco)
        Bottom.appendChild(BtnVerMais)
    })
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('/produtos')  // Requisição para pegar os produtos
    .then(response => response.json())
    .then(produtos => {
      const produtosLista = document.getElementById('produtos-lista');
      produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('CardProdutosHome');

        // Estrutura do produto
        produtoDiv.innerHTML = `
       

          <img src="/imagens_div/produtos/${produto.id_produto}.webp" alt="Imagem do Produto ${produto.nome}">

            <p>${produto.nome}</p>
          </div>
          <div class="Bottom">
            <p>R$ ${produto.preco}</p>
            <button>Ver mais</button>
          </div>
          </div> 
        `;

        produtosLista.appendChild(produtoDiv);
      });
    })
    .catch(error => console.error('Erro ao carregar os produtos:', error));
});

addEventListener('DOMContentLoaded', () => {

    const NewYear = new Date().getFullYear()

    H4FooterCreditos.textContent = `© ${NewYear} ML Decor Inc. All Rights Reserved.`
})

BtnToggleCategorias.forEach(Btn => {
    Btn.onclick = () => {
        if (MenuFloat.style.padding == "10px") {
            MenuFloat.style.padding = '0'
            MenuFloat.style.height = '0'
            document.querySelectorAll('#BtnToggleCategorias')[2].style.transform = 'rotate(0deg)'

        }else {
            MenuFloat.style.padding = '10px'
            MenuFloat.style.height = 'auto'
            document.querySelectorAll('#BtnToggleCategorias')[2].style.transform = 'rotate(180deg)'
        }

        SpanCategoriasUm.classList.toggle("SpanCategoriasUm")
        SpanCategoriasDois.classList.toggle("SpanCategoriasDois")
        SpanCategoriasTrez.classList.toggle("SpanCategoriasTrez")
    }
})

