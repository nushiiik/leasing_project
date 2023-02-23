(function() {
    // Стоимость автомобиля
    const priceInput = document.querySelector('#price');
    const priceRange = document.querySelector('#filter-price');

    // Первоначальный взнос
    const percentInput = document.querySelector('#percent');
    const percentRange = document.querySelector('#filter-percent');
    const percentOutput = document.querySelector('#percent-output')

    // Срок лизинга
    const leasingInput = document.querySelector('#leasing');
    const leasingRange = document.querySelector('#filter-leasing');

    // Сумма договора лизинга
    const leasingPriceElement = document.querySelector('#leasing-price');
    // Ежемесячный платеж
    const monthlyPaymentElement = document.querySelector('#monthly-payment');

    const STEP_OF_PRICE = 50000;
    const INITIAL_PRICE = 1000000;

    const STEP_OF_PERCENT = 0.5;
    const INITIAL_PERCENT = 10;

    const STEP_OF_LEASING = 1;
    const INITIAL_LEASING = 1;

    // Цена авто
    let price = Number(priceRange.value);
    // Первоначальный взнос
    let initialPayment = Number(percentInput.value);
    // Первоначальный взнос в %
    let percentPrice = Number(percentRange.value);
    // Срок лизинга
    let leasing = Number(leasingRange.value);
    // Сумма договора лизинга
    let leasingPrice = Number(leasingPriceElement.innerHTML);
    // Ежемесячный платеж
    let monthlyPayment = Number(monthlyPaymentElement.innerHTML);

    // Для поля “Первоначальный взнос”:
    // Первоначальный взнос (в процентах) * Стоимость автомобиля
    function initialPaymentCalculation() {
        initialPayment = Math.round((percentPrice / 100) * price);
        percentInput.value = initialPayment;
    }
    // Для поля “Сумма договора лизинга”:
    // Первоначальный взнос + Срок кредита*Ежемесячный платеж
    function leaseAmountCalculation() {
        leasingPrice = Math.round(initialPayment + leasing * monthlyPayment);
        leasingPriceElement.innerHTML = leasingPrice;
    }

    // Для поля “Ежемесячный платеж от”:
    // Стоимость автомобиля - Первоначальный взнос * (Процентная ставка/(1 + Процентная ставка) - Срок кредита - 1)
    function monthlyPaymentCalculation() {
        monthlyPayment = Math.round(price - initialPayment * (percentPrice /((1 + percentPrice) - leasing - 1)));
        monthlyPaymentElement.innerHTML = monthlyPayment;
    }

    function moveSlider(target, initial, step) {
        const backgroundPercent = Math.round((target.value - initial) / step);
        target.style.background = `linear-gradient(90deg, rgba(255, 149, 20, 1) ${backgroundPercent}%, rgba(225, 225, 225, 1) ${backgroundPercent}%)`;
        initialPaymentCalculation();
        leaseAmountCalculation();
        monthlyPaymentCalculation();
    }

    function movePriceSlider(e) {
        const target = e.target;
        priceInput.value = target.value;
        price = target.value;
        moveSlider(target, INITIAL_PRICE, STEP_OF_PRICE);
    }

    function moveLeasingSlider(e) {
        const target = e.target;
        leasingInput.value = target.value;
        leasing = target.value;
        moveSlider(target, INITIAL_LEASING, STEP_OF_LEASING);
    }

    function movePercentSlider(e) {
        const target = e.target;
        percentOutput.innerHTML = target.value;
        percentPrice = target.value;
        moveSlider(target, INITIAL_PERCENT, STEP_OF_PERCENT);
    }

    initialPaymentCalculation();
    leaseAmountCalculation();
    monthlyPaymentCalculation();

    priceRange.addEventListener('change', movePriceSlider);
    percentRange.addEventListener('change', movePercentSlider);
    leasingRange.addEventListener('change', moveLeasingSlider);
})()
