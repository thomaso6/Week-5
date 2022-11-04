class Animal{
    constructor(name, color){
      this.name = name;
      this.color = color;  
    }
    describe() {
        return `${this.name} is ${this.color}!`;
    }
}

class Taxonomy{
    constructor(name){
        this.name = name;
        this.animals = [];
    }
    addAnimal(animal){
        if(animal instanceof Animal){
            this.animals.push(animal);
        }
        else{
            throw new Error(`${animal} is not an existing animal.`);
        }
    }
    describe(){
        return `There are currently ${this.animals.length} animals classified as ${this.name}.`;
    }
}

class Menu {
    constructor(){
        this.taxonomies = [];
        this.selectedTaxonomy = null;
    }
    start(){
        let selection = this.showMainMenuOptions();
        while (selection != 0){
            switch(selection){
                case '1':
                    this.createTaxonomy();
                    break;
                case '2':
                    this.viewTaxonomy();
                    break;
                case '3': 
                    this.deleteTaxonomy();
                    break;
                case '4':
                    this.displayTaxonomies();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert(`That's all, folks!`);
    }
    showMainMenuOptions(){
        return prompt(`
        0. Exit
        1. Create New Taxonomy
        2. View Taxonomy
        3. Delete Taxonomy
        4. Display Existing Taxonomies
        `);
    }
    showTaxonomyMenuOptions(taxonomyInfo){
        return prompt(`
        0. Back
        1. Create Animal
        2. Delete Animal

        ${taxonomyInfo}
        `);
    }
    displayTaxonomies(){
        let taxonomyString = '';
        for(let i = 0; i < this.taxonomies.length; i++){
            taxonomyString += i + ') ' + this.taxonomies[i].name + '\n';
        }
        alert(taxonomyString);
    }
    createTaxonomy(){
        let name = prompt('Enter the taxonomy you wish to create:');
        this.taxonomies.push(new Taxonomy(name));
    }
    viewTaxonomy(){
        let index = prompt('Enter the index of the Taxonomy you would like to view:');
        if(index > -1 && index < this.taxonomies.length){
            this.selectedTaxonomy = this.taxonomies[index];
            let description = 'Taxonomy: ' + this.selectedTaxonomy.name + '\n';
            for(let i = 0; i < this.selectedTaxonomy.animals.length; i++){
                description += i + '. ' + this.selectedTaxonomy.animals[i].name + ' - ' + this.selectedTaxonomy.animals[i].color + '\n';
            }
            let selection = this.showTaxonomyMenuOptions(description);
            switch(selection){
                case '1':
                    this.createAnimal();
                    break;
                case '2':
                    this.deleteAnimal();
            }
        }
    }
    deleteTaxonomy(){
        let index = prompt('Enter the index of the Taxonomy you want to delete:');
        if(index > -1 && index < this.taxonomies.length){
            this.taxonomies.splice(index, 1);
        }
    }
    createAnimal(){
        let name = prompt('Enter the name of the animal you with to create:');
        let color = prompt('Enter the color of your new animal:');
        this.selectedTaxonomy.animals.push(new Animal(name, color));
    }
    deleteAnimal(){
        let index = prompt('Enter the index of the animal you want to delete:');
        if(index > -1 && index < this.selectedTaxonomy.animals.length){
            this.selectedTaxonomy.animals.splice(index, 1); 
        }
    }
    }


let menu = new Menu();
menu.start();