


var list = []

$(document).ready(function(){
    $(".loading-screen").fadeOut(2000, () => {
        $("body").css("overflow", "auto")
    })
})

var menuWidth = $("#boxMenu").outerWidth();
$(".stripNav").css("left", `-${menuWidth}px`)
$(".OpenClose").click(function () {
   let OpenClose = document.querySelector(".OpenClose")
    if ($(".stripNav").css("left") == "0px") {
        $(".stripNav").animate({left:`-${menuWidth}px`}, 1000)
        OpenClose.innerHTML = '<i class="fa-solid fa-bars fa-2xl"></i>'
        $(".item1").animate({paddingTop:"700px" , opacity: "0"},500 , function (){
            $(".item2").animate({paddingTop:"700px", opacity: "0"},500 , function(){
                $(".item3").animate({paddingTop:"700px", opacity: "0"},500 , function(){
                    $(".item4").animate({paddingTop:"700px", opacity: "0"},500, function(){
                        $(".item5").animate({paddingTop:"00px", opacity: "0"},500)
                    })
                })
            })
        })
        
        
    } else {
        $(".stripNav").animate({left:`0px`}, 1000)
        OpenClose.innerHTML = '<i class="fa-solid fa-xmark fa-2xl"></i>'
        $(".item1").animate({paddingTop:"10px" , opacity: "1"},500 , function (){
            $(".item2").animate({paddingTop:"25px", opacity: "1"},500 , function(){
                $(".item3").animate({paddingTop:"25px", opacity: "1"},500 , function(){
                    $(".item4").animate({paddingTop:"25px", opacity: "1"},500, function(){
                        $(".item5").animate({paddingTop:"25px", opacity: "1"},500)
                    })
                })
            })
        })
        



    }
}

)

async function getData(url) {

    var apiResponse = await fetch(url);
    var finalData = await apiResponse.json();
    list = finalData.meals.slice(0,20)
    
}


async function displayMeals() {
    await getData("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    var cartona = ''
    for (let i = 0; i < list.length; i++) {
        
        cartona +=`<div class="col-md-6 col-lg-3 ">
        <div class="mealCard position-relative" onclick="fullInfo('${list[i].idMeal}');">
            <img src="${list[i].strMealThumb}" alt=${list[i].strMeal} class="w-100">
            <div class="overlay px-1 text-center bg-white bg-opacity-75 position-absolute text-dark d-flex flex-column justify-content-center">
                <h2 class="title">${list[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById("mealsContainer").innerHTML = cartona

    
}
displayMeals()

async function fullInfo(id) {
    $(".loading-screen").fadeIn(100);
    var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    var finalData = await apiResponse.json();
    list = finalData.meals[0]
	let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (list[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 bg-success rounded">${list[`strMeasure${i}`]} ${list[`strIngredient${i}`]}</li>`
        }
    }

    let tags = list.strTags?.split(",") 
    let tagsStr = "" 
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 bg-warning rounded">${tags[i]}</li>` 
    }
    $(".loading-screen").fadeOut(400);
    if (list.strTags == null) {
        list.strTags = "<span>no tags</span>" }
    document.getElementById("search-container").innerHTML =""
    document.getElementById("mealsContainer").innerHTML =`<div class="col-md-4 text-white">
    <img class="w-100" src="${list.strMealThumb}" alt=""
        srcset=""><br>
    <h1 class="text-center mt-2">${list.strMeal}</h1>
</div>
<div class="col-md-8 text-white text-left">
    <h2>Instructions</h2>
    <p>${list.strInstructions}</p>
    <p><b class="fw-bolder">Area :</b> ${list.strArea}</p>
    <p><b class="fw-bolder">Category :</b> ${list.strCategory}</p>
    <h3>Recipes :  </h3>
    <ul class="d-flex list-unstyled flex-wrap" id="recipes">
    </ul>
    <h3 class="my-2 mx-1 p-1">Tags :</h3>
    <ul class="d-flex list-unstyled" id="tags">
   
    </ul>
    
    <a class="btn btn-success text-white" target="_blank" href="${list.strSource}">Source</a>
    <a class="btn youtube btn-danger" target="_blank" href="${list.strYoutube}">Youtub</a>
</div>`
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
     $("html, body").animate({
    scrollTop: 0
       }, 200)
}
 async function displayCategories() {
    $(".loading-screen").fadeIn(100);
    var apiResponse = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    var finalData = await apiResponse.json();
    list = finalData.categories
    $(".loading-screen").fadeOut(400);
    var cartona = ''
    for (let i = 0; i < list.length; i++) {
        
        cartona +=`<div class="col-md-6 col-lg-3">
        <div class="mealCard position-relative" onclick="filterByCategory('${list[i].strCategory}');">
            <img src="${list[i].strCategoryThumb}" alt=${list[i].strCategory} class="w-100">
            <div class="overlay px-1 text-center bg-white bg-opacity-75 position-absolute text-dark d-flex flex-column justify-content-center">
                <h2 class="title">${list[i].strCategory}</h2>
                <p>${list[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}</p>
            </div>
        </div>
    </div>`


    }
    document.getElementById("mealsContainer").innerHTML = cartona

    $("html, body").animate({
        scrollTop: 0
    }, 200)
    
}

