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
let cocktailPhotoSrc = '';
let localStorageCocktails;


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
// use the inputted ingredient to make an API call and get 
const getCocktails = function(ingredient) {

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/cocktail?ingredients=' + ingredient,
        headers: { 'X-Api-Key': '+frO7azzghiOsVVmW/5Bjg==OOWySxn7ztVE6WsV'},
        contentType: 'application/json',
        success: function(response) {
            // save recipes to local storage 
            const n = 5;
            response.splice(n);
            console.log(response);
            localStorage.setItem('recipes', JSON.stringify(response));
            getCocktailsFromStorage();
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

const getCocktailsFromStorage = () => {
    localStorageCocktails = JSON.parse(localStorage.getItem('recipes'));
    displayFeaturedCocktail(localStorageCocktails);
}

//––Extract the names of the cocktails from the 5 recipes in local storage––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const getCocktailNames = function() {
    //get the 5 recipes fromm local storage, create a for loop that grabs the names from each one and puts them into a new array
    const storedNames = JSON.parse(localStorage.getItem('recipes'));
    const cocktailPhotoName = [];
    for  ( const name of storedNames) {
        console.log(name.name);
    cocktailPhotoName.push(name.name);
    console.log(cocktailPhotoName);
    }
    localStorage.setItem('name', JSON.stringify(cocktailPhotoName));  
}


// –––Display the cocktails in the Featured Cocktail Section–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const displayFeaturedCocktail = async function(localStorageCocktails) {
    cocktailName = localStorageCocktails[0].name;
    cocktailIngredients = localStorageCocktails[0].ingredients;
    cocktailRecipe = localStorageCocktails[0].instructions;
  
    const nameNoSpaces = noSpaces(cocktailName);
    cocktailPhotoSrc = await cocktailPhoto(nameNoSpaces); // Wait for cocktailPhoto to complete and get the photo URL
    console.log(cocktailPhotoSrc);
    featuredCocktailCard.empty().append(`
          <h3 class="is-size-1 card-header-title is-centered">${toTitleCase(cocktailName)}</h3>
          <div class="is-flex is-justify-content-center">
            <div class="card-image">
                <img src="${cocktailPhotoSrc}" alt="${cocktailName}" style="height:250px;width:250px;border-radius: 5px" class="p-4"/>
            </div>
              <div class="is-flex is-align-items-center is-align-self-center card-content">
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
    const savedCocktail = {
        photoSrc: cocktailPhotoSrc,
        name: cocktailName,
        ingredients: cocktailIngredients,
        recipe: cocktailRecipe
    };
    savedCocktails = localStorage.getItem('cocktail library') ? JSON.parse(localStorage.getItem('cocktail library')) : [];
    savedCocktails.push(savedCocktail);
    localStorage.setItem('cocktail library', JSON.stringify(savedCocktails));
}

const noSpaces = (name) => {
   return name.replace(/\s+/g, '');
}

//––API Call to get photos of the 5 cocktails –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const cocktailPhoto = (cocktailName) => {
    return fetch(`https://api.pexels.com/v1/search?query=${cocktailName}&per_page=1`, {
        headers: {
            Authorization: 'rVK4mQUZopJxEfuruZwF6zZnS1bfHEso84WZQTRcFpt5s1BfRQTZfXmK'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json().then(data => {
                console.log(data);
                return getCocktailPhotoSrc(data);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return 'default-image-url'; // Return a default image URL if there's an error
    });
}
        
const getCocktailPhotoSrc = (data) => {
    return data.photos && data.photos.length > 0 ? data.photos[0].src.original : 'default-image-url'; // Return a default image URL if no photos found
}

// cocktailPhoto()
//--Carousel-------------------------

// const cocktailLibrary = $('.carousel')

// const LibraryAddElem = function() {
//     cocktailLibrary.append(`
//     <div class="item-1 imgcard">
//         <img class="cocktailOnCarousel" src="./assets/images/bloody-mary.jpg"/>
//         <br>
//         <button id="cocktailButton" type="button">Bloody Mary</button>
//     </div>
//     <div class="item-2 imgcard">
//         <img class="cocktailOnCarousel" src="./assets/images/mojito.jpg"/> 
//         <br>
//         <button id="cocktailButton" type="button">Mojito</button>
//     </div>
//     <div class="item-3 imgcard">
//         <img class="cocktailOnCarousel" src="./assets/images/white-russian.jpg"/>
//         <br>
//         <button id="cocktailButton" type="button">White Russian</button>
//     </div>
    
//     `)
//     console.log(cocktailLibrary)
// };

// LibraryAddElem();

// const savedCocktail1 = $('.item-1')
// const savedCocktail2 = $('.item-2')
// const savedCocktail3 = $('.item-3')

// bulmaCarousel.attach('#carousel-elem', {
//   slidesToScroll: 1,
//   slidesToShow: 1,
//   effect: "translate",
//   loop: true,
// });

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
