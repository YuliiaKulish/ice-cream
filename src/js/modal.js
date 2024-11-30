// Отримуємо елементи для модалок
const openModalButtons = document.querySelectorAll('.open-modal-btn');
const closeModalButtons = document.querySelectorAll('.close-btn');
const overlay = document.getElementById('overlay');

// Отримуємо елементи для бургер-меню
const burgerIcon = document.getElementById('burgerIcon');
const burgerMenu = document.getElementById('burgerMenu');
const closeBurger = document.getElementById('closeBurger');
const burgerLogo = document.getElementById('burgerLogo');

// Функція для відкриття модалки
function openModal(modalId, isBurgerModal = false) {
  const modal = document.getElementById(modalId);
  modal.classList.add('show');
  overlay.classList.add('show');
  document.body.classList.add('no-scroll');

  // Якщо модалка відкривається з бургер-меню, накладаємо оверлей поверх бургер-меню
  if (isBurgerModal) {
    overlay.classList.add('on-top');
  } else {
    overlay.classList.remove('on-top');
  }
}

// Функція для закриття модалки
function closeModal(modal, isBurgerModal = false) {
  modal.classList.remove('show');
  overlay.classList.remove('show');
  document.body.classList.remove('no-scroll');

  // Якщо оверлей був накладений поверх бургер-меню, забираємо клас 'on-top'
  if (isBurgerModal) {
    overlay.classList.remove('on-top');
  }
}

// Функція для закриття бургер-меню
function closeBurgerMenu() {
  burgerMenu.classList.remove('active');
  overlay.classList.remove('show');
  document.body.classList.remove('no-scroll');
  overlay.classList.remove('on-top'); // Повертаємо оверлей під бургер-меню
}

// Додаємо обробник для відкриття модалки
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal-id');
    // Перевіряємо, чи відкривається модалка з бургер-меню
    const isBurgerModal = button.closest('.burger-menu') !== null;
    openModal(modalId, isBurgerModal);
  });
});

// Додаємо обробник для закриття модалки
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    // Перевіряємо, чи потрібно повернути оверлей під бургер-меню
    const isBurgerModal = modal.closest('.burger-menu') !== null;
    closeModal(modal, isBurgerModal);
  });
});

// Закриття модалки при кліку на overlay
overlay.addEventListener('click', () => {
  const openModals = document.querySelectorAll('.modal.show');

  if (openModals.length > 0) {
    // Якщо є відкриті модалки, закриваємо їх
    openModals.forEach(modal => {
      // Перевірка, чи це модалка товару
      if (modal.id === 'product-modal') {
        const nutritionList = document.getElementById('nutrition-list');
        const productPict = document.getElementById('product-pict');

        // Видаляємо класи nutrition-style при натисканні на оверлей
        productPict.classList.remove(
          'product-pict-style-1',
          'product-pict-style-2',
          'product-pict-style-3'
        );
      }

      // Закриваємо модалку
      closeModal(modal);
    });
  } else {
    // Якщо немає відкритих модалок, закриваємо бургер-меню
    if (burgerMenu.classList.contains('active')) {
      closeBurgerMenu();
    }
  }
});

// Обробник для бургер-меню
burgerIcon.addEventListener('click', () => {
  burgerMenu.classList.add('active');
  overlay.classList.add('show');
  document.body.classList.add('no-scroll');
});

// Закриття бургер-меню
closeBurger.addEventListener('click', closeBurgerMenu);

// Закриття бургер-меню при натисканні на якірне посилання або логотип
document.querySelectorAll('.burger-menu__link').forEach(anchor => {
  anchor.addEventListener('click', closeBurgerMenu);
});

burgerLogo.addEventListener('click', closeBurgerMenu);

// Отримання картинок
import iceUrl from '../images/ice-cream@2x.png';
import coffeeUrl from '../images/ice-coffee@2x.png';
import milkshakeUrl from '../images/milkshake@2x.png';

