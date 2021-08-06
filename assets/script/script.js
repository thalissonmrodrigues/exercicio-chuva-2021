//Events
document.querySelector('.video .opacity--video').addEventListener('click', (item)=>{
    item.target.style.display = 'none'
})
document.querySelector('.sumary .sumary--content').addEventListener('click', toggleSumary)
document.querySelector('.discussions .standard--content button').addEventListener('click', openTopic)
document.querySelector('.discussion--area .topic--submitted button').addEventListener('click', openTopic2)
document.querySelector('.discussion--area .topic--form form').addEventListener('submit', topicSubmitted)
document.querySelectorAll('.questions--area .card--title, .questions--area .card--author, .questions--area .card .card--text').forEach((item)=>{
    item.addEventListener('click', toogleResponse)
})
document.querySelectorAll('.discussion--area .question--button .like img').forEach((item)=>{
    item.addEventListener('click', like)
})
document.querySelectorAll('.discussion--area .question--button .more--options').forEach((item)=>{
    item.addEventListener('click', openOptions)
})
document.querySelectorAll('.discussion--area .question--button .menu--ellipsis>div').forEach((item)=>{
    item.addEventListener('click', removeTopic)
})


//Functions
function removeTopic(item){
    let elem = item.target.parentNode.parentNode.parentNode.parentNode
    elem.parentNode.removeChild(elem)
}
function openOptions(item){
    let elem = item.target.parentNode.children[0]
    let display = window.getComputedStyle(elem).getPropertyValue("display")

    if(display == 'none'){
        elem.style.display = 'block'

    }else{
        elem.style.display = 'none'
    }
}
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
function toggleSumary(item){
    let viewMore = document.querySelector('.sumary .sumary--content a')
    let elem = item.target
    let display = window.getComputedStyle(elem).getPropertyValue("display")
    if(display === 'block'){
            elem.style.display = '-webkit-box'
            viewMore.style.display = 'block'
    }else{
        elem.style.display = 'block'
        viewMore.style.display = 'none'
    }
}
function toogleResponse(item){
    let elem = item.target.parentNode.parentNode.parentNode.children
    let responses = elem[1]
    let display = window.getComputedStyle(responses).getPropertyValue("display")
    if(display === 'block'){
        responses.style.display = 'none'
    }else{
        responses.style.display = 'block'
    }
}
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
function openTopic2(){
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

    document.querySelector('.discussion--area .topic--form form input').value = ''
    document.querySelector('.discussion--area .topic--form form textarea').value = ''
}
function topicSubmitted(event){
    event.preventDefault()
    let topic = document.querySelector('.discussion--area .topic--form form input').value
    let textarea = document.querySelector('.discussion--area .topic--form form textarea').value
    let user = document.querySelector('.user--info span').innerHTML
    let modelCard = document.querySelector('.model.example').cloneNode(true)
    let span = '<span>...</span>'
    let topicInfo = modelCard.firstElementChild.firstElementChild.children

    topicInfo[0].innerHTML = topic
    topicInfo[1].innerHTML = user
    topicInfo[2].innerHTML = textarea+span

    if(topic !== '' && textarea !== '' && user !== ''){
        modelCard.style.display = 'block'
        modelCard.classList.remove('example')
        let topicForm = document.querySelector('.discussion--area .topic--form')
        let submitted = document.querySelector('.discussion--area .topic--submitted')
        let modelSubmitted = document.querySelector('.discussion--area .model.model--submitted')
        let questionArea = document.querySelector('.questions--area')
        topicForm.style.opacity = 0
        
        setTimeout(()=>{
            topicForm.style.display = 'none'
            submitted.style.display = 'block'
            modelSubmitted.style.display = 'block'
        }, 100)
        setTimeout(()=>{
            submitted.style.opacity = 1
            modelSubmitted.style.opacity = 1
        }, 200)
        //event.target.submit()  evento para enviar o formulario comentado para não atualizar a tela
        setTimeout(()=>{
            modelSubmitted.style.display = 'none'
            questionArea.insertBefore(modelCard,  questionArea.childNodes[4]);
            updateData()
        }, 3000)
    }

}
function updateData(){
    document.querySelectorAll('.questions--area .card--title, .questions--area .card--author, .questions--area .card .card--text').forEach((item)=>{
        item.addEventListener('click', toogleResponse)
    })
    document.querySelectorAll('.discussion--area .question--button .like img').forEach((item)=>{
        item.addEventListener('click', like)
    })
    document.querySelectorAll('.discussion--area .question--button .more--options').forEach((item)=>{
        item.addEventListener('click', openOptions)
    })
    document.querySelectorAll('.discussion--area .question--button .menu--ellipsis>div').forEach((item)=>{
        item.addEventListener('click', removeTopic)
    })
}