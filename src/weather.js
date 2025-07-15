
async function fetchtemp(city)
{
    try{  
  let response=await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&key=CKP52GNDBJMQJRLAVRSVYRPW6`, { mode: 'cors' });
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
function tempToday()
{
  
}
for(let i=0;i<5;i++)
{
 6
}
 
forecast(null);



