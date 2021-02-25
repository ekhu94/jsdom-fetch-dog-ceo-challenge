

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ul = document.querySelector('#dog-breeds')
const select = document.querySelector('#breed-dropdown')

const setBreeds = (data, val=null) => {
    for (let el in data) {
        if (!val || val === el[0]) {
            let li = document.createElement('li')
            li.innerText = el
            ul.appendChild(li)
        }
    }
}

const deleteAll = data => {
    while (ul.firstChild) {
        ul.firstChild.remove()
    }
}

const setImgs = data => {
    const container = document.querySelector('#dog-image-container')
    for (let elem of data) {
        let img = document.createElement('img')
        img.src = elem
        img.style.width = '200px'
        img.style.margin = '10px'
        container.appendChild(img)
    }
}

function handleBreed (val=null) {
    fetch(breedUrl).then(function(resp){
        return resp.json()
    }) .then(json => {
        setBreeds(json.message, val)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    axios.get(imgUrl).then(resp => setImgs(resp.data.message))
    handleBreed()

    ul.addEventListener('mouseover', (e) => {
        e.target.style.cursor = 'pointer'
    })
    
    ul.addEventListener('click', (e) => {
        if (e.target.style.color !== 'magenta') {
            e.target.style.color = 'magenta'
        } else {
            e.target.style.color = 'black'
        }
    })
    select.addEventListener('change', (e) => {
        const val = e.target.value
        deleteAll()
        handleBreed(val)
    })

})