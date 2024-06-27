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
      iziToast.success({ title: 'Success', message: `✅ Fulfilled promise in ${delay} ms`, });
    })
    .catch(delay => {
      iziToast.error({ title: 'Error', message: `❌ Rejected promise in ${delay} ms`, });
    });
});

/*
На що буде звертати увагу ментор при перевірці:

Підключена бібліотека iziToast.
При обранні стану в радіокнопках і натисканні на кнопку Create notification з’являється повідомлення,
відповідного до обраного стану стилю, із затримкою в кількість мілісекунд, переданих в інпут.
Повідомлення, що виводиться, містить тип обраного стейту і кількість мілісекунд згідно з шаблоном в умові. -->
 */