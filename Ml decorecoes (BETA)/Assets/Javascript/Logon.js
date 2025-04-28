const FormLogin = document.getElementById("FormLogin")
const FormCadastro = document.getElementById("FormCadastro")

const BtnEntrar = document.getElementById("BtnEntrar")
const BtnPerdirOAcesso = document.getElementById('BtnPerdirOAcesso')
const BtnClosePerdirOAcesso = document.getElementById('BtnClosePerdirOAcesso')
const BtnRecuperarOAcesso = document.getElementById('BtnRecuperarOAcesso')
const BtnNaoPossuoConta = document.getElementById("BtnNaoPossuoConta")
const BtnCadastro = document.getElementById("BtnCadastro")
const BtnjaPossuoConta = document.getElementById('BtnjaPossuoConta')

const InputEmailLogin = document.getElementById("InputEmailLogin")
const InputPasswordLogin = document.getElementById("InputPasswordLogin")
const InputOquePerdeuDeAcesso = document.getElementById('InputOquePerdeuDeAcesso')
const InputRecuperaçãoDeAcesso = document.getElementById('InputRecuperaçãoDeAcesso')
const InputEmailCadastro = document.getElementById("InputEmailCadastro")
const InputPasswordCadastro = document.getElementById("InputPasswordCadastro")
const InputCpfOuCnpj = document.getElementById("InputCpfOuCnpj")
const InputCep = document.getElementById("InputCep")
const InputRua = document.getElementById("InputRua")
const InputBairro = document.getElementById("InputBairro")
const InputCidade = document.getElementById("InputCidade")
const InputNumero = document.getElementById("InputNumero")
const InputEstado = document.getElementById("InputEstado")
const InputTelefone = document.getElementById("InputTelefone")
const InputNome = document.getElementById("InputNome")
const InputSobrenome = document.getElementById("InputSobrenome")

const ItagTooglePassWord = document.getElementById('ItagTooglePassWord')

const PerdirAcesso = document.getElementById("PerdirAcesso")

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexCPF = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/
const regexCNPJ = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/
const regexCEP = /^\d{5}-?\d{3}$/

// Login
ItagTooglePassWord.onclick = () => {
    if (ItagTooglePassWord.classList.contains('fa-eye')) {
        ItagTooglePassWord.classList.remove('fa-eye')
        ItagTooglePassWord.classList.add('fa-eye-slash')
        InputPasswordLogin.setAttribute('type', "text")
        return
    }

    ItagTooglePassWord.classList.add('fa-eye')
    ItagTooglePassWord.classList.remove('fa-eye-slash')
    InputPasswordLogin.setAttribute('type', 'password')
}

BtnEntrar.onclick = (e) => {
    e.preventDefault()

    if (!InputEmailLogin.value) {
        alert('Preencha o campo de email!')
        return;
    }else if (!emailRegex.test(InputEmailLogin.value)) {
        alert('Email inválido!')
        return
    }

    if (!InputPasswordLogin.value) {
        alert("Preencha o campo da senha!")
        return
    }

    const usuariosSalvos = JSON.parse(localStorage.getItem('Usuario')) || []
    const usuarioEncontrado = usuariosSalvos.find(usuario => usuario.Email === InputEmailLogin.value)

    if (!usuarioEncontrado) {
        alert("Esse email não foi cadastrado!")
    }else if (usuarioEncontrado.Senha !== InputPasswordLogin.value) {
        alert("Essa senha está incorreta!")
    }else {
        window.location.href = "Assets/Pages/Home.html"
    }
}

BtnPerdirOAcesso.onclick = (e) => {
    e.preventDefault()
    PerdirAcesso.style.width = "50vw"
    PerdirAcesso.style.padding = '10px'

    BtnClosePerdirOAcesso.onclick = () => {
        PerdirAcesso.style.width = '0'
        PerdirAcesso.style.padding = '0'
    }
}

