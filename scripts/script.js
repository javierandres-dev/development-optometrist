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
  const $form = d.getElementById(id);
  let showContent;
  d.addEventListener("submit", (e) => {
    if (e.target === $form) {
      e.preventDefault();
      const $show = d.getElementById("show"),
        content = $form.content.value,
        $size = $form.size.value,
        $move = $form.move.value,
        $div = d.createElement("div");
      if ($move === "motionless") {
        $speed = $form.speed.value;
        showContent = setInterval(() => {
          $div.innerText = getElements(content);
          $div.classList.add(`fs-${$size}`, `${$move}`);
          $div.style["animationDuration"] = `${$speed}s`;
          $show.appendChild($div);
        }, 5000);
      } else {
        console.log("Working");
      }
    }
  });
  d.addEventListener("click", (e) => {
    if (e.target === $form.stop) {
      clearInterval(showContent);
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
