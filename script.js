let allFruits = []; //globale Variable
async function fetchDataJson() {
  let response = await fetch("https://www.fruityvice.com/api/fruit/all");
  allFruits = await response.json(); // füllt die globale Variable, Wichtig: ohne "let" oder "const"
  console.log(allFruits);
  renderFruitNames(allFruits);
}

function renderFruitNames(Fruits) {
  let fruitButton = document.getElementById("fruit_buttons");

  for (let indexFruits = 0; indexFruits < Fruits.length; indexFruits++) {
    fruitButton.innerHTML += `
    <div><button onclick="showOverlay(${indexFruits})" id="fruit_button${indexFruits}">${Fruits[indexFruits].name}</button></div>
    `;
  }
}

function showOverlay(i) {
  let numberOfFruits = allFruits.length;
  let dialogContent = document.getElementById("overlay");
  dialogContent.innerHTML = "";
  dialogContent.classList.remove("d_none");
  dialogContent.innerHTML += fillDialog(allFruits, numberOfFruits, i);
}

function fillDialog(Fruits, total, i) {
  const fruit = Fruits[i];
  return `
        <div onclick="event.stopPropagation()" class="dialog prevent-select">
          <h2>${fruit.name}</h2>
          <p>Genus: ${fruit.genus}</p>
          <p>Family: ${fruit.family}</p>
          <p>Order: ${fruit.order}</p>
          <p>Carbohydrates: ${fruit.nutritions.carbohydrates}</p>
          <p>Protein: ${fruit.nutritions.protein}</p>
          <p>Fat: ${fruit.nutritions.fat}</p>
          <p>Calories: ${fruit.nutritions.calories}</p>
          <p>Sugar: ${fruit.nutritions.sugar}</p>
            <div class="dialog_bottom_section">
            <span onclick="previousFruit(${i - 1}, ${total})" class="left_arrow highlight"><</span>
            <span class="counter" >${i + 1} / ${total}</span>
            <span onclick="nextFruit(${i + 1}, ${total})" class="right_arrow highlight">></span>
          </div>
          <button onclick="closeOverlay()">Schließen</button>
        </div>

      `;
}

function closeOverlay() {
  document.getElementById("overlay").classList.add("d_none");
}

function nextFruit(i, total) {
  if (i == total) {
    i = 0;
  }
  showOverlay(i);
}

function previousFruit(i, total) {
  if (i == -1) {
    i = total - 1;
  }
  showOverlay(i);
}
