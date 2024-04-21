const overlay = document.getElementById('overlay');
const menuButton = document.getElementById('menu-button');
const navbarList = document.getElementById('navbar-list');

menuButton.addEventListener('click', () => {
  activateMenu();
});

overlay.addEventListener('click', () => {
  disableMenu();
});

window.addEventListener('resize', () => {
  const width = window.innerWidth;

  if (width > 978) {
    disableMenu();
  }
});

function activateMenu() {
  overlay.style.display = 'block';
  navbarList.classList.add('navbar-active');
}

function disableMenu() {
  overlay.style.display = 'none';
  navbarList.classList.remove('navbar-active');
}
