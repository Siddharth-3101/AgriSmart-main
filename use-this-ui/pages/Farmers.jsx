import React, { useState } from "react";
import "../styles/ofarmers.css";
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
  FaChartBar,
} from "react-icons/fa";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiHumidity,
  WiStrongWind,
} from "react-icons/wi";
const Farmers = () => {
const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
const officer = {

    name:"Rajesh Kumar",

    designation:"Agriculture Officer"};
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
        icon: < WiDaySunny/>,
        path: "/officer/oweather",
      },
          {
            name: "Notifications",
            icon: <FaBell />,
            path: "/officer/onotification"
          },
          ,
          
              {
                name:"Profile",
                icon:<FaUserCircle/>,
                path:"/officer/oprofile"
              }
          
    ];
  

  const stats = [
    {
      title: "Total Farmers",
      value: "2,453",
      icon: <FaUsers />,
      color: "#2563eb",
      bg: "#dbeafe",
    },
    {
      title: "Total Farm Area",
      value: "5,426 Acres",
      icon: <FaTractor />,
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      title: "Active Farmers",
      value: "2,318",
      icon: <FaLeaf />,
      color: "#f59e0b",
      bg: "#fef3c7",
    },
    {
      title: "Villages Covered",
      value: "86",
      icon: <FaMapMarkerAlt />,
      color: "#8b5cf6",
      bg: "#ede9fe",
    },
  ];

  const farmers = [
    {
      id: "AGR001",
      name: "Ramesh Kumar",
      village: "Hyderabad",
      land: "4.5 Acres",
      crop: "Rice",
      phone: "9876543210",
      status: "Active",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: "AGR002",
      name: "Lakshmi Devi",
      village: "Warangal",
      land: "3.2 Acres",
      crop: "Cotton",
      phone: "9876543211",
      status: "Active",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: "AGR003",
      name: "Mahesh Reddy",
      village: "Nizamabad",
      land: "6 Acres",
      crop: "Maize",
      phone: "9876543212",
      status: "Inactive",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
    },
    {
      id: "AGR004",
      name: "Anitha",
      village: "Karimnagar",
      land: "2 Acres",
      crop: "Groundnut",
      phone: "9876543213",
      status: "Active",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
  ];

  return (
    <div className="farmer-page">

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${showSidebar ? "show-overlay" : ""}`}
        onClick={() => setShowSidebar(false)}
      ></div>

      {/* Sidebar */}
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
            item.name==="Farmers" ? "active-menu":""
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


      {/* Main Content */}
      <div className="dashboard-main">

        {/* Navbar */}
        <header className="dashboard-navbar">

          <div className="navbar-left">

            <button
              className="menu-toggle-btn"
              onClick={() => setShowSidebar(true)}
            >
              <FaBars />
            </button>

            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                className="search-input"
                placeholder="Search farmers..."
              />
            </div>

          </div>

          <div className="navbar-right">

            <button className="notification-btn">
              <FaBell />
            </button>

            <div className="profile-section">

              <FaUserCircle className="profile-avatar" />

              <div>
                
<h4>{officer.name}</h4>

<p>{officer.designation}</p>
              </div>

            </div>

          </div>

        </header>

        {/* Banner */}
        <section className="farmer-banner">

          <div className="banner-content">

            <h1>Farmer Management</h1>

            <p>
              Manage all registered farmers, monitor land holdings,
              crop cultivation and farmer details across your district.
            </p>

          </div>

          <div className="banner-icon">
            <FaChartBar />
          </div>

        </section>

        {/* Statistics */}
        <section className="stats-section">

          {stats.map((item, index) => (

            <div key={index} className="stats-card">

              <div
                className="stats-icon"
                style={{
                  background: item.bg,
                  color: item.color,
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

        {/* Part 2 starts here */}
        {/* ===========================
      SEARCH & FILTER
=========================== */}

<section className="farmer-search-section">

  <div className="farmer-search-box">

    <FaSearch className="table-search-icon" />

    <input
      type="text"
      placeholder="Search by Farmer Name, Farmer ID or Village..."
      className="farmer-search-input"
    />

  </div>

  <div className="filter-section">

    <select className="filter-select">

      <option>All Villages</option>
      <option>Hyderabad</option>
      <option>Warangal</option>
      <option>Karimnagar</option>
      <option>Nizamabad</option>

    </select>

    <select className="filter-select">

      <option>All Crops</option>
      <option>Rice</option>
      <option>Cotton</option>
      <option>Maize</option>
      <option>Groundnut</option>

    </select>

  </div>

</section>

{/* ===========================
      FARMERS TABLE
=========================== */}

<section className="farmers-table-card">

<div className="table-header">

<h2>Registered Farmers</h2>

<p>

Showing {farmers.length} registered farmers

</p>

</div>

<div className="table-responsive">

<table className="farmers-table">

<thead>

<tr>

<th>Photo</th>

<th>Farmer ID</th>

<th>Name</th>

<th>Village</th>

<th>Land Area</th>

<th>Crop</th>

<th>Phone</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{farmers.map((farmer) => (

<tr key={farmer.id}>

<td>

<img

src={farmer.image}

alt={farmer.name}

className="farmer-photo"

/>

</td>

<td>

<span className="farmer-id">

{farmer.id}

</span>

</td>

<td>

<div className="farmer-name">

<strong>{farmer.name}</strong>

</div>

</td>

<td>

{farmer.village}

</td>

<td>

{farmer.land}

</td>

<td>

<span className="crop-badge">

{farmer.crop}

</span>

</td>

<td>

{farmer.phone}

</td>

<td>

<span

className={`status-badge ${
farmer.status === "Active"
? "status-active"
: "status-inactive"
}`}

>

{farmer.status}

</span>

</td>

<td>

<div className="action-buttons">

<button className="view-btn">

View

</button>

<button className="edit-btn">

Edit

</button>

<button className="delete-btn">

Delete

</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

</section>

{/* ===========================
      QUICK SUMMARY
=========================== */}

<section className="summary-row">

<div className="summary-card">

<h3>Total Cultivated Area</h3>

<h1>5,426 Acres</h1>

<p>Across all registered farmers</p>

</div>

<div className="summary-card">

<h3>Most Cultivated Crop</h3>

<h1>Rice 🌾</h1>

<p>42% of total cultivation</p>

</div>

<div className="summary-card">

<h3>Recently Registered</h3>

<h1>56 Farmers</h1>

<p>Added this month</p>

</div>

</section>

{/* Part 3 starts here */}
{/* ===========================
      SEARCH & FILTER
=========================== */}

<section className="farmer-search-section">

  <div className="farmer-search-box">

    <FaSearch className="table-search-icon" />

    <input
      type="text"
      placeholder="Search by Farmer Name, Farmer ID or Village..."
      className="farmer-search-input"
    />

  </div>

  <div className="filter-section">

    <select className="filter-select">

      <option>All Villages</option>
      <option>Hyderabad</option>
      <option>Warangal</option>
      <option>Karimnagar</option>
      <option>Nizamabad</option>

    </select>

    <select className="filter-select">

      <option>All Crops</option>
      <option>Rice</option>
      <option>Cotton</option>
      <option>Maize</option>
      <option>Groundnut</option>

    </select>

  </div>

</section>

{/* ===========================
      FARMERS TABLE
=========================== */}

<section className="farmers-table-card">

<div className="table-header">

<h2>Registered Farmers</h2>

<p>

Showing {farmers.length} registered farmers

</p>

</div>

<div className="table-responsive">

<table className="farmers-table">

<thead>

<tr>

<th>Photo</th>

<th>Farmer ID</th>

<th>Name</th>

<th>Village</th>

<th>Land Area</th>

<th>Crop</th>

<th>Phone</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{farmers.map((farmer) => (

<tr key={farmer.id}>

<td>

<img

src={farmer.image}

alt={farmer.name}

className="farmer-photo"

/>

</td>

<td>

<span className="farmer-id">

{farmer.id}

</span>

</td>

<td>

<div className="farmer-name">

<strong>{farmer.name}</strong>

</div>

</td>

<td>

{farmer.village}

</td>

<td>

{farmer.land}

</td>

<td>

<span className="crop-badge">

{farmer.crop}

</span>

</td>

<td>

{farmer.phone}

</td>

<td>

<span

className={`status-badge ${
farmer.status === "Active"
? "status-active"
: "status-inactive"
}`}

>

{farmer.status}

</span>

</td>

<td>

<div className="action-buttons">

<button className="view-btn">

View

</button>

<button className="edit-btn">

Edit

</button>

<button className="delete-btn">

Delete

</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

</section>

{/* ===========================
      QUICK SUMMARY
=========================== */}

<section className="summary-row">

<div className="summary-card">

<h3>Total Cultivated Area</h3>

<h1>5,426 Acres</h1>

<p>Across all registered farmers</p>

</div>

<div className="summary-card">

<h3>Most Cultivated Crop</h3>

<h1>Rice 🌾</h1>

<p>42% of total cultivation</p>

</div>

<div className="summary-card">

<h3>Recently Registered</h3>

<h1>56 Farmers</h1>

<p>Added this month</p>

</div>

</section>

{/* Part 3 starts here */}
{/* ===========================
        PAGINATION
=========================== */}

<section className="pagination-section">

  <div className="pagination-info">
    Showing <strong>1-4</strong> of <strong>{farmers.length}</strong> Farmers
  </div>

  <div className="pagination-buttons">

    <button className="page-btn">
      Previous
    </button>

    <button className="page-number active-page">
      1
    </button>

    <button className="page-number">
      2
    </button>

    <button className="page-number">
      3
    </button>

    <button className="page-btn">
      Next
    </button>

  </div>

</section>

{/* ===========================
        DISTRICT SUMMARY
=========================== */}

<section className="district-summary">

  <div className="summary-box">

    <h3>District Overview</h3>

    <div className="summary-grid">

      <div className="summary-item">

        <h4>Most Cultivated Crop</h4>

        <h2>🌾 Rice</h2>

        <span>42% of total cultivated land</span>

      </div>

      <div className="summary-item">

        <h4>Largest Farmer</h4>

        <h2>Mahesh Reddy</h2>

        <span>6 Acres</span>

      </div>

      <div className="summary-item">

        <h4>Average Land Holding</h4>

        <h2>3.9 Acres</h2>

        <span>Per Farmer</span>

      </div>

      <div className="summary-item">

        <h4>Villages Covered</h4>

        <h2>86</h2>

        <span>Across District</span>

      </div>

    </div>

  </div>

</section>

{/* ===========================
        RECENT FARMERS
=========================== */}

<section className="recent-farmers-card">

  <div className="table-header">

    <h2>Recently Registered Farmers</h2>

    <p>Latest registrations</p>

  </div>

  <div className="recent-list">

    {farmers.map((farmer) => (

      <div
        className="recent-farmer-item"
        key={farmer.id}
      >

        <img
          src={farmer.image}
          alt={farmer.name}
          className="recent-photo"
        />

        <div className="recent-info">

          <h4>{farmer.name}</h4>

          <span>{farmer.village}</span>

        </div>

        <div className="recent-land">

          {farmer.land}

        </div>

      </div>

    ))}

  </div>

</section>

{/* ===========================
        FOOTER
=========================== */}

<footer className="dashboard-footer">

  <p>

    © 2026 AgriSmart Officer Portal

  </p>

  <span>

    Farmer Management System

  </span>

</footer>

</div>

</div>

);

};

export default Farmers;