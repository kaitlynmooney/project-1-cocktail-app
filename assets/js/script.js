// DEPENDENCIES
const cocktailBtn = $("#cocktailButton");
const modalEl = $(".modal");
const searchBtn = $("#searchButton");
const cancelBtn = $("#cancelButton");


// DATA


// FUNCTIONS
// adds class to the modal element to open it
const openModal = () => {
    modalEl.addClass('is-active')
}
// pulls API request with given ingredients
const searchIngredients = (ingredients) => {

}
// removes .is-active from modal element and closes it
const closeModal = () => {
    modalEl.removeClass('is-active');
}

// use the inputted ingredient to make an API call and get 
const getCocktails = function(ingredient) {

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/cocktail?ingredients=' + ingredient,
        headers: { 'X-Api-Key': '+frO7azzghiOsVVmW/5Bjg==OOWySxn7ztVE6WsV'},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}


// USER INTERACTIONS
cocktailBtn.on('click', openModal);
searchBtn.on('click', searchIngredients);
cancelBtn.on('click', closeModal);

function readIngredientsFromStorage(){
let ingredients = JSON.parse(localStorage.getItem('ingredients'));
if (!ingredients){
    ingredients=[];
}
return ingredients;
}
function saveIngredientsToStorage(ingredients) {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
}
readIngredientsFromStorage();
saveIngredientsToStorage();

