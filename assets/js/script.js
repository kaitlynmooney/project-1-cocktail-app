// DEPENDENCIES
const cocktailBtn = $("#cocktailButton");
const modalEl = $(".modal");
const searchBtn = $("#searchButton");
const cancelBtn = $("#cancelButton");
const generateBtn = $('#generateBtn');
const featuredCocktailCard = $('#featured-cocktail');
const ingredientInputEl = $("#ingredientInput");
const xBtn = $('#xBtn');
// DATA
let cocktailName = '';
let cocktailIngredients = [];
let cocktailRecipe = '';
let savedCocktails;


// PSEUDOCODE 
// When the 'Find a Cocktail' button is clicked, a Modal appears & user inputs an ingredient
// That ingredient is sent into an API call to return 10 recipes 
// A function takes the first 5 responses from the API call and saves them to local storage 
// A function gets the 5 recipes from local storage and displays them (1 at a time) on the Featured Cocktail section
// A function that gets the 5 recipes from local storage, takes just the 'name' key from each one, and then sends those names to the an API call to return corresponding photos of the cocktails
// If the checkbox on the Featured Cocktail section is clicked, that cocktail is pushed into a Cocktail Library array within Local Storage 
// A function gets that cocktail from local storage and displays it in the Cocktail Library section 


// FUNCTIONS
// –––Modal Submit (Get the user-inputted ingredient)––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// adds class to the modal element to open it
const openModal = () => {
    modalEl.addClass('is-active')
}
// // send inputted ingredient to the API call 
// 

// removes .is-active from modal element and closes it
const closeModal = () => {
    modalEl.removeClass('is-active');
};

const saveIngredients = (event) => {
    event.preventDefault();

    const ingredients = ingredientInputEl.val();
    getCocktails(ingredients);
    ingredientInputEl.val('');
    closeModal();

}

// –––API Call to get cocktail recipes––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// // use the inputted ingredient to make an API call and get 
// const getCocktails = function(ingredient) {
// –––API Call to get cocktail recipes––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// use the inputted ingredient to make an API call and get 10 recipes back, save those recipes to local storage  
const getCocktails = function(ingredient) {

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/cocktail?ingredients=' + ingredient,
        headers: { 'X-Api-Key': '+frO7azzghiOsVVmW/5Bjg==OOWySxn7ztVE6WsV'},
        contentType: 'application/json',
        success: function(storedRecipes) {
           
            // save recipes to local storage 
            const n = 5;
            storedRecipes.splice(n);
            console.log(storedRecipes);
            displayFeaturedCocktail(storedRecipes);
            localStorage.setItem('recipes', JSON.stringify(storedRecipes));
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

//––Extract the names of the cocktails from the 5 recipes in local storage––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const getCocktailNames = function() {
    //get the 5 recipes fromm local storage, create a for loop that grabs the names from each one and puts them into a new array, send that array to the cocktailPhoto function
}


// –––Display the first five cocktails in the Featured Cocktail Section–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const displayFeaturedCocktail = function(result) {
    cocktailName = result[0].name;
    cocktailIngredients = result[0].ingredients;
    cocktailRecipe = result[0].instructions;
    featuredCocktailCard.append(`
          <h3 class="is-size-1 card-header-title is-centered">${toTitleCase(cocktailName)}</h3>
          <div class="is-flex is-justify-content-center" s>
            <div class="card-image">
                <img src="https://www.liquor.com/thmb/YbaFLqBKww1EdvE4ojPNe5sFjzg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dirty-martini-1500x1500-hero-6cbd60561031409ea1dbf1657d05cb2d.jpg" alt="dirty martini" style="height:250px;width:250px;border-radius: 5px" class="p-4"/>
            </div>
              <div class="is-flex is-align-items-center is-align-self-center card-content" >
                  <div class="is-flex-direction-column mx-6 is-align-self-flex-start" id="ingredientContainer">
                      <h4 class="is-size-2 pb-3">Ingredients</h4>
                      <ul style="list-style: inside; list-style-type: circle">
                      ${listIngredients(cocktailIngredients)}
                      </ul>
                  </div>
                  <div class="is-flex-direction-column ml-5" id="recipeContainer">
                    <h4 class="is-size-2 pb-3">Recipe</h4>
                    <ol style="list-style: inside; list-style-type: decimal">
                        ${listRecipe(cocktailRecipe)}
                    </ol>
                  </div>
              </div>
          </div>
          <subsection class="is-flex is-justify-content-space-evenly is-align-items-center">
              <button id="generateBtn" class="button is-normal is-responsive is-size-4" style="background-color: var(--primary); color: var(--light-text)">Generate Another Cocktail</button>
              <button id="saveBtn" class="button is-normal is-responsive is-size-4" style="background-color: var(--primary); color: var(--light-text)">Save to Cocktail Library</button>
          </subsection>
    `);
    const saveBtn = $("#saveBtn");
    saveBtn.on('click', saveToCocktailLibrary);
};

