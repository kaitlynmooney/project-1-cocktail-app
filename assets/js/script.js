// DEPENDENCIES
const cocktailBtn = $("#cocktailButton");
const modalEl = $(".modal");
const searchBtn = $("#searchButton");
const cancelBtn = $("#cancelButton");
const featuredCocktailCard = $('#featured-cocktail');
const ingredientInputEl = $("#ingredientInput");
const xBtn = $('#xBtn');
const generateBtn = $("#generateBtn");
const resetBtn = $("#resetBtn");
const cocktailLibrary = $('.carousel');

// DATA
let cocktailName = '';
let cocktailIngredients = [];
let cocktailRecipe = '';
let savedCocktails;
let cocktailPhotoSrc = '';
let localStorageCocktails;
let libraryCocktails;
let cocktailIndex = 0;
let ii;
let itemNum;
const maxCarouselItems = 5

let cocktailSampleImages = [
    "./assets/images/default-photo.jpg",
    "./assets/images/default-photo.jpg",
    "./assets/images/default-photo.jpg",
];
let cocktailPlacehold = [
    "Save a cocktail from above!",
    "Save a cocktail from above!",
    "Save a cocktail from above!",
];

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
    displayFeaturedCocktail(localStorageCocktails, cocktailIndex);
}

//––Extract the names of the cocktails from the 5 recipes in local storage––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const getCocktailNames = function() {
    //get the 5 recipes fromm local storage, create a for loop that grabs the names from each one and puts them into a new array
    const storedCocktails = JSON.parse(localStorage.getItem('recipes'));
    const cocktailPhotoName = [];
    for  (const name of storedCocktails) {
        cocktailPhotoName.push(name.name);
    }
    localStorage.setItem('names', JSON.stringify(cocktailPhotoName));  
}


// –––Display the cocktails in the Featured Cocktail Section–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const displayFeaturedCocktail = async function(localStorageCocktails, index) {
    console.log(index);
    cocktailName = localStorageCocktails[index].name;
    cocktailIngredients = localStorageCocktails[index].ingredients;
    cocktailRecipe = localStorageCocktails[index].instructions;
    const nameNoSpaces = noSpaces(cocktailName);
    cocktailPhotoSrc = await cocktailPhoto(nameNoSpaces); // Wait for cocktailPhoto to complete and get the photo URL
    featuredCocktailCard.empty().append(`
          <h3 class="is-size-1 card-header-title is-centered">${toTitleCase(cocktailName)}</h3>
          <div id="featuredCocktailSection" class="is-flex is-justify-content-center">
            <div class="columns card-image">
                <img src="${cocktailPhotoSrc}" alt="${cocktailName}" style="height:250px;width:250px;border-radius: 5px" class="column is-3-desktop is-4-tablet is-5-mobile p-4 mt-4"/>
            </div>
              <div id="ingredientsAndRecipe" class="column is-8-desktop is-flex is-align-items-center is-align-self-center card-content">
                  <div class="column is-4-desktop is-6-tablet is-8-mobile is-flex-direction-column m-4 is-align-self-flex-start" id="ingredientContainer">
                      <h4 class="is-size-2 pb-3">Ingredients</h4>
                      <ul style="list-style: inside; list-style-type: circle">
                      ${listIngredients(cocktailIngredients)}
                      </ul>
                  </div>
                  <div class="column is-4-desktop is-6-tablet is-8-mobile is-flex-direction-column m-4" id="recipeContainer">
                    <h4 class="is-size-2 pb-3">Recipe</h4>
                    <ol style="list-style: inside; list-style-type: decimal">
                        ${listRecipe(cocktailRecipe)}
                    </ol>
                  </div>
              </div>
          </div>
          <subsection id="featuredSectionButtons" class="is-flex is-justify-content-center is-align-items-center">
              <button id="generateBtn" class="button is-normal is-responsive is-size-4" style="background-color: var(--primary); color: var(--light-text)">Generate Another Cocktail</button>
              <button id="saveBtn" class="button is-normal is-responsive is-size-4" style="background-color: var(--primary); color: var(--light-text)">Save to Cocktail Library</button>
              <button id="resetBtn" class="button is-normal is-responsive is-size-4" style="background-color: var(--primary); color: var(--light-text)">Reset Cocktail Library</button>

              `);
              const saveBtn = $("#saveBtn");
              saveBtn.on('click', saveToCocktailLibrary);
              const generateBtn = $('#generateBtn');
              generateBtn.on('click', generateLoop);
              const resetBtn = $("#resetBtn");
              resetBtn.on("click", resetLibrary);
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
                return getCocktailPhotoSrc(data);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return './assets/images/default-photo.jpg'; // Return a default image URL if there's an error
    });
}
        
const getCocktailPhotoSrc = (data) => {
    return data.photos && data.photos.length > 0 ? data.photos[0].src.original : './assets/images/default-photo.jpg'; // Return a default image URL if no photos found
}

const generateLoop = () => {
    console.log("in generateLoop");
    cocktailIndex++;
    if (cocktailIndex < 5) {
        displayFeaturedCocktail(localStorageCocktails, cocktailIndex);
    } else {
        cocktailIndex = 0;
        displayFeaturedCocktail(localStorageCocktails, cocktailIndex);
    }
}

