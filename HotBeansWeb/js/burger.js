document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger_menu');
    const headerNavigation = document.querySelector('.header_navigation');

    if (burgerMenu && headerNavigation) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            headerNavigation.classList.toggle('active');
        });
    }
});
