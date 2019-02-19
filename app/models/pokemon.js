export default class Pokemon {
    constructor(data) {
        this.name = data.name
        this.url = data.url
    }

    showName() {
        return `<button onclick="app.controller.pokemonController.selectPokemon('${this.name}')"> ${this.name}</button>`
    }
}