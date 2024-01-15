const pokemonList = document.getElementById("pokemonList");
const loadMore = document.getElementById("load");

const max = 151
const limit = 50;
let offset = 0;


function loadPokemon(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons
            .map(
                (pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
                <div class="detail">
                        <ol class="types">
                        ${pokemon.types
                                    .map((type) => `<li class="type ${type}">${type}</li>`)
                                    .join("")}
                        </ol>
                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
                </div>
        </li>`
            )
            .join("");
        pokemonList.innerHTML += newHTML;
    });
}

loadPokemon(offset, limit);

loadMore.addEventListener("click", () => {
    offset += limit
    const qtdNext = offset + limit
    if(qtdNext >= max){
        const newLimit = max - offset;
        loadPokemon(offset, newLimit);
        loadMore.parentElement.removeChild(loadMore);
    }else{
        loadPokemon(offset, limit);
    }    

    
});

