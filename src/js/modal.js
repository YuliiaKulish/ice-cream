// Отримуємо елементи для модальних вікон
const openModalButtons = document.querySelectorAll('.open-modal-btn');
const closeModalButtons = document.querySelectorAll('.close-btn');
const overlay = document.getElementById('overlay');

// Додаємо обробник подій для відкриття модального вікна
openModalButtons.forEach(button => {
  button.addEventListener('click', function () {
    const modalId = button.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    overlay.style.display = 'block'; // Відображаємо overlay
  });
});

// Додаємо обробник подій для закриття модального вікна
closeModalButtons.forEach(button => {
  button.addEventListener('click', function () {
    const modal = button.closest('.modal');
    modal.classList.remove('show');
    overlay.style.display = 'none'; // Ховаємо overlay
  });
});

// Закриття модального вікна при кліку поза вікном
overlay.addEventListener('click', function () {
  document
    .querySelectorAll('.modal')
    .forEach(modal => modal.classList.remove('show'));
  burgerMenu.classList.remove('active');
  overlay.style.display = 'none'; // Ховаємо overlay
});

// Функціонал бургер-меню
const burgerIcon = document.getElementById('burgerIcon');
const burgerMenu = document.getElementById('burgerMenu');
const closeBurger = document.getElementById('closeBurger');
const burgerLogo = document.getElementById('burgerLogo');

// Відкриття бургер-меню
burgerIcon.addEventListener('click', function () {
  burgerMenu.classList.add('active');
  overlay.classList.add('active');
});

// Закриття бургер-меню
closeBurger.addEventListener('click', function () {
  burgerMenu.classList.remove('active');
  overlay.classList.remove('active');
});

// Закриваємо бургер-меню при кліку поза ним
overlay.addEventListener('click', function () {
  burgerMenu.classList.remove('active');
  overlay.classList.remove('active');
});

// Закриваємо бургер-меню при натисканні на якірне посилання
document.querySelectorAll('.burger-menu__link').forEach(anchor => {
  anchor.addEventListener('click', function () {
    burgerMenu.classList.remove('active');
    overlay.classList.remove('active');
  });
});

burgerLogo.addEventListener('click', function () {
  burgerMenu.classList.remove('active');
  overlay.classList.remove('active');
});