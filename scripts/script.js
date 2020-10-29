const d = document,
  alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  animals = [
    "Foca",
    "Gallo",
    "Gato",
    "Lobo",
    "Loro",
    "Mono",
    "Oso",
    "Pato",
    "Rana",
    "Sapo",
    "Toro",
    "Vaca",
  ],
  countries = [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Perú",
    "Surinam",
    "Uruguay",
    "Venezuela",
  ],
  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
d.addEventListener("DOMContentLoaded", (e) => {
  show("form");
});
show = (id) => {
  const $form = d.getElementById(id),
    $btnStart = $form.start,
    $btnEnd = $form.end,
    $show = d.getElementById("show"),
    $messages = d.getElementById("messages"),
    $div = d.createElement("div");
  let showMessage,
    showContent,
    inputs = 0;
  d.addEventListener("change", (e) => {
    if (e.target) inputs += 1;
    if (inputs === 5) $btnStart.disabled = false;
    if (inputs > 5) {
      $messages.innerText = "Seleccione solo una opción por parámetro.";
      inputs = 0;
      $btnStart.disabled = true;
      $btnEnd.disabled = true;
      $form.reset();
    }
  });
  d.addEventListener("submit", (e) => {
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
      if ($move !== "motionless") {
        $div.style["animationDuration"] = `${$speed}s`;
      }
      let starting = $speed - 1;
      showMessage = setInterval(() => {
        $messages.innerText = `Iniciará en: ${starting--}`;
      }, 1000);
      showContent = setInterval(() => {
        clearInterval(showMessage);
        $messages.innerText = "";
        $div.innerText = getElements($content);
        $show.appendChild($div);
      }, $speed * 1000);
    }
  });
  d.addEventListener("click", (e) => {
    if (e.target === $form.end) {
      clearInterval(showContent);
      inputs = 0;
      $show.removeChild($div);
      $form.reset();
      $btnStart.disabled = true;
      $btnEnd.disabled = true;
    }
  });
};
getElements = (content) => {
  let arr;
  if (content === "alphabet") {
    arr = alphabet;
  }
  if (content === "animals") {
    arr = animals;
  }
  if (content === "countries") {
    arr = countries;
  }
  if (content === "numbers") {
    arr = numbers;
  }
  idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};
