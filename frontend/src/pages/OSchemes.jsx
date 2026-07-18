import React, { useState } from "react";
import "../styles/oschemes.css";
import { useNavigate } from "react-router-dom";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiHumidity,
  WiStrongWind,
} from "react-icons/wi";
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
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaPaperPlane
} from "react-icons/fa";

import {
  MdAgriculture,
  MdDashboard
} from "react-icons/md";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const OSchemes = () => {

const navigate = useNavigate();

const [showSidebar,setShowSidebar]=useState(false);

const [selectedScheme,setSelectedScheme]=useState(0);

const [farmerFilter,setFarmerFilter]=useState("Applied");

const [message,setMessage]=useState("");

const menuItems=[
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
icon:<WiDaySunny />,
path:"/officer/oweather"
}
,
    {
      name: "Notifications",
      icon: <FaBell />,
      path: "/officer/onotification"
    }
    ,
    
        {
          name:"Profile",
          icon:<FaUserCircle/>,
          path:"/officer/oprofile"
        }
    
];

const stats=[
{
title:"Active Schemes",
value:"18",
icon:<FaClipboardList/>,
color:"#2563eb",
bg:"#dbeafe"
},
{
title:"Closed Schemes",
value:"6",
icon:<FaTimesCircle/>,
color:"#ef4444",
bg:"#fee2e2"
},
{
title:"Applications",
value:"4,258",
icon:<FaUsers/>,
color:"#22c55e",
bg:"#dcfce7"
},
{
title:"Beneficiaries",
value:"2,731",
icon:<FaCheckCircle/>,
color:"#8b5cf6",
bg:"#ede9fe"
}
];
const officer = {

    name:"Rajesh Kumar",

    designation:"Agriculture Officer"};
const schemes=[

{
id:1,
name:"PM Kisan Samman",
department:"Agriculture",
description:"Financial assistance provided to eligible farmers every year.",
eligibility:"Small and Marginal Farmers",
applied:1240,
eligible:1015,
rejected:225,
beneficiaries:980,
budget:"₹12 Crore",
startDate:"01 Jan 2026",
deadline:"31 Aug 2026"
},

{
id:2,
name:"Crop Insurance",
department:"Insurance",
description:"Insurance support against crop failure and natural disasters.",
eligibility:"Registered Farmers",
applied:980,
eligible:790,
rejected:190,
beneficiaries:760,
budget:"₹8 Crore",
startDate:"15 Feb 2026",
deadline:"15 Sept 2026"
},

{
id:3,
name:"Solar Pump Subsidy",
department:"Energy",
description:"Subsidy for installation of solar powered irrigation pumps.",
eligibility:"Farmers owning agricultural land",
applied:620,
eligible:530,
rejected:90,
beneficiaries:505,
budget:"₹5 Crore",
startDate:"10 Mar 2026",
deadline:"20 Oct 2026"
},

{
id:4,
name:"Organic Farming Mission",
department:"Agriculture",
description:"Financial assistance for adopting organic farming.",
eligibility:"All Farmers",
applied:540,
eligible:470,
rejected:70,
beneficiaries:455,
budget:"₹4 Crore",
startDate:"25 Apr 2026",
deadline:"15 Nov 2026"
}

];

const appliedFarmers=[
{
name:"Ravi Kumar",
village:"Hyderabad",
land:"4 Acres"
},
{
name:"Mahesh",
village:"Warangal",
land:"3 Acres"
},
{
name:"Lakshmi",
village:"Nizamabad",
land:"2 Acres"
},
{
name:"Suresh",
village:"Karimnagar",
land:"6 Acres"
}
];

const eligibleFarmers=[
{
name:"Ravi Kumar",
village:"Hyderabad",
land:"4 Acres"
},
{
name:"Lakshmi",
village:"Nizamabad",
land:"2 Acres"
}
];

const rejectedFarmers=[
{
name:"Mahesh",
village:"Warangal",
land:"3 Acres"
},
{
name:"Suresh",
village:"Karimnagar",
land:"6 Acres"
}
];

const schemePieData=[
{
name:"PM Kisan",
value:42
},
{
name:"Insurance",
value:28
},
{
name:"Solar",
value:18
},
{
name:"Organic",
value:12
}
];

