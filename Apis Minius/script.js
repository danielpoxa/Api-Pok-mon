document.getElementById('fetchButton').addEventListener('click', fetchPokemon);

function fetchPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50') // Fetching 50 Pokémon characters

        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '';
            data.results.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(details => {
                        const card = document.createElement('div');
                        card.className = 'character-card';

                        const img = document.createElement('img');
                        img.src = details.sprites.front_default;
                        card.appendChild(img);

                        const name = document.createElement('h2');
                        name.textContent = details.name;
                        name.addEventListener('click', () => toggleDetails(details, card));
                        card.appendChild(name);

                        gallery.appendChild(card);
                    });
            });
        })
        .catch(error => console.error('Error fetching Pokémon data:', error));
}

function toggleDetails(details, card) {
    const existingInfo = card.querySelector('.pokemon-info');
    if (existingInfo) {
        card.removeChild(existingInfo); // Remove details if they already exist
    } else {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'pokemon-info';

        const species = document.createElement('p');
        species.textContent = `Species: ${details.species.name}`;
        infoDiv.appendChild(species);

        const abilities = document.createElement('p');
        abilities.textContent = `Abilities: ${details.abilities.map(ability => ability.ability.name).join(', ')}`;
        infoDiv.appendChild(abilities);

        const moves = document.createElement('p');
        moves.textContent = `Moves: ${details.moves.slice(0, 5).map(move => move.move.name).join(', ')}`;
        infoDiv.appendChild(moves);

        card.appendChild(infoDiv); // Append details if they don't exist
    }
}
