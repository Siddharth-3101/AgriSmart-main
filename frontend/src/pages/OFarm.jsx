import React, { useState } from "react";
import "../styles/ofarm.css";
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
  FaMapMarkerAlt,
  FaTint,
  FaSeedling,
  FaMountain
} from "react-icons/fa";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiHumidity,
  WiStrongWind,
} from "react-icons/wi";
import {
  MdAgriculture,
  MdLandscape,
} from "react-icons/md";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const OFarm = () => {

  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  const [selectedFarm, setSelectedFarm] = useState(0);

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
    },
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
  const cultivationTrend = [
  { year: "2021", area: 14200 },
  { year: "2022", area: 15000 },
  { year: "2023", area: 16100 },
  { year: "2024", area: 16900 },
  { year: "2025", area: 17650 },
  { year: "2026", area: 18450 },
];

const soilDistribution = [
  { name: "Black", value: 40 },
  { name: "Red", value: 28 },
  { name: "Loamy", value: 20 },
  { name: "Clay", value: 12 },
];

const irrigationDistribution = [
  { name: "Drip", value: 35 },
  { name: "Canal", value: 30 },
  { name: "Sprinkler", value: 20 },
  { name: "Rain-fed", value: 15 },
];

const pieColors = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#8b5cf6",
];

  const stats = [
    {
      title: "Total Farms",
      value: "1,245",
      icon: <FaTractor />,
      color: "#2563eb",
      bg: "#dbeafe",
    },
    {
      title: "Cultivated Area",
      value: "18,450 Acres",
      icon: <MdLandscape />,
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      title: "Average Farm Size",
      value: "4.8 Acres",
      icon: <FaMountain />,
      color: "#f59e0b",
      bg: "#fef3c7",
    },
    {
      title: "Irrigated Farms",
      value: "72%",
      icon: <FaTint />,
      color: "#8b5cf6",
      bg: "#ede9fe",
    },
  ];
  const farmSizeData = [
  { size: "<2 Acres", farms: 120 },
  { size: "2-5 Acres", farms: 420 },
  { size: "5-10 Acres", farms: 310 },
  { size: ">10 Acres", farms: 95 },
];

const organicData = [
  { name: "Organic", value: 38 },
  { name: "Conventional", value: 62 },
];

const landUtilizationData = [
  { name: "Cultivated", value: 82 },
  { name: "Unused", value: 18 },
];

