// DEPENDENCIES
const cocktailBtn = $("#cocktailButton");
const modalEl = $(".modal");
const searchBtn = $("#searchButton");
const cancelBtn = $("#cancelButton");
const generateBtn = $('#generateBtn');

// DATA

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
// send inputted ingredient to the API call 
getCocktails(ingredient); 

// removes .is-active from modal element and closes it
const closeModal = () => {
    modalEl.removeClass('is-active');
};

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
        success: function(result) {
            console.log(result);
            // save recipes to local storage 
            localStorage.setItem('recipes', JSON.stringify(result));

        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

//––Reduce the 10 recipes to 5–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– 
const firstFiveRecipes = function() {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
    console.log(storedRecipes);
    //add a loop here that grabs just the first 5 recipes, then send them to the displayFeaturedCocktail function, then save them to local storage
}

//––Extract the names of the cocktails from the 5 recipes in local storage––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const getCocktailNames = function() {
    //get the 5 recipes fromm local storage, create a for loop that grabs the names from each one and puts them into a new array, send that array to the cocktailPhoto function
}


// –––Display the first five cocktails in the Featured Cocktail Section–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const displayFeaturedCocktail = function() {
}

//––API Call to get photos of the 5 cocktails –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const cocktailPhoto = function() {
    
}

//--Carousel-------------------------
bulmaCarousel.attach('#carousel-demo', {
  slidesToScroll: 1,
  slidesToShow: 2,
  effect: "translate"
});

// USER INTERACTIONS
cocktailBtn.on('click', openModal);
searchBtn.on('click', searchIngredients);
cancelBtn.on('click', closeModal);
generateBtn.on('click', getCocktails);
