//ingredients data
//מערך רגיל של מרכיבים שכל איבר בו הוא מערך אסוציאטיבי של פרטי המרכיב
ingredientJson = [
    {
        id: 1,
        name: 'Broccoli',
        image: 'https://www.health.harvard.edu/media/content/images/p7_Broccoli_HH1812_gi905351392.jpg',
        calories: 34
    },
    {
        id: 2,
        name: 'Cauliflower',
        image: 'https://t3.gstatic.com/images?q=tbn:ANd9GcSeg3atgP35f83U_eFhOPcnD6-ZDUh19g0EhYvLjznjfW4p6tzcSyr1qLHAEA7Q0zPZSJqjUuX-XhQA2aLcggM',
        calories: 25
    },
    {
        id: 3,
        name: 'Nudels',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Fresh_ramen_noodle_001.jpg',
        calories: 138
    },
    {
        id: 4,
        name: 'Soy sauce',
        image: 'https://cdn.shopify.com/s/files/1/0206/9470/products/10683_HFARM_49645309-3_grande.jpeg?v=1441105440',
        calories: 12
    }
]

counterId = 0;
SelectedIng = []; /*מערך עזר*/

class ingredient {

    constructor(name, image, calories) {
        counterId++;
        this.id = counterId;
        this.name = name;
        this.image = image;
        this.calories = calories;
    }

    //properties
    get Id() { return this.id; }
    get Name() { return this.name; }
    get Image() { return this.image; }
    get Calories() { return this.calories; }
    set Name(value) { this.name = value }
    set Image(value) { this.image = value }
    set Calories(value) {
        if (value < 0) {
            alert("Calories cannot be a negative number");
            return;
        }
        this.calories = value;
    }


    // class methods ********************************************************
    IngredientRender() {
        let str = '<div class="col-12 col-sm-6 col-md-4 col-lg-3">';
        str += ' <div class="row card">';
        str += `<div class="col-12"><label>add <input id="${this.id}" type="checkbox"></label></div>`;
        str += '<div class="col-12"><p>ingredient details:</p></div>';
        str += `<div class="col-12"><img src="${this.image}" alt="couldn't load picture" /></div>`;
        str += `<div class="col-12"><p>${this.name}</p></div>`;
        str += `<div class="col-12"><p>calories: ${this.calories}</p></div>`;
        str += '</div></div>';
        return str;
    }
}


class DishRecipe {
    constructor(name, ingredients, cookingTime, cookingMethod, image) {
        this.name = name;
        this.ingredients = ingredients;
        this.cookingTime = cookingTime;
        this.cookingMethod = cookingMethod;
        this.image = image;
    }
    get Name() { return this.name; }
    get Ingredients() { return this.ingredients; }
    get CookingTime() { return this.cookingTime; }
    get CookingMethod() { return this.cookingMethod; }
    get Image() { return this.image; }

    set Name(value) { this.name = value }
    set Ingredients(value) { this.ingredients = value }
    set CookingTime(value) {
        if (value < 0) {
            alert("Cooking time cannot be a negative number");
            return;
        }
        this.cookingTime = value;
    }
    set CookingMethod(value) { this.cookingMethod = value }
    set Image(value) { this.image = value }

    // class methods ********************************************************

    DishRecipeRender() {

        let str = '<div class="col-12 col-sm-6 col-md-4 col-lg-3">';
        str += '<div class="row card">'
        str += `<div class="col-12"><h5>Dish recipe details:</h5></div>`;
        str += `<div class="col-12"><img src="${this.Image}" alt="couldn't load picture" /></div>`;
        str += `<div class="col-12"><p> dish name: ${this.Name}</p></div>`;
        str += `<div class="col-12"><p> Cooking method: ${this.CookingMethod}</p></div>`;
        str += `<div class="col-12"><p> Total cooking time: ${this.CookingTime} minutes</p></div>`;
        str += `<div class="col-12"><p> total calories: ${this.getTotalCalories()}</p></div>`;
        str += `<div class="col-12"><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onclick="displayModal('${this.Name}')">show ingredients</button></div>`;
        str += '</div>';
        str += '</div>';

        return str;
    }

    getTotalCalories() {
        let TotalCal = 0;
        for (var i = 0; i < this.ingredients.length; i++) {
            TotalCal += this.ingredients[i].calories;
        }
        return TotalCal;
    }

    getIngredients() {
        let str = '<div class="row">';
        for (var i = 0; i < this.ingredients.length; i++) {
            str += '<div class="col-12 col-sm-6 col-md-4 col-lg-3">';
            str += ' <div class="row card">';
            str += '<div class="col-12"><p>ingredient details:</p></div>';
            str += `<div class="col-12"><img src="${this.ingredients[i].Image}" alt="couldn't load picture" /></div>`;
            str += `<div class="col-12"><p>${this.ingredients[i].Name}</p></div>`;
            str += `<div class="col-12"><p>calories: ${this.ingredients[i].Calories}</p></div>`;
            str += '</div></div>';
        }
        str += '</div>';
        str += '<br />';
        return str;
    }
}

