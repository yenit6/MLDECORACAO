const simboloMenu = document.querySelector('#simbolo_menu');
const fecharMenu = document.querySelector('#close_menu');
const menuHeader = document.querySelector('#menu_header');

simboloMenu.addEventListener('click', () => {
    menuHeader.classList.remove('hidden');
});

fecharMenu.addEventListener('click', () => {
    menuHeader.classList.add('hidden');
});

//Like e deslike 

let like = document.getElementById('like');
let deslike = document.getElementById('deslike');



like.addEventListener('click',()=>{

        like.src ='file/gostarblakc.png'
        deslike.src='file/nao-gosto.png'
        
})


deslike.addEventListener('click',()=>{

    deslike.src ='file/nao-gosto(1).png'
    like.src='file/gostar.png'
    
})

