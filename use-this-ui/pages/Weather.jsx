import React, { useState } from "react";
import "../sankari.css";
import Navbar from "../components/Navbar";

import sunny from "../assets/weather/sunny.jpg";
import cloudy from "../assets/weather/cloudy.jpg";
import rainy from "../assets/weather/rainy.jpg";
import storm from "../assets/weather/storm.jpg";
import sunrise from "../assets/weather/sunrise.jpg";
import mist from "../assets/weather/harvest.jpg";
import night from "../assets/weather/night.jpg";

import {
WiDaySunny,
WiCloud,
WiRain,
WiThunderstorm,
WiSunrise,
WiFog,
WiNightClear
} from "react-icons/wi";

import {
FaMapMarkerAlt,
FaTemperatureHigh,
FaTint,
FaWind
} from "react-icons/fa";

const Weather = () => {

const weatherData=[

{
id:1,
day:"Today",
temp:"30°C",
condition:"Sunny",
city:"Coimbatore",
country:"India",
humidity:"68%",
wind:"14 km/h",
feels:"33°C",
image:sunny,
icon:<WiDaySunny/>
},

{
id:2,
day:"Tuesday",
temp:"28°C",
condition:"Cloudy",
city:"Coimbatore",
country:"India",
humidity:"72%",
wind:"11 km/h",
feels:"30°C",
image:cloudy,
icon:<WiCloud/>
},

{
id:3,
day:"Wednesday",
temp:"26°C",
condition:"Rain",
city:"Coimbatore",
country:"India",
humidity:"91%",
wind:"18 km/h",
feels:"27°C",
image:rainy,
icon:<WiRain/>
},

{
id:4,
day:"Thursday",
temp:"25°C",
condition:"Storm",
city:"Coimbatore",
country:"India",
humidity:"93%",
wind:"25 km/h",
feels:"25°C",
image:storm,
icon:<WiThunderstorm/>
},

{
id:5,
day:"Friday",
temp:"29°C",
condition:"Sunrise",
city:"Coimbatore",
country:"India",
humidity:"61%",
wind:"12 km/h",
feels:"31°C",
image:sunrise,
icon:<WiSunrise/>
},

{
id:6,
day:"Saturday",
temp:"27°C",
condition:"Mist",
city:"Coimbatore",
country:"India",
humidity:"84%",
wind:"8 km/h",
feels:"28°C",
image:mist,
icon:<WiFog/>
},

{
id:7,
day:"Sunday",
temp:"24°C",
condition:"Night",
city:"Coimbatore",
country:"India",
humidity:"55%",
wind:"9 km/h",
feels:"25°C",
image:night,
icon:<WiNightClear/>
}

];

const [active,setActive]=useState(0);

const current=weatherData[active];

return(

<>

<Navbar/>

<div
className="weather-v2"
style={{
backgroundImage:`url(${current.image})`
}}
>
    <div className="weather-dark-layer">
        <div className="weather-content">
            <div className="weather-left">
                <h5 className="weather-day">
                {current.day.toUpperCase()}
                </h5>   
                <h1 style={{color:"#ffffff"}}className="weather-temp">
                {current.temp}
                </h1>
            <div className="weather-condition">
                <div className="condition-icon"> {current.icon}
                </div>
                <span> {current.condition} </span>
            </div>
            <div className="weather-location">
                <FaMapMarkerAlt/>
                    <p>
                    {current.city}, {current.country}
                    </p>
            </div>
            <div className="weather-small-boxes">
                <div className="small-box">
                    <FaTemperatureHigh/>
                        <h4>Feels Like</h4>
                        <p>{current.feels}</p>
                </div>
                <div className="small-box">
                    <FaTint/>
                        <h4>Humidity</h4>
                        <p>{current.humidity}</p>
                </div>
                <div className="small-box">
                    <FaWind/>
                        <h4>Wind</h4>
                        <p>{current.wind}</p>
                </div>
            </div>
        </div>
        <div className="weather-right">
            <div className="weather-right-panel">
                
               <div className="weather-card-stack">
                    {weatherData.map((item,index)=>{

                    const position=(index-active+weatherData.length)%weatherData.length;
                    
                    if(position>3) return null;
                    return(

                    <div
                    key={item.id}
                    className={`weather-preview-card ${position===0 ? "active-preview" : ""}`}
                    onClick={()=>setActive(index)}
                    style={{
                    left:`${position*95}px`,
                    top:`${position*18}px`,
                    zIndex:20-position,
                    backgroundImage:`url(${item.image})`
                    }}
                    >

                        <div className="preview-overlay">
                            <div className="preview-top">

                                <h2>
                                {item.day}
                                </h2>
                            </div>

                            <div className="preview-middle">
                                <div className="preview-icon">
                                    {item.icon}

                                </div>

                            </div>
                            <div className="preview-bottom">
                                <h3>
                                {item.temp}
                                </h3>
                                <p>
                                {item.condition}
                                </p>
                            </div>

                        </div>
                    </div>

                    );
                    })}
                </div>
            </div>
        </div>
        <div className="weather-floating-panel">
            <div className="floating-item">
                <span>Pressure</span>
                <h3>1008 hPa</h3>
            </div>
                    <div className="floating-item">
                        <span>Visibility</span>
                        <h3>8 km</h3>
                    </div>
                    <div className="floating-item">
                        <span>UV Index</span>
                        <h3>5</h3>
                    </div>
                    <div className="floating-item">
                        <span>Rain Chance</span>
                        <h3>18%</h3>
                    </div>
                </div>
                <div className="weather-page-number">
                    <span>
                        {String(current.id).padStart(2,"0")}
                    </span>
                    <div className="page-line"></div>
                    <span>
                        07
                    </span>
                </div>
                <div className="weather-scroll-indicator">
                    <div className="scroll-mouse">
                        <div className="scroll-wheel"></div>
                    </div>
                    <p>
                        Scroll
                    </p>
                </div>
            </div>
            </div>
    </div>
    </>
    );
};
export default Weather;