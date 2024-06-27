import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;
let timerInterval;
const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
const timerFields = document.querySelectorAll('.timer .value');

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(days, hours, minutes, seconds) {
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = 60000;
  const hour = 3600000;
  const day = 86400000;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function startCountdown() {
  const now = new Date().getTime();
  const timeLeft = userSelectedDate.getTime() - now;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    updateTimer(0, 0, 0, 0);
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    startButton.disabled = true;
    dateTimePicker.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  updateTimer(days, hours, minutes, seconds);

  if (timeLeft <= 1000) {
    clearInterval(timerInterval);
    iziToast.success({
      title: 'Success',
      message: 'Timer finished',
    });
    dateTimePicker.disabled = false;
    startButton.disabled = false;
  }
}

function handleDateSelection(selectedDates) {
  userSelectedDate = selectedDates[0];

  const now = new Date().getTime();
  if (userSelectedDate.getTime() < now) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDateSelection,
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  dateTimePicker.disabled = true;
/*   startCountdown(); */
  timerInterval = setInterval(startCountdown, 1000);
});


/*
Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документа поле input#datetime-picker.

<input type="text" id="datetime-picker" />



Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен для виконання завдання. Розберися, за що відповідає кожна властивість у документації «Options» і використовуй його у своєму коді.

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};



Вибір дати



Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме в ньому варто обробляти дату, обрану користувачем. Параметр selectedDates — це масив обраних дат, тому ми беремо перший елемент selectedDates[0].



Тобі ця обрана дата буде потрібна в коді і поза межами цього методу onClose(). Тому оголоси поза межами методу let змінну, наприклад, userSelectedDate, і після валідації її в методі onClose() на минуле/майбутнє запиши обрану дату в цю let змінну.

Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future" і зроби кнопку «Start» не активною.
Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому. Зверни увагу, що при обранні валідної дати, не запуску таймера і обранні потім невалідної дати, кнопка після розблокування має знову стати неактивною.
Натисканням на кнопку «Start» починається зворотний відлік часу до обраної дати з моменту натискання.


Відлік часу



Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.

Кількість днів може складатися з більше, ніж двох цифр.
Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто залишок часу дорівнює нулю 00:00:00:00.


Після запуску таймера натисканням кнопки Старт кнопка Старт і інпут стають неактивним, щоб користувач не міг обрати нову дату, поки йде відлік часу. Після зупинки таймера інпут стає активним, щоб користувач міг обрати наступну дату. Кнопка залишається не активною.


Для підрахунку значень використовуй готову функцію convertMs, де ms — різниця між кінцевою і поточною датою в мілісекундах.



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}



Форматування часу



Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат.
Тобто якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04.
В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів.
Напиши функцію, наприклад addLeadingZero(value), яка використовує метод рядка padStart() і перед відмальовуванням інтерфейсу форматує значення.



Бібліотека повідомлень



Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку iziToast.
Для того щоб підключити CSS код бібліотеки в проєкт, необхідно додати ще один імпорт, крім того, що описаний у документації.



// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



На що буде звертати увагу ментор при перевірці:

Підключені бібліотеки flatpickr та iziToast.
При першому завантаженні сторінки кнопка Start не активна.
При кліку на інпут відкривається календар, де можна вибрати дату.
При обранні дати з минулого, кнопка Start стає неактивною і з’являється повідомлення з текстом "Please choose a date in the future".
При обранні дати з майбутнього кнопка Start стає активною.
При натисканні на кнопку Start вона стає неактивною, на сторінку виводиться час, що лишився до обраної дати у форматі xx:xx:xx:xx, і запускається зворотний відлік часу до обраної дати.
Кожну секунду оновлюється інтерфейс і показує оновлені дані часу, який залишився.
Таймер зупиняється, коли доходить до кінцевої дати, тобто залишок часу дорівнює нулю і інтерфейс виглядає так 00:00:00:00.
Час в інтерфейсі відформатований і, якщо воно містить менше двох символів, на початку числа доданий 0. -->
 */