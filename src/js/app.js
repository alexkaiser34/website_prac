const menu = document.querySelector('#hamburger-menu');
const menuLinks = document.querySelector('.navbar__menu');

// Display Hamburger Menu
const ham_menu = () => {
   menu.classList.toggle('is-active');
   menuLinks.classList.toggle('active');
}

menu.addEventListener('click', ham_menu);
