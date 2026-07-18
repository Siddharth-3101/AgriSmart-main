import React, { useState } from "react";
import "../styles/onotification.css";
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
  FaBullhorn,
  FaExclamationTriangle,
  FaPaperPlane,
  FaFilter,
} from "react-icons/fa";


import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { WiDaySunny } from "react-icons/wi";

const ONotification = () => {

  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
const categoryData = [

  { name:"Weather", value:35 },

  { name:"Agriculture", value:30 },

  { name:"Government", value:20 },

  { name:"General", value:15 }

];
 const officer = {

    name:"Rajesh Kumar",

    designation:"Agriculture Officer"};
const categoryColors = [

  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#8b5cf6"

];

const publishData = [

  { month:"Jan", count:12 },

  { month:"Feb", count:18 },

  { month:"Mar", count:22 },

  { month:"Apr", count:16 },

  { month:"May", count:28 },

  { month:"Jun", count:32 }

];

const reachData = [

  { name:"Viewed", value:70 },

  { name:"Unread", value:20 },

  { name:"Acknowledged", value:10 }

];

const reachColors = [

  "#2563eb",
  "#f59e0b",
  "#10b981"

];

const activities = [

  {

    title:"Heavy Rain Alert Published",

    description:"Weather warning sent to all farmers.",

    time:"09:15 AM"

  },

  {

    title:"PM-Kisan Notification",

    description:"New scheme announced to all villages.",

    time:"10:40 AM"

  },

  {

    title:"Training Camp Notice",

    description:"Agriculture training scheduled for next week.",

    time:"12:10 PM"

  },

  {

    title:"Disease Alert Updated",

    description:"Rice blast disease advisory published.",

    time:"02:00 PM"

  }

];
  const menuItems = [

    {
      name:"Dashboard",
      icon:<FaHome/>,
      path:"/officer/dashboard"
    },

    {
      name:"Farmers",
      icon:<FaUsers/>,
      path:"/officer/farmers"
    },

    {
      name:"Farms",
      icon:<FaTractor/>,
      path:"/officer/ofarms"
    },
 {
      name:"Schemes",
      icon:<FaClipboardList/>,
      path:"/officer/oschemes"
    },
    {
      name:"Crops",
      icon:<FaLeaf/>,
      path:"/officer/ocrop"
    },

   

    {
      name:"Weather",
      icon:<WiDaySunny/>,
      path:"/officer/oweather"
    },

    {
      name:"Notifications",
      icon:<FaBell/>,
      path:"/officer/onotifications"
    },
    
        {
          name:"Profile",
          icon:<FaUserCircle/>,
          path:"/officer/oprofile"
        }
    

  ];

  const stats=[

    {
      title:"Total Notifications",
      value:"248",
      icon:<FaBell/>,
      color:"#2563eb",
      bg:"#dbeafe"
    },

    {
      title:"Active Alerts",
      value:"18",
      icon:<FaExclamationTriangle/>,
      color:"#ef4444",
      bg:"#fee2e2"
    },

    {
      title:"Broadcast Messages",
      value:"72",
      icon:<FaBullhorn/>,
      color:"#16a34a",
      bg:"#dcfce7"
    },

    {
      title:"Farmers Notified",
      value:"2,453",
      icon:<FaUsers/>,
      color:"#8b5cf6",
      bg:"#ede9fe"
    }

  ];

  return(

<div className="officer-container">

<div
className={`sidebar-overlay ${
showSidebar ? "show-overlay":""
}`}
onClick={()=>setShowSidebar(false)}
></div>

<aside
className={`officer-sidebar ${
showSidebar ? "show-sidebar":""
}`}
>

<div className="sidebar-header">

<h2>AgriSmart</h2>

<p>Notification Center</p>

</div>

<nav className="sidebar-menu">

{menuItems.map((item,index)=>(

<div
key={index}
className={`sidebar-menu-item ${
item.name==="Notifications"
?
"active-menu":""
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
placeholder="Search notifications..."
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

{/*====================================
            STATISTICS
=====================================*/}

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

{/*====================================
      CREATE NOTIFICATION
=====================================*/}

<section className="publish-card">

<div className="card-header">

<h2>

Publish Notification

</h2>

<p>

Create alerts and updates for farmers

</p>

</div>

<div className="publish-grid">

<div className="input-group">

<label>

Category

</label>

<select>

<option>Weather</option>

<option>Agriculture</option>

<option>Government</option>

<option>General</option>

</select>

</div>

<div className="input-group">

<label>

Notification Type

</label>

<select>

<option>Heavy Rain</option>

<option>Cyclone</option>

<option>Heat Wave</option>

<option>Pest Outbreak</option>

<option>Disease Alert</option>

<option>Irrigation Advisory</option>

<option>New Scheme</option>

<option>Training Camp</option>

<option>Fertilizer Distribution</option>

</select>

</div>

<div className="input-group full-width">

<label>

Title

</label>

<input
type="text"
placeholder="Enter notification title..."
/>

</div>

<div className="input-group full-width">

<label>

Description

</label>

<textarea
rows="6"
placeholder="Write notification..."
></textarea>

</div>
<div className="input-group">

<label>

Recipients

</label>

<select>

<option>All Farmers</option>

<option>Selected Village</option>

<option>Selected Farmers</option>

</select>

</div>

<div className="input-group">

<label>

Priority

</label>

<select>

<option>Low</option>

<option>Medium</option>

<option>High</option>

</select>

</div>

</div>

<div className="publish-buttons">

<button className="preview-btn">

Preview

</button>

<button className="publish-btn">

<FaPaperPlane/>

&nbsp;

Publish Notification

</button>

</div>

</section>

{/*====================================
        ALERTS & NOTIFICATIONS
=====================================*/}

<section className="notification-layout">

{/*=============================
        ALERTS PANEL
==============================*/}

<div className="alerts-card">

<h3>

Active Alerts

</h3>

<div className="alert-list">

<div className="alert-item danger">

<h4>

🌧 Heavy Rain Alert

</h4>

<p>

Heavy rainfall expected within next 24 hours.

</p>

<span>

High Priority

</span>

</div>

<div className="alert-item warning">

<h4>

🔥 Heat Wave

</h4>

<p>

Temperature likely to exceed 40°C.

</p>

<span>

Medium Priority

</span>

</div>

<div className="alert-item warning">

<h4>

🐛 Pest Outbreak

</h4>

<p>

Armyworm detected in maize fields.

</p>

<span>

Medium Priority

</span>

</div>

<div className="alert-item success">

<h4>

🌱 Irrigation Advisory

</h4>

<p>

Reduce irrigation due to expected rainfall.

</p>

<span>

Low Priority

</span>

</div>

<div className="alert-item info">

<h4>

🏛 New Scheme

</h4>

<p>

Applications open for PM-Kisan.

</p>

<span>

Information

</span>

</div>

</div>

</div>

{/*=============================
        NOTIFICATION FEED
==============================*/}

<div className="feed-card">

<div className="feed-header">

<h3>

Recent Notifications

</h3>

<div className="feed-filter">

<FaFilter/>

<select>

<option>Today</option>

<option>This Week</option>

<option>This Month</option>

</select>

</div>

</div>

<div className="notification-feed">

<div className="feed-item">

<div className="feed-icon">

<FaUsers/>

</div>

<div className="feed-content">

<h4>

New Farmer Registered

</h4>

<p>

Ramesh Kumar has been added to the district database.

</p>

<span>

10 minutes ago

</span>

</div>

</div>

<div className="feed-item">

<div className="feed-icon">

<FaLeaf/>

</div>

<div className="feed-content">

<h4>

Crop Harvested

</h4>

<p>

Rice harvest updated by Lakshmi Devi.

</p>

<span>

30 minutes ago

</span>

</div>

</div>

<div className="feed-item">

<div className="feed-icon">

<FaClipboardList/>

</div>

<div className="feed-content">

<h4>

Scheme Application Submitted

</h4>

<p>

15 new PM-Kisan applications received.

</p>

<span>

1 hour ago

</span>

</div>

</div>

<div className="feed-item">

<div className="feed-icon">

<FaTractor/>

</div>

<div className="feed-content">

<h4>

Farm Profile Updated

</h4>

<p>

Farm details updated in Karimnagar village.

</p>

<span>

Today

</span>

</div>

</div>

<div className="feed-item">

<div className="feed-icon">

<FaBell/>

</div>

<div className="feed-content">

<h4>

Soil Report Uploaded

</h4>

<p>

Laboratory uploaded latest soil health report.

</p>

<span>

Yesterday

</span>

</div>

</div>

</div>

</div>

</section>
{/*====================================
        NOTIFICATION ANALYTICS
=====================================*/}

<section className="analytics-section">

  {/*==============================
        CATEGORY DISTRIBUTION
  ==============================*/}

  <div className="chart-card">

    <div className="chart-header">

      <h3>Notification Categories</h3>

    </div>

    <ResponsiveContainer width="100%" height={300}>

      <PieChart>

        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          outerRadius={95}
          innerRadius={55}
          paddingAngle={5}
        >

          {categoryData.map((item,index)=>(

            <Cell
              key={index}
              fill={categoryColors[index]}
            />

          ))}

        </Pie>

        <Tooltip/>

      </PieChart>

    </ResponsiveContainer>

  </div>

  {/*==============================
        MONTHLY NOTIFICATIONS
  ==============================*/}

  <div className="chart-card">

    <div className="chart-header">

      <h3>Notifications Published</h3>

    </div>

    <ResponsiveContainer width="100%" height={300}>

      <LineChart data={publishData}>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="month"/>

        <YAxis/>

        <Tooltip/>

        <Line
          type="monotone"
          dataKey="count"
          stroke="#2563eb"
          strokeWidth={4}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

  {/*==============================
        FARMER REACH
  ==============================*/}

  <div className="chart-card">

    <div className="chart-header">

      <h3>Farmer Reach</h3>

    </div>

    <ResponsiveContainer width="100%" height={300}>

      <PieChart>

        <Pie
          data={reachData}
          dataKey="value"
          innerRadius={60}
          outerRadius={90}
        >

          {reachData.map((item,index)=>(

            <Cell
              key={index}
              fill={reachColors[index]}
            />

          ))}

        </Pie>

        <Tooltip/>

      </PieChart>

    </ResponsiveContainer>

  </div>

</section>

{/*====================================
          RECENT ACTIVITY
=====================================*/}

<section className="timeline-card">

  <div className="card-header">

    <h2>Recent Activity</h2>

  </div>

  <div className="timeline">

    {activities.map((activity,index)=>(

      <div
        key={index}
        className="timeline-item"
      >

        <div className="timeline-dot"></div>

        <div className="timeline-content">

          <h4>{activity.title}</h4>

          <p>{activity.description}</p>

          <span>{activity.time}</span>

        </div>

      </div>

    ))}

  </div>

</section>

{/*====================================
            QUICK ACTIONS
=====================================*/}

<section className="quick-actions">

  <button>

    <FaBell/>

    Create Notification

  </button>

  <button>

    <FaBullhorn/>

    Broadcast Message

  </button>

  <button>

    <FaClipboardList/>

    View History

  </button>

  <button>

    <FaCog/>

    Notification Settings

  </button>

</section>

</div>

</div>

);

};

export default ONotification;