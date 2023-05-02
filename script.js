const randomMealEln=document.querySelector(".random-meal");
const loaderCon = document.querySelector(".loader-con");
const searchBtn = document.getElementById("search-btn");
const searchInpur = document.getElementById("search")
const result =document.querySelector(".result");
const mealModal = document.querySelector(".mealModal");

async function getRAndomApi() {
  try {
    loaderCon.style.display= "grid";
        const api = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data =await api.json();
    loaderCon.style.display= "none";
    const meal = data.meals[0];
    addMeal(meal);
    // console.log(meal);
  } catch (error) {
    console.log(error);
  }

}
getRAndomApi();

function addMeal(meal) {
 const mealelm = document.createElement("div");
 mealelm.classList.add("meal");
 mealelm.innerHTML=`<img src=${meal.strMealThumb} alt="">
 <div class="info">
     <p>${meal.strMeal.slice(0,20)}... </p>
     <a class="btn" href=${meal.strSource}>Watch Receipe</a>
 </div>`;
 randomMealEln.appendChild(mealelm);
 const imgEle=mealelm.querySelector("img");
 imgEle.addEventListener("click",()=>{
    showmealInfo(meal);
 })
}

async function getMealBySearch(search) {
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const data =await api.json();
    const meal = data.meals;
    console.log(meal);
    return meal;

}
getMealBySearch()

searchInpur.addEventListener("keypress", async (event)=>{
    if(event.keyCode===13){
    const value = searchInpur.value;
    loaderCon.style.display="grid";
    const meal = await getMealBySearch(value);
    if(meal===null){
        result.style.display="grid";
        loaderCon.style.display="none";
    }else{
        randomMealEln.innerHTML="";
        result.style.display="none";
        loaderCon.style.display="none";
        meal.forEach(element => {
            addMeal(element);
        });
        searchInpur.value="";
    }
    }
})
function showmealInfo(meal) {
 mealModal.style.transform="translateY(0)";
 mealModal.innerHTML = `<button class="aBtn"><i class="fas fa-chevron-left"></i></button>
 <div class="meal-img">
     <img src=${meal.strMealThumb} alt="">
 </div>
 
 <div class="mealInfo">
     <h1>${meal.strMeal}</h1>
     <p>${meal.strInstructions}</p>
      <a href=${meal.strYoutube} class="btn">Watch Now</a>
 </div>`
 const backBtn = document.querySelector(".aBtn");
 backBtn.addEventListener("click" ,()=> {
    mealModal.style.transform= "translateY(120%)";
 })
}
