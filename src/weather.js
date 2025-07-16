let time="6:00";
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
    console.log(data);
    let city_name=document.querySelector(".city");
    city_name.textContent="City: "+city;
    let Temperature=document.querySelector(".present-temp");
    Temperature.textContent="Present Temperature: "+data.currentConditions.temp+"°F";
    
    let new_btn=document.createElement("button");
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
}

function changetoCelsius(temp)
{
  let celsius=temp-32*(5/9);
  return celsius;
}


function changetime(time)
{
  let [hours, minutes] = time.split(":").map(Number);

 let date = new Date();
 date.setHours(hours);
 date.setMinutes(minutes);

 date.setHours(date.getHours() + 3);

let newTime = date.toTimeString().slice(0, 5);
return newTime;
}

async function dailyforecast()
{
for(let i=0;i<6;i++)
{

  let new_time=" ";
  let city="";
  if(i>1)new_time=time+" PM";
  else new_time=time+" AM";
  if(input.value) {
    city=input.value;
  }
  else {
    city="Noida";
  }
 let response= await fetchtemp(city);
 let time_dom=document.querySelector(`.time-${i}`);
 time_dom.textContent=new_time;
 let temp=document.querySelector(`.celsius-${i}`);
 temp.textContent=(changetoCelsius(response.days[0].hours[6+3*i].temp)).toFixed(2)+"°C";
 time=changetime(time);
}
}
dailyforecast(); 
forecast(null);