BtnRecuperarOAcesso.onclick = () => {
    const Send = (Tipo, EmailSend) => {
        if (Tipo == "Email") {
            if (!emailRegex.test(InputRecuperaçãoDeAcesso.value)) {
                alert("Email invalido!")
                return
            }
            open(`mailto:${EmailSend}?subject=email&body=Perdir+o+meu+email`)

        }else if (Tipo == "Senha") {
            open(`mailto:${EmailSend}?subject=senha&body=Perdir+a+minha+senha`)
        }
    }
    if (!InputOquePerdeuDeAcesso.value) {
        alert("Preecha o canpo do o que você perdeu")
        return
    }else if (!InputRecuperaçãoDeAcesso.value) {
        alert("Preencha o canpo de email")
        return
    }

    if (InputOquePerdeuDeAcesso.value == 'Email') {
        Send("Email", InputRecuperaçãoDeAcesso.value)
    }else if (InputOquePerdeuDeAcesso.value == "Senha") {
        Send('Senha', InputRecuperaçãoDeAcesso.value)
    }else alert(`Não temos esse serviço: ${InputOquePerdeuDeAcesso.value}`)
}

BtnNaoPossuoConta.onclick = (e) => {
    e.preventDefault()
    FormLogin.style.height = '0'
    FormLogin.style.padding = '0'

    FormCadastro.style.height = '500px'
    FormCadastro.style.padding = '10px'
}

// Cadastro
const Usuario = []

const SalvarCadastro = (Email, Senha, CpfOrCnpj, Cep, Rua, Bairro, Cidade, Numero, Estado, Telefone, Nome, Sobrenome) => {
    try {
        Usuario.push({
            Email,
            Senha,
            CpfOrCnpj,
            Cep,
            Rua,
            Bairro,
            Cidade,
            Numero,
            Estado,
            Telefone,
            Nome,
            Sobrenome
        })
    
        localStorage.setItem('Usuario', JSON.stringify(Usuario))
        alert("Suas informações foram salvas. Agora faça o login")
        window.location.href = "http://127.0.0.1:5500/Logon.html?"
    }catch (e) {
        alert("Ouve um erro no salvamento das suas informações, se cadastre mais tarde!")
    }
}

BtnCadastro.onclick = (e) => {
    e.preventDefault()

    if (!InputEmailCadastro.value) {
        alert("Preencha o campo de email")
        return
    }

    if (!InputPasswordCadastro.value) {
        alert("Preencha o campo de senha")
        return
    }

    if (!InputCpfOuCnpj.value) {
        alert("Preencha o campo com o CPF ou CNPJ")
        return
    }else if (regexCPF.test(InputCpfOuCnpj.value)) {
        if (!regexCPF.test(InputCpfOuCnpj.value)) {
            alert("CPF invalido!")
            return
        }
    }else if (regexCNPJ.test(InputCpfOuCnpj.value)) {
        if (!regexCNPJ.test(InputCpfOuCnpj.value)) {
            alert("CNPJ invalido!")
            return
        }
    }

    if (!InputCep.value) {
        alert("Preencha o campo do CEP")
        return
    }

    if (!InputRua.value) {
        alert("Preencha o campo da rua")
        return
    }

    if (!InputBairro.value) {
        alert("Preencha o campo do bairro")
        return
    }

    if (!InputCidade.value) {
        alert("Preencha o campo da cidade")
        return
    }

    if (!InputNumero.value) {
        alert("Preencha o campo de número")
        return
    }

    if (!InputEstado.value) {
        alert("Preencha o campo do estado")
        return
    }

    if (!InputTelefone.value) {
        alert("Preencha o campo de telefone")
        return
    }

    if (!InputNome.value) {
        alert("Preencha o campo de nome")
        return
    }

    if (!InputSobrenome.value) {
        alert("Preencha o campo de sobrenome")
        return
    }

    SalvarCadastro(
        InputEmailCadastro.value,
        InputPasswordCadastro.value,
        InputCpfOuCnpj.value,
        InputCep.value,
        InputRua.value,
        InputBairro.value,
        InputCidade.value,
        InputNumero.value,
        InputEstado.value,
        InputTelefone.value,
        InputNome.value,
        InputSobrenome.value
    )
}

BtnjaPossuoConta.onclick = (e) => {
    e.preventDefault()

    FormLogin.style.height = 'auto'
    FormLogin.style.padding = '10px'

    FormCadastro.style.height = '0'
    FormCadastro.style.padding = '0'
}