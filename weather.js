const inputsearch = document.querySelector(".inputsearch");
const keyvalue = "3045dd712ffe6e702e3245525ac7fa38";
const cities = [
  "shiraz",
  "gilan",
  "alborz",
  "qom",
  "sabzevar",
];

document.addEventListener("DOMContentLoaded", function (event) {
  cities.forEach(getWeather);
});

async function getWeather(inputsearch) {
  const response = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputsearch}&appid=${keyvalue}`
    )
  ).json();

  console.log(response);

  let weathercards = document.querySelector(".weather-cards");

  weathercards.innerHTML =
    `</li>
     <li class="card">
       <h3 class="cart-elm">${response.name}</h3>
       <h6>${response.weather[0].main}</h6>
       <h6>deg: ${response.wind.deg}°</h6>
       <h6>speed:${response.wind.speed}</h6>
     </li>` + weathercards.innerHTML;
}

function addCity() {
  let searchterm = document.getElementById("inputsearch").value;
  let all_carts = document.querySelectorAll(".weather-cards .card");

  if (searchterm === "") {
    all_carts.forEach((item) => (item.style.display = "block"));
    return;
  }

  all_carts.forEach((item) => (item.style.display = "none"));

  let filteredCarts = [];

  for (let i = 0; i < all_carts.length; i++) {
    let isExist = all_carts[i]
      .getElementsByTagName("h3")[0]
      .innerHTML.toLowerCase().includes(searchterm.toLowerCase());
    if (isExist) {
      filteredCarts.push(all_carts[i]);
    }
  }

  if (filteredCarts.length == 0) {
    getWeather(searchterm)
  } else {
    filteredCarts.forEach((item) => (item.style.display = "block"));
  }
}
