window.addEventListener('load', () => {
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => mapImages(json.message))
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => mapBreeds(json.message))
})

const mapImages = urls => {
    for (let url of urls) {
        let img = document.createElement('img');
        document.querySelector('#dog-image-container').appendChild(img);
        img.src = url;
        img.style.width = '200px';
    }
}

const mapBreeds = (breeds, val=null) => {
    for (let breed in breeds) {
        if (val && val !== 'all') {
            if (breed[0].toLowerCase() === val) {
                addLi(document.querySelector('#dog-breeds'), breed)
            }
        } else {
            addLi(document.querySelector('#dog-breeds'), breed)
        }
    }
}

const addLi = (ul, text) => {
    let li = document.createElement('li');
    ul.appendChild(li)
    li.innerText = text;
}

const resetUL = ul => {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ul = document.querySelector('ul')
const select = document.querySelector('#breed-dropdown')

ul.addEventListener('click', (e) => {
    e.target.style.color = 'red'
})

select.addEventListener('change', () => {
    resetUL(ul)
    let val = select.value
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => mapBreeds(json.message, val))
})
