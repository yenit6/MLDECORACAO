const Login_Container = document.getElementById('Login_Container')
const InputEmailLogin = document.getElementById('InputEmailLogin')
const InputSenhaLogin = document.getElementById('InputSenhaLogin')
const MostrarSenhaLogin = document.getElementById('MostrarSenhaLogin')
const BtnEntrar = document.getElementById('BtnEntrar')
const BtnEsquecirASenha = document.getElementById('BtnEsquecirASenha')
const MensageBox = document.getElementById('MensageBox')

const Pessoas = [
    {
        Email: 'marcus@gmail.com',
        Senha: 123456
    },
    {
        Email: 'vinicius@gmail.com',
        Senha: 78910
    }
]

const NewWindow = (width, height, link) => {
    const left = (window.screen.width / 2) - (width / 2)
    const top = (window.screen.height / 2) - (height / 2)
    const options = `top=${top}, left=${left}, width=${width}, height=${height}, scrollbars=0`
    window.open(link, 'janela', options)
}

// Validação dos canpos de login
const VerifyEntradaLogin = () => {
    const Email = InputEmailLogin.value
    const Senha = InputSenhaLogin.value
    
    if (!Email) {
        MensageBox.style.top = '20px'
        MensageBox.textContent = 'Preencha o campo email!'

        setTimeout(() => {
            MensageBox.style.top = '-100px'
        }, 3000)

        return
    }

    if (!Senha) {
        MensageBox.style.top = '20px'
        MensageBox.textContent = 'Preencha o campo senha!'

        setTimeout(() => {
            MensageBox.style.top = '-100px'
        }, 3000)
        return
    }

    for (let i = 0; i < Pessoas.length; i++) {
        if (Email != Pessoas[i].Email) {
            MensageBox.style.top = '20px'
            MensageBox.textContent = 'Preencha o campo email!'

            setTimeout(() => {
                MensageBox.style.top = '-100px'
            }, 3000)
            return
        }

        if (Senha != Pessoas[i].Senha) {
            MensageBox.style.top = '20px'
            MensageBox.textContent = 'Preencha o campo email!'

            setTimeout(() => {
                MensageBox.style.top = '-100px'
            }, 3000)
            return
        }

        if (Email == Pessoas[i].Email && Senha == Pessoas[i].Senha) {
            NewWindow(384, 777, 'https://www.youtube.com')
            return
        }
    }
}

MostrarSenhaLogin.onclick = () => {
    if (MostrarSenhaLogin.classList.contains('fa-eye')) {
        MostrarSenhaLogin.classList.remove('fa-eye')
        MostrarSenhaLogin.classList.add('fa-eye-slash')
        InputSenhaLogin.setAttribute('type', 'text')

    } else {
        MostrarSenhaLogin.classList.remove('fa-eye-slash')
        MostrarSenhaLogin.classList.add('fa-eye')
        InputSenhaLogin.setAttribute('type', 'password')
    }
}

BtnEntrar.onclick = () => VerifyEntradaLogin()

// Evento para tecla ENTER validade os campos de entrada de dados
document.addEventListener('keydown', ({keyCode}) => {
    const Email = InputEmailLogin.value
    const Senha = InputSenhaLogin.value

    if (keyCode === 13 && Email && Senha) {
        VerifyEntradaLogin()

    }else if (keyCode === 13 && !Email) {
        MensageBox.style.top = '20px'
        MensageBox.textContent = 'Preencha o campo email!'

        setTimeout(() => {
            MensageBox.style.top = '-100px'
        }, 3000)
        return

    }else if (keyCode === 13 && !Senha) {
        MensageBox.style.top = '20px'
        MensageBox.textContent = 'Preencha o campo senha!'

        setTimeout(() => {
            MensageBox.style.top = '-100px'
        }, 3000)
        return
    }
})

// Esquecir a senha
BtnEsquecirASenha.onclick = () => {
    NewWindow(850, 400, 'Assets/Pages/EsquecirASenha.html')
}