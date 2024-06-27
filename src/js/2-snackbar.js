import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(document.querySelector('input[name="delay"]').value);
  const state = document.querySelector('input[name="state"]:checked').value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay} ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay} ms`,
      });
    });
});

/* <!-- Напиши скрипт, який після сабміту форми створює проміс.
В середині колбека цього промісу через вказану користувачем кількість мілісекунд проміс має виконуватися (при fulfilled) або відхилятися (при rejected),
залежно від обраної опції в радіокнопках. Значенням промісу, яке передається як аргумент у методи resolve/reject, має бути значення затримки в мілісекундах.

Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

Якщо проміс виконується вдало, виводь у консоль наступний рядок, де delay — це значення затримки виклику промісу в мілісекундах.



`✅ Fulfilled promise in ${delay}ms`



Якщо проміс буде відхилено, то виводь у консоль наступний рядок, де delay — це значення затримки промісу в мілісекундах.

`❌ Rejected promise in ${delay}ms`



Бібліотека повідомлень



Для відображення повідомлень, замість console.log(), використовуй бібліотеку iziToast. Для того щоб підключити CSS код бібліотеки в проєкт,
необхідно додати ще один імпорт, крім того, що описаний у документації.

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



На що буде звертати увагу ментор при перевірці:

Підключена бібліотека iziToast.
При обранні стану в радіокнопках і натисканні на кнопку Create notification з’являється повідомлення,
відповідного до обраного стану стилю, із затримкою в кількість мілісекунд, переданих в інпут.
Повідомлення, що виводиться, містить тип обраного стейту і кількість мілісекунд згідно з шаблоном в умові. -->
 */