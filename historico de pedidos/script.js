const menu = document.getElementById("dropdown-menu");
const botaoMenu = document.getElementById("button-all");
const btnVerMais = document.getElementById("btnVerMais");
const btnFechar = document.getElementById("btnFechar");
const modal = document.getElementById("modal");


botaoMenu.addEventListener("click", () => {
    menu.classList.toggle("ativo");
    menu.classList.toggle("menucult");
});



document.addEventListener("DOMContentLoaded", () => {
 

  btnVerMais.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  btnFechar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  
});