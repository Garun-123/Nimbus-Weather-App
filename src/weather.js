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

const input=document.querySelector("#city");
const btn=document.querySelector("#search");
btn.addEventListener("click",async(e)=>
{
    e.preventDefault();
    let city=input.value;
    let data=await fetchtemp(city);
    
});
