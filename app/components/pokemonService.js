import Pokemon from "../models/pokemon.js";
import SelectedPokemon from "../models/selectedPokemon.js";

let _pokemonAPI = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandbox = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/Kenny/pokemon'
})

let _state = {
    apiPokemon: [],
    selectedPokemon: {},
    myPokemon: []
}

let _subscribers = {
    apiPokemon: [],
    selectedPokemon: [],
    myPokemon: []
}

function setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn())
}

export default class PokemonService {
    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)

    }
    get ApiPokemon() {
        return _state.apiPokemon.map(p => new Pokemon(p))
    }
    grabPokemonData() {
        _pokemonAPI.get()
            .then(res => {
                let data = res.data.results.map(p => new Pokemon(p))
                setState('apiPokemon', data)
            })

    }

    get SelectedPokemon() {
        return _state.selectedPokemon
    }

    selectPokemon(name) {
        _pokemonAPI.get(name)
            .then(res => {
                let data = new SelectedPokemon(res.data)
                setState('selectedPokemon', data)
            })

    }

    grabMyTeam() {
        _sandbox.get('')
            .then(res => {
                let data = res.data.data.map(p => new SelectedPokemon(p))
                setState('myPokemon', data)
            })
    }

    addSelectedPokemon() {
        _sandbox.post('', _state.myPokemon)
            .then(res => {
                console.log(res)
                this.grabMyTeam()
            })
    }
    deleteSelectedPokemon() {
        _sandbox.delete('', _state.myPokemon)
            .then(res => {
                console.log(res)
                this.grabMyTeam()
            })
    }
}