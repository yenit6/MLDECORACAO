const menu = document.getElementById("dropdown-menu");
const botaoMenu = document.getElementById("button-all");


botaoMenu.addEventListener("click", () => {
    menu.classList.toggle("ativo");
    menu.classList.toggle("menucult");
});