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
function selectPokemon() {

}
function addSelectedPokemon() {

}

export default class PokemonController {
    constructor() {
        _pokemonService.addSubscriber('apiPokemon', drawApiPokemon)
        _pokemonService.grabPokemonData()
    }
}