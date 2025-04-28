import { CarregarProdutos } from './Produtos.js'

const H4FooterCreditos = document.getElementById('H4FooterCreditos')
const H4TitleServicos = document.getElementById('H4TitleServicos')
const SpanCategoriasUm = document.getElementById('SpanCategoriasUm')
const SpanCategoriasDois = document.getElementById('SpanCategoriasDois')
const SpanCategoriasTrez = document.getElementById('SpanCategoriasTrez')
const BtnToggleCategorias = document.querySelectorAll('#BtnToggleCategorias')
const BtnSairVerMais = document.getElementById('BtnSairVerMais')
const BtnEnviarNovoComentarioSobre = document.getElementById('BtnEnviarNovoComentarioSobre')
const BtnFaleConosco = document.getElementById('BtnFaleConosco')
const BtnServicoWhatsapp = document.getElementById("BtnServicoWhatsapp")
const BtnSendServicoWhatsapp = document.getElementById('BtnSendServicoWhatsapp')
const BtnServicoGmail = document.getElementById("BtnServicoGmail")
const BtnSendServicoGmail = document.getElementById('BtnSendServicoGmail')
const ITagFecharFaleConosco = document.getElementById('ITagFecharFaleConosco')
const ITagFecharServicoWhatsapp = document.getElementById("ITagFecharServicoWhatsapp")
const ITagFecharServicoGmail = document.getElementById('ITagFecharServicoGmail')
const MenuFloat = document.getElementById('MenuFloat')
const InsertProdutosHome = document.getElementById("InsertProdutosHome")
const InfoUseHome = document.getElementById('InfoUseHome')
const ContainerVerMais = document.getElementById('ContainerVerMais')
const PrintImgProdutoVerMais = document.getElementById('PrintImgProdutoVerMais')
const ContainerComentarioVerMais = document.getElementById("ContainerComentarioVerMais")
const TextareaNovoComentario = document.getElementById('TextareaNovoComentario')
const FaleConosco = document.getElementById('FaleConosco')
const ServicoWhatsapp = document.getElementById('ServicoWhatsapp')
const ServicoGmail = document.getElementById("ServicoGmail")
const TextareaDuvidasWhatsapp = document.getElementById("TextareaDuvidasWhatsapp")
const InputSeuEmail = document.getElementById('InputSeuEmail')
const InputSeuAssuntoDeEmail = document.getElementById('InputSeuAssuntoDeEmail')
const TextareaDuvidasEmail = document.getElementById('TextareaDuvidasEmail')

const ProdutosList = []
let ProdutoSelecionadoIndex = -1

BtnFaleConosco.onclick = () => {
    FaleConosco.style.height = '500px'
    ITagFecharFaleConosco.onclick = () => FaleConosco.style.height = '0'

    BtnServicoWhatsapp.onclick = () => {
        H4TitleServicos.textContent = 'Whatsapp'
        ServicoWhatsapp.style.height = 'calc(100% - 50px)'

        ITagFecharServicoWhatsapp.onclick = () => {
            H4TitleServicos.textContent = 'Escolha um serviço'
            ServicoWhatsapp.style.height = '0'
            TextareaDuvidasWhatsapp.value = ''
        }
    }

    BtnServicoGmail.onclick = () => {
        H4TitleServicos.textContent = 'Email'
        ServicoGmail.style.height = 'calc(100% - 50px)'

        ITagFecharServicoGmail.onclick = () => {
            H4TitleServicos.textContent = 'Escolha um serviço'
            ServicoGmail.style.height = '0'
            InputSeuEmail.value = ''
            InputSeuAssuntoDeEmail.value = ''
            TextareaDuvidasEmail.value = ''
        }
    }
}

BtnSendServicoWhatsapp.onclick = () => {
    if (TextareaDuvidasWhatsapp.value) open(`https://wa.me/5571988888888?text=${TextareaDuvidasWhatsapp.value}`)
    else alert('Digite sua duvida antes de enviar')
}

BtnSendServicoGmail.onclick = () => {
    if (InputSeuEmail.value && InputSeuAssuntoDeEmail.value && TextareaDuvidasEmail.value) {
        open(`mailto:${InputSeuEmail.value}?subject=${InputSeuAssuntoDeEmail.value}&body=${TextareaDuvidasEmail.value}`)
    }else {
        alert("Preencha todos os canpos antes de enviar o email")
    }
}

function carregarComentariosDoLocalStorage() {
    return JSON.parse(localStorage.getItem('Comentarios')) || {}
}

function salvarComentariosNoLocalStorage(data) {
    localStorage.setItem('Comentarios', JSON.stringify(data))
}

InfoUseHome.onclick = () => {
    alert('Ao clicar em "Aceitar" você concorda com os Termos de Uso e Política de Privacidade da ML Decor.')
    open('../../Logon.html', '_self')
}

function CriarElemento(tag, classe = '', texto = '') {
    const el = document.createElement(tag)
    if (classe) el.className = classe
    if (texto) el.textContent = texto
    return el
}

function ExibirProduto(index) {
    const produto = ProdutosList[index]
    ProdutoSelecionadoIndex = index

    ContainerVerMais.style.height = "106vh"
    ContainerVerMais.style.padding = "20px"
    PrintImgProdutoVerMais.setAttribute('src', produto.Src)
    PrintImgProdutoVerMais.setAttribute("alt", produto.Title)
    ContainerComentarioVerMais.innerHTML = ''

    const comentariosSalvos = carregarComentariosDoLocalStorage()
    const comentarios = comentariosSalvos[index] || []

    comentarios.forEach(comentario => {
        AdicionarComentarioNaTela(comentario)
    })
}

function AdicionarComentarioNaTela(comentario) {
    const Card = document.createElement('div')
    Card.className = 'CardComentarioProdutoVerMais'

    const ImgPerfil = CriarElemento('img')
    ImgPerfil.id = 'PrintPerfilUserComentarioProdutoVerMais'
    ImgPerfil.src = document.getElementById('PrintPerfilUserNovoComentarioProdutoVerMais').src
    ImgPerfil.alt = 'Sua foto'

    const Section = CriarElemento('section', 'InfoComentarioProdutoVerMais')
    Section.id = 'InfoComentarioProdutoVerMais'

    const Nome = CriarElemento('span')
    Nome.id = 'SpanPrintNomeUserComentarioProdutoVerMais'
    Nome.textContent = 'marquitos'

    const TextoComentario = CriarElemento('span')
    TextoComentario.id = 'SpanPrintComentarioProdutoVerMais'
    TextoComentario.textContent = comentario

    Section.appendChild(Nome)
    Section.appendChild(TextoComentario)
    Card.appendChild(ImgPerfil)
    Card.appendChild(Section)

    ContainerComentarioVerMais.appendChild(Card)
}

function CriarCardProduto(Produto, index) {
    const CardProdutosHome = CriarElemento('div', 'CardProdutosHome')

    const Top = CriarElemento("div", "Top")
    const Img = CriarElemento('img')
    Img.src = Produto.Src || 'https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'

    const Ptitle = CriarElemento("p", "", Produto.Title)

    const Bottom = CriarElemento('div', 'Bottom')
    const Ppreco = CriarElemento('p', '', Produto.Preco)
    const BtnVerMais = CriarElemento('button', '', 'Ver mais')

    BtnVerMais.onclick = () => ExibirProduto(index)

    Top.appendChild(Img)
    Top.appendChild(Ptitle)
    Bottom.appendChild(Ppreco)
    Bottom.appendChild(BtnVerMais)
    CardProdutosHome.appendChild(Top)
    CardProdutosHome.appendChild(Bottom)

    InsertProdutosHome.appendChild(CardProdutosHome)
}

function GerarListaDeProdutos() {
    InsertProdutosHome.innerHTML = ''

    ProdutosList.forEach((Produto, index) => {
        CriarCardProduto(Produto, index)
    })
}

BtnSairVerMais.onclick = () => {
    ContainerVerMais.style.height = '0'
    ContainerVerMais.style.padding = "0"
    PrintImgProdutoVerMais.setAttribute('src', "")
    ProdutoSelecionadoIndex = -1
}

BtnToggleCategorias.forEach(Btn => {
    Btn.onclick = () => {
        const aberto = MenuFloat.style.padding === "10px"
        MenuFloat.style.padding = aberto ? "0" : "10px"
        MenuFloat.style.height = aberto ? "0" : "auto"

        SpanCategoriasUm.classList.toggle("ativo")
        SpanCategoriasDois.classList.toggle("ativo")
        SpanCategoriasTrez.classList.toggle("ativo")
    }
})

BtnEnviarNovoComentarioSobre.onclick = () => {
    const comentario = TextareaNovoComentario.value.trim()

    if (!comentario) {
        alert('Não tem nenhum comentário pra enviar!')
        TextareaNovoComentario.style.background = 'tomato'
        TextareaNovoComentario.addEventListener('click', () => TextareaNovoComentario.style.background = 'none', { once: true })
        return
    }

    if (ProdutoSelecionadoIndex >= 0) {
        AdicionarComentarioNaTela(comentario)

        const comentariosSalvos = carregarComentariosDoLocalStorage()
        if (!comentariosSalvos[ProdutoSelecionadoIndex]) {
            comentariosSalvos[ProdutoSelecionadoIndex] = []
        }

        comentariosSalvos[ProdutoSelecionadoIndex].push(comentario)
        salvarComentariosNoLocalStorage(comentariosSalvos)

        TextareaNovoComentario.value = ''
    }
}

addEventListener('DOMContentLoaded', () => {
    const NewYear = new Date().getFullYear()
    H4FooterCreditos.textContent = `© ${NewYear} ML Decor Inc. All Rights Reserved.`
})

// Inicializar produtos
CarregarProdutos(ProdutosList, GerarListaDeProdutos)
