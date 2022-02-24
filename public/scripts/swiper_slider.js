// инициализируем свайпер и назначим ему необходимый нам класс
// в файле gallery.css немного стилей для задуманного отображения. 
// В основном все сделано силами swiper

new Swiper('.image__slider', {
    // высота контейнера адаптируется под размер отображаемого на странице контента
    autoHeight: true,

    // главный слайд на странице оцентрован
    centeredSlides: true,

    // добавляем стрелки для навигации справа и слева
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    
    // скрол под галереей для навигации
    scrollbar: {
        el: '.swiper-scrollbar',
        // можно курсором захватить и двигать с любой скоростью
        draggable: true
    },

    // навигация с помощью клавиатуры.
    keyboard: {
        enabled: true,
        // только если галерея в пределах видимости
        onlyViewport: true,
    },

    // прокручивание идет по кругу
    loop: true,

    // количество слайдов на странице (при прямом последовательном расположении)
    slidesPerView: 3,

    // расположение полукругом с тенями
    effect: 'coverflow',

    coverflowEffect: {
        // угол отрицательный, чтобы впереди был активный слайд
        rotate: -20,
        // степень наложения картинок друг на друга
        stretch: 45,
        // затемнение при наложении
        slideShadow: true,
        // параметр меньший единицы => 
        // уменьшение картинки по мере удаления от центра
        scale: 0.85,
    },
});