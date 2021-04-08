'use strict';
import * as data from './data.js';

const d = document;

d.addEventListener('DOMContentLoaded', (e) => {
  //show('myForm');
  eventListeners();
});

const eventListeners = () => {};

const show = (id) => {
  const $form = d.getElementById(id),
    $btnStart = $form.start,
    $btnEnd = $form.end,
    $display = d.getElementById('display'),
    $messages = d.getElementById('messages'),
    $div = d.createElement('div');
  let showMessage,
    showContent,
    inputs = 0;
  d.addEventListener('change', (e) => {
    if (e.target) inputs += 1;
    if (inputs === 5) $btnStart.disabled = false;
    if (inputs > 5) {
      $messages.innerText = 'Seleccione solo una opción por parámetro.';
      inputs = 0;
      $btnStart.disabled = true;
      $btnEnd.disabled = true;
      $form.reset();
    }
  });

  d.addEventListener('submit', (e) => {
    if (e.target === $form) {
      e.preventDefault();
      $btnEnd.disabled = false;
      $btnStart.disabled = true;
      const $content = $form.content.value,
        $size = $form.size.value,
        $weight = $form.weight.value,
        $move = $form.move.value,
        $speed = $form.speed.value;
      $div.style.fontSize = `${$size}rem`;
      $div.style.fontWeight = `${$weight}`;
      $div.classList.add(`${$move}`);
      if ($move !== 'motionless') {
        $div.style['animationDuration'] = `${$speed}s`;
      }
      let starting = $speed - 1;
      showMessage = setInterval(() => {
        $messages.innerText = `Iniciará en: ${starting--}`;
      }, 1000);
      showContent = setInterval(() => {
        clearInterval(showMessage);
        $messages.innerText = '';
        $div.innerText = getElements($content);
        $display.appendChild($div);
      }, $speed * 1000);
    }
  });

  d.addEventListener('click', (e) => {
    if (e.target === $form.end) {
      clearInterval(showContent);
      inputs = 0;
      $display.removeChild($div);
      $form.reset();
      $btnStart.disabled = true;
      $btnEnd.disabled = true;
    }
  });
};

const getElements = (content) => {
  let arr = undefined;
  if (content === 'alphabet') {
    arr = data.alphabet;
  }
  if (content === 'animals') {
    arr = data.animals;
  }
  if (content === 'countries') {
    arr = data.countries;
  }
  if (content === 'numbers') {
    arr = data.numbers;
  }
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};
