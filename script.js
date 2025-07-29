async function fetchDataJson() {
  let response = await fetch("https://www.fruityvice.com/api/fruit/all");
  let responseAsJson = await response.json();
  console.log(responseAsJson);
  renderFruitNames(responseAsJson);
}

function renderFruitNames(responseAsJson) {
  let fruitButton = document.getElementById("fruit_buttons");

  for (let indexFruits = 0; indexFruits < responseAsJson.length; indexFruits++) {
    const element = responseAsJson[indexFruits];

    fruitButton.innerHTML += `
    <div><button id="fruit_button${indexFruits}">${responseAsJson[indexFruits].name}</button></div>
    `;
  }
}