// Оновлене динамічне наповнення модалки товару
const products = [
  {
    id: 1,
    name: 'Chocolate icecream',
    src: iceUrl,
    alt: 'Ice cream',
    nutrition: [
      { name: 'kcal', amount: '320' },
      { name: 'Prote...', amount: '4g' },
      { name: 'Fats', amount: '8,2g' },
      { name: 'Carbs', amount: '40,4g' },
    ],
    ingredients: [
      { name: 'Milk', amount: '100ml' },
      { name: 'Belgian chocolate', amount: '20g' },
      { name: 'Cream', amount: '150ml' },
      { name: 'Cocoa powder', amount: '30g' },
      { name: 'Sugar', amount: '40g' },
      { name: 'Vanilla sugar', amount: '10g' },
    ],
  },
  {
    id: 2,
    name: 'Caramel Latte',
    src: coffeeUrl,
    alt: 'Ice coffee',
    nutrition: [
      { name: 'kcal', amount: '280' },
      { name: 'Prote...', amount: '12g' },
      { name: 'Fats', amount: '6,5g' },
      { name: 'Carbs', amount: '25,2g' },
    ],
    ingredients: [
      { name: 'Espresso', amount: '60ml' },
      { name: 'Ice', amount: '1/4 cup' },
      { name: 'Cream', amount: '120ml' },
      { name: 'Caramel syrup', amount: '2 tbsp.' },
      { name: 'Vanilla sugar', amount: '1/2 tbsp.' },
    ],
  },
  {
    id: 3,
    name: 'Banana-chocolate milkshake',
    src: milkshakeUrl,
    alt: 'Milkshake',
    nutrition: [
      { name: 'kcal', amount: '210' },
      { name: 'Prote...', amount: '8g' },
      { name: 'Fats', amount: '5,5g' },
      { name: 'Carbs', amount: '20,2g' },
    ],
    ingredients: [
      { name: 'Milk', amount: '400ml' },
      { name: 'Banana', amount: '1 piece' },
      { name: 'Chocolate ice cream', amount: '80g' },
      { name: 'Black chocolate', amount: '100g' },
    ],
  },
];

function openProductModal(event) {
  const button = event.target.closest('.open-product-btn');
  if (!button) return;

  const productId = button.getAttribute('data-product-id');
  if (!productId) return;

  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    console.error(`Product with id ${productId} not found`);
    return;
  }

  // Оновлення вмісту модалки
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-image').src = product.src;
  document.getElementById('product-image').alt = product.alt;

  // Наповнення списку nutrition
  const nutritionList = document.getElementById('nutrition-list');
  nutritionList.innerHTML = product.nutrition
    .map(
      n => `
        <li class="nutrition__item">
          <p class="nutrition__amount">${n.amount}</p>
          <p class="nutrition__name">${n.name}</p>
        </li>
      `
    )
    .join('');

  // Наповнення списку ingredients
  const ingredientsList = document.getElementById('ingredients-list');
  ingredientsList.innerHTML = product.ingredients
    .map(
      i => `
        <li class="ingredients__item">
          <p class="ingredients__name">${i.name}</p>
          <p class="ingredients__amount">${i.amount}</p>
        </li>
      `
    )
    .join('');

  // Додавання різних стилів для nutrition залежно від id товару
  nutritionList.classList.remove(
    'nutrition-style-1',
    'nutrition-style-2',
    'nutrition-style-3'
  );

  if (product.id === 1) {
    nutritionList.classList.add('nutrition-style-1');
  } else if (product.id === 2) {
    nutritionList.classList.add('nutrition-style-2');
  } else if (product.id === 3) {
    nutritionList.classList.add('nutrition-style-3');
  }

  // Додавання різних стилів для modal-pictures залежно від id товару
  const productPict = document.getElementById('product-pict');
  productPict.classList.remove(
    'nutrition-style-1',
    'nutrition-style-2',
    'nutrition-style-3'
  );

  if (product.id === 1) {
    productPict.classList.add('product-pict-style-1');
  } else if (product.id === 2) {
    productPict.classList.add('product-pict-style-2');
  } else if (product.id === 3) {
    productPict.classList.add('product-pict-style-3');
  }

  openModal('product-modal');
}

