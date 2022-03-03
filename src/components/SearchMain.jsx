import React, { useState, useEffect } from 'react';
import '../components/style.css';
import WeatherDetails from './WeatherDetails';

function SearchMain() {
    const [searchTerm, setSearchTerm] = useState('Holmestrand');
    const [tempInfo, setTempInfo] = useState({});

    //useEffect
    //Async
    //Promises
    // try catch

    const getWeatherInfo = async () => {
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=1ffa0e75af0748a321165243cdde62ef`;

            let res = await fetch(url);
            let data = await res.json();

            //grap the data:
            // (p.s. the same spelling as in json)
            const {temp, humidity, pressure} = data.main;
            // another main = weather type:
            const {main: weatherType} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            // Filling the object inside UseSTate line 7: 
            // object with data to pass weatherDetails:
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherType,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);

            // console.log(data);
        } catch (error) {
            console.log(error);
        }
        
    };

    useEffect( () => {
    // args: function and dependancy array.
    // how many elem in arr, so many times hook runs and function executed
    // (!) if leave arr empty, function executed only one when a page reloads
        getWeatherInfo();
    },[searchTerm]);

    return (
        <>
        <div className="wrap">
            <div className="search">
                <input 
                    type="search"
                    placeholder="Search city.."
                    id="search"
                    value={searchTerm}
                    onChange={(event) =>setSearchTerm(event.target.value)}
                />
            
                <button className="searchButton" onClick={getWeatherInfo}>
                    !Search 
                </button>
            </div>
        </div>
        {/* {weather details page} */}
        <WeatherDetails 
            // tempInfo={tempInfo}
            // spread operator:
            {...tempInfo}
        />
        </>
    )
}

export default SearchMain