const schemeBarData=[
{
scheme:"PM Kisan",
applications:1240
},
{
scheme:"Insurance",
applications:980
},
{
scheme:"Solar",
applications:620
},
{
scheme:"Organic",
applications:540
}
];

const pieColors=[
"#2563eb",
"#22c55e",
"#f59e0b",
"#8b5cf6"
];

const timelineData=[
{
title:"PM Kisan Started",
date:"01 Jan 2026"
},
{
title:"Crop Insurance Opened",
date:"15 Feb 2026"
},
{
title:"Solar Scheme Launched",
date:"10 Mar 2026"
},
{
title:"Organic Mission Started",
date:"25 Apr 2026"
}
];

/* Part 1B starts with

return(

*/
return (

<div className="officer-container">

  {/* =========================
        SIDEBAR OVERLAY
  ========================= */}

  <div
    className={`sidebar-overlay ${
      showSidebar ? "show-overlay" : ""
    }`}
    onClick={() => setShowSidebar(false)}
  ></div>

  {/* =========================
          SIDEBAR
  ========================= */}

  <aside
    className={`officer-sidebar ${
      showSidebar ? "show-sidebar" : ""
    }`}
  >

    <div className="sidebar-header">

      <h2>AgriSmart</h2>

      <p>Scheme Management</p>

    </div>

    <nav className="sidebar-menu">

      {menuItems.map((item,index)=>(

        <div

          key={index}

          className={`sidebar-menu-item ${
            item.name==="Schemes" ? "active-menu":""
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

  {/* =========================
          MAIN CONTENT
  ========================= */}

  <div className="dashboard-main">

    {/* =========================
            NAVBAR
    ========================= */}

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

            placeholder="Search Schemes..."

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

    {/* =========================
            STATS
    ========================= */}

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

    {/* =========================
      SCHEME SECTION
    ========================= */}

    <section className="scheme-management">

      {/* =========================
          LEFT SCROLLABLE LIST
      ========================= */}

      <div className="scheme-list-card">

        <div className="section-title">

          <h2>Available Schemes</h2>

        </div>

        <div className="scheme-scroll">

          {schemes.map((scheme,index)=>(

            <div

              key={scheme.id}

              className={`scheme-item ${
                selectedScheme===index
                ? "active-scheme"
                : ""
              }`}

              onClick={()=>setSelectedScheme(index)}

            >

              <h3>

                {scheme.name}

              </h3>

              <p>

                {scheme.department}

              </p>

              <div className="scheme-footer">

                <span>

                  Applied : {scheme.applied}

                </span>

                <span>

                  {scheme.deadline}

                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =========================
            RIGHT DETAILS
      ========================= */}

      <div className="scheme-details-card">

        <div className="details-header">

          <h2>

            {schemes[selectedScheme].name}

          </h2>

          <span>

            {schemes[selectedScheme].department}

          </span>

        </div>

        <p className="scheme-description">

          {schemes[selectedScheme].description}

        </p>

        <div className="details-grid">

          <div>

            <label>Eligibility</label>

            <h4>

              {schemes[selectedScheme].eligibility}

            </h4>

          </div>

          <div>

            <label>Total Applied</label>

            <h4>

              {schemes[selectedScheme].applied}

            </h4>

          </div>

          <div>

            <label>Beneficiaries</label>

            <h4>

              {schemes[selectedScheme].beneficiaries}

            </h4>

          </div>

          <div>

            <label>Budget</label>

            <h4>

              {schemes[selectedScheme].budget}

            </h4>

          </div>

          <div>

            <label>Start Date</label>

            <h4>

              {schemes[selectedScheme].startDate}

            </h4>

          </div>

          <div>

            <label>Deadline</label>

            <h4>

              {schemes[selectedScheme].deadline}

            </h4>

          </div>

        </div>

        {/* Part 3 starts below */}
        {/*====================================
                APPLICATION FILTERS
        ====================================*/}

        <div className="application-buttons">

          <button
            className={`filter-btn ${
              farmerFilter==="Applied" ? "active-filter":""
            }`}
            onClick={()=>setFarmerFilter("Applied")}
          >
            Applied
          </button>

          <button
            className={`filter-btn ${
              farmerFilter==="Eligible" ? "active-filter":""
            }`}
            onClick={()=>setFarmerFilter("Eligible")}
          >
            Eligible
          </button>

          <button
            className={`filter-btn ${
              farmerFilter==="Rejected" ? "active-filter":""
            }`}
            onClick={()=>setFarmerFilter("Rejected")}
          >
            Rejected
          </button>

        </div>

        {/*====================================
                FARMERS TABLE
        ====================================*/}

        <div className="farmer-table-container">

          <table className="farmer-table">

            <thead>

              <tr>

                <th>Farmer Name</th>

                <th>Village</th>

                <th>Land</th>

              </tr>

            </thead>

            <tbody>

              {(farmerFilter==="Applied"
                ? appliedFarmers
                : farmerFilter==="Eligible"
                ? eligibleFarmers
                : rejectedFarmers
              ).map((farmer,index)=>(

                <tr key={index}>

                  <td>{farmer.name}</td>

                  <td>{farmer.village}</td>

                  <td>{farmer.land}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </section>

    {/*====================================
            SEND NOTIFICATION
    ====================================*/}

    <section className="notification-card">

      <div className="section-title">

        <h2>Notify Farmers</h2>

      </div>

      <div className="notification-content">

        <div className="farmer-selection">

          <h4>Select Farmers</h4>

          <div className="checkbox-list">

            {appliedFarmers.map((farmer,index)=>(

              <label
                key={index}
                className="checkbox-item"
              >

                <input type="checkbox"/>

                <span>{farmer.name}</span>

              </label>

            ))}

          </div>

        </div>

        <div className="message-box">

          <h4>Message</h4>

          <textarea

            rows="8"

            placeholder="Type a message to notify selected farmers about this scheme..."

            value={message}

            onChange={(e)=>setMessage(e.target.value)}

          />

          <button className="send-btn">

            <FaPaperPlane/>

            Send Notification

          </button>

        </div>

      </div>

    </section>

    {/*====================================
        PART 3 STARTS HERE
        - Pie Chart
        - Most Applied Schemes
        - Timeline
    ====================================*/}
        {/*==========================================
            SCHEME ANALYTICS
    ==========================================*/}

    <section className="scheme-analytics">

      {/*==========================
            PIE CHART
      ==========================*/}

      <div className="chart-card pie-card">

        <div className="chart-header">

          <h3>Scheme Application Distribution</h3>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie

              data={schemePieData}

              dataKey="value"

              nameKey="name"

              cx="50%"

              cy="50%"

              innerRadius={60}

              outerRadius={100}

              paddingAngle={4}

            >

              {schemePieData.map((item,index)=>(

                <Cell

                  key={index}

                  fill={pieColors[index]}

                />

              ))}

            </Pie>

            <Tooltip/>

            <Legend/>

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/*==========================
          MOST APPLIED SCHEMES
      ==========================*/}

      <div className="chart-card bar-card">

        <div className="chart-header">

          <h3>Most Applied Schemes</h3>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={schemeBarData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="scheme"/>

            <YAxis/>

            <Tooltip/>

            <Bar

              dataKey="applications"

              fill="#2563eb"

              radius={[8,8,0,0]}

            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/*==========================
            QUICK SUMMARY
      ==========================*/}

      <div className="chart-card summary-card">

        <div className="chart-header">

          <h3>Quick Highlights</h3>

        </div>

        <div className="summary-list">

          <div className="summary-item">

            <h4>🏆 Most Applied</h4>

            <span>PM Kisan Samman</span>

          </div>

          <div className="summary-item">

            <h4>🆕 Latest Scheme</h4>

            <span>Organic Farming Mission</span>

          </div>

          <div className="summary-item">

            <h4>💰 Highest Budget</h4>

            <span>₹12 Crore</span>

          </div>

          <div className="summary-item">

            <h4>👨‍🌾 Total Beneficiaries</h4>

            <span>2,731 Farmers</span>

          </div>

        </div>

      </div>

    </section>

    {/*==========================================
              TIMELINE
    ==========================================*/}

    <section className="timeline-card">

      <div className="section-title">

        <h2>Scheme Timeline</h2>

      </div>

      <div className="timeline">

        {timelineData.map((item,index)=>(

          <div

            className="timeline-item"

            key={index}

          >

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <h4>

                {item.title}

              </h4>

              <p>

                {item.date}

              </p>

            </div>

          </div>

        ))}

      </div>

    </section>

  </div>

</div>

);

};

export default OSchemes;