// Carousel ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Iterative process for appending carousel elements on page initialization
const sampleLibraryInit = function() {
    for (ii = 0; ii < cocktailSampleImages.length; ii++) {
        cocktailLibrary.append(`
    <div class="item-${ii+1} imgcard">
        <img class="cocktailOnCarousel item-${ii+1}" src="${cocktailSampleImages[ii]}"/>
        <br>
        <button class="libraryItem${ii+1}" id="cocktailButton" class="item-${ii+1}" type="button">${cocktailPlacehold[ii]}</button>
    </div>
    `)
    };
    console.log(JSON.parse(localStorage.getItem('cocktail library')));
};

// Same process, but now using cocktails stored in localStorage instead of the initial placeholders
const storageToCarousel = function() {
    for (ii = 0; ii < JSON.parse(localStorage.getItem('cocktail library')).length; ii++) {
        cocktailLibrary.append(`
        <div class="item-${ii+1} imgcard">
            <img class="cocktailOnCarousel item-${ii+1}" src="${JSON.parse(localStorage.getItem('cocktail library'))[ii].photoSrc}"/>
            <button class="libraryItem${ii+1}" id="cocktailButton" class="item-${ii+1}" type="button">${JSON.parse(localStorage.getItem('cocktail library'))[ii].name}</button>
        </div>
        `)
        };
    console.log(JSON.parse(localStorage.getItem('cocktail library')));
};

const pageInit = function(){
    if (localStorage.getItem('cocktail library') !== null) {
        storageToCarousel();
    } else {
        sampleLibraryInit();
    }
}

const bulmaCarouselInit = function() {
    bulmaCarousel.attach('#carousel-elem', {
        slidesToScroll: 1,
        slidesToShow: 1,
        effect: "translate",
        infinite: true,
    });
};

// (On click) Show featured cocktail using the carousel

// libraryCocktails = JSON.parse(localStorage.getItem('cocktail library'))
// const libraryToFeatured = function(itemNum){
//     if (!libraryCocktails == false) {
//         console.log(itemNum);
//         cocktailName = libraryCocktails[itemNum].name;
//         cocktailIngredients = libraryCocktails[itemNum].ingredients;
//         cocktailRecipe = libraryCocktails[itemNum].recipe;
//         cocktailPhotoSrc = libraryCocktails[itemNum].photoSrc;
//         featuredCocktailCard.empty().append(`
//               <h3 class="is-size-1 card-header-title is-centered">${toTitleCase(cocktailName)}</h3>
//               <div id="featuredCocktailSection" class="is-flex is-justify-content-center">
//                 <div class="columns card-image">
//                     <img src="${cocktailPhotoSrc}" alt="${cocktailName}" style="height:250px;width:250px;border-radius: 5px" class="column is-3-desktop is-4-tablet is-5-mobile p-4 mt-4"/>
//                 </div>
//                   <div id="ingredientsAndRecipe" class="column is-8-desktop is-flex is-align-items-center is-align-self-center card-content">
//                       <div class="column is-4-desktop is-6-tablet is-8-mobile is-flex-direction-column m-4 is-align-self-flex-start" id="ingredientContainer">
//                           <h4 class="is-size-2 pb-3">Ingredients</h4>
//                           <ul style="list-style: inside; list-style-type: circle">
//                           ${listIngredients(cocktailIngredients)}
//                           </ul>
//                       </div>
//                       <div class="column is-4-desktop is-6-tablet is-8-mobile is-flex-direction-column m-4" id="recipeContainer">
//                         <h4 class="is-size-2 pb-3">Recipe</h4>
//                         <ol style="list-style: inside; list-style-type: decimal">
//                             ${listRecipe(cocktailRecipe)}
//                         </ol>
//                       </div>
//                   </div>
//               </div>
//               <subsection id="featuredSectionButtons" class="is-flex is-justify-content-center is-align-items-center">
//                   <button id="generateBtn" class="button is-normal is-responsive is-size-4" style="background-color: var(--primary); color: var(--light-text)">Generate Another Cocktail</button>
//                   <button id="saveBtn" class="button is-normal is-responsive is-size-4" style="background-color: var(--primary); color: var(--light-text)">Save to Cocktail Library</button>
//                   <button id="resetBtn" class="button is-normal is-responsive is-size-4" style="background-color: var(--primary); color: var(--light-text)">Reset Cocktail Library</button>
    
//                   `);
//                   const saveBtn = $("#saveBtn");
//                   saveBtn.on('click', saveToCocktailLibrary);
//                   const generateBtn = $('#generateBtn');
//                   generateBtn.on('click', generateLoop);
//                   const resetBtn = $("#resetBtn");
//                   resetBtn.on("click", resetLibrary);
//         }
// };


const deleteCocktailsFromStorage = function() {
        localStorage.clear();
        console.log(JSON.parse(localStorage.getItem('cocktail library')));
};      
        
const resetLibrary = function() {
    for (ii = 0; ii < maxCarouselItems; ii++) {
        $(`.item-${ii+1}`).remove();
    };
    deleteCocktailsFromStorage();
    location.reload();
};

const updateCarousel = function() {
    resetLibrary();
    storageToCarousel();
};       
        
const resetCarousel = function() {
    resetLibrary();
    sampleLibraryInit();
};


    
// USER INTERACTIONS
cocktailBtn.on('click', openModal); 
searchBtn.on('click', saveIngredients);
cancelBtn.on('click', closeModal);
xBtn.on('click', closeModal);


// INTIALIZATIONS
pageInit();
bulmaCarouselInit();
    
    