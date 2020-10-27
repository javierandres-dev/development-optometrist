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
getElements = (category) => {
  let arr;
  if (category === "alphabet") {
    arr = alphabet;
  }
  if (category === "animals") {
    arr = animals;
  }
  if (category === "countries") {
    arr = countries;
  }
  if (category === "numbers") {
    arr = numbers;
  }
  idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};
show = (id) => {
  const $form = d.getElementById(id);
  let showResult;
  d.addEventListener("submit", (e) => {
    if (e.target === $form) {
      e.preventDefault();
      const $show = d.getElementById("show"),
        $size = $form.size.value,
        category = $form.category.value,
        span = d.createElement("span");
      $show.classList.add("box");
      showResult = setInterval(() => {
        span.classList.add(`fs${$size}`, "carousel");
        span.innerText = getElements(category);
        $show.appendChild(span);
      }, $form.interval.value);
    }
  });
  d.addEventListener("click", (e) => {
    if (e.target === $form.stop) {
      clearInterval(showResult);
    }
  });
};
d.addEventListener("DOMContentLoaded", (e) => {
  show("form");
});
