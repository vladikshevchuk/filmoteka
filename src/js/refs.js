const refs = {
    main: document.querySelector('.list'),
    alert: document.querySelector('.content'),
    form: document.querySelector('form'),
    genres: document.querySelectorAll('.genre'),
    menu: document.querySelector('.js-menu'),
    library: document.querySelector('.js-library'),
    navBtns: document.querySelector('.nav-buttons'),
    langRu: document.querySelector('.lang-ru'),
    langEn: document.querySelector('.lang-en'),
    footer: document.querySelector('footer'),

    btnWatched: document.querySelector('button[data-action="watched"]'),
    btnQueue: document.querySelector('button[data-action="queue"]'),

    modal: document.querySelector('.modal-window'),
    
    paginationRef: document.getElementById('tui-pagination-container'),
}

export default refs;