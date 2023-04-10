'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.close-modal-window');
const btnsShowModalWindow = document.querySelectorAll('.show-modal-window');

const showModalWindow = function () {
  modalWindow.classList.remove('hidden');
  // класЛіст вибирає всі класи, ремув - видаляє клас, і далі ми вказали, який клас видалити.
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  // адд добавляє клас.
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsShowModalWindow.length; i++) {
  btnsShowModalWindow[i].addEventListener('click', showModalWindow);
}

// Цей цикл вибирає всі кнопки з однаковим класом. Я попробував (нижче написано) вибрати всі кнопки без циклу, і в мене не вийшло, треба завжди вказувати індекс. Але проблема в тому, що я не можу вказати відразу всі індекси, лише один
// btnsShowModalWindow[1].addEventListener('click', function () {
//   console.log('click');
// });

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});
//буква Е в ф-ї це значить евент, якась дія, там може бути будь-яка літера. Що це значить - якщо натиснути ЕСК то відбувається дія, яка написана в ф-ї. Як читати - якщо параметр ф-ї дорівнює кнопці ЕСК і якщо в тегові не має класу ХІДДЕН то тоді закривається вікно.
//Це приклад як можна вибирати кнопки, а також як можна керувати тегами за допомогою класів.
// Навчився, як вибирати класи ('.назва класу')
// як видаляти і добавляти класи до тегу .remove .add
// як перевіряти чи є клас на тегові .contains('назва класу')
