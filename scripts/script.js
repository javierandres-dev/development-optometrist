"use strict";
import * as data from "./data.js";

const d = document,
  $display = d.getElementById("display"),
  $alert = d.getElementById("alert"),
  $form = d.getElementById("myForm"),
  $btnStart = d.getElementById("startBtn"),
  $btnEnd = d.getElementById("endBtn"),
  $div = d.createElement("div"),
  $bgColor = $form.bgColor,
  $bgOpacity = $form.bgOpacity,
  $bgImage = $form.bgImage,
  $contentColor = $form.contentColor,
  $contentOpacity = $form.contentOpacity;

let myObject = {
  content: "",
  move: "",
  speed: "",
};

let interval = undefined;

d.addEventListener("DOMContentLoaded", (e) => {
  eventListeners();
  showAlert("warning", "Seleccione campos obligatorios *");
});

const eventListeners = () => {
  $form.addEventListener("change", (e) => {
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
    if (e.target.name === "bgImage") {
      const url = `../images/${$bgImage.value}.jpeg`;
      $display.setAttribute(
        "style",
        "background-image: url(" +
          url +
          ");background-repeat: no-repeat;background-position: 50% 50%;background-size: 100% auto;"
      );
    }
    if (e.target.name === "content") myObject.content = e.target.value;
    if (e.target.name === "move") {
      if (e.target.value === "random") {
        const moves = [
          "x-ltr",
          "x-rtl",
          "y-ttb",
          "y-btt",
          "d-ttb",
          "d-btt",
          "ad-ttb",
          "ad-btt",
        ];
        const idx = Math.floor(Math.random() * moves.length);
        myObject.move = moves[idx];
      } else {
        myObject.move = e.target.value;
      }
    }
    if (e.target.name === "speed") myObject.speed = e.target.value;
    enableStart();
  });

  $btnStart.addEventListener("click", () => {
    showContent();
    showAlert(
      "success",
      'Para cambiar parámetros o detener la prueba presione el botón de "Finalizar"'
    );
    $btnStart.disabled = true;
    $btnEnd.disabled = false;
  });

  $btnEnd.addEventListener("click", () => {
    clearInterval(interval);
    $display.removeChild($div);
    myObject = {
      content: "",
      move: "",
      speed: "",
    };
    $display.innerHTML = null;
    $display.style.backgroundImage = null;
    $display.style.backgroundColor = "#000000";
    $display.style.color = "#FFFFFF";
    showAlert("warning", "Seleccione campos obligatorios");
    $form.reset();
    $btnEnd.disabled = true;
  });
};

const enableStart = () => {
  if (isValid()) {
    $btnStart.disabled = false;
    showAlert("success", 'Presione el botón "Iniciar"');
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
  const { content, move, speed } = myObject;
  $div.classList.add(`${move}`);
  if (move !== "motionless") {
    $div.style["animationDuration"] = `${speed}s`;
  }
  interval = setInterval(() => {
    $div.innerText = getElements(content);
    $display.appendChild($div);
  }, speed * 1000);
};

const showAlert = (type = "", message = "") => {
  $alert.className = `alert ${type}`;
  $alert.textContent = message;
};

const getElements = (content) => {
  let arr = null;
  if (content === "numbers") arr = data.numbers;
  if (content === "lowercase") arr = data.lowercase;
  if (content === "uppercase") arr = data.uppercase;
  if (content === "countries") arr = data.countries;
  if (content === "fruits") arr = data.fruits;
  if (content === "sports") arr = data.sports;
  if (content === "words") arr = data.words;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};

const convertHexToRGBA = (hexCode, opacity) => {
  const hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
};
