/* Global Variables */
// URL to OpenWeatherMap "API to get weather by ZipCode"
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';        
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=7bb4260b19a9199096c7999151a86ccc&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear(); 

// Event Listener to add function to existing HTML DOM Element
document.getElementById('generate').addEventListener('click', () => {         
    performAction();
});

// Function called by Event Listener
function performAction(){
    // Collect User Inputs in variables 
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // Function to set the new informations
    WeatherInfo(baseURL, zipCode, apiKey).then(function (data){
        // function to add the new data 
        postData('/add', {
            date: d,
            temp: data.main.temp,
            content: feelings
        }).then(updateUI());
    });
};

// Function to GET web API data 
const WeatherInfo = async (baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL+zipCode+apiKey); // using async to fetch the URL Information
    try {
        // User Information = result of fetch 
        const data = await response.json();
        return data; // to save the data value 
    } catch (error){
        console.log(`Error: `, error); // to log errors
    }
};

// an async function to make a POST request that has two arguments: a url to make the POST to, and a JavaScript object holding the data to post
const postData = async (url = '', data = {}) => {
    const request = await fetch(url, {
        method: 'Post',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(data)
    });
    try {
        const newData = await request.json();
        return newData;
    } catch(error){
        console.log(`Error: `, error); // to log errors
    }
};

// Function to GET Project Data 
const updateUI = async ()=> {
    const request = await fetch('/all');
    try {
        const fullData = await request.json();
        //putting the new data to html
        document.getElementById('date').innerHTML = 'Date: ' + fullData.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + fullData.temp + '&deg;C';
        document.getElementById('content').innerHTML = 'Feelings: ' + fullData.content;
    } catch(error) {
        console.log(`Error: `, error); // to log errors
    }
};