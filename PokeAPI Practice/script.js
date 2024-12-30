const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");
const boxSize = 0;
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.style.backgroundColor = typeColor[item.type.name];
    span.innerHTML = item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1).toLowerCase();
    document.querySelector(".types").appendChild(span);
  });
}

let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
}

let generateCard = (data) => {
  console.log(data);
  let hp = data.stats[0].base_stat;
  let attack = data.stats[1].base_stat;
  let defense = data.stats[2].base_stat;
  let speed = data.stats[5].base_stat;
  let shinyRate = Math.floor(Math.random() * 1000) + 1;
  let name = data.name;
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  let imgSrc;
  if (shinyRate === 0) {
    imgSrc = data.sprites.other.home.front_shiny;
    name = "✨ " + name + " ✨";
  } else {
    imgSrc = data.sprites.other.home.front_default;
  }

  let themeColor = typeColor[data.types[0].type.name];

  card.innerHTML = `
        <p class="hp">
          <span>HP</span>
          ${hp}
        </p>
        <img src="${imgSrc}" alt="Pokemon" />
        <h2 class="poke-name">${name}</h2>
        <div class="types">
        </div>
        <div class="stats">
          <div>
            <h3>${attack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>${defense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${speed}</h3>
            <p>Speed</p>
          </div>
        </div>
        `;
  appendTypes(data.types);
  styleCard(themeColor);
};

let getPokeData = () => {
  let id = Math.floor(Math.random() * 1025) + 1;
  console.log(id);
  const finalUrl = url + id;
  console.log(finalUrl);
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      generateCard(data);
    });
};

window.addEventListener("load", getPokeData);
btn.addEventListener("click", getPokeData);

