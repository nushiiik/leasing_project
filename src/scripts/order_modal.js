(function() {
    const URL = 'http://localhost:3000';
    let order = document.querySelector('.order');
    let orderContainer = document.querySelector('.order__container');
    let form = document.querySelector('.form-order');
    let calc = document.querySelector('.form');
    let buttons = document.querySelectorAll('.button:not(.form-order__button)');
    let overlay = document.querySelector('.overlay');

    function openModal(e) {
        e.preventDefault();
        order.classList.add('order--opened');
        overlay.style.display = 'block';
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', openModal)
    }

    function closeModal() {
        order.classList.remove('order--opened');
        overlay.style.display = 'none';
    }

    let formBtnReset = document.querySelector('.order__button');
    formBtnReset.addEventListener('click', closeModal);

    function postData(data) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', URL);
        xhr.send(JSON.stringify(data));

        xhr.addEventListener('load', function () {
            if (xhr.response.status) {
                closeModal();
                console.log('Отправлено');
            } else {
                console.log('Что-то пошло не так');
            }
        })
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        postData(new FormData(form));
        postData(new FormData(calc));
        closeModal();
    });
})()
