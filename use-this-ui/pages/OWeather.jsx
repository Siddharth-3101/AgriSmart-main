import React, { useState } from "react";
import "../styles/oweather.css";
import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaUsers,
  FaTractor,
  FaLeaf,
  FaClipboardList,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaCog,
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaCloudRain,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiHumidity,
  WiStrongWind,
} from "react-icons/wi";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const OWeather = () => {

  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
const rainfallComparison = [
  { month: "Jan", rainfall: 42 },
  { month: "Feb", rainfall: 38 },
  { month: "Mar", rainfall: 65 },
  { month: "Apr", rainfall: 82 },
  { month: "May", rainfall: 110 },
  { month: "Jun", rainfall: 146 },
  { month: "Jul", rainfall: 128 },
];
const villageWeather = [

  {
    village:"North Village",
    temperature:31,
    humidity:73,
    rainfall:18,
    wind:14,
    status:"Cloudy"
  },

  {
    village:"East Village",
    temperature:32,
    humidity:70,
    rainfall:10,
    wind:12,
    status:"Sunny"
  },

  {
    village:"South Village",
    temperature:29,
    humidity:82,
    rainfall:28,
    wind:18,
    status:"Rainy"
  },

  {
    village:"West Village",
    temperature:30,
    humidity:76,
    rainfall:15,
    wind:13,
    status:"Cloudy"
  }

];

const advisories = [

  {
    title:"🌾 Irrigation Advisory",
    description:"Reduce irrigation in areas expecting rainfall within the next 24 hours."
  },

  {
    title:"☀ Heat Advisory",
    description:"Schedule field work during morning or evening due to high daytime temperatures."
  },

  {
    title:"🌧 Rain Advisory",
    description:"Harvest-ready crops should be protected before expected rainfall."
  },

  {
    title:"💨 Wind Advisory",
    description:"Avoid pesticide spraying during high wind conditions."
  }

];

const recentUpdates = [

  {
    title:"Heavy Rain Alert Issued",
    description:"Rainfall expected in southern villages.",
    time:"30 mins ago"
  },

  {
    title:"Temperature Increased",
    description:"Maximum temperature reached 33°C.",
    time:"2 hours ago"
  },

  {
    title:"Humidity Dropped",
    description:"Humidity decreased by 8% compared to yesterday.",
    time:"Yesterday"
  },

  {
    title:"Weekly Forecast Updated",
    description:"Meteorological department released new 7-day forecast.",
    time:"2 days ago"
  }

];
const temperatureTrend = [
  { day: "Mon", temperature: 29 },
  { day: "Tue", temperature: 31 },
  { day: "Wed", temperature: 30 },
  { day: "Thu", temperature: 32 },
  { day: "Fri", temperature: 33 },
  { day: "Sat", temperature: 31 },
  { day: "Sun", temperature: 30 },
];
const officer = {

    name:"Rajesh Kumar",

    designation:"Agriculture Officer"};
const humidityTrend = [
  { day: "Mon", humidity: 65 },
  { day: "Tue", humidity: 70 },
  { day: "Wed", humidity: 74 },
  { day: "Thu", humidity: 72 },
  { day: "Fri", humidity: 76 },
  { day: "Sat", humidity: 73 },
  { day: "Sun", humidity: 71 },
];

const weatherAlerts = [
  {
    title: "Heavy Rain Alert",
    message: "Heavy rainfall expected in low-lying areas.",
    time: "Today",
    type: "danger",
  },
  {
    title: "High Temperature",
    message: "Temperature may reach 35°C tomorrow afternoon.",
    time: "Tomorrow",
    type: "warning",
  },
  {
    title: "Normal Wind",
    message: "Wind conditions are favorable for farming.",
    time: "Updated 1 hr ago",
    type: "success",
  },
];
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/officer/dashboard",
    },
    {
      name: "Farmers",
      icon: <FaUsers />,
      path: "/officer/farmers",
    },
    {
      name: "Farms",
      icon: <FaTractor />,
      path: "/officer/ofarms",
    },
    {
      name: "Schemes",
      icon: <FaClipboardList />,
      path: "/officer/oschemes",
    },
    {
      name: "Crops",
      icon: <FaLeaf />,
      path: "/officer/ocrop",
    },
    {
      name: "Weather",
      icon: <WiDaySunny />,
      path: "/officer/oweather",
    }
    ,
        {
          name: "Notifications",
          icon: <FaBell />,
          path: "/officer/onotification"
        },
        
            {
              name:"Profile",
              icon:<FaUserCircle/>,
              path:"/officer/oprofile"
            }
        
  ];

  const stats = [
    {
      title: "Temperature",
      value: "31°C",
      icon: <FaTemperatureHigh />,
      color: "#ef4444",
      bg: "#fee2e2",
    },
    {
      title: "Humidity",
      value: "74%",
      icon: <FaTint />,
      color: "#2563eb",
      bg: "#dbeafe",
    },
    {
      title: "Rainfall",
      value: "18 mm",
      icon: <FaCloudRain />,
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      title: "Wind Speed",
      value: "14 km/h",
      icon: <FaWind />,
      color: "#8b5cf6",
      bg: "#ede9fe",
    },
  ];

  const currentWeather = {
    location: "Coimbatore Region",
    temperature: 31,
    condition: "Partly Cloudy",
    humidity: 74,
    rainfall: 18,
    wind: 14,
  };

  const weeklyForecast = [
    {
      day: "Mon",
      temp: "30°C",
      icon: <WiDaySunny />,
      rain: "10%",
    },
    {
      day: "Tue",
      temp: "31°C",
      icon: <WiCloud />,
      rain: "20%",
    },
    {
      day: "Wed",
      temp: "29°C",
      icon: <WiRain />,
      rain: "65%",
    },
    {
      day: "Thu",
      temp: "32°C",
      icon: <WiDaySunny />,
      rain: "15%",
    },
    {
      day: "Fri",
      temp: "33°C",
      icon: <WiDaySunny />,
      rain: "5%",
    },
    {
      day: "Sat",
      temp: "30°C",
      icon: <WiCloud />,
      rain: "25%",
    },
    {
      day: "Sun",
      temp: "28°C",
      icon: <WiRain />,
      rain: "70%",
    },
  ];

  return (

<div className="officer-container">

<div
className={`sidebar-overlay ${
showSidebar ? "show-overlay" : ""
}`}
onClick={()=>setShowSidebar(false)}
></div>

<aside
className={`officer-sidebar ${
showSidebar ? "show-sidebar" : ""
}`}
>

<div className="sidebar-header">

<h2>AgriSmart</h2>

<p>Weather Management</p>

</div>

<nav className="sidebar-menu">

{menuItems.map((item,index)=>(

<div
key={index}
className={`sidebar-menu-item ${
item.name==="Weather"
? "active-menu":""
}`}
onClick={()=>navigate(item.path)}
>

<div className="menu-icon">

{item.icon}

</div>

<span>

{item.name}

</span>

</div>

))}

</nav>

</aside>

<div className="dashboard-main">

<header className="dashboard-navbar">

<div className="navbar-left">

<div
className="menu-toggle-btn"
onClick={()=>setShowSidebar(true)}
>

<FaBars/>

</div>

<div className="search-container">

<FaSearch className="search-icon"/>

<input
type="text"
placeholder="Search Region..."
className="search-input"
/>

</div>

</div>

<div className="navbar-right">

<div className="notification-btn">

<FaBell/>

</div>

<div className="profile-section">

<FaUserCircle className="profile-avatar"/>

<div>


<h4>{officer.name}</h4>

<p>{officer.designation}</p>

</div>

</div>

</div>

</header>

{/*=============================
        WEATHER STATS
=============================*/}

<section className="stats-section">

{stats.map((item,index)=>(

<div
key={index}
className="stats-card"
>

<div
className="stats-icon"
style={{
background:item.bg,
color:item.color
}}
>

{item.icon}

</div>

<div className="stats-content">

<h4>{item.title}</h4>

<h2>{item.value}</h2>

</div>

</div>

))}

</section>

{/*=============================
    CURRENT WEATHER
=============================*/}

<section className="weather-top">

<div className="current-weather-card">

<div className="weather-header">

<div>

<h2>{currentWeather.location}</h2>

<p>

<FaMapMarkerAlt/>

&nbsp;

Regional Weather

</p>

</div>

<WiDaySunny className="main-weather-icon"/>

</div>

<h1>

{currentWeather.temperature}°C

</h1>

<h3>

{currentWeather.condition}

</h3>

<div className="weather-details">

<div>

<WiHumidity/>

<span>Humidity</span>

<strong>

{currentWeather.humidity}%

</strong>

</div>

<div>

<WiRain/>

<span>Rainfall</span>

<strong>

{currentWeather.rainfall} mm

</strong>

</div>

<div>

<WiStrongWind/>

<span>Wind</span>

<strong>

{currentWeather.wind} km/h

</strong>

</div>

</div>

</div>

{/*=============================
      WEEKLY FORECAST
=============================*/}

<div className="forecast-card">

<h2>

Weekly Forecast

</h2>

<div className="forecast-list">

{weeklyForecast.map((day,index)=>(

<div
key={index}
className="forecast-item"
>

<h4>

{day.day}

</h4>

<div className="forecast-icon">

{day.icon}

</div>

<h3>

{day.temp}

</h3>

<p>

Rain {day.rain}

</p>

</div>

))}

</div>

</div>

</section>
{/*====================================
        WEATHER ANALYTICS
=====================================*/}

<section className="weather-analytics">

  {/*===========================
      RAINFALL COMPARISON
  ===========================*/}

  <div className="chart-card rainfall-card">

    <div className="chart-header">

      <h3>Monthly Rainfall Comparison</h3>

      <span>Rainfall (mm)</span>

    </div>

    <ResponsiveContainer width="100%" height={320}>

      <BarChart data={rainfallComparison}>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="month"/>

        <YAxis/>

        <Tooltip/>

        <Legend/>

        <Bar
          dataKey="rainfall"
          fill="#3b82f6"
          radius={[8,8,0,0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

  {/*===========================
      TEMPERATURE TREND
  ===========================*/}

  <div className="chart-card">

    <div className="chart-header">

      <h3>Temperature Trend</h3>

      <span>Last 7 Days</span>

    </div>

    <ResponsiveContainer width="100%" height={300}>

      <LineChart data={temperatureTrend}>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="day"/>

        <YAxis/>

        <Tooltip/>

        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#ef4444"
          strokeWidth={4}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

  {/*===========================
      HUMIDITY TREND
  ===========================*/}

  <div className="chart-card">

    <div className="chart-header">

      <h3>Humidity Trend</h3>

      <span>Average %</span>

    </div>

    <ResponsiveContainer width="100%" height={300}>

      <AreaChart data={humidityTrend}>

        <defs>

          <linearGradient
            id="humidityColor"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >

            <stop
              offset="5%"
              stopColor="#2563eb"
              stopOpacity={0.8}
            />

            <stop
              offset="95%"
              stopColor="#2563eb"
              stopOpacity={0}
            />

          </linearGradient>

        </defs>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="day"/>

        <YAxis/>

        <Tooltip/>

        <Area
          type="monotone"
          dataKey="humidity"
          stroke="#2563eb"
          fill="url(#humidityColor)"
        />

      </AreaChart>

    </ResponsiveContainer>

  </div>

</section>

{/*====================================
      WIND & WEATHER ALERTS
=====================================*/}

<section className="weather-bottom">

  <div className="wind-card">

    <div className="chart-header">

      <h3>Wind Speed Analysis</h3>

    </div>

    <div className="wind-container">

      <div className="wind-circle">

        <h1>14</h1>

        <span>km/h</span>

      </div>

      <div className="wind-info">

        <p>

          Moderate winds are expected across the region.

        </p>

        <div className="wind-status">

          Safe for irrigation and spraying activities.

        </div>

      </div>

    </div>

  </div>

  {/*===========================
        WEATHER ALERTS
  ===========================*/}

  <div className="alerts-card">

    <div className="chart-header">

      <h3>Weather Alerts</h3>

    </div>

    <div className="alert-list">

      {weatherAlerts.map((alert,index)=>(

        <div
          key={index}
          className={`alert-item ${alert.type}`}
        >

          <h4>

            {alert.title}

          </h4>

          <p>

            {alert.message}

          </p>

          <span>

            {alert.time}

          </span>

        </div>

      ))}

    </div>

  </div>

</section>
{/*==========================================
        VILLAGE WEATHER TABLE
===========================================*/}


{/*==========================================
        FARMING ADVISORY
===========================================*/}
<section className="advisory-section">

  {/*==================================
        WEATHER MESSAGE
  ==================================*/}

  <div className="message-card">

    <div className="chart-header">

      <h3>Weather Advisory Broadcast</h3>

      <span>Send Alert to All Farmers</span>

    </div>

    <div className="message-form">

      <label>Subject</label>

      <input
        type="text"
        placeholder="Ex: Heavy Rain Alert"
      />

      <label>Message</label>

      <textarea
        rows="8"
        placeholder="Type weather advisory here..."
      ></textarea>

      <button className="send-message-btn">

        Send Message to All Farmers

      </button>

    </div>

  </div>
</section>
  {/*==============================
        SEASONAL FORECAST
  ==============================*/}


{/*==========================================
        RECENT WEATHER UPDATES
===========================================*/}

<section className="timeline-card">

  <div className="chart-header">

    <h3>Recent Weather Updates</h3>

  </div>

  <div className="timeline">

    {recentUpdates.map((item,index)=>(

      <div
        key={index}
        className="timeline-item"
      >

        <div className="timeline-dot"></div>

        <div className="timeline-content">

          <h4>{item.title}</h4>

          <p>{item.description}</p>

          <span>{item.time}</span>

        </div>

      </div>

    ))}

  </div>

</section>

</div>

</div>

);

};

export default OWeather;