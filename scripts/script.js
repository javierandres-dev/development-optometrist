'use strict';
import * as data from './data.js';

const d = document,
  $display = d.getElementById('display'),
  $alert = d.getElementById('alert'),
  $div = d.createElement('div'),
  $form = d.getElementById('myForm'),
  $bgColor = $form.bgColor,
  $bgOpacity = $form.bgOpacity,
  $contentColor = $form.contentColor,
  $contentOpacity = $form.contentOpacity,
  $content = $form.content,
  $size = $form.size,
  $weight = $form.weight,
  $move = $form.move,
  $speed = $form.speed,
  $btnStart = $form.start,
  $btnEnd = $form.end;

let myObject = {
  content: '',
  size: '',
  weight: '',
  move: '',
  speed: '',
};

let interval = undefined;

d.addEventListener('DOMContentLoaded', (e) => {
  eventListeners();
  showAlert('warning', 'Seleccione campos obligatorios');
});

const eventListeners = () => {
  $form.addEventListener('change', (e) => {
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
    if (e.target.name === 'content') {
      myObject.content = $content.value;
    }
    if (e.target.name === 'size') {
      myObject.size = $size.value;
    }
    if (e.target.name === 'weight') {
      myObject.weight = $weight.value;
    }
    if (e.target.name === 'move') {
      myObject.move = $move.value;
    }
    if (e.target.name === 'speed') {
      myObject.speed = $speed.value;
    }
    enableSubmit();
  });

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    showContent();
    showAlert(
      'success',
      'Para cambiar parámetros o detener la prueba presione el botón de "Finalizar"'
    );
    $btnStart.disabled = true;
    $btnEnd.disabled = false;
  });

  $btnEnd.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(interval);
    $display.removeChild($div);
    myObject = {
      content: '',
      size: '',
      weight: '',
      move: '',
      speed: '',
    };
    $display.style.backgroundColor = '#000000';
    $display.style.color = '#FFFFFF';
    showAlert('warning', 'Seleccione campos obligatorios');
    $form.reset();
    $btnEnd.disabled = true;
  });
};

const enableSubmit = () => {
  if (isValid()) {
    $btnStart.disabled = false;
    showAlert('success', 'Presione el botón "Iniciar"');
  }
};

const isValid = () => {
  let result = undefined;
  Object.values(myObject).forEach((val) => {
    if (val.length === 0) {
      result = false;
      return;
    } else {
      result = true;
    }
  });
  return result;
};

const showContent = () => {
  const { content, size, weight, move, speed } = myObject;
  $div.style.fontSize = `${size}rem`;
  $div.style.fontWeight = `${weight}`;
  $div.classList.add(`${move}`);
  if (move !== 'motionless') {
    $div.style['animationDuration'] = `${speed}s`;
  }
  interval = setInterval(() => {
    $div.innerText = getElements(content);
    $display.appendChild($div);
  }, speed * 1000);
};

const showAlert = (type = '', message = '') => {
  $alert.className = `alert ${type}`;
  $alert.textContent = message;
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
