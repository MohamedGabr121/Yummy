var myrow = document.getElementById("rowData");
let userName,
    userEmail,
    userPhone,
    userAge,
    userPassword,
    userRePassword,
    userNameAlert,
    userEmailAlert,
    userPhoneAlert,
    userAgeAlert,
    userpasswordAlert,
    userRepasswordAlert;
$(document).ready(function () {
    $('.fa-spin').fadeOut(1000, function () {
        $('.loading-screen').remove();
        $('body ,html').css("overflow", "auto")
    })
})
var nvaWidth,
    True = !0,
    arr = [];
$(".strip-toggel-menu").click(function () {
    True ? ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"),
        nvaWidth = $(".nav-tab-menu").width(),
        $(".strip-header-nav").css("left", nvaWidth),
        $(".fa-align-justify").toggleClass("fa-times"),
        $(".nav-tab-menu .item1").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1100), $(".nav-tab-menu .item2").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1200), $(".nav-tab-menu .item3").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1300), $(".nav-tab-menu .item4").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1400), $(".nav-tab-menu .item5").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1500), True = !True) : ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"),
            $(".fa-align-justify").toggleClass("fa-times"),
            $(".strip-header-nav").css("left", 0),
            $(".nav-tab-menu li").animate({
                opacity: "0",
                paddingTop: "500px"
            }, 500), True = !True)
});
async function search() {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    meals = await meals.json()
    displayMeals(meals.meals)
    console.log(meals);
    $(".loading-container").fadeOut(400)
    return meals
}
search()
function displayMeals(arr) {
    let cortain = ""
    for (let i = 0; i < arr.length; i++) {
        cortain += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick="getMeal('${arr[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${arr[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${arr[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    myrow.innerHTML = cortain
}
async function getMeal(mealID) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    console.log(mealID);
    displayMeal(meal.meals[0])
    $(".loading-container").fadeOut(500)
}
function displayMeal(meal) {
    let str = `
    <div class="col-md-4 myM text-white">
          <img class="w-100" src="${meal.strMealThumb}" alt=""
              srcset=""><br>
          <h1 class="mt-2">${meal.strMeal}</h1>
      </div>
      <div class="col-md-8 myM text-white text-start">
          <h2>Instructions</h2>
          <p>${meal.strInstructions}</p>
          <p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
          <p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
          <h3>Recipes :</h3>
          <ul class="d-flex " id="recipes">
          </ul>
          <h3 class="my-2 mx-1 p-1">Tags :</h3>
          <ul class="d-flex " id="tags">
          </ul>
          <a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
          <a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
      </div>`
    //
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 bg-info rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    // Tags
    let tags = meal.strTags?.split(",")
    console.log(tags);
    let tagsStr = ""
    for (let i = 0; i < tags?.length; i++) {
        tagsStr += `<li class="my-3 mx-1 p-1 bg-info rounded">${tags[i]}</li>`
    }
    myrow.innerHTML = str
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
}
function displayCategories() {
    let cartoin = ""
    for (var i = 0; i < arr.length; i++) cartoin += `
    <div class="col-md-6 col-lg-3 my-3 myM shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick="filterByCategory('${arr[i].strCategory}')" class="post">
                <img src='${arr[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${arr[i].strCategory}</h2>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    myrow.innerHTML = cartoin
}
function displayArea() {
    let cartoin = ""
    for (var i = 0; i < arr.length; i++) {
        cartoin += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div class="movie shadow rounded position-relative">
                <div onclick=(filterByArea('${arr[i].strArea}')) class="post ">
                    <i class="fa-solid fa-city fa-3x"></i>
                    <h2 class="text-white">${arr[i].strArea}</h2>
                </div>
            </div>
        </div>`
    }
    myrow.innerHTML = cartoin
}