const activities = [
  {
    title: "New Farm Registered",
    description: "FRM005 added by Officer.",
    date: "Today",
  },
  {
    title: "Soil Survey Updated",
    description: "Black soil confirmed for FRM002.",
    date: "Yesterday",
  },
  {
    title: "Irrigation Changed",
    description: "Sprinkler upgraded to Drip.",
    date: "2 Days Ago",
  },
  {
    title: "Harvest Completed",
    description: "Rice harvested from FRM003.",
    date: "4 Days Ago",
  },
];
const officer = {

    name:"Rajesh Kumar",

    designation:"Agriculture Officer"};
  const farms = [

    {
      id:"FRM001",
      owner:"Ramesh Kumar",
      village:"Hyderabad",
      area:"4.5 Acres",
      crop:"Rice",
      soil:"Black Soil",
      irrigation:"Drip",
      status:"Active",
      cultivated:"82%",
      unused:"18%",
      survey:"SRY-2045",
      water:"Canal",
      stage:"Flowering",
      harvest:"15 Sept 2026",
      type:"Organic"
    },

    {
      id:"FRM002",
      owner:"Lakshmi Devi",
      village:"Warangal",
      area:"6 Acres",
      crop:"Cotton",
      soil:"Red Soil",
      irrigation:"Rain-fed",
      status:"Active",
      cultivated:"90%",
      unused:"10%",
      survey:"SRY-2087",
      water:"Rain",
      stage:"Vegetative",
      harvest:"30 Oct 2026",
      type:"Conventional"
    },

    {
      id:"FRM003",
      owner:"Mahesh Reddy",
      village:"Karimnagar",
      area:"3 Acres",
      crop:"Maize",
      soil:"Loamy Soil",
      irrigation:"Sprinkler",
      status:"Active",
      cultivated:"76%",
      unused:"24%",
      survey:"SRY-3032",
      water:"Borewell",
      stage:"Harvest Ready",
      harvest:"05 Aug 2026",
      type:"Organic"
    },

    {
      id:"FRM004",
      owner:"Suresh",
      village:"Nizamabad",
      area:"8 Acres",
      crop:"Groundnut",
      soil:"Clay Soil",
      irrigation:"Canal",
      status:"Active",
      cultivated:"88%",
      unused:"12%",
      survey:"SRY-4105",
      water:"Canal",
      stage:"Seedling",
      harvest:"20 Nov 2026",
      type:"Conventional"
    }

  ];

  return(

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

<p>Farm Management</p>

</div>

<nav className="sidebar-menu">

{menuItems.map((item,index)=>(

<div
key={index}
className={`sidebar-menu-item ${
item.name==="Farms"
?"active-menu":""
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
placeholder="Search Farms..."
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

<section className="farm-section">

<div className="farm-list-card">

<h2 className="section-title">

Farm Registry

</h2>

<div className="farm-scroll">

{farms.map((farm,index)=>(

<div
key={index}
className={`farm-item ${
selectedFarm===index
? "active-farm":""
}`}
onClick={()=>setSelectedFarm(index)}
>

<h3>{farm.id}</h3>

<p><strong>Owner :</strong> {farm.owner}</p>

<p><strong>Area :</strong> {farm.area}</p>

<p><strong>Crop :</strong> {farm.crop}</p>

<p><strong>Soil :</strong> {farm.soil}</p>

<p><strong>Status :</strong> {farm.status}</p>

</div>

))}

</div>

</div>
      {/*=========================================
                FARM DETAILS
      =========================================*/}

      <div className="farm-details-card">

        <div className="details-header">

          <div>

            <h2>{farms[selectedFarm].id}</h2>

            <p>{farms[selectedFarm].owner}</p>

          </div>

          <span className="status-badge">

            {farms[selectedFarm].status}

          </span>

        </div>

        <div className="farm-details-grid">

          <div className="detail-box">

            <label>Village</label>

            <h4>{farms[selectedFarm].village}</h4>

          </div>

          <div className="detail-box">

            <label>Survey Number</label>

            <h4>{farms[selectedFarm].survey}</h4>

          </div>

          <div className="detail-box">

            <label>Total Area</label>

            <h4>{farms[selectedFarm].area}</h4>

          </div>

          <div className="detail-box">

            <label>Current Crop</label>

            <h4>{farms[selectedFarm].crop}</h4>

          </div>

          <div className="detail-box">

            <label>Soil Type</label>

            <h4>{farms[selectedFarm].soil}</h4>

          </div>

          <div className="detail-box">

            <label>Irrigation</label>

            <h4>{farms[selectedFarm].irrigation}</h4>

          </div>

          <div className="detail-box">

            <label>Water Source</label>

            <h4>{farms[selectedFarm].water}</h4>

          </div>

          <div className="detail-box">

            <label>Growth Stage</label>

            <h4>{farms[selectedFarm].stage}</h4>

          </div>

          <div className="detail-box">

            <label>Expected Harvest</label>

            <h4>{farms[selectedFarm].harvest}</h4>

          </div>

          <div className="detail-box">

            <label>Farm Type</label>

            <h4>{farms[selectedFarm].type}</h4>

          </div>

        </div>

        {/*=========================================
              LAND UTILIZATION
        =========================================*/}

        <div className="utilization-card">

          <div className="utilization-header">

            <h3>Land Utilization</h3>

          </div>

          <div className="progress-item">

            <div className="progress-info">

              <span>Cultivated Area</span>

              <strong>

                {farms[selectedFarm].cultivated}

              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill cultivated-fill"
                style={{
                  width: farms[selectedFarm].cultivated
                }}
              ></div>

            </div>

          </div>

          <div className="progress-item">

            <div className="progress-info">

              <span>Unused Area</span>

              <strong>

                {farms[selectedFarm].unused}

              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill unused-fill"
                style={{
                  width: farms[selectedFarm].unused
                }}
              ></div>

            </div>

          </div>

        </div>

      </div>

    </section>

    {/*=========================================
              ANALYTICS
    =========================================*/}

    <section className="farm-analytics">

      {/*========== LINE CHART ==========*/}

      <div className="chart-card cultivation-card">

        <div className="chart-header">

          <h3>Area Under Cultivation</h3>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={cultivationTrend}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="year"/>

            <YAxis/>

            <Tooltip/>

            <Legend/>

            <Line
              type="monotone"
              dataKey="area"
              stroke="#2563eb"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/*========== SOIL TYPE PIE ==========*/}

      <div className="chart-card">

        <div className="chart-header">

          <h3>Soil Distribution</h3>

        </div>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie

              data={soilDistribution}

              dataKey="value"

              nameKey="name"

              innerRadius={50}

              outerRadius={90}

            >

              {soilDistribution.map((item,index)=>(

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

      {/*========== IRRIGATION PIE ==========*/}

      <div className="chart-card">

        <div className="chart-header">

          <h3>Irrigation Types</h3>

        </div>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie

              data={irrigationDistribution}

              dataKey="value"

              nameKey="name"

              innerRadius={50}

              outerRadius={90}

            >

              {irrigationDistribution.map((item,index)=>(

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

    </section>
        {/*=========================================
            FARM INSIGHTS
    =========================================*/}

    <section className="farm-bottom-grid">

      {/*========================
        FARM SIZE DISTRIBUTION
      ========================*/}

      <div className="chart-card">

        <div className="chart-header">

          <h3>Farm Size Distribution</h3>

        </div>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={farmSizeData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="size"/>

            <YAxis/>

            <Tooltip/>

            <Bar
              dataKey="farms"
              radius={[8,8,0,0]}
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/*========================
        ORGANIC vs CONVENTIONAL
      ========================*/}

      <div className="chart-card">

        <div className="chart-header">

          <h3>Organic vs Conventional</h3>

        </div>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie

              data={organicData}

              dataKey="value"

              nameKey="name"

              innerRadius={60}

              outerRadius={95}

            >

              {organicData.map((item,index)=>(

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

      {/*========================
            LAND UTILIZATION
      ========================*/}

      <div className="chart-card">

        <div className="chart-header">

          <h3>Land Utilization</h3>

        </div>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie

              data={landUtilizationData}

              dataKey="value"

              nameKey="name"

              innerRadius={65}

              outerRadius={95}

            >

              {landUtilizationData.map((item,index)=>(

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

    </section>

    {/*=========================================
            FARM SUMMARY
    =========================================*/}

    <section className="analytics-summary">

      <div className="summary-card">

        <FaTractor className="summary-icon"/>

        <div>

          <h4>Largest Farm</h4>

          <h2>18 Acres</h2>

        </div>

      </div>

      <div className="summary-card">

        <FaSeedling className="summary-icon"/>

        <div>

          <h4>Most Cultivated Crop</h4>

          <h2>Rice</h2>

        </div>

      </div>

      <div className="summary-card">

        <FaTint className="summary-icon"/>

        <div>

          <h4>Most Used Irrigation</h4>

          <h2>Drip Irrigation</h2>

        </div>

      </div>

      <div className="summary-card">

        <MdAgriculture className="summary-icon"/>

        <div>

          <h4>Average Yield</h4>

          <h2>29 Qtl/Acre</h2>

        </div>

      </div>

    </section>

    {/*=========================================
            RECENT ACTIVITIES
    =========================================*/}

    <section className="activity-card">

      <div className="chart-header">

        <h3>Recent Farm Activities</h3>

      </div>

      <div className="timeline">

        {activities.map((item,index)=>(

          <div
            key={index}
            className="timeline-item"
          >

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <h4>

                {item.title}

              </h4>

              <p>

                {item.description}

              </p>

              <span>

                {item.date}

              </span>

            </div>

          </div>

        ))}

      </div>

    </section>

  </div>

</div>

);

};

export default OFarm;