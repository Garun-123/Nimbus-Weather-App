async function fetchtemp(city)
{

    try{  
  let response=await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&key=CKP52GNDBJMQJRLAVRSVYRPW6`);
  if(!response.ok)
  {
    throw new Error('Network response was not ok');
  }
  let data=await response.json();
  return data;
  }
  catch(error)
  {
    console.log(error);
  }
}

let input=document.querySelector("#city");
const btn=document.querySelector("#btn");
const result=document.querySelector(".result");
btn.addEventListener("click",forecast);

async function forecast(event)

{
   if(event)
    event.preventDefault();
    let city=input.value||"Noida";
    let data=await fetchtemp(city);
    if (!data) return;
    console.log("City requested:", city);
    console.log(data);
    let city_name=document.querySelector(".city");
    city_name.textContent="City: "+city;
    let Temperature=document.querySelector(".present-temp");
    Temperature.textContent="Present Temperature: "+data.currentConditions.temp+"°F";
    
    let new_btn=document.createElement("button");
    new_btn.classList.add("celsius");
    new_btn.textContent="Change to Celsius";
    
    new_btn.addEventListener("click",()=>{
      if(new_btn.textContent=="Change to Celsius")
      {
        let temp_Celsius=changetoCelsius(data.currentConditions.temp);
        Temperature.textContent="Present Temperature: "+temp_Celsius.toFixed(2)+"°C";
        new_btn.textContent="Change to Fahrenheit";
        
        Temperature.append(new_btn);
      }
      else
      {
        Temperature.textContent="Present Temperature: "+data.currentConditions.temp+"°F";
        new_btn.textContent="Change to Celsius";
        
        Temperature.append(new_btn);

      }
    
    })
      
    new_btn.style.marginLeft="10px";
    Temperature.append(new_btn);

    let rain_prob=document.querySelector(".rain-probability");
    rain_prob.textContent="Rain Probability: "+data.currentConditions.precipprob+"%"; 

    let img=document.querySelector(".present-icon");
    let icon=data.currentConditions.icon;
    img.src=imageurl(icon);
       dailyforecast(city);
       futureforecast(city);
        airCondition(city); 
}

function changetoCelsius(temp)
{
  let celsius=(temp-32)*(5/9);
  return celsius;
}


function changetime(time)
{
  let [hours, minutes] = time.split(":").map(Number);

 let date = new Date();
 date.setHours(hours);
 date.setMinutes(minutes);
 if(date.getHours()>=12)
 {
  date.setHours(date.getHours()-12);
 }
 date.setHours(date.getHours() + 3);

let newTime = date.toTimeString().slice(0, 5);
return newTime;
}

async function dailyforecast(data) {
  let time = "6:00"; 

  for (let i = 0; i < 6; i++) {
    
    let new_time = time;
    if(i>1)
    {
      new_time+=" PM";
    }
    else
    {
      new_time+=" AM";
    }
    let city = data;

    let response = await fetchtemp(city);
    let time_dom = document.querySelector(`.time-${i}`);
    time_dom.textContent = new_time; 
    new_time=" ";
    let iconCode = response.days[0].hours[6 + 3 * i].icon;
    let iconUrl = imageurl(iconCode);
    document.querySelector(`#icon-${i}`).src = iconUrl;
    document.querySelector(`#icon-${i}`).alt = iconCode;
    let temp = document.querySelector(`.celsius-${i}`);
    temp.textContent = changetoCelsius(response.days[0].hours[6 + 3 * i].temp).toFixed(2) + "°C";

    time = changetime(time).split(" ")[0];

  }
}

function imageurl(iconCode) {
  if (iconCode === "clear-day") {
    return "https://cdn-icons-gif.flaticon.com/17102/17102813.gif";
  } 
  else if (iconCode === "clear-night") {
    return "https://cdn-icons-gif.flaticon.com/15585/15585721.gif";
  }
  else if (iconCode === "partly-cloudy-day") {
    return "https://cdn-icons-gif.flaticon.com/17102/17102931.gif";
  }
  else if (iconCode === "partly-cloudy-night") {
    return "https://cdn-icons-gif.flaticon.com/6455/6455043.gif";
  }
  else if (iconCode === "cloudy") {
    return "https://cdn-icons-gif.flaticon.com/17102/17102874.gif";
  }
  else if (iconCode === "rain") {
    return "https://cdn-icons-gif.flaticon.com/17102/17102963.gif";
  }
  else if (iconCode === "snow") {
    return "https://cdn-icons-gif.flaticon.com/19003/19003498.gif";
  }
  else if (iconCode === "sleet") {
    return "https://cdn-icons-png.flaticon.com/128/2204/2204342.png";
  }
  else if (iconCode === "wind") {
    return "https://cdn-icons-gif.flaticon.com/8793/8793300.gif";
  }
  else if (iconCode === "fog") {
    return "https://cdn-icons-gif.flaticon.com/6454/6454995.gif";
  }
  else if (iconCode === "hail") {
    return "https://cdn-icons-gif.flaticon.com/17858/17858185.gif";
  }
  else if (iconCode === "thunderstorm") {
    return "https://cdn-icons-gif.flaticon.com/17858/17858208.gif";
  }
  else {
    
    return "https://cdn-icons-gif.flaticon.com/18998/18998592.gif";
  }
}
function name_days(index)
{
  let date = new Date();
  let dayIndex = date.getDay()
  let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  if(dayIndex+index>6)return days[dayIndex+index-7]
  return days[dayIndex+index];
}

async function futureforecast(data)
{
  let response =await fetchtemp(data);
  for(let i=0;i<7;i++)
  {
   let day=document.querySelector(`.day-${i+1}`);
   day.textContent=name_days(i);
   let temp_Variation=document.querySelector(`.min-max-${i+1}`);
   temp_Variation.textContent=changetoCelsius(response.days[i].tempmax).toFixed(2)+"°C/"+changetoCelsius(response.days[i].tempmin).toFixed(2)+"°C";
   let icon=document.querySelector(`#new-icon-${i+1}`);
   icon.src=imageurl(response.days[i].icon);
  }
}

async function airCondition(data)
{
  let response=await fetchtemp(data);
  let feels_like=document.querySelector(".air-condition>.feels-like");
  feels_like.textContent="feels-like: "+response.currentConditions.feelslike;
  let wind=document.querySelector(".air-condition>.wind");
  wind.textContent="Wind-speed: "+response.currentConditions.windspeed;
  let humidity=document.querySelector(".air-condition>.humidity");
  humidity.textContent="Humidity: "+response.currentConditions.humidity;
  let uv=document.querySelector(".air-condition>.uv-index");
  uv.textContent="UV-index: "+response.currentConditions.uvindex;
}

forecast(null);
dailyforecast("Noida"); 
futureforecast("Noida");
airCondition("Noida");