const toTitleCase = (nameString) => {
    return nameString.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

const listIngredients = (ingredientArray) => {
    let ingredientList = '';
    for (const ingredient of ingredientArray){
        ingredientList += `<li>${ingredient}</li>`;
    };
    return ingredientList;
};

const listRecipe = (recipeString) => {
    const recipeArray = recipeString.split('.');
    recipeArray.pop();
    let recipe = '';
    for (const item of recipeArray){
        recipe += `<li>${item}</li>`
    }
    return recipe;
};

const saveToCocktailLibrary = () => {
    // const cocktails = localStorage.getItem('recipes');
    // console.log(cocktails);
    const savedCocktail = {
        name: cocktailName,
        ingredients: cocktailIngredients,
        recipe: cocktailRecipe
    };
    savedCocktails = localStorage.getItem('cocktail library') ? JSON.parse(localStorage.getItem('cocktail library')) : [];
    savedCocktails.push(savedCocktail);
    localStorage.setItem('cocktail library', JSON.stringify(savedCocktails));
}
//––API Call to get photos of the 5 cocktails –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// const cocktailPhoto = function() {
//     import { createClient } from 'pexels';


//––API Call to get photos of the 5 cocktails –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const cocktailPhoto = function(cocktailName) {
    fetch(`https://api.pexels.com/v1/search?query=${cocktailName}&per_page=1`, {
        headers: {
            Authorization: 'rVK4mQUZopJxEfuruZwF6zZnS1bfHEso84WZQTRcFpt5s1BfRQTZfXmK'
        }
    }) .then(function(response){
        return response.json()
    }) .then(function(data){
        console.log(data)
    })
//     const client = createClient('rVK4mQUZopJxEfuruZwF6zZnS1bfHEso84WZQTRcFpt5s1BfRQTZfXmK');
//     // All requests made with the client will be authenticated
//     const query = ${name};
    
}

cocktailPhoto()
//--Carousel-------------------------
const cocktailLibrary = $('.carousel')

// Create iterative process so that when linking to localStorage all items are accounted for
// Iteration would run through all items that currently exist in the localStorage directory
// Starter code will utilize the sample pictures from an array that is first stored to localStorage under a different variable

// "cocktailSamples" will be replaced with a variable linked to the localStorage key for the images, "cocktailSampleNames" will likewise be the key for cocktail names in storage
let cocktailSampleImages = [
    "./assets/images/bloody-mary.jpg",
    "./assets/images/mojito.jpg",
    "./assets/images/white-russian.jpg",
];

let cocktailSampleNames = [
    "Bloody Mary",
    "Mojito",
    "White Russian",
];
let ii;

const storeSamples = function () {
    localStorage.setItem("cocktailSampleImages", JSON.stringify(cocktailSampleImages));
    localStorage.setItem("cocktailSampleNames", JSON.stringify(cocktailSampleNames));
};
storeSamples();

let retrievedCocktailImages = JSON.parse(localStorage.getItem("cocktailSampleImages"));
let retrievedCocktailNames = JSON.parse(localStorage.getItem("cocktailSampleNames"));

const retrieveSamples = function () {
    console.log(retrievedCocktailImages)
    console.log(retrievedCocktailNames)
}
retrieveSamples();

// Create iterative process for appending carousel elements
const LibraryAddElem = function() {
    for (ii = 0; ii < cocktailSampleImages.length; ii++) {
        // "item-x" gets replaced with index+1, src and text between <button/> will be replaced with js callback
        cocktailLibrary.append(`
    <div class="item-${ii+1} imgcard">
        <img class="cocktailOnCarousel" src=${retrievedCocktailImages[ii]}/>
        <br>
        <button id="cocktailButton" type="button">${retrievedCocktailNames[ii]}</button>
    </div>
    `)
    console.log(cocktailLibrary)
        }
};

LibraryAddElem();

const savedCocktail1 = $('.item-1')
const savedCocktail2 = $('.item-2')
const savedCocktail3 = $('.item-3')

const getCocktailFromStorage = function() {
// for (let ii = 0; ii < localStorage.length; ii++) {
    console.log(localStorage.getItem['recipes']);
}
// }

bulmaCarousel.attach('#carousel-elem', {
  slidesToScroll: 1,
  slidesToShow: 1,
  effect: "translate",
  infinite: true,
});

savedCocktail1.on('click', getCocktailFromStorage);

// USER INTERACTIONS
cocktailBtn.on('click', openModal); 
searchBtn.on('click', saveIngredients);
cancelBtn.on('click', closeModal);
generateBtn.on('click', getCocktails);
xBtn.on('click', closeModal);

// INTIALIZATIONS
// getCocktails(ingredient); 
