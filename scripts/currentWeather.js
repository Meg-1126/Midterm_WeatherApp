
import nicolasApi from "./nicolasAPIkey.js"

// Fetching API

fetch(`https://api.openweathermap.org/data/2.5/weather?q=vancouver&appid=${nicolasApi}&units=metric`)
.then((response) => response.json())

.then((result) =>{
  // Variables
  const lowestTemperature=Math.floor(result.main.temp_min)
  const highestTemperature=Math.floor(result.main.temp_max);
  const temperatureRealTime=Math.floor(result.main.temp);
  const nameOfCity=result.name

  const loadData=()=>{
    const element=document.querySelector("#currentWeather")
    return element.innerHTML=`
    <h1>${nameOfCity},${result.sys.country}</h1>
    <h2>${temperatureRealTime}°</h2>
    <h3>H:${highestTemperature}°</h3>
    <h3>L:${lowestTemperature}°</h3>
    <h3>${result.weather[0].description}</h3>
    <h3>Humidity:${result.main.humidity}%</h3>
    <img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="result.weather[0].description"> </img>
    <favorite-star></favorite-star>`
  }
  loadData();

// Favorite Star code
  function addRating(obj) {
    $('li').each(function(index) {
      $(this).toggleClass('selected');
      $('#rating').val((index + 1));
      if (index == $("li").index(obj)) {
        return false;
      }
    });
  }
  $("#fav").on('click',function() {
    addRating(this);
  });
// Favorite Bar
const starButton=document.querySelector(".fav__item")
starButton.addEventListener("click",(e)=>{
  if(starButton.classList.contains('selected')){
    if((localStorage.getItem('cityName')==null)){
      localStorage.setItem('cityName','[]')
    }
    let old_data=JSON.parse(localStorage.getItem('cityName'));
    old_data.push(nameOfCity)
    localStorage.setItem('cityName',JSON.stringify(old_data));
  }

  
})
  console.log(result)
})

  .catch((err)=>{
   console.log(err);
 })


// Input Data
let inputCity=document.querySelector("#searchTextField");
let searchBtn=document.querySelector("#searchBtn");
searchBtn.addEventListener('click',z=>{
  let inputValue=inputCity.value;
  let firstName;
  if(inputValue.indexOf(",")>-1){
    firstName= inputValue.split(',')[0];
  }else{
    firstName=inputValue.split(' ')[0]
  }
  console.log(firstName);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${firstName}&appid=${nicolasApi}&units=metric`)
.then((response) => response.json())

.then((result) =>{
  // Variables
  const lowestTemperature=Math.floor(result.main.temp_min)
  const highestTemperature=Math.floor(result.main.temp_max);
  const temperatureRealTime=Math.floor(result.main.temp);
  const nameOfCity=result.name

  const loadData=()=>{
    const element=document.querySelector("#currentWeather")
    return element.innerHTML=`
    <h1>${nameOfCity},${result.sys.country}</h1>
    <h2>${temperatureRealTime}°</h2>
    <h3>H:${highestTemperature}°</h3>
    <h3>L:${lowestTemperature}°</h3>
    <h3>${result.weather[0].description}</h3>
    <h3>Humidity:${result.main.humidity}%</h3>
    <img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="result.weather[0].description"> </img>
    <favorite-star></favorite-star>`
  }
  loadData();
}) ;
})

 