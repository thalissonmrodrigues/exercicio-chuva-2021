let eTopic = false
let eInput = ''
let eTextarea = ''
//Events
window.addEventListener('resize', resizeScreen)
document.querySelector('.menu--mobile, .menu--mobile b').addEventListener('click', openMenu)
document.querySelector('.closeMenu').addEventListener('click', closeMenu)
document.querySelector('.sumary--content, .sumary').addEventListener('click', toggleSumary)
document.querySelector('.standard--content button').addEventListener('click', openTopic)
document.querySelector('.topic--submitted button').addEventListener('click', openTopic2)
document.querySelector('.topic--form form').addEventListener('submit', topicSubmitted)
document.querySelector('.opacity--video').addEventListener('click', ()=>{
    document.querySelector('.opacity--video').style.display = 'none'
})
document.querySelectorAll('.questions--area .card--title, .questions--area .card--author, .questions--area .card .card--text').forEach((item)=>{
    item.addEventListener('click', toogleResponse)
})
document.querySelectorAll('.discussion--area .question--button .like img').forEach((item)=>{
    item.addEventListener('click', like)
})
document.querySelectorAll('.discussion--area .question--button .more--options span').forEach((item)=>{
    item.addEventListener('click', openOptions)
})
document.querySelectorAll('.discussion--area .question--button .menu--ellipsis>div').forEach((item)=>{
    item.addEventListener('click', removeTopic)
})
document.querySelectorAll('.discussion--area .model.blur .opacity--submitted').forEach((item)=>{
    item.addEventListener('click', removeOpacity)
})
document.querySelectorAll('.discussion--area .model.blur .opacity--submitted div').forEach((item)=>{
    item.addEventListener('click', editTopic)
})
//Functions
//edita os tópicos
function editTopic(item){
    let dataItem = item.target.parentNode.parentNode.children[1].firstElementChild.children
    let input = dataItem[0].innerHTML
    let textarea = dataItem[2].innerHTML
    eInput = dataItem[0]
    eTextarea = dataItem[2]
    openTopic2(item,input,textarea)
}
//remove opacidade do tópico novo
function removeOpacity(item){
    item.target.style.zIndex = '-10'
    item.target.parentNode.classList.remove('blur')

    setTimeout(()=>{
        item.target.style.zIndex = '30'
        item.target.parentNode.classList.add('blur')
    }, 2000)

}
//monitora o tamanho da tela e reseta o menu
function resizeScreen(){
    let width = window.screen.width
    if(width > 800){
        closeMenu()
    }
}
//abre o menu
function openMenu(){
    document.querySelector('.menu--mobile').style.display = 'none'
    document.querySelector('.menu--content').style.display = 'block'
    document.querySelector('aside.left--menu').style.display = 'block'
    setTimeout(() => {
        document.querySelector('.menu--content').style.marginLeft = 0
        document.querySelector('aside.left--menu').style.marginLeft = 0
    }, 100);
    setTimeout(() => { 
        document.querySelector('.closeMenu').style.display = 'block'
    }, 600);
}
//fecha o menu
function closeMenu(){
    document.querySelector('.closeMenu').style.display = ''
    document.querySelector('.menu--content').style.marginLeft = ''
    document.querySelector('.menu--content').style.display = ''
    document.querySelector('aside.left--menu').style.marginLeft = ''
    document.querySelector('aside.left--menu').style.display = ''
    document.querySelector('.menu--mobile').style.display = ''     
}
//remove o tópico
function removeTopic(item){
    let elem = item.target.parentNode.parentNode.parentNode.parentNode
    elem.parentNode.removeChild(elem)
}
//abre o menu de ellipsis
function openOptions(item){
    let elem = item.target.parentNode.parentNode.children[0]
    let display = window.getComputedStyle(elem).getPropertyValue("display")

    if(display == 'none'){
        elem.style.display = 'block'

    }else{
        elem.style.display = 'none'
    }

}
//adiciona/remove curtida do tópico
function like(item){
    let elem = item.target
    let like = elem.getAttribute('data-like')
    let allLike = elem.parentNode.parentNode.children
    allLike = allLike[3].firstElementChild
    let total = allLike.innerHTML
    if(like === 'false'){
        allLike.innerHTML = parseInt(total)+1
        elem.setAttribute('data-like', 'true')
    }
    else{
        allLike.innerHTML = parseInt(total)-1
        elem.setAttribute('data-like', 'false')
    } 
}
//abre/fecha o resumo
function toggleSumary(){
    let viewMore = document.querySelector('.sumary .sumary--content div')
    let elem = document.querySelector('.sumary .sumary--content p')
    let display = window.getComputedStyle(elem).getPropertyValue("display")
    if(display === 'block'){
            elem.style.display = '-webkit-box'
            viewMore.style.display = 'block'
    }else{
        elem.style.display = 'block'
        viewMore.style.display = 'none'
    }
}
//abre/fecha a caixa de resposta do tópico
function toogleResponse(item){
    let elem = item.target.parentNode.parentNode.parentNode.children
    let text = item.target.parentNode.children[2]
    let responses = elem[2]
    let display = window.getComputedStyle(responses).getPropertyValue("display")
    if(display === 'block'){
        responses.style.display = 'none'
        text.style.display = '-webkit-box'
    }else{
        responses.style.display = 'block'
        text.style.display = 'block'
    }
   
}
//abre o formulario
function openTopic(){
    let stdContent = document.querySelector('.discussions .standard--content')
    let formTopic = document.querySelector('.discussion--area .topic--form')
    stdContent.style.opacity = 0

    setTimeout(()=>{
        stdContent.style.display = 'none'
        formTopic.style.display = 'block'
    }, 100)
    setTimeout(()=>{
        formTopic.style.opacity = 1;
    }, 200)
}
//abre o formulario novemente para enviar outro tópico
function openTopic2(e, input = '',textarea = ''){
    let submitted = document.querySelector('.discussion--area .topic--submitted')
    let formTopic = document.querySelector('.discussion--area .topic--form')
    submitted.style.opacity = 0
    setTimeout(()=>{
        submitted.style.display = 'none'
        formTopic.style.display = 'block'
    }, 100)
    setTimeout(()=>{
        formTopic.style.opacity = 1;
    }, 200)

    document.querySelector('.discussion--area .topic--form form input').value = input
    document.querySelector('.discussion--area .topic--form form textarea').value = textarea

    if(e.target.innerHTML == 'Editar tópico'){
        eTopic = true
        setTimeout(()=>{
            document.querySelector('.discussion--area .topic--form form input').focus()
        }, 100)
    }
}
//pega os dados do formulario e valida para enviar o tópico
function topicSubmitted(event){
    event.preventDefault()
    let topic = document.querySelector('.discussion--area .topic--form form input').value
    let textarea = document.querySelector('.discussion--area .topic--form form textarea').value
    let user = document.querySelector('.user--info span').innerHTML

    if(eTopic == true){
        eInput.innerHTML = document.querySelector('.discussion--area .topic--form form input').value
        eTextarea.innerHTML = document.querySelector('.discussion--area .topic--form form textarea').value

        if(topic !== '' && textarea !== '' && user !== ''){
            let topicForm = document.querySelector('.discussion--area .topic--form')
            let submitted = document.querySelector('.discussion--area .topic--submitted')
            topicForm.style.opacity = 0

            setTimeout(()=>{
                topicForm.style.display = 'none'
                submitted.style.display = 'block'
            }, 100)
            setTimeout(()=>{
                submitted.style.opacity = 1
                updateData()
            }, 200)
            eTopic = false
        }
    }else{
        let modelCard = document.querySelector('.model.example').cloneNode(true)
        let topicInfo = modelCard.children[1].firstElementChild.children

        topicInfo[0].innerHTML = topic
        topicInfo[1].innerHTML = user
        topicInfo[2].innerHTML = textarea

        if(topic !== '' && textarea !== '' && user !== ''){
            modelCard.style.display = 'block'
            modelCard.classList.remove('example')
            let topicForm = document.querySelector('.discussion--area .topic--form')
            let submitted = document.querySelector('.discussion--area .topic--submitted')
            let questionArea = document.querySelector('.questions--area')
            topicForm.style.opacity = 0
            
            setTimeout(()=>{
                topicForm.style.display = 'none'
                submitted.style.display = 'block'
            }, 100)
            setTimeout(()=>{
                submitted.style.opacity = 1
                questionArea.prepend(modelCard)
                updateData()
            }, 200)
            //event.target.submit()  evento para enviar o formulario comentado para não atualizar a tela
        }
    }
}
//atualiza os foreach quando insere um novo tópico
function updateData(){
    document.querySelectorAll('.questions--area .card--title, .questions--area .card--author, .questions--area .card .card--text').forEach((item)=>{
        item.addEventListener('click', toogleResponse)
    })
    document.querySelectorAll('.discussion--area .question--button .like img').forEach((item)=>{
        item.addEventListener('click', like)
    })
    document.querySelectorAll('.discussion--area .question--button .more--options span').forEach((item)=>{
        item.addEventListener('click', openOptions)
    })
    document.querySelectorAll('.discussion--area .question--button .menu--ellipsis>div').forEach((item)=>{
        item.addEventListener('click', removeTopic)
    })
    document.querySelectorAll('.discussion--area .model.blur .opacity--submitted').forEach((item)=>{
        item.addEventListener('click', removeOpacity)
    })
    document.querySelectorAll('.discussion--area .model.blur .opacity--submitted div').forEach((item)=>{
        item.addEventListener('click', editTopic)
    })
}






