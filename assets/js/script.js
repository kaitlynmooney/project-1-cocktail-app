// DEPENDENCIES
const cocktailBtn = $("#cocktailButton");
const modalEl = $(".modal");
const searchBtn = $("#searchButton");
const cancelBtn = $("#cancelButton");
const generateBtn = $('#generateBtn');

// DATA


// FUNCTIONS
// –––Modal Submit (Get the user-inputted ingredient)––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// adds class to the modal element to open it
const openModal = () => {
    modalEl.addClass('is-active')
}
// saves ingredient(s) to local storage & pulls API request with given ingredients
saveIngredientsToStorage(ingredients);
const searchIngredients = (ingredients) => {

}
// removes .is-active from modal element and closes it
const closeModal = () => {
    modalEl.removeClass('is-active');
};

// –––Save the user-inputted ingredient to local storage–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const saveIngredientsToStorage = function(ingredients) {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
}

// –––API Call to get cocktail recipes––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// // use the inputted ingredient to make an API call and get 
// const getCocktails = function(ingredient) {
// –––API Call to get cocktail recipes––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// use the inputted ingredient to make an API call and get 
// const getCocktails = function(ingredient) 
// {

//   $.ajax({
//       method: 'GET',
//       url: 'https://api.api-ninjas.com/v1/cocktail?ingredients=' + ingredient,
//       headers: { 'X-Api-Key': '+frO7azzghiOsVVmW/5Bjg==OOWySxn7ztVE6WsV'},
//       contentType: 'application/json',
//       success: function(result) {
//           console.log(result);
//       },
//       error: function ajaxError(jqXHR) {
//           console.error('Error: ', jqXHR.responseText);
//       }
//   });
// }
// function readIngredientsFromStorage(){
// let ingredients = JSON.parse(localStorage.getItem('ingredients'));
// if (!ingredients){
//   ingredients=[];
// }
// return ingredients;
// }
// function saveIngredientsToStorage(ingredients) {
//   localStorage.setItem('ingredients', JSON.stringify(ingredients));
// }
// readIngredientsFromStorage();
// saveIngredientsToStorage();

// Carousel functionality in separate block for now, can refactor .js later to organize everything
// Implement Jquery later
// Dependencies
let cocktailIndex = 0; //will later be pulled from local storage
const carousel = document.querySelector('.myCocktails');
const nextBtn = carousel.querySelector('.next');
const prevBtn = carousel.querySelector('.prev');
let currentCocktail = document.querySelector('#carouselCurrent');


// Data
let myCocktails = [
  './assets/images/bloody-mary.jpg',
  './assets/images/mojito.jpg',
  './assets/images/white-russian.jpg'
];


console.log(cocktailIndex)

//Functions

function showCocktail(cocktailIndex) {
  carousel.style.backgroundImage = `url(${myCocktails[cocktailIndex]})`;
  console.log(currentCocktail);
}

function nextCocktail() {
  cocktailIndex++ ;
  if (cocktailIndex > myCocktails.length) {
    cocktailIndex = 0};
  console.log(cocktailIndex);
  showCocktail()
  }

function prevCocktail() {
    cocktailIndex-- ;
    if (cocktailIndex < 0) {
      cocktailIndex = myCocktails.length};
      console.log(cocktailIndex);
    showCocktail()
}



// User Interactions
nextBtn.addEventListener("click", nextCocktail);
prevBtn.addEventListener("click", prevCocktail);

// Initialization
showCocktail();
// –––Display returned cocktail(s) in the Featured Cocktail Section–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const displayFeaturedCocktail = function() {


  // –––Get the ingredients from local storage–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
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
}
  
  // USER INTERACTIONS
  cocktailBtn.on('click', openModal);
  searchBtn.on('click', searchIngredients);
  cancelBtn.on('click', closeModal);
  generateBtn.on('click', searchIngredients);