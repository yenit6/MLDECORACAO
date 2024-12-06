const simboloMenu = document.querySelector('#simbolo_menu');
const fecharMenu = document.querySelector('#close_menu');
const menuHeader = document.querySelector('#menu_header');

simboloMenu.addEventListener('click', () => {
    menuHeader.classList.remove('hidden');
});

fecharMenu.addEventListener('click', () => {
    menuHeader.classList.add('hidden');
});



//