// Функція для закриття модалки товару
function closeProductModal() {
  // Знаходимо елементи, для яких потрібно видалити класи
  const nutritionList = document.getElementById('nutrition-list');

  // Видаляємо класи nutrition-style при закритті модалки
  nutritionList.classList.remove(
    'nutrition-style-1',
    'nutrition-style-2',
    'nutrition-style-3'
  );

  const productPict = document.getElementById('product-pict');
  productPict.classList.remove(
    'product-pict-style-1',
    'product-pict-style-2',
    'product-pict-style-3'
  );
  // Закриваємо модалку
  closeModal(document.getElementById('product-modal'));
}

// Додаємо слухачів подій для кнопок
document.querySelectorAll('.open-product-btn').forEach(button => {
  button.addEventListener('click', openProductModal);
});

// Додаємо слухач події для закриття модалки
document
  .getElementById('closeProductModal')
  .addEventListener('click', closeProductModal);

// Додано обробник для плавного прокручування до розділів з будь-якого місця
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    event.preventDefault(); // Зупиняємо стандартний перехід

    const targetId = this.getAttribute('href').substring(1); // Отримуємо id розділу
    const targetElement = document.getElementById(targetId); // Знаходимо елемент розділу

    // Перевірка, чи елемент існує на сторінці
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth', // Плавна прокрутка
        block: 'center', // Прокручувати елемент до центру
      });

      closeBurgerMenu(); // Закриваємо бургер-меню після прокрутки
    } else {
      console.error('Element not found for ID:', targetId);
    }
  });
});


// // Swiper 
// // Отримуємо доступ до swiper-container в Shadow DOM
// const swiperContainer = document.querySelector('.reviews__swiper');
// const shadowRoot = swiperContainer.shadowRoot;  // Отримуємо доступ до #shadow-root

// // Отримуємо всі елементи пагінації
// const pagination = shadowRoot.querySelector('.swiper-pagination');

// // Стилізуємо всі елементи пагінації
// const paginationBullets = pagination.querySelectorAll('.swiper-pagination-bullet');

// // Додаємо стилі для активного та пасивного стану пагінації
// paginationBullets.forEach(bullet => {
//   // Стилі для пасивного стану
//   bullet.style.borderRadius = '100%';
//   bullet.style.width = '12px';
//   bullet.style.height = '12px';
//   bullet.style.color = '#d9d9d9'; // Пасивний колір

//   // Слухач подій для зміни на активний стан
//   bullet.addEventListener('mouseenter', () => {
//     bullet.style.color = '#84a178'; // Активний колір
//   });

//   bullet.addEventListener('mouseleave', () => {
//     bullet.style.color = '#d9d9d9'; // Пасивний колір
//   });
// });

// // Для того, щоб забезпечити зміну стилю, коли пагінація активна (по кліку)
// const activePaginationBullet = shadowRoot.querySelector('.swiper-pagination-bullet-active');
// if (activePaginationBullet) {
//   activePaginationBullet.style.color = '#84a178'; // Активний колір
// }

// // Додаємо відступ для пагінації в залежності від розміру екрану
// function updatePaginationMargin() {
//   const screenWidth = window.innerWidth;

//   // Встановлюємо відступ для мобільних екранів (до 767px)
//   if (screenWidth <= 767) {
//     pagination.style.marginBottom = '14px'; // Відступ 14px для мобільних
//   }
//   // Встановлюємо відступ для більших екранів (понад 768px)
//   else if (screenWidth > 768) {
//     pagination.style.marginBottom = '32px'; // Відступ 32px для десктопних екранів
//   }
// }

// // Оновлюємо відступ при завантаженні сторінки
// updatePaginationMargin();

// // Оновлюємо відступ при зміні розміру вікна
// window.addEventListener('resize', updatePaginationMargin);
