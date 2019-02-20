export default class SelectedPokemon {
    constructor(data) {
        this.name = data.species.name
        // this.types = data.types.[type].name
        // this.abilities = data.abilities[ability].name
        // this.stats = data.stats
        this.types = data.types.map(t => t.type.name)
        this.img = data.sprites.front_default
    }
}