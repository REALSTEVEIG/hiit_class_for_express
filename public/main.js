var UserNameDisplay = document.getElementById('user-name')
var UserConnectStat = document.getElementById('user-connection-icon')
var UserProfileStatText = document.getElementById('user-profile-name')

var chatWrapper = document.getElementById('chat-wrapper')
var userTxt = document.getElementById('user-message-form')

var messageWrapper = document.createElement('div')
messageWrapper.className = 'message-wrapper'
var messageBox = document.createElement('div')
messageBox.className = 'message-box'
var messageBoxStyle = document.createElement('div')
messageBoxStyle.className = 'message-box-style'
var messageBoxP = document.createElement('p')
messageBoxP.className = 'message-box-p'

var emojiWrapper = document.getElementById('emojis-wrapper')
var emojiIcon = document.getElementById('emoji')

var emojiCode = 0

var selectProfilePicWrapper = document.getElementById('select-profile-pic-menu')


// Botão de display de conexão do usuário (Online/Offline)
function displayUserConnectStat(){
    if(UserConnectStat.innerText == 'toggle_on'){

        UserConnectStat.style.transition = '.2s'
        UserConnectStat.style.color = '#2f3542c5'
        UserConnectStat.innerText = 'toggle_off'
        UserProfileStatText.innerHTML = 'Offline'

    } else if(UserConnectStat.innerText == 'toggle_off'){

        UserConnectStat.style.transition = '.2s'
        UserConnectStat.style.color = '#2ed573'
        UserConnectStat.innerText = 'toggle_on'
        UserProfileStatText.innerHTML = 'Online'
        

    }
}


// Pega a mensagem digitada pelo usuário no formulário, cria uma estilização para ela e a exibe no chat

function sendMessage(){

    if (userTxt.value == ''){

        

    }else{
        
       
        let messageWrapperClone = messageWrapper.cloneNode(true)
        let messageBoxClone = messageBox.cloneNode(true)
        let messageBoxStyleClone = messageBoxStyle.cloneNode(true)
        let messageBoxPClone = messageBoxP.cloneNode(true)

        messageWrapperClone.appendChild(messageBoxClone)
        messageBoxClone.appendChild(messageBoxPClone)
        messageWrapperClone.appendChild(messageBoxStyleClone)
        chatWrapper.appendChild(messageWrapperClone)
        messageBoxPClone.innerHTML = userTxt.value

        if (userTxt.value == 'saber mais'){

            
            contactMessage(contactHelp = 'Para enviar as mensagens, além de utilizar o botão Enviar ao lado direito do formulário, você pode enviar ao pressionar a tecla Enter &#x1F609;&#x1F609;')
            contactMessage(contactHelp = 'Vale ressaltar que mensagens com conteúdo vazio não são enviadas! &#x1F605;')
            contactMessage(contactHelp = 'Além disso, você pode interagir com alguns elementos da barra de navegação da esquerda &#x1F604;&#x1F604;. Tente clicar nos elementos para conferir as alterações, como mudar sua foto de perfil ou seu status de conexão')
            
        }
        

        emojiWrapper.className = 'emojis-wrapper'
        emojiIcon.style.color = '#a4b0be' 
        userTxt.value = ''
        userTxt.focus()
        messageWrapperClone.scrollIntoView();
   
        
       
     
    
    
    }

}

// Mostra os diálogos do sistema com o usuário dependendo do que for escrito 

var contactMessageWrapper = document.createElement('div')
contactMessageWrapper.className = 'contact-message-wrapper'
var contactMessageBox = document.createElement('div')
contactMessageBox.className = 'contact-message-box'
var contactMessageBoxStyle = document.createElement('div')
contactMessageBoxStyle.className = 'contact-message-box-style'
var contactMessageBoxP = document.createElement('p')
contactMessageBoxP.className = 'contact-message-box-p'


function contactMessage(contactHelp){

        let contactMessageWrapperClone = contactMessageWrapper.cloneNode(true)
        let contactMessageBoxClone = contactMessageBox.cloneNode(true)
        let contactMessageBoxStyleClone = contactMessageBoxStyle.cloneNode(true)
        let contactMessageBoxPClone = contactMessageBoxP.cloneNode(true)

        contactMessageWrapperClone.appendChild(contactMessageBoxStyleClone)
        contactMessageWrapperClone.appendChild(contactMessageBoxClone)
        contactMessageBoxClone.appendChild(contactMessageBoxPClone)

        contactMessageBoxPClone.innerHTML = contactHelp
        chatWrapper.appendChild(contactMessageWrapperClone)
        contactMessageWrapperClone.scrollIntoView();



    
}


// Abre a janela de emojis

function emojiWindow(){

  if (emojiWrapper.className == 'emojis-wrapper'){

    emojiIcon.style.color = '#747d8c' 
    emojiWrapper.className = 'close-emoji-wrapper'
  } else if (emojiWrapper.className == 'close-emoji-wrapper'){
    emojiIcon.style.color = '#a4b0be' 
    emojiWrapper.className = 'emojis-wrapper'
  }
    
}

// Seleciona o emoji e o coloca no formulário de mensagem do usuário

function insertEmoji(x){
    
    if(emojiCode == 1){
        userTxt.value+= '\u{1F600}'
    }
    if(emojiCode == 2){
        userTxt.value+= '\u{1F604}'
    }
    if(emojiCode == 3){
        userTxt.value+= '\u{1F605}'
    }
    if(emojiCode == 4){
        userTxt.value+= '\u{1F602}'
    }
    if(emojiCode == 5){
        userTxt.value+= '\u{1F609}'
    }
    if(emojiCode == 6){
        userTxt.value+= '\u{1F618}'
    }
    if(emojiCode == 7){
        userTxt.value+= '\u{1F620}'
    }
    if(emojiCode == 8){
        userTxt.value+= '\u{1F49B}'
    }
    if(emojiCode == 9){
        userTxt.value+= '\u{1F44D}'
    }
    if(emojiCode == 10){
        userTxt.value+= '\u{1F44E}'
    }

}

function changeProfilePic(){


}


// Permite enviar a mensagem contida no formulário do usuário usando a tecla enter 

document.getElementById('user-message-form').addEventListener('keydown', function(event){


    var tecla = event.keyCode
    
    if(tecla == 13){
        sendMessage()
    }
})

function changeProfilePic(){

    selectProfilePicWrapper.style.display = 'block'
    contactMessage(contactHelp = 'Infelizmente, essa aplicação não tem conexão com banco de dados, portanto não é possível fazer upload da sua imagem de perfil &#x1F44E;')
     

}

document.body.addEventListener('keydown', function(event){


    var tecla = event.keyCode
    
    if(tecla == 27){
        closeSelectProfilePicMenu()
        
    }
})

function closeSelectProfilePicMenu(){

    selectProfilePicWrapper.style.display = 'none'

   
}

function attachFile(){




}

//Efetua o "login"

var loginScreen = document.getElementById('login-screen')
var mainWrapper = document.getElementById('main')
function login(){
  
  loginScreen.style.display = 'none'
  mainWrapper.style.display = 'flex'
  
}