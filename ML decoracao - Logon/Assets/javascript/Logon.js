const Login_Container = document.getElementById('Login_Container')
const Cadastro_Container = document.getElementById('Cadastro_Container')
const InputEmailLogin = document.getElementById('InputEmailLogin')
const InputSenhaLogin = document.getElementById('InputSenhaLogin')
const MostrarSenhaLogin = document.getElementById('MostrarSenhaLogin')
const BtnEntrar = document.getElementById('BtnEntrar')
const BtnEsquecirASenha = document.getElementById('BtnEsquecirASenha')
const BtnNaoTenhoConta = document.getElementById('BtnNaoTenhoConta')
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

const showMessage = (message) => {
    MensageBox.style.top = '20px'
    MensageBox.textContent = message
    
    setTimeout(() => {
        MensageBox.style.top = '-100px'
    }, 3000)
}

// Login
const NewWindow = (width, height, link) => {
    const left = (window.screen.width / 2) - (width / 2)
    const top = (window.screen.height / 2) - (height / 2)
    const options = `top=${top}, left=${left}, width=${width}, height=${height}, scrollbars=0`
    window.open(link, 'janela', options)
}

// Validação dos campos de login
const VerifyEntradaLogin = () => {
    const Email = InputEmailLogin.value
    const Senha = InputSenhaLogin.value

    if (!Email) {
        showMessage('Preencha o campo email!')
        return
    }

    if (!Senha) {
        showMessage('Preencha o campo senha!')
        return
    }

    const user = Pessoas.find(p => p.Email == Email)
    const pass = Pessoas.find(p => p.Senha == Senha)

    if (!user) {
        showMessage('Email não encontrado!')
        return
    }

    if (!pass) {
        showMessage('Senha incorreta!')
        return
    }

    // Se chegamos aqui, as credenciais estão corretas
    NewWindow(384, 777, 'https://www.youtube.com')
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

BtnNaoTenhoConta.onclick = () => {
    Login_Container.style.display = 'none'
    Cadastro_Container.style.display = 'block'
}

// Cadastro
const InputNomeCadastro = document.getElementById('InputNomeCadastro')
const InputSobreNomeCadastro = document.getElementById('InputSobreNomeCadastro')
const InputEmailCadastro = document.getElementById('InputEmailCadastro')
const InputSenhaCadastro = document.getElementById('InputSenhaCadastro')
const InputDataNascimentoCadastro = document.getElementById('InputDataNascimentoCadastro')
const InputCep = document.getElementById('InputCep')
const InputCpfOrCnpj = document.getElementById('InputCpfOrCnpj')
const BtnCadastrar = document.getElementById('BtnCadastrar')
const BtnJaTenhoConta = document.getElementById('BtnJaTenhoConta')
const MostrarSenhaCadastro = document.getElementById('MostrarSenhaCadastro')

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
const CpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
const CepRegex = /^\d{5}-?\d{3}$/

BtnCadastrar.onclick = () => {
    const Nome = InputNomeCadastro.value.trim()
    const SobreNome = InputSobreNomeCadastro.value.trim()
    const Email = InputEmailCadastro.value.trim()
    const Senha = InputSenhaCadastro.value.trim()
    const DataNascimento = InputDataNascimentoCadastro.value.trim()
    const Cep = InputCep.value.trim()
    const CpfOrCnpj = InputCpfOrCnpj.value.trim()

    // Verificando se não houver valor nos inputs
    const campos = [
        { valor: Nome, mensagem: 'Preencha o campo nome!' },
        { valor: SobreNome, mensagem: 'Preencha o campo sobrenome!' },
        { valor: Email, mensagem: 'Preencha o campo email!' },
        { valor: Senha, mensagem: 'Preencha o campo senha!' },
        { valor: DataNascimento, mensagem: 'Preencha o campo data de nascimento!' },
        { valor: Cep, mensagem: 'Preencha o campo cep!' },
        { valor: CpfOrCnpj, mensagem: 'Preencha o campo CPF ou CNPJ!' }
    ]

    for (const campo of campos) {
        if (!campo.valor) {
            showMessage(campo.mensagem)
            return
        }
    }

    // Validação de email
    if (!EmailRegex.test(Email)) {
        showMessage('Email inválido!')
        return
    }

    // Validação de CEP
    if (!CepRegex.test(Cep)) {
        showMessage('CEP inválido!')
        return
    }

    // Validação de CPF ou CNPJ
    if (!(CpfRegex.test(CpfOrCnpj) || CnpjRegex.test(CpfOrCnpj))) {
        showMessage('CPF ou CNPJ inválido!')
        return
    }

    alert('Usuário cadastrado!')
    open('https://www.youtube.com')
}

BtnJaTenhoConta.onclick = () => {
    Cadastro_Container.style.display = 'none'
    Login_Container.style.display = 'block'
}

MostrarSenhaCadastro.onclick = () => {
    if (MostrarSenhaCadastro.classList.contains('fa-eye')) {
        MostrarSenhaCadastro.classList.remove('fa-eye')
        MostrarSenhaCadastro.classList.add('fa-eye-slash')
        InputSenhaCadastro.setAttribute('type', 'text')
    
    }else {
        MostrarSenhaCadastro.classList.remove('fa-eye-slash')
        MostrarSenhaCadastro.classList.add('fa-eye')
        InputSenhaCadastro.setAttribute('type', 'password')
    }

}

// Problemas com login ou cadastro
const ContainerProblemas = document.getElementById('ContainerProblemas')
const ToggleContainerProblemas = document.getElementById('ToggleContainerProblemas')

ToggleContainerProblemas.onclick = () => {
    if (ContainerProblemas.style.height == '45px') {
        ContainerProblemas.style.height = 'auto'
        ToggleContainerProblemas.textContent = 'Ocultar'

    }else {
        ContainerProblemas.style.height = '45px'
        ToggleContainerProblemas.textContent = 'Problemas com o login ou cadastro?'
    }
}
