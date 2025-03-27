const BtnToggleMenu = document.getElementById("BtnToggleMenu")
const SpanOpenMenuUm = document.getElementById("SpanOpenMenuUm")
const SpanOpenMenuDois = document.getElementById("SpanOpenMenuDois")
const SpanOpenMenuTrez = document.getElementById("SpanOpenMenuTrez")
const MenuFloat = document.getElementById('MenuFloat')

BtnToggleMenu.onclick = () => {
    BtnToggleMenu.classList.toggle('Active')
    SpanOpenMenuUm.classList.toggle('Um')
    SpanOpenMenuDois.classList.toggle('Dois')
    SpanOpenMenuTrez.classList.toggle('Trez')
    MenuFloat.classList.toggle('Active')
}