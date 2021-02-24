const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ul = document.querySelector('#dog-breeds')
const container = document.querySelector('#dog-image-container')
const select = document.querySelector('#breed-dropdown')

const setImgs = data => {
    for (let msg of data) {
        const image = document.createElement('img')
        image.src = msg
        image.style.width = "200px"
        container.appendChild(image)
    }
}

const setLis = (data, val=null) => {
    for (let msg in data) {
        if (!val || msg[0] === val) {
            const li = document.createElement('li')
            li.innerText = msg
            ul.appendChild(li)
        }
    }
}

const deleteLis = () => {
    while (ul.firstChild) {
        ul.firstChild.remove()
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // dog images
    axios.get(imgUrl).then(resp => setImgs(resp.data.message))

    // dog breeds
    axios.get(breedUrl).then(resp => setLis(resp.data.message))

    ul.addEventListener('mouseover', (e) => {
        e.target.style.cursor = 'pointer'
    })

    ul.addEventListener('click', (e) => {
        if (e.target.style.color !== "crimson") {
            e.target.style.color = "crimson"
        } else {
            e.target.style.color = 'black'
        }
    })

    select.addEventListener('change', (e) => {
        deleteLis()
        axios.get(breedUrl).then(resp => setLis(resp.data.message, e.target.value))
    })
})