//function ********************************************************

function init() {
    ArrIngredient = []; /*העברת מערך גונסון למערך של טיפוס מרכיב*/
    for (var i = 0; i < ingredientJson.length; i++) {
        ing = new ingredient(ingredientJson[i].name, ingredientJson[i].image, ingredientJson[i].calories);
        ArrIngredient.push(ing);
    }

    Dishes = [];
    var dish = new DishRecipe('Pad thai', ArrIngredient, 60, 'sdlfdslf', 'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/beef-pad-thai-43f58743.jpg');
    Dishes.push(dish);

    ShowDishes();
}

function addNewIngredient() {
    let str = '<div class="row">';
    str += '<div class="col-12"> <p>Ingredient name:</p ><input type="text" id="I_name"/></div>';
    str += '<div class="col-12"> <p>Ingredient image (url):</p><input type="text" id="I_image" /></div>';
    str += '<div class="col-12"> <p>Ingredient calories:</p> <input type="text" id="I_cal" /></div></div>';
    str += '<br />';
    str += '<div class="row">';
    str += '<div class="col">';
    str += ` <button type="button" onclick="CreateIngredient('I_name','I_image','I_cal')"> Create ingredient  </button>`;
    str += ' <button type="button" onclick="Close()">Close </button>';
    str += '</div>';
    str += '</div>';

    document.getElementById("ph").innerHTML = str;
}

function addNewRecipe() {
    let str = '<div class="row">';
    str += '<div class="col-12"> <p>Recipe name:</p ><input type="text" id="R_name"/></div>';
    str += '<div class="col-12"> <p>Recipe cooking method:</p><input type="text" id="R_cookingMethod" /></div>';
    str += '<div class="col-12"> <p>Recipe cooking time:</p> <input type="text" id="R_cookingTime"/></div></div>';
    str += '<div class="col-12"><p>Recipe Image (url):</p> <input type="text" id="R_image"/></div></div>';
    str += '<br />';
    str += '<div class="row">';
    str += '<div class="col">';
    str += '<h3>Choose ingrediants</h3>';
    str += '</div>';
    str += '</div>';


    str += '<div class="row">'
    for (var i = 0; i < ArrIngredient.length; i++) {
        str += ArrIngredient[i].IngredientRender();
    }
    str += '</div>';
    str += '<br />';

    str += '<div class="row">';
    str += '<div class="col">';
    str += ` <button type="button" onclick="CreateRecipe('R_name','R_cookingTime','R_cookingMethod','R_image')"> Create Recipe </button>`;
    str += ' <button type="button" onclick="Close()">Close </button>';
    str += '</div>';
    str += '</div>';

    document.getElementById("ph").innerHTML = str;
}

function Close() {
    let str = '';
    document.getElementById("ph").innerHTML = str;
}

function CreateIngredient(name, image, cal) {

    let Name = document.getElementById(name).value;
    let Image = document.getElementById(image).value;
    let Calories = Number(document.getElementById(cal).value);
    if ((Name == '') || (Image == '') || (Calories == '')) {
        alert("All fields must be filled");
    }
    else {
        Ingredient = new ingredient(Name, Image, Calories);
        ArrIngredient.push(Ingredient);
    }
}

function CreateRecipe(name, cookingTime, cookingMethod, image) {
    check(); /*בדיקה האם נלחץ אחד מהמרכיבים*/
    let Name = document.getElementById(name).value;
    let CookingTime = Number(document.getElementById(cookingTime).value);
    let CookingMethod = document.getElementById(cookingMethod).value;
    let Image = document.getElementById(image).value;
    if ((Name == '') || (CookingTime == '') || (CookingMethod == '') || (Image == '') || SelectedIng.length == 0) {
        alert("All fields must be filled");
    }
    else {
        Dish = new DishRecipe(Name, SelectedIng, CookingTime, CookingMethod, Image);
        Dishes.push(Dish);

        ShowDishes();
        SelectedIng = [];
    }
};


function ShowDishes() {
    let str = '<div class="row">';
    for (var i = 0; i < Dishes.length; i++) {
        str += Dishes[i].DishRecipeRender();
    }
    str += '</div>';
    str += '<br />';
    document.getElementById("Dish").innerHTML = str;
}


function check() {
    for (var i = 0; i < ArrIngredient.length; i++) {
        if (document.getElementById(ArrIngredient[i].id).checked == true) {
            SelectedIng.push(ArrIngredient[i]);
        }
    }
}

function displayModal(objName) {
    for (var i = 0; i < Dishes.length; i++) {
        if (Dishes[i].Name == objName) {
            document.getElementById("Model").innerHTML = Dishes[i].getIngredients();
        }
    }
}


