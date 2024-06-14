// DEPENDENCIES
const cocktailBtn = $("#cocktailButton");
const modalEl = $(".modal");
const searchBtn = $("#searchButton");
const cancelBtn = $("#cancelButton");
const generateBtn = $('#generateBtn');
const featuredCocktailCard = $('#featured-cocktail');
const ingredientInputEl = $("#ingredientInput");

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
        success: function(result) {
            console.log(result);
            // save recipes to local storage 
            localStorage.setItem('recipes', JSON.stringify(result));
            displayFeaturedCocktail(result);
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
const displayFeaturedCocktail = function(result) {
    featuredCocktailCard.append(`
          <h3 class="is-size-1 card-header-title is-centered">${toTitleCase(result[0].name)}</h3>
          <div class="is-flex is-justify-content-center" s>
            <div class="card-image">
                <img src="https://www.liquor.com/thmb/YbaFLqBKww1EdvE4ojPNe5sFjzg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dirty-martini-1500x1500-hero-6cbd60561031409ea1dbf1657d05cb2d.jpg" alt="dirty martini" style="height:250px;width:250px;border-radius: 5px" class="p-4"/>
            </div>
              <div class="is-flex is-align-items-center is-align-self-center card-content" >
                  <div class="is-flex-direction-column mx-6 is-align-self-flex-start" id="ingredientContainer">
                      <h4 class="is-size-2 pb-3">Ingredients</h4>
                      <ul style="list-style: inside; list-style-type: circle">
                      ${listIngredients(result[0].ingredients)}
                      </ul>
                  </div>
                  <div class="is-flex-direction-column ml-5" id="recipeContainer">
                    <h4 class="is-size-2 pb-3">Recipe</h4>
                    <ol style="list-style: inside; list-style-type: decimal">
                        ${listRecipe(result[0].instructions)}
                    </ol>
                  </div>
              </div>
          </div>
          <subsection class="is-flex is-justify-content-space-evenly is-align-items-center">
              <button id="generateBtn" class="button is-normal is-responsive is-size-4" style="background-color: var(--primary); color: var(--light-text)">Generate Another Cocktail</button>
              <button id="generateBtn" class="button is-normal is-responsive is-size-4" style="background-color: var(--primary); color: var(--light-text)">Save to Cocktail Library</button>
          </subsection>
    `);
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
    
}

cocktailPhoto()
//--Carousel-------------------------
bulmaCarousel.attach('#carousel-demo', {
  slidesToScroll: 1,
  slidesToShow: 2,
  effect: "translate"
});

// USER INTERACTIONS
cocktailBtn.on('click', openModal); 
searchBtn.on('click', saveIngredients);
cancelBtn.on('click', closeModal);
generateBtn.on('click', getCocktails);

// INTIALIZATIONS
// getCocktails(ingredient); 
