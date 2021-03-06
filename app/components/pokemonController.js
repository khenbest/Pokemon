import PokemonService from "./pokemonService.js";

let _pokemonService = new PokemonService()


function drawApiPokemon() {
    let template = ''
    let pokemon = _pokemonService.ApiPokemon
    pokemon.forEach(p => {
        template += p.showName()
    })
    document.getElementById('pokedex').innerHTML = template
}

function drawSelectedPokemon() {
    let template = ''
    let selected = _pokemonService.SelectedPokemon
    template += `<div class="card" style="width: 18rem;">
        <img src="${selected.img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${selected.name}</h5>
                <p class="card-text">`
    for (let i = 0; i < selected.types.length; i++) {
        template += selected.types[i] + " "
    }
    template += `</p >
    <a onclick="app.controllers.pokemonController.addSelectedPokemon()" class="btn btn-primary">Add To Team</a>
            </div >
</div > `
    document.getElementById('selected').innerHTML = template
}
function drawMyTeam() {
    let template = ''
    let selected = _pokemonService.SelectedPokemon
    template += `<div class="card" style="width: 18rem;">
        <img src="${selected.img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${selected.name}</h5>
                <p class="card-text">`
    for (let i = 0; i < selected.types.length; i++) {
        template += selected.types[i] + " "
    }
    template += `</p >
    <a onclick="app.controllers.pokemonController.deleteSelectedPokemon()" class="btn btn-danger">Remove From Team</a>
            </div >
            </div >
</div > `
    document.getElementById('my-team').innerHTML = template
}

export default class PokemonController {
    constructor() {
        _pokemonService.addSubscriber('apiPokemon', drawApiPokemon)
        _pokemonService.addSubscriber('selectedPokemon', drawSelectedPokemon)
        _pokemonService.addSubscriber('myPokemon', drawMyTeam)
        _pokemonService.grabPokemonData()

    }
    selectPokemon(name) {
        _pokemonService.selectPokemon(name)

    }
    addSelectedPokemon() {
        _pokemonService.addSelectedPokemon()
    }
    deleteSelectedPokemon() {
        _pokemonService.deleteSelectedPokemon()
    }
    grabMyTeam() {
        _pokemonService.grabMyTeam()
    }
}