function displayIngredients() {
    let cartoin = ""
    for (var i = 0; i < arr.length; i++) {
        cartoin += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div onclick="getMainIngredient('${arr[i].strIngredient}')" class="movie shadow rounded position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${arr[i].strIngredient}</h2>
                <p class="text-white">${arr[i].strDescription.split(" ").splice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>`
    }
    myrow.innerHTML = cartoin

}
async function getMainIngredient(mealName) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    displayMeals(meal.meals)
    $(".loading-container").fadeOut(500)
}
async function getCategories(listBy) {
    categories = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
    categories = await categories.json()
    return categories;
}
async function getByLetter(letter) {
    if (letter) {
        $(".loading-container").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
        $(".loading-container").fadeOut(100)
    }
}
async function filterByCategory(category) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    $(".loading-container").fadeOut(500)
}
async function filterByArea(area) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
    $(".loading-container").fadeOut(500)
}
$(".nav-item a").click(async (e) => {
    let listBy = e.target.getAttribute("data-list")
    document.getElementById("search-container").innerHTML = ""
    myrow.innerHTML = ""
    $("html, body").animate({
        scrollTop: 0
    }, 200)
    if (listBy == "contact") {
        myrow.innerHTML = `
        <section id="contact" class="container myM w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control shadow " onkeyup="validationOne()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validationTow()" class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validationThree()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validationFour()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validationFive()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validationSix()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

			<button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-3">Submit</button>
		</div>

	</section>`
    }
    if (listBy == "search") {
        myrow.innerHTML = ""
        document.getElementById("search-container").innerHTML = `
        <div class="row">
				<div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
				</div>
				<div class="col-md-6">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
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
    }
    let x;
    if (listBy == "categories") {
        $(".loading-container").fadeIn(100)
        x = await getCategories(listBy + ".php")
        arr = x.categories.splice(0, 20);
        displayCategories()
        $(".loading-container").fadeOut(500)
    } else if (listBy == "a") {
        $(".loading-container").fadeIn(100)
        x = await getCategories("list.php?a=list")
        arr = x.meals.splice(0, 20);
        displayArea()
        $(".loading-container").fadeOut(500)
    } else if (listBy == "i") {
        $(".loading-container").fadeIn(100)
        x = await getCategories("list.php?i=list")
        arr = x.meals.splice(0, 20);
        displayIngredients()
        $(".loading-container").fadeOut(500)
    }
})
function validationOne() {
    let userName = document.getElementById("name")
    let namealert = document.getElementById("namealert")
    // console.log(userName.value);
    var regexName = /^[a-zA-Z ]+$/
    console.log(regexName.test(userName.value));
    if (regexName.test(userName.value) == true) {
        userName.classList.add("is-valid")
        namealert.classList.replace('d-block','d-none')
        userName.classList.remove("is-invalid")
    }
    else {
        userName.classList.add("is-invalid")
        namealert.classList.replace('d-none','d-block')
        userName.classList.remove("is-valid")
    }
}
function validationTow() {
    let userEmail = document.getElementById("email");
    let emailalert = document.getElementById("emailalert");
    var regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    console.log(regexEmail.test(userEmail.value));
    if (regexEmail.test(userEmail.value) == true) {
        userEmail.classList.add("is-valid")
        emailalert.classList.replace('d-block','d-none')
        userEmail.classList.remove("is-invalid")
    }
    else {
        userEmail.classList.add("is-invalid")
        emailalert.classList.replace('d-none','d-block')
        userEmail.classList.remove("is-valid")
    }
    // console.log('hi');
}
function validationThree() {
    let userPhone = document.getElementById("phone")
    let phonealert =document.getElementById("phonealert");
    var regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (regexPhone.test(userPhone.value) == true) {
        userPhone.classList.add("is-valid")
        phonealert.classList.replace('d-block','d-none')
        userPhone.classList.remove("is-invalid")
    }
    else {
        userPhone.classList.add("is-invalid")
        userPhone.classList.remove("is-valid")
        phonealert.classList.replace('d-none','d-block')

    }
}
function validationFour() {
    let userAge = document.getElementById("age")
    let agealert=document.getElementById('agealert');
    var regexAge = /^[1-9][0-9]?$|^100$/
    if (regexAge.test(userAge.value) == true) {
        userAge.classList.add("is-valid")
        agealert.classList.replace('d-block','d-none')       
        userAge.classList.remove("is-invalid")
    }
    else {
        userAge.classList.add("is-invalid")
        agealert.classList.replace('d-none','d-block')       
        userAge.classList.remove("is-valid")
    }
}
function validationFive() {
    let userPassword = document.getElementById("password")
    let passwordalert = document.getElementById("passwordalert")
    var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (regexPassword.test(userPassword.value) == true) {
        userPassword.classList.add("is-valid")
        passwordalert.classList.replace('d-block','d-none')
        userPassword.classList.remove("is-invalid")
    }
    else {
        userPassword.classList.add("is-invalid")
        passwordalert.classList.replace('d-none','d-block')
        userPassword.classList.remove("is-valid")
    }
}
function validationSix() {
    let userRePassword = document.getElementById("rePassword");
    let userPassword = document.getElementById("password")
    let repasswordalert = document.getElementById("repasswordalert")
    if(userPassword.value == userRePassword.value){
        userRePassword.classList.add("is-valid")
        repasswordalert.classList.replace('d-block','d-none')
        userRePassword.classList.remove("is-invalid")
    }
    else{
        userRePassword.classList.add("is-invalid")
        repasswordalert.classList.replace('d-none','d-block')
        userRePassword.classList.remove("is-valid")
    }
}
