const BtnBackPage = document.getElementById('BtnBackPage')
const IToggleVerPassLogin = document.getElementById('IToggleVerPassLogin')    
const InputPasswordLogin = document.getElementById('InputPasswordLogin')
const BtnCadastreSe = document.getElementById('BtnCadastreSe')
const BtnLogin = document.getElementById('BtnLogin')
const LoginContainer = document.querySelector('.LoginContainer')
const ContainerCadastro = document.querySelector('.ContainerCadastro')
const ContainerProblemas = document.getElementById('ContainerProblemas')
const H4TitleProblemas = document.getElementById('H4TitleProblemas')
const CardProblema = document.querySelectorAll('#CardProblema')

BtnBackPage.onclick = () => window.location.href = 'https://www.wix.com'

IToggleVerPassLogin.onclick = () => {
    if (IToggleVerPassLogin.classList.contains("fa-eye")) {
        InputPasswordLogin.type = "text"
        IToggleVerPassLogin.classList.remove("fa-eye")
        IToggleVerPassLogin.classList.add("fa-eye-slash")
        
    }else {
        InputPasswordLogin.type = "password"
        IToggleVerPassLogin.classList.remove("fa-eye-slash")
        IToggleVerPassLogin.classList.add("fa-eye")
    }
}

BtnCadastreSe.onclick = () => {
    LoginContainer.style.width = '0'
    LoginContainer.style.padding = '0'

    ContainerCadastro.style.width = '80%'
    ContainerCadastro.style.padding = '10px'
}

BtnLogin.onclick = () => {
    LoginContainer.style.width = '80%'
    LoginContainer.style.padding = '10px'

    ContainerCadastro.style.width = '0'
    ContainerCadastro.style.padding = '0'
}

ContainerProblemas.onmouseover = () => {
    H4TitleProblemas.textContent = 'Escolha um serviço'
    H4TitleProblemas.style.textAlign = 'left'
    H4TitleProblemas.style.fontSize = '17px'
    H4TitleProblemas.style.marginBottom = '20px'

    CardProblema.forEach(Card => {
        Card.style.display = 'flex'
        Card.style.height = 'auto'
        Card.style.width = '100%'
        Card.style.padding = '10px'
    })
}
ContainerProblemas.onmouseleave = () => {
    H4TitleProblemas.textContent = 'Problemas?'
    H4TitleProblemas.style.textAlign = 'center'
    H4TitleProblemas.style.fontSize = '20px'
    H4TitleProblemas.style.marginBottom = '0'

    CardProblema.forEach(Card => {
        Card.style.height = '0'
        Card.style.width = '0'
        Card.style.padding = '0'
    })
}