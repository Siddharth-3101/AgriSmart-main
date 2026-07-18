import React, { useState } from "react";
import "../styles/oprofile.css";
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
  FaEnvelope,
  FaPhone,
  FaEdit
} from "react-icons/fa";

import { WiDaySunny } from "react-icons/wi";

const OProfile = () => {

  const navigate = useNavigate();

  const [showSidebar,setShowSidebar] = useState(false);

  const officer = {

    name:"Rajesh Kumar",

    designation:"Agriculture Officer",

    region:"Coimbatore Region",

    phone:"+91 9876543210",

    email:"rajesh@agrismart.gov.in"

  };

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
      icon:<WiDaySunny/>,
      path:"/officer/oweather"
    },

    {
      name:"Notifications",
      icon:<FaBell/>,
      path:"/officer/onotification"
    },

    {
      name:"Profile",
      icon:<FaUserCircle/>,
      path:"/officer/oprofile"
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

<p>Officer Profile</p>

</div>

<nav className="sidebar-menu">

{menuItems.map((item,index)=>(

<div
key={index}
className={`sidebar-menu-item ${
item.name==="Profile" ? "active-menu":""
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
placeholder="Search..."
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

{/*=====================================
          PROFILE CARD
======================================*/}

<section className="profile-card">

<div className="profile-top">

<div className="profile-image">

<FaUserCircle/>

</div>

<div className="profile-info">

<h2>{officer.name}</h2>

<h4>{officer.designation}</h4>

</div>

<button className="edit-btn">

<FaEdit/>

&nbsp;

Edit Profile

</button>

</div>

<div className="profile-details">

<div className="detail-box">

<FaMapMarkerAlt/>

<div>

<span>Region</span>

<h4>{officer.region}</h4>

</div>

</div>

<div className="detail-box">

<FaEnvelope/>

<div>

<span>Email</span>

<h4>{officer.email}</h4>

</div>

</div>

<div className="detail-box">

<FaPhone/>

<div>

<span>Phone</span>

<h4>{officer.phone}</h4>

</div>

</div>

</div>

</section>
{/*=====================================
        PERSONAL INFORMATION
======================================*/}

<section className="profile-form-card">

<div className="card-header">

<h2>

Personal Information

</h2>

<p>

Update your profile details

</p>

</div>

<div className="profile-form">

<div className="input-group">

<label>

Full Name

</label>

<input
type="text"
defaultValue={officer.name}
/>

</div>

<div className="input-group">

<label>

Designation

</label>

<input
type="text"
defaultValue={officer.designation}
/>

</div>

<div className="input-group">

<label>

Email Address

</label>

<input
type="email"
defaultValue={officer.email}
/>

</div>

<div className="input-group">

<label>

Phone Number

</label>

<input
type="text"
defaultValue={officer.phone}
/>

</div>

<div className="input-group">

<label>

Region

</label>

<input
type="text"
defaultValue={officer.region}
/>

</div>

<div className="input-group">

<label>

District

</label>

<input
type="text"
defaultValue="Coimbatore"
/>

</div>

<div className="input-group full-width">

<label>

Office Address

</label>

<textarea
rows="4"
defaultValue="Department of Agriculture, Coimbatore District Office"
/>

</div>

</div>

<div className="save-btn-container">

<button className="save-btn">

Save Changes

</button>

</div>

</section>

{/*=====================================
        ACCOUNT INFORMATION
======================================*/}

<section className="account-card">

<div className="card-header">

<h2>

Account Information

</h2>

</div>

<div className="account-grid">

<div className="account-box">

<span>

Officer ID

</span>

<h4>

AGR-OFF-1025

</h4>

</div>

<div className="account-box">

<span>

Department

</span>

<h4>

Agriculture Department

</h4>

</div>

<div className="account-box">

<span>

Role

</span>

<h4>

Regional Agriculture Officer

</h4>

</div>

<div className="account-box">

<span>

Joined On

</span>

<h4>

12 June 2021

</h4>

</div>

<div className="account-box">

<span>

Account Status

</span>

<h4 className="status-active">

Active

</h4>

</div>

<div className="account-box">

<span>

Last Login

</span>

<h4>

Today • 09:12 AM

</h4>

</div>

</div>

</section>
{/*=====================================
        CHANGE PASSWORD
======================================*/}

<section className="password-card">

  <div className="card-header">

    <h2>Change Password</h2>

    <p>Update your account password securely</p>

  </div>

  <div className="password-form">

    <div className="input-group">

      <label>Current Password</label>

      <input
        type="password"
        placeholder="Enter current password"
      />

    </div>

    <div className="input-group">

      <label>New Password</label>

      <input
        type="password"
        placeholder="Enter new password"
      />

    </div>

    <div className="input-group">

      <label>Confirm Password</label>

      <input
        type="password"
        placeholder="Confirm new password"
      />

    </div>

  </div>

  <div className="password-btn-container">

    <button className="change-password-btn">

      Update Password

    </button>

  </div>

</section>

{/*=====================================
        RECENT LOGIN ACTIVITY
======================================*/}

<section className="activity-card">

  <div className="card-header">

    <h2>Recent Login Activity</h2>

  </div>

  <div className="activity-list">

    <div className="activity-item">

      <div className="activity-dot"></div>

      <div>

        <h4>Logged in from Office Network</h4>

        <p>Today • 09:12 AM</p>

      </div>

    </div>

    <div className="activity-item">

      <div className="activity-dot"></div>

      <div>

        <h4>Password Changed</h4>

        <p>15 June 2026 • 03:40 PM</p>

      </div>

    </div>

    <div className="activity-item">

      <div className="activity-dot"></div>

      <div>

        <h4>Profile Information Updated</h4>

        <p>10 June 2026 • 11:20 AM</p>

      </div>

    </div>

  </div>

</section>

{/*=====================================
        SECURITY SETTINGS
======================================*/}

<section className="security-card">

  <div className="card-header">

    <h2>Security Settings</h2>

  </div>

  <div className="security-options">

    <div className="security-item">

      <div>

        <h4>Two-Factor Authentication</h4>

        <p>Add an extra layer of account security.</p>

      </div>

      <button className="enable-btn">

        Enable

      </button>

    </div>

    <div className="security-item">

      <div>

        <h4>Email Notifications</h4>

        <p>Receive login and security alerts.</p>

      </div>

      <button className="enable-btn">

        Enabled

      </button>

    </div>

  </div>

</section>

{/*=====================================
            LOGOUT
======================================*/}

<section className="logout-section">

  <button className="logout-btn">

    Logout

  </button>

</section>

</div>

</div>

);

};

export default OProfile;