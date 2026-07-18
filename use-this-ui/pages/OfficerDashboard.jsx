import React, { useState } from "react";
import "../styles/officerdashboard.css"
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
  FaCloudRain,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaPaperPlane,
  FaUserPlus,
} from "react-icons/fa";

import {
  MdAgriculture,
  MdDashboard,
} from "react-icons/md";

import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiRain,
} from "react-icons/wi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
 function OfficerDashboard() {

  /*==========================================
            STATES
==========================================*/

  const [showSidebar, setShowSidebar] = useState(false);
const officer = {

    name:"Rajesh Kumar",

    designation:"Agriculture Officer"};
  const [alertMessage, setAlertMessage] = useState("");

  /*==========================================
              SIDEBAR
==========================================*/
const cropYieldData = [
  { crop: "Rice", quintal: 180, color: "#16a34a" },
  { crop: "Wheat", quintal: 145, color: "#f59e0b" },
  { crop: "Cotton", quintal: 120, color: "#3b82f6" },
  { crop: "Maize", quintal: 105, color: "#8b5cf6" },
  { crop: "Sugarcane", quintal: 210, color: "#ef4444" },
  { crop: "Millets", quintal: 85, color: "#14b8a6" },
];

const schemeData = [
  { name: "PM-KISAN", percentage: 40 },
  { name: "Crop Insurance", percentage: 28 },
  { name: "Soil Health", percentage: 18 },
  { name: "Micro Irrigation", percentage: 14 },
];

const schemeColors = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#8b5cf6",
];

const weatherData = {
  location: "Hyderabad",
  temperature: 31,
  condition: "Sunny",
  humidity: 65,
  windSpeed: 12,
  rainfall: 5,
};
const recentUsers = [
  {
    id: 1,
    name: "Ramesh Kumar",
    village: "Hyderabad",
    crop: "Rice",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    village: "Warangal",
    crop: "Cotton",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 3,
    name: "Anil Reddy",
    village: "Nizamabad",
    crop: "Maize",
    image: "https://randomuser.me/api/portraits/men/71.jpg",
  },
];

const monthlyRegistrations = [
  { month: "Jan", farmers: 42 },
  { month: "Feb", farmers: 56 },
  { month: "Mar", farmers: 68 },
  { month: "Apr", farmers: 75 },
  { month: "May", farmers: 82 },
  { month: "Jun", farmers: 96 },
];

const districtOverview = [
  { district: "Hyderabad", yield: 420 },
  { district: "Warangal", yield: 380 },
  { district: "Karimnagar", yield: 330 },
  { district: "Nizamabad", yield: 295 },
];

const recentActivities = [
  {
    date: "01",
    month: "JUL",
    title: "Farmer Registered",
    description: "Ramesh Kumar successfully registered.",
    time: "10:30 AM",
    color: "#16a34a",
  },
  {
    date: "30",
    month: "JUN",
    title: "Scheme Approved",
    description: "PM-KISAN approved for 26 farmers.",
    time: "09:20 AM",
    color: "#2563eb",
  },
  {
    date: "28",
    month: "JUN",
    title: "Weather Alert",
    description: "Heavy rainfall expected tomorrow.",
    time: "07:00 AM",
    color: "#ef4444",
  },
];
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/"
    },
    {
      name: "Farmers",
      icon: <FaUsers />,
      path: "/officer/farmers"
    },
    {
      name: "Farms",
      icon: <FaTractor />,
      path: "/officer/ofarms"
    },
    {
      name: "Schemes",
      icon: <FaClipboardList />,
      path: "/officer/oschemes"
    },
    {
      name: "Crops",
      icon: <FaLeaf />,
      path: "/officer/ocrop"
    },
    {
      name: "Weather",
      icon: <WiDaySunny />,
      path: "/officer/oweather"
    },
    {
      name: "Notifications",
      icon: <FaBell />,
      path: "/officer/onotification"
    },
    {
      name: "Profile",
      icon: <FaUserCircle />,
      path: "/officer/oprofile"
    },
  ];

  /*==========================================
              STATS
==========================================*/

  const stats = [
    {
      title: "Total Farmers",
      value: "2,453",
      color: "#22c55e",
      icon: <FaUsers />,
      bg: "#dcfce7",
    },
    {
      title: "Total Farms",
      value: "1,765",
      color: "#2563eb",
      icon: <MdAgriculture />,
      bg: "#dbeafe",
    },
    {
      title: "Crop Types",
      value: "29",
      color: "#f59e0b",
      icon: <FaLeaf />,
      bg: "#fef3c7",
    },
    {
      title: "Schemes",
      value: "16",
      color: "#8b5cf6",
      icon: <FaClipboardList />,
      bg: "#ede9fe",
    },
  ];
const navigate = useNavigate();
  return (

<div className="officer-container">

{/*===========================
OVERLAY
===========================*/}

<div
className={`sidebar-overlay ${
showSidebar ? "show-overlay" : ""
}`}
onClick={() => setShowSidebar(false)}
></div>

{/*===========================
SIDEBAR
===========================*/}

<aside
className={`officer-sidebar ${
showSidebar ? "show-sidebar" : ""
}`}
>

<div className="sidebar-header">

<h2>AgriSmart</h2>

<p>Officer Dashboard</p>

</div>
<nav className="sidebar-menu">

  {menuItems.map((item, index) => (

    <div
      key={index}
      className={`sidebar-menu-item ${
        index === 0 ? "active-menu" : ""
      }`}
      onClick={() => navigate(item.path)}
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

{/*===========================
MAIN
===========================*/}

<div className="dashboard-main">

{/*===========================
NAVBAR
===========================*/}

<header className="dashboard-navbar">

<div className="navbar-left">

<div
className="menu-toggle-btn"
onClick={() => setShowSidebar(true)}
>

<FaBars />

</div>

<div className="search-container">

<FaSearch className="search-icon"/>

<input
type="text"
placeholder="Search farmers, schemes..."
className="search-input"
/>

</div>

</div>

<div className="navbar-right">

<button className="notification-btn">

<FaBell />

</button>

<div className="profile-section">

<FaUserCircle className="profile-avatar"/>

<div className="profile-info">


<h4>{officer.name}</h4>

<p>{officer.designation}</p>



</div>

</div>

</div>

</header>

{/*===========================
BANNER
===========================*/}

<div className="top-section">

<section className="dashboard-banner">

<div className="banner-content">

<h1>

Welcome Back 👋

</h1>

<p>

Monitor farmers, schemes, weather,
crop production and district
activities from one intelligent
dashboard.

</p>

<button className="banner-button">

View Reports

</button>

</div>

<div className="banner-image">

<img
src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200"
alt="banner"
/>

</div>

</section>

{/*===========================
ALERT
===========================*/}

<section className="emergency-alert-card">

<div className="alert-header">

<div className="alert-title">

<FaExclamationTriangle className="alert-icon"/>

<div>

<h3>Emergency Alert</h3>

<p>Create district alert</p>

</div>

</div>

</div>

<textarea

className="alert-textbox"

placeholder="Type emergency notification..."

value={alertMessage}

onChange={(e)=>setAlertMessage(e.target.value)}

></textarea>

<div className="alert-footer">

<span>

{alertMessage.length}/250

</span>

<button className="send-alert-btn">

<FaPaperPlane />

&nbsp;

Send Alert

</button>

</div>

</section>

</div>

{/*===========================
STATISTICS
===========================*/}

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

<h4>

{item.title}

</h4>

<h2>

{item.value}

</h2>

</div>

</div>

))}

</section>
<section className="analytics-row">
<div className="chart-card">

<div className="chart-header">

<h3>Crop Yield Overview</h3>

<span>Yield (Quintals)</span>

</div>

<ResponsiveContainer width="100%" height={320}>

<BarChart data={cropYieldData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="crop"/>

<YAxis
label={{
value:"Quintals",
angle:-90,
position:"insideLeft"
}}
/>

<Tooltip/>

<Bar
dataKey="quintal"
radius={[8,8,0,0]}
>

{cropYieldData.map((entry,index)=>(
<Cell
key={index}
fill={entry.color}
/>
))}

</Bar>

</BarChart>

</ResponsiveContainer>

</div>

{/*==========================================
            SCHEME PIE
==========================================*/}

<div className="scheme-card">

<h3 className="chart-title">

Government Schemes

</h3>

<div className="scheme-container">

<div className="scheme-pie">

<ResponsiveContainer width="100%" height={250}>

<PieChart>

<Pie

data={schemeData}

dataKey="percentage"

nameKey="name"

innerRadius={55}

outerRadius={90}

paddingAngle={4}

>

{schemeData.map((item,index)=>(

<Cell

key={index}

fill={schemeColors[index]}

/>

))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

<div className="scheme-legend">

{schemeData.map((item,index)=>(

<div
key={index}
className="legend-item"
>

<div
className="legend-color"
style={{
background:schemeColors[index]
}}
></div>

<span>

{item.name}

</span>

<strong>

{item.percentage}%

</strong>

</div>

))}

</div>

</div>

</div>

{/*==========================================
            WEATHER
==========================================*/}

<div className="weather-card">

<div className="weather-header">

<div>

<h3>Today's Weather</h3>

<p>

<FaMapMarkerAlt/>

&nbsp;

{weatherData.location}

</p>

</div>

<WiDaySunny className="weather-main-icon"/>

</div>

<h1 className="weather-temp">

{weatherData.temperature}°C

</h1>

<p className="weather-condition">

{weatherData.condition}

</p>

<div className="weather-details">

<div className="weather-item">

<WiHumidity/>

<span>Humidity</span>

<strong>

{weatherData.humidity}%

</strong>

</div>

<div className="weather-item">

<WiStrongWind/>

<span>Wind</span>

<strong>

{weatherData.windSpeed} km/h

</strong>

</div>

<div className="weather-item">

<WiRain/>

<span>Rainfall</span>

<strong>

{weatherData.rainfall} mm

</strong>

</div>

</div>

</div>

</section>
{/*==========================
BOTTOM SECTION
==========================*/}

<section className="bottom-grid">

{/* RECENT FARMERS */}

<div className="recent-users-card">

<div className="recent-users-header">

<h3>Recently Added Farmers</h3>

</div>

<div className="recent-users-list">

{recentUsers.map(user=>(

<div
key={user.id}
className="recent-user-item"
>

<img
src={user.image}
alt={user.name}
className="recent-user-image"
/>

<div className="recent-user-info">

<h4>{user.name}</h4>

<p>{user.village}</p>

<span>{user.crop}</span>

</div>

</div>

))}

</div>

</div>

{/* MONTHLY REGISTRATION */}

<div className="registration-card">

<h3>Monthly Registrations</h3>

<ResponsiveContainer
width="100%"
height={260}
>

<LineChart data={monthlyRegistrations}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Line

type="monotone"

dataKey="farmers"

stroke="#2563eb"

strokeWidth={4}

dot={{r:5}}

activeDot={{r:7}}

/>

</LineChart>

</ResponsiveContainer>

</div>

{/* DISTRICT OVERVIEW */}

<div className="district-card">

<h3>District Crop Overview</h3>

<ResponsiveContainer
width="100%"
height={260}
>

<BarChart data={districtOverview}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="district"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="yield"
radius={[8,8,0,0]}
fill="#16a34a"
/>

</BarChart>

</ResponsiveContainer>

</div>

{/* TIMELINE */}

<div className="activity-card">

<div className="activity-header">

<h3>Recent Activities</h3>

</div>

<div className="activity-timeline">

{recentActivities.map((item,index)=>(

<div
key={index}
className="timeline-item"
>

<div className="timeline-date">

<h2>{item.date}</h2>

<span>{item.month}</span>

</div>

<div className="timeline-content">

<div className="timeline-title">

<h4>{item.title}</h4>

<span>{item.time}</span>

</div>

<p>

{item.description}

</p>

<div

className="timeline-dot"

style={{

background:item.color

}}

></div>

</div>

</div>

))}

</div>

</div>

</section>

</div>

</div>

);
}

export default OfficerDashboard;