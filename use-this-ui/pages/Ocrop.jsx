import React, { useState } from "react";
import "../styles/Ocrop.css";
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
  FaCog
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
  MdDashboard,
} from "react-icons/md";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function Ocrop() {

  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [expandedCrop, setExpandedCrop] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState("Rice");
const officer = {

    name:"Rajesh Kumar",

    designation:"Agriculture Officer"};
  const toggleCrop = (index) => {
    setExpandedCrop(expandedCrop === index ? null : index);
  };

  /* ===========================
        Sidebar Menu
  =========================== */

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

  /* ===========================
        Statistics Cards
  =========================== */

  const cropStats = [
    {
      title: "Total Crops",
      value: "28",
      color: "#16a34a",
      bg: "#dcfce7",
      icon: <FaLeaf />,
    },
    {
      title: "Cultivated Area",
      value: "18,450 Acres",
      color: "#2563eb",
      bg: "#dbeafe",
      icon: <MdAgriculture />,
    },
    {
      title: "Farmers Cultivating",
      value: "2,458",
      color: "#f59e0b",
      bg: "#fef3c7",
      icon: <FaUsers />,
    },
    {
      title: "Harvest Ready",
      value: "542",
      color: "#8b5cf6",
      bg: "#ede9fe",
      icon: <FaClipboardList />,
    },
  ];

  /* ===========================
        Crop Cards
  =========================== */

  const cropData = [
    {
      name: "Rice",
      farmers: 840,
      area: 4200,
      stage: "Flowering",
      harvest: 76,
      farmersList: [
        {
          name: "Ravi Kumar",
          land: "4 Acres",
          stage: "Flowering",
          harvest: "12 July",
        },
        {
          name: "Mahesh",
          land: "6 Acres",
          stage: "Growing",
          harvest: "18 July",
        },
        {
          name: "Suresh",
          land: "2 Acres",
          stage: "Harvest Ready",
          harvest: "10 July",
        },
      ],
    },

    {
      name: "Cotton",
      farmers: 560,
      area: 2500,
      stage: "Growing",
      harvest: 58,
      farmersList: [
        {
          name: "Kiran",
          land: "5 Acres",
          stage: "Growing",
          harvest: "25 August",
        },
        {
          name: "Anil",
          land: "3 Acres",
          stage: "Growing",
          harvest: "28 August",
        },
      ],
    },

    {
      name: "Maize",
      farmers: 420,
      area: 1800,
      stage: "Harvest Ready",
      harvest: 91,
      farmersList: [
        {
          name: "Rajesh",
          land: "3 Acres",
          stage: "Harvest Ready",
          harvest: "5 July",
        },
        {
          name: "Vijay",
          land: "2 Acres",
          stage: "Harvest Ready",
          harvest: "7 July",
        },
      ],
    },

    {
      name: "Groundnut",
      farmers: 280,
      area: 1100,
      stage: "Growing",
      harvest: 45,
      farmersList: [
        {
          name: "Ramesh",
          land: "2 Acres",
          stage: "Growing",
          harvest: "18 September",
        },
      ],
    },
  ];

  /* ===========================
        Harvest Comparison
  =========================== */

  const harvestComparison = [
    { year: "2021", Rice: 420, Cotton: 320, Maize: 250, Groundnut: 180 },
    { year: "2022", Rice: 470, Cotton: 360, Maize: 280, Groundnut: 210 },
    { year: "2023", Rice: 520, Cotton: 390, Maize: 310, Groundnut: 240 },
    { year: "2024", Rice: 610, Cotton: 440, Maize: 360, Groundnut: 290 },
  ];

  /* ===========================
        Yield Statistics
  =========================== */

  const yieldData = [
    { crop: "Rice", yield: 82 },
    { crop: "Cotton", yield: 63 },
    { crop: "Maize", yield: 56 },
    { crop: "Groundnut", yield: 42 },
  ];

  /* ===========================
        Crop Distribution
  =========================== */

  const distributionData = [
    { name: "Rice", value: 40 },
    { name: "Cotton", value: 25 },
    { name: "Maize", value: 20 },
    { name: "Groundnut", value: 15 },
  ];

  const pieColors = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
  ];

  /* Part 1B starts with return() */
  return (

<div className="officer-container">

  {/* ==========================
        SIDEBAR OVERLAY
  ========================== */}

  <div
    className={`sidebar-overlay ${
      showSidebar ? "show-overlay" : ""
    }`}
    onClick={() => setShowSidebar(false)}
  ></div>

  {/* ==========================
        SIDEBAR
  ========================== */}
 <aside
    className={`officer-sidebar ${
      showSidebar ? "show-sidebar" : ""
    }`}
  >

    <div className="sidebar-header">

      <h2>AgriSmart</h2>

      <p>Crop Management</p>

    </div>

    <nav className="sidebar-menu">

      {menuItems.map((item,index)=>(

        <div
          key={index}
          className={`sidebar-menu-item ${
            item.name==="Crops" ? "active-menu":""
          }`}
          onClick={()=>navigate(item.path)}
        >

          <div className="menu-icon">

            {item.icon}

          </div>

          <span>{item.name}</span>

        </div>

      ))}

    </nav>

  </aside>


  {/* ==========================
          MAIN CONTENT
  ========================== */}

  <div className="dashboard-main">

    {/* ==========================
            NAVBAR
    ========================== */}

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
            placeholder="Search Crop..."
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
    

    {/* ==========================
          STATISTICS
    ========================== */}

    <section className="stats-section">

      {cropStats.map((item,index)=>(

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

    {/* ==========================
        SEARCH & FILTER
    ========================== */}

    <section className="crop-toolbar">

      <div className="crop-search-box">

        <FaSearch className="crop-search-icon"/>

        <input
          type="text"
          placeholder="Search crops..."
          className="crop-search-input"
        />

      </div>

      <select className="crop-filter">

        <option>All Crops</option>
        <option>Rice</option>
        <option>Cotton</option>
        <option>Maize</option>
        <option>Groundnut</option>

      </select>

    </section>

    {/* ==========================
          CROPS
    ========================== */}

    <section className="crop-list">

      {cropData.map((crop,index)=>(

        <div
          className="crop-card"
          key={index}
        >

          <div className="crop-header">

            <div>

              <h2>{crop.name}</h2>

              <p>

                Total Area : {crop.area} Acres

              </p>

            </div>

            <div className="crop-stage">

              {crop.stage}

            </div>

          </div>

          <div className="crop-grid">

            <div className="crop-grid-item">

              <span>Total Farmers</span>

              <h3>{crop.farmers}</h3>

            </div>

            <div className="crop-grid-item">

              <span>Area</span>

              <h3>{crop.area} Acres</h3>

            </div>

            <div className="crop-grid-item">

              <span>Growth Stage</span>

              <h3>{crop.stage}</h3>

            </div>

            <div className="crop-grid-item">

              <span>Harvest</span>

              <h3>{crop.harvest}%</h3>

            </div>

          </div>

          <button
            className="view-farmers-btn"
            onClick={()=>toggleCrop(index)}
          >

            {expandedCrop===index
              ? "Hide Farmers"
              : "View Farmers"}

          </button>

          {expandedCrop===index && (

            <div className="crop-farmers">

              <table className="crop-table">

                <thead>

                  <tr>

                    <th>Farmer Name</th>

                    <th>Land Owned</th>

                    <th>Growth Stage</th>

                    <th>Expected Harvest</th>

                  </tr>

                </thead>

                <tbody>

                  {crop.farmersList.map((farmer,i)=>(

                    <tr key={i}>

                      <td>{farmer.name}</td>

                      <td>{farmer.land}</td>

                      <td>{farmer.stage}</td>

                      <td>{farmer.harvest}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      ))}

    </section>

    {/* Part 2 starts here */}
        {/*==============================
          ANALYTICS SECTION
    ==============================*/}

    <section className="crop-analytics">

      {/*==============================
            HARVEST COMPARISON
      ==============================*/}

      <div className="chart-card harvest-card">

        <div className="chart-header">

          <h3>Harvest Comparison</h3>

          <select
            className="graph-select"
            value={selectedCrop}
            onChange={(e)=>setSelectedCrop(e.target.value)}
          >

            <option value="Rice">Rice</option>
            <option value="Cotton">Cotton</option>
            <option value="Maize">Maize</option>
            <option value="Groundnut">Groundnut</option>

          </select>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={harvestComparison}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="year"/>

            <YAxis/>

            <Tooltip/>

            <Legend/>

            <Line
              type="monotone"
              dataKey={selectedCrop}
              stroke="#2563eb"
              strokeWidth={4}
              dot={{ r:5 }}
              activeDot={{ r:8 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/*==============================
              YIELD STATISTICS
      ==============================*/}

      <div className="chart-card yield-card">

        <div className="chart-header">

          <h3>Yield Statistics</h3>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={yieldData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="crop"/>

            <YAxis/>

            <Tooltip/>

            <Bar
              dataKey="yield"
              radius={[8,8,0,0]}
              fill="#22c55e"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/*==============================
            CROP DISTRIBUTION
      ==============================*/}

      <div className="chart-card distribution-card">

        <div className="chart-header">

          <h3>Crop Area Distribution</h3>

        </div>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={distributionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={4}
            >

              {distributionData.map((entry,index)=>(

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

    {/*==============================
          ALERTS & ACTIVITIES
          Part 3 starts here
    ==============================*/}
        {/*==============================
            ALERTS & RECENT ACTIVITIES
    ==============================*/}

    <section className="bottom-section">

      {/*==============================
                CROP ALERTS
      ==============================*/}

      <div className="alerts-card">

        <div className="card-header">

          <h3>🌾 Crop Alerts</h3>

        </div>

        <div className="alert-list">

          <div className="alert-item warning">

            <div>

              <h4>Rice Harvest Due</h4>

              <p>
                320 Acres are ready for harvest within the next 5 days.
              </p>

            </div>

            <span className="alert-time">
              Today
            </span>

          </div>

          <div className="alert-item danger">

            <div>

              <h4>Cotton Pest Attack</h4>

              <p>
                Pest infestation reported in 28 farms. Immediate inspection required.
              </p>

            </div>

            <span className="alert-time">
              2 hrs ago
            </span>

          </div>

          <div className="alert-item info">

            <div>

              <h4>Maize Irrigation Reminder</h4>

              <p>
                Weather forecast indicates dry conditions for the next 4 days.
              </p>

            </div>

            <span className="alert-time">
              Yesterday
            </span>

          </div>

          <div className="alert-item success">

            <div>

              <h4>Groundnut Harvest Completed</h4>

              <p>
                Harvest completed successfully in 95% of registered farms.
              </p>

            </div>

            <span className="alert-time">
              Yesterday
            </span>

          </div>

        </div>

      </div>

      {/*==============================
            RECENT ACTIVITIES
      ==============================*/}

      <div className="activities-card">

        <div className="card-header">

          <h3>📅 Recent Activities</h3>

        </div>

        <div className="timeline">

          <div className="timeline-item">

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <h4>45 Farmers Added Rice Cultivation</h4>

              <p>Today • 09:30 AM</p>

            </div>

          </div>

          <div className="timeline-item">

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <h4>Cotton Yield Updated</h4>

              <p>Today • 11:15 AM</p>

            </div>

          </div>

          <div className="timeline-item">

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <h4>Harvest Report Submitted</h4>

              <p>Yesterday • 04:20 PM</p>

            </div>

          </div>

          <div className="timeline-item">

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <h4>Groundnut Cultivation Increased</h4>

              <p>Yesterday • 02:00 PM</p>

            </div>

          </div>

          <div className="timeline-item">

            <div className="timeline-dot"></div>

            <div className="timeline-content">

              <h4>New Farmer Registered</h4>

              <p>2 Days Ago</p>

            </div>

          </div>

        </div>

      </div>

    </section>

  </div>

</div>

);

}

export default Ocrop;