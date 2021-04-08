'use strict';
import * as data from './data.js';

const d = document,
  $form = d.getElementById('myForm'),
  $bgColor = $form.bgColor,
  $contentColor = $form.contentColor,
  $bgOpacity = $form.bgOpacity,
  $contentOpacity = $form.contentOpacity,
  $btnStart = $form.start,
  $btnReset = $form.reset,
  $btnEnd = $form.end,
  $display = d.getElementById('display'),
  $messages = d.getElementById('messages'),
  $div = d.createElement('div');

let flag = false,
  showMessage = undefined,
  showContent = undefined,
  inputs = 0;

d.addEventListener('DOMContentLoaded', (e) => {
  eventListeners(e);
});

const eventListeners = () => {
  $form.addEventListener('change', (e) => {
    //console.log(e.target.value);
    if (e.target === $bgColor) {
      $display.style.backgroundColor = $bgColor.value;
    }
    if (e.target === $contentColor) {
      $display.style.color = $contentColor.value;
    }
    if (e.target === $bgOpacity) {
      $display.style.opacity = $bgOpacity.value;
    }
    if (e.target === $contentOpacity) {
      $display.style.color = convertHexToRGBA(
        $contentColor.value,
        $contentOpacity.value
      );
    }
  });

  $form.addEventListener('submit', (e) => {
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
  });

  $btnReset.addEventListener('click', (e) => {
    $btnStart.disabled = true;
    $btnReset.disabled = true;
    $btnEnd.disabled = true;
    $form.reset();
  });

  $btnEnd.addEventListener('click', (e) => {
    clearInterval(showContent);
    inputs = 0;
    $display.removeChild($div);
    $btnStart.disabled = true;
    $btnEnd.disabled = true;
    $form.reset();
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

const convertHexToRGBA = (hexCode, opacity) => {
  const hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
};