async function displayArea() {
    $(".loading-screen").fadeIn(100);
    await getData("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    $(".loading-screen").fadeOut(400);
    var cartona = ''
    for (let i = 0; i < list.length; i++) {
        
        cartona +=`<div class="col-md-6 col-lg-3 shade">
        <div class="mealCard" onclick="filterByArea('${list[i].strArea}');">
            <div class="px-1 text-center d-flex align-items-center flex-column">
                <i class="icon-area fa-solid fa-city fa-3x "></i>
                <h2 class="title">${list[i].strArea}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById("mealsContainer").innerHTML = cartona

    $("html, body").animate({
        scrollTop: 0
    }, 200)
   
}

async function displayIngredients() {
    $(".loading-screen").fadeIn(100);
    await getData("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    $(".loading-screen").fadeOut(400);
    var cartona = ''

    
    for (let i = 0; i < list.length; i++) {

        if (list[i].strDescription == null) {
            list[i].strDescription = `<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nobis unde magni laudantium voluptatem voluptatum placeat iusto dolorem earum impedit, voluptatibus non autem minus, odit saepe maxime explicabo debitis beatae?</p>`
        }
        
        cartona +=`<div class="col-md-6 col-lg-3 shade">
        <div class="mealCard" onclick="filterByIngredient('${list[i].strIngredient}');">
            <div class="px-1 text-center d-flex flex-column justify-content-center">
                <i class="fa-solid fa-bowl-food fa-3x icon-ingredients"></i>
                <h2 class="title my-3">${list[i].strIngredient}</h2>
                <p id="null-p">${list[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`
    }
    document.getElementById("mealsContainer").innerHTML = cartona

    $("html, body").animate({
        scrollTop: 0
    }, 200)    
}




async function filterByArea(area) {
    $(".loading-screen").fadeIn(100);
    var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    var finalData = await apiResponse.json();
    list = finalData.meals.slice(0,20)
    $(".loading-screen").fadeOut(400);
    var cartona = ''
    for (let i = 0; i < list.length; i++) {
        
        cartona +=`<div class="col-md-6 col-lg-3 ">
        <div class="mealCard position-relative" onclick="fullInfo('${list[i].idMeal}');">
            <img src="${list[i].strMealThumb}" alt=${list[i].strMeal} class="w-100">
            <div class="overlay px-1 text-center bg-white bg-opacity-75 position-absolute text-dark d-flex flex-column justify-content-center">
                <h2 class="title">${list[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById("mealsContainer").innerHTML = cartona

    $("html, body").animate({
        scrollTop: 0
    }, 100)
}
async function filterByCategory(category) {
    $(".loading-screen").fadeIn(100);
    var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    var finalData = await apiResponse.json();
    list = finalData.meals.slice(0,20)
    $(".loading-screen").fadeOut(400);
    var cartona = ''
    for (let i = 0; i < list.length; i++) {
        
        cartona +=`<div class="col-md-6 col-lg-3">
        <div class="mealCard position-relative" onclick="fullInfo('${list[i].idMeal}');">
            <img src="${list[i].strMealThumb}" alt=${list[i].strMeal} class="w-100">
            <div class="overlay px-1 text-center bg-white bg-opacity-75 position-absolute text-dark d-flex flex-column justify-content-center">
                <h2 class="title">${list[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById("mealsContainer").innerHTML = cartona

    $("html, body").animate({
        scrollTop: 0
    }, 100)
}

async function filterByIngredient(ingrd) {
    $(".loading-screen").fadeIn(100);
    var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrd}`);
    var finalData = await apiResponse.json();
    list = finalData.meals.slice(0,20)
    $(".loading-screen").fadeOut(400);
    var cartona = ''
    for (let i = 0; i < list.length; i++) {
        
        cartona +=`<div class="col-md-6 col-lg-3">
        <div class="mealCard position-relative" onclick="fullInfo('${list[i].idMeal}');">
            <img src="${list[i].strMealThumb}" alt=${list[i].strMeal} class="w-100">
            <div class="overlay px-1 text-center bg-white bg-opacity-75 position-absolute text-dark d-flex flex-column justify-content-center">
                <h2 class="title">${list[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById("mealsContainer").innerHTML = cartona

    $("html, body").animate({
        scrollTop: 0
    }, 100)
}



$(".vertMenu ul li").click(async (e) => {

    let OpenClose = document.querySelector(".OpenClose")
    let showenData = e.target.getAttribute("meal-list")
    document.getElementById("search-container").innerHTML = ""
    var row = document.getElementById("mealsContainer")
    row.innerHTML = ""

    if (showenData  == "contact") {
        $(".loading-screen").fadeIn(100);
        $(".loading-screen").fadeOut(400);

        row.innerHTML = `
        <div id="contact" class="text-center w-75 m-auto">
            <h2 class="my-4">Contact Us</h2>
            <div class="row gy-3 mb-4">
                <div class="col-md-6">
                    <input type="text" name="" id="name" placeholder="Enter Your Name" class="text-center form-control p-2">
                    <div class="alert d-none" id="nameAlert">Plz Enter valid Name start with capital letter</div>
                </div>
                <div class="col-md-6">
                    <input type="email" name="" id="email" placeholder="Enter Your Email" class="text-center form-control p-2">
                    <div class="alert d-none" id="emailAlert"> Email is not Valid</div>
                </div>
                <div class="col-md-6">
                    <input type="tel" name="" id="phone" placeholder="Enter Your Phone" class="text-center form-control p-2">
                    <div class="alert d-none" id="phoneAlert"> Phone is not Valid</div>
                </div>
                <div class="col-md-6">
                    <input type="number" name="" id="age" placeholder="Enter Your Age" class="text-center form-control p-2">
                    <div class="alert d-none" id="ageAlert"> Age not valid</div>
                </div>
                <div class="col-md-6">
                    <input type="password" name="" id="password" placeholder="Enter Your password" class="text-center form-control p-2">
                    <div class="alert d-none" id="passwordAlert">verify that a password string is from length 8 - 16, while allowing word and non-word characters.</div>
                </div>
                <div class="col-md-6">
                    <input type="password" name="" id="re-password" placeholder="Retype Your Password" class="text-center form-control p-2">
                    <div class="alert d-none" id="reAlert">Passwords not Match</div>
                </div>
            </div>
            <button type="submit" onclick="submit()" class="btn btn-outline-success mb-5 " id="submitBtn">Submit</button>
        
      </div>`
      var userName = document.getElementById("name")
      var email = document.getElementById("email")
      var phone = document.getElementById("phone")
      var age = document.getElementById("age")
      var password = document.getElementById("password")
      var rePassword = document.getElementById("re-password")
       emailAlert = document.getElementById("emailAlert")
       nameAlert = document.getElementById("nameAlert")
       phoneAlert = document.getElementById("phoneAlert")
       ageAlert = document.getElementById("ageAlert")
       passwordAlert = document.getElementById("passwordAlert")
       reAlert = document.getElementById("reAlert")

            userName.addEventListener("keyup", validName)
            email.addEventListener("keyup", validEmail)
            age.addEventListener("keyup", validAge)
            phone.addEventListener("keyup", validPhone)
            password.addEventListener("keyup", validPassword)
            rePassword.addEventListener("keyup", validRepeat)
        $(".stripNav").animate({left:`-${menuWidth}px`}, 1000)
        OpenClose.innerHTML = '<i class="fa-solid fa-bars fa-2xl"></i>'
        $(".item1").animate({paddingTop:"800px" , opacity: "0"},800 , function (){
            $(".item2").animate({paddingTop:"800px", opacity: "0"},500 , function(){
                $(".item3").animate({paddingTop:"800px", opacity: "0"},500 , function(){
                    $(".item4").animate({paddingTop:"800px", opacity: "0"},500, function(){
                        $(".item5").animate({paddingTop:"800px", opacity: "0"},500)
                    })
                })
            })
        })
        
    }
    if (showenData == "search") {
        $(".loading-screen").fadeIn(100);
        $(".loading-screen").fadeOut(400);
        row.innerHTML = ""
        document.getElementById("search-container").innerHTML = `
        <div class="row">
				<div class="col-md-6 shade-search"><input id="searchInput" class="form-control" placeholder="Search By Name">
				</div>
				<div class="col-md-6 shade-search">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter">
				</div>

			</div>`

        $("#searchInput").keyup((e) => {
            search(e.target.value)
        })
        $("#letter").keyup((e) => {
            getByLetter(e.target.value)
        })

        $('#letter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
        $(".stripNav").animate({left:`-${menuWidth}px`}, 1000)
        OpenClose.innerHTML = '<i class="fa-solid fa-bars fa-2xl"></i>'
        $(".item1").animate({paddingTop:"800px" , opacity: "0"},800 , function (){
            $(".item2").animate({paddingTop:"800px", opacity: "0"},500 , function(){
                $(".item3").animate({paddingTop:"800px", opacity: "0"},500 , function(){
                    $(".item4").animate({paddingTop:"800px", opacity: "0"},500, function(){
                        $(".item5").animate({paddingTop:"800px", opacity: "0"},500)
                    })
                })
            })
        })

    }


    if (showenData == "categories") {
        displayCategories()
        $(".stripNav").animate({left:`-${menuWidth}px`}, 1000)
        OpenClose.innerHTML = '<i class="fa-solid fa-bars fa-2xl"></i>'
        $(".item1").animate({paddingTop:"800px" , opacity: "0"},800 , function (){
            $(".item2").animate({paddingTop:"800px", opacity: "0"},500 , function(){
                $(".item3").animate({paddingTop:"800px", opacity: "0"},500 , function(){
                    $(".item4").animate({paddingTop:"800px", opacity: "0"},500, function(){
                        $(".item5").animate({paddingTop:"800px", opacity: "0"},500)
                    })
                })
            })
        })


    } else if (showenData == "area") {
        displayArea()
        $(".stripNav").animate({left:`-${menuWidth}px`}, 1000)
        OpenClose.innerHTML = '<i class="fa-solid fa-bars fa-2xl"></i>'
        $(".item1").animate({paddingTop:"800px" , opacity: "0"},800 , function (){
            $(".item2").animate({paddingTop:"800px", opacity: "0"},500 , function(){
                $(".item3").animate({paddingTop:"800px", opacity: "0"},500 , function(){
                    $(".item4").animate({paddingTop:"800px", opacity: "0"},500, function(){
                        $(".item5").animate({paddingTop:"800px", opacity: "0"},500)
                    })
                })
            })
        })


    } else if (showenData == "ing") {

        displayIngredients()
        $(".stripNav").animate({left:`-${menuWidth}px`}, 1000)
        OpenClose.innerHTML = '<i class="fa-solid fa-bars fa-2xl"></i>'
        $(".item1").animate({paddingTop:"800px" , opacity: "0"},800 , function (){
            $(".item2").animate({paddingTop:"800px", opacity: "0"},500 , function(){
                $(".item3").animate({paddingTop:"800px", opacity: "0"},500 , function(){
                    $(".item4").animate({paddingTop:"800px", opacity: "0"},500, function(){
                        $(".item5").animate({paddingTop:"800px", opacity: "0"},500)
                    })
                })
            })
        })

    }


})

async function search(name) {
    
    var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    var finalData = await apiResponse.json();
    list = finalData.meals.slice(0,20)

    var cartona = ''
    for (let i = 0; i < list.length; i++) {
        
        cartona +=`<div class="col-md-3 col-6">
        <div class="mealCard position-relative" onclick="fullInfo('${list[i].idMeal}');">
            <img src="${list[i].strMealThumb}" alt=${list[i].strMeal} class="w-100">
            <div class="overlay px-1 text-center bg-white bg-opacity-75 position-absolute text-dark d-flex flex-column justify-content-center">
                <h2 class="title">${list[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById("mealsContainer").innerHTML = cartona

    $("html, body").animate({
        scrollTop: 0
    }, 100)
}


async function getByLetter(letter) {
    if (letter) {
        var apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    var finalData = await apiResponse.json();
    list = finalData.meals.slice(0,20)

    var cartona = ''
    for (let i = 0; i < list.length; i++) {
        
        cartona +=`<div class="col-md-3 col-6">
        <div class="mealCard position-relative" onclick="fullInfo('${list[i].idMeal}');">
            <img src="${list[i].strMealThumb}" alt=${list[i].strMeal} class="w-100">
            <div class="overlay px-1 text-center bg-white bg-opacity-75 position-absolute text-dark d-flex flex-column justify-content-center">
                <h2 class="title">${list[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById("mealsContainer").innerHTML = cartona

    $("html, body").animate({
        scrollTop: 0
    }, 100)
}
}


function validateEmail() 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) == true)
  {
    return (true);
  } else {
    return (false); }
}

function validateName() 
{
    var userName = document.getElementById("name")

 if (/^[A-Z][a-z]{2,8}$/.test(userName.value) == true)
  {
    return (true);
  } else {
    return (false); }
}

function validatePhone() 
{
 if (/^(002){0,1}01[0125][0-9]{8}$/gm.test(phone.value) == true)
  {
    return (true);
  } else {
    return (false); }
}
    

function validatePassword() 
{
 if (/^([\W\w])([^\s]){8,16}$/.test(password.value) == true)
  {
    return (true);
  } else {
    return (false); }
}

function validateAge() 
{
 if (/^[1-9][0-9]{0,1}$/gm.test(age.value) == true)
  {
    return (true);
  } else {
    return (false); }
}

function submit() {
    var rePassword = document.getElementById("re-password")


    if (validateEmail() == true && validatePassword() == true && validatePhone() == true && validateAge() == true && password.value == rePassword.value && validateName() == true) {
        alert("Success")
    }
} 


function validEmail() {
    
    if (validateEmail() == false) {
        emailAlert.classList.replace("d-none", "d-block")
       
    } else {
        emailAlert.classList.replace("d-block", "d-none")
    }
}
function validPassword() {
    if (validatePassword() == false) {
        passwordAlert.classList.replace("d-none", "d-block")
       
    } else {
        passwordAlert.classList.replace("d-block", "d-none")
    }
}
function validPhone() {
    if (validatePhone() == false) {
        phoneAlert.classList.replace("d-none", "d-block")
       
    } else {
        phoneAlert.classList.replace("d-block", "d-none")
    }
}
function validAge() {
    if (validateAge() == false) {
        ageAlert.classList.replace("d-none", "d-block")
       
    } else {
        ageAlert.classList.replace("d-block", "d-none")
    }
}
function validName() {
    var userName = document.getElementById("name")

    if (validateName() == false) {
        nameAlert.classList.replace("d-none", "d-block")
       
    } else {
        nameAlert.classList.replace("d-block", "d-none")
    }
}
function validRepeat() {
    var rePassword = document.getElementById("re-password")
    if (password.value != rePassword.value) {
        reAlert.classList.replace("d-none", "d-block")
       
    } else {
        reAlert.classList.replace("d-block", "d-none")
    }
    
}
