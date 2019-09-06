const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.navbar');
const links = document.querySelector('.navbar li');

hamburger.addEventListener('click', () => {
  navBar.classList.toggle('open');
});