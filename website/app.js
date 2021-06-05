/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=8413c82bdd64dff687f5251aaca42e0b";
//add listener function when click the generate button
document.getElementById("generate").addEventListener("click", getData);

function getData(){
    const zip = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;

    weatherData(apiURL,zip,apiKey)
    .then((data)=>{
        console.log();
        postData("/posting",{date: newDate, temperature:data.main.temp, feeling:feeling, icon:data.weather[0].icon, description: data.weather[0].description});
    })
};

//get the weather data from the open weather map API 
const weatherData = async (apiURL,zip,apiKey)=>{
    const response = await fetch(apiURL+zip+"&units=metric"+apiKey); // make the unit measure in celisus degreee
    // handle embty or uncorrect zip code 
    if (!zip){                                    
        alert("Please enter the Zip code")
    }else if(response.status === 404){
        alert("Please enter correct Zip code");
    }
    try{
        const apiData = await response.json();
        console.log(apiData);
        return apiData;
    }catch(error){
        console.log(error,"error");
    }
};

// send the weather data to the server 
const postData = async (url = "", data = {})=>{
    const posting = await fetch(url,{
        method:"POST",
        credentials:"same-origin",
        headers:{
        'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
    })
    try{
        const postingData =  await posting.json();
        console.log(postingData);
        editing();
        return postingData;
    }catch(error){
        console.log("error",error)
    }

};

// send a get requset from the server to get the date , temperature , description of the weather , icon and the feeling

const editing = async ()=>{
    const fetchingData = await fetch ("/get");
    try{
        const allData = await fetchingData.json();
        document.getElementById("date").innerHTML=`Date: ${allData.date}`;
        document.getElementById("temp").innerHTML=`Temperature: ${allData.temperature}°C`;
        document.getElementById("description").innerHTML=`<p style="float:left;">Description: ${allData.description}</p> <img src="http://openweathermap.org/img/wn/${allData.icon}@2x.png">`
        document.getElementById("content").innerHTML=`Your feeling: ${allData.feeling}`;
    }catch(error){
        console.log("error",error);
    }
};


