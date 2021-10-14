
(function () {
const API_KEY = 'jgPdiLGtunTh9vYLB0iKiSYZk1ayrasiuf8rKc7Pop4';
// =======================================================================

// DOM Elements
const main = document.querySelector('main');
const grid = document.querySelector('.grid');
const list = document.querySelector('.list');
const loading = document.querySelector('.loading');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');


let page = 1;

function getData() {
    fetch(`https://api.unsplash.com/photos/?page=${page};per_page=9;client_id=${API_KEY}`)
    .then(res => res.json())
    .then(dta => {
        const data = dta;
        console.log(data)
        renderCards(data)
    })    
}

function renderCards(data) {
    data.forEach(el => {
    // CREATING ELEMETNS
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(`${el.id}`);
        const mainCont = document.createElement('div');
        mainCont.classList.add('main-content');
        const userWr = document.createElement('div');
        userWr.classList.add('user-wr');
            const avatar = document.createElement('img');
            avatar.src = el.user.profile_image.medium;
            const userName = document.createElement('h3');
            userName.textContent  = `${el.user.first_name}`;
            const imgWr = document.createElement('div');
            imgWr.classList.add('img-wr');
            const mainImg = document.createElement('img');
            mainImg.src = el.urls.small
        const infoWr = document.createElement('div');
        infoWr.classList.add('info-wr');
            const numbers = document.createElement('p');
            numbers.classList.add('numbers')
            numbers.innerHTML = `<span class="likes">${el.likes} </span>Likes <span class="downloads">28 </span> Downloads`
            const link = document.createElement('p');
            link.classList.add('link');
            link.innerHTML = `Check it on <span class="url">unsplash.com</span>`;
    // APPENDING TO THE DOM
        main.append(card);
        card.append(mainCont);
        mainCont.append(userWr);
        userWr.append(avatar);
        userWr.append(userName);
        mainCont.append(imgWr);
        imgWr.append(mainImg);
        card.append(infoWr);
        infoWr.append(numbers);
        infoWr.append(link);
    // EVENTS
        mainImg.addEventListener('click', ()=> {
            const content = data.find(el => el.id === card.classList[1]);
            openModal(content)
            console.log(content)
        })

        link.addEventListener('click', ()=> {
            window.open(`${el.links.html}`, '_blank');
        })
    })

    loading.classList.remove('show')
    page++

}

function openModal(imgData) {
    lightbox.classList.add('active')
    lightboxImg.src = imgData.urls.regular;
}

function showLoading(){
    loading.classList.add('show');
    setTimeout(getData,1000)
}

function scrollTriger() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	if(clientHeight + scrollTop >= scrollHeight - 2) {
		showLoading();
	}
}

// ======================================================================
setTimeout(showLoading,1000)

window.addEventListener('scroll', scrollTriger)


grid.addEventListener('click', () => {
    main.classList.remove('line');
    list.classList.remove('act');
    grid.classList.add('act');
})

list.addEventListener('click', () => {
    main.classList.add('line');
    grid.classList.remove('act');
    list.classList.add('act');
})

lightbox.addEventListener('click', (e)=> {
    if(e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
})

window.addEventListener('keyup', (e) => {
    if(e.keyCode === 27) lightbox.classList.remove('active')
})

}());

