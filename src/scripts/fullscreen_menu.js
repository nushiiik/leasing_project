(function() {
    let menu = document.querySelector('.fullscreen');
    let buttonOpen = document.querySelector('.hamburger');
    let button = document.querySelector('.fullscreen__button');
    let buttonClose = document.querySelector('.fullscreen__button--close');
    let order = document.querySelector('.order');
    let overlay = document.querySelector('.overlay');

    buttonOpen.addEventListener('click',function (e) {
        e.preventDefault();
        menu.classList.add('fullscreen--opened');
        overlay.style.display = 'block';
    });

    buttonClose.addEventListener('click',function (e) {
        e.preventDefault();
        menu.classList.remove('fullscreen--opened');
        overlay.style.display = 'none';
    });

    button.addEventListener('click', function (e) {
        e.preventDefault();
        menu.classList.remove('fullscreen--opened');
        order.classList.add('order--opened');
    });
})()
