import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/sid.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";

import {

    FaUser,

    FaTractor,

    FaFileAlt,

    FaLock,

    FaBell,

    FaLanguage,

    FaSignOutAlt,

    FaCheckCircle,

    FaUpload,

} from "react-icons/fa";

const documents = [

    {

        name:"Aadhaar Card",

        status:"Verified",

        uploaded:"12 Jun 2026"

    },

    {

        name:"Farmer Registration",

        status:"Verified",

        uploaded:"10 Jun 2026"

    },

    {

        name:"Land Ownership Certificate",

        status:"Verified",

        uploaded:"08 Jun 2026"

    },

    {

        name:"Soil Health Card",

        status:"Pending",

        uploaded:"-"

    },

    {

        name:"Bank Passbook",

        status:"Verified",

        uploaded:"04 Jun 2026"

    }

];

const Profile = () => {

    const navigate = useNavigate();

    const [activeTab,setActiveTab]=useState("profile");

    return(

    <>

        <Navbar/>

        <FloatingAI/>

        <div className="profilePage">

            <div className="settingsContainer">

                {/* =======================
                    SIDEBAR
                ======================== */}

                <div className="settingsSidebar">

                    <h2>

                        Account

                    </h2>

                    <button

                        className={activeTab==="profile" ? "activeTab" : ""}

                        onClick={()=>setActiveTab("profile")}

                    >

                        <FaUser/>

                        My Profile

                    </button>

                    <button

                        onClick={()=>navigate("/farm-management")}

                    >

                        <FaTractor/>

                        My Farms

                    </button>

                    <button

                        className={activeTab==="documents" ? "activeTab" : ""}

                        onClick={()=>setActiveTab("documents")}

                    >

                        <FaFileAlt/>

                        Documents

                    </button>

                    <button

                        className={activeTab==="security" ? "activeTab" : ""}

                        onClick={()=>setActiveTab("security")}

                    >

                        <FaLock/>

                        Security

                    </button>

                    <button

                        className={activeTab==="notifications" ? "activeTab" : ""}

                        onClick={()=>setActiveTab("notifications")}

                    >

                        <FaBell/>

                        Notifications

                    </button>

                    <button

                        className={activeTab==="language" ? "activeTab" : ""}

                        onClick={()=>setActiveTab("language")}

                    >

                        <FaLanguage/>

                        Language

                    </button>

                    <button className="logoutSide">

                        <FaSignOutAlt/>

                        Logout

                    </button>

                </div>

                {/* =======================
                    CONTENT
                ======================== */}

                <div className="settingsContent">

                {

                    activeTab==="profile" && (

                    <div className="contentCard">

                        <h1>

                            My Profile

                        </h1>

                        <p>

                            Manage your personal information.

                        </p>

                        <div className="profileTop">

                            <div className="avatar">

                                SG

                            </div>

                            <div>

                                <h2>

                                    Siddharth G

                                </h2>

                                <span className="verified">

                                    <FaCheckCircle/>

                                    Verified Farmer

                                </span>

                            </div>

                        </div>

                        <div className="profileForm">

                            <div className="inputGroup">

                                <label>

                                    Full Name

                                </label>

                                <input

                                    defaultValue="Siddharth G"

                                />

                            </div>

                            <div className="inputGroup">

                                <label>

                                    Mobile Number

                                </label>

                                <input

                                    defaultValue="+91 9876543210"

                                />

                            </div>

                            <div className="inputGroup">

                                <label>

                                    Email Address

                                </label>

                                <input

                                    defaultValue="siddharth@email.com"

                                />

                            </div>

                            <div className="inputGroup">

                                <label>

                                    District

                                </label>

                                <input

                                    defaultValue="Coimbatore"

                                />

                            </div>

                            <div className="inputGroup">

                                <label>

                                    State

                                </label>

                                <input

                                    defaultValue="Tamil Nadu"

                                />

                            </div>

                            <div className="inputGroup">

                                <label>

                                    Member Since

                                </label>

                                <input

                                    defaultValue="June 2026"

                                    disabled

                                />

                            </div>

                            <button className="saveBtn">

                                Save Changes

                            </button>

                        </div>

                    </div>

                    )

                }
                                {/* =======================
                    DOCUMENTS
                ======================== */}

                {

                    activeTab==="documents" && (

                    <div className="contentCard">

                        <div className="sectionHeader">

                            <div>

                                <h1>

                                    Documents

                                </h1>

                                <p>

                                    Manage all your uploaded documents.

                                </p>

                            </div>

                            <button className="greenBtn">

                                <FaUpload/>

                                Upload Document

                            </button>

                        </div>

                        <div className="documentTable">

                            <div className="documentHead">

                                <span>

                                    Document

                                </span>

                                <span>

                                    Status

                                </span>

                                <span>

                                    Uploaded

                                </span>

                            </div>

                            {

                                documents.map((doc,index)=>(

                                    <div

                                        key={index}

                                        className="documentRow"

                                    >

                                        <div className="documentName">

                                            <FaFileAlt/>

                                            <span>

                                                {doc.name}

                                            </span>

                                        </div>

                                        <span

                                            className={

                                                doc.status==="Verified"

                                                ?

                                                "status verified"

                                                :

                                                "status pending"

                                            }

                                        >

                                            {doc.status}

                                        </span>

                                        <span>

                                            {doc.uploaded}

                                        </span>

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                    )

                }

                {/* =======================
                    SECURITY
                ======================== */}

                {

                    activeTab==="security" && (

                    <div className="contentCard">

                        <h1>

                            Security

                        </h1>

                        <p>

                            Update your account password.

                        </p>

                        <div className="profileForm">

                            <div className="inputGroup">

                                <label>

                                    Current Password

                                </label>

                                <input

                                    type="password"

                                    placeholder="********"

                                />

                            </div>

                            <div className="inputGroup">

                                <label>

                                    New Password

                                </label>

                                <input

                                    type="password"

                                    placeholder="********"

                                />

                            </div>

                            <div className="inputGroup">

                                <label>

                                    Confirm Password

                                </label>

                                <input

                                    type="password"

                                    placeholder="********"

                                />

                            </div>

                            <button className="saveBtn">

                                Save Password

                            </button>

                        </div>

                    </div>

                    )

                }

                {/* =======================
                    NOTIFICATIONS
                ======================== */}

                {

                    activeTab==="notifications" && (

                    <div className="contentCard">

                        <h1>

                            Notification Preferences

                        </h1>

                        <p>

                            Choose the notifications you want to receive.

                        </p>

                        <div className="toggleList">

                            <label>

                                Weather Alerts

                                <input

                                    type="checkbox"

                                    defaultChecked

                                />

                            </label>

                            <label>

                                Crop Disease Alerts

                                <input

                                    type="checkbox"

                                    defaultChecked

                                />

                            </label>

                            <label>

                                Government Scheme Updates

                                <input

                                    type="checkbox"

                                    defaultChecked

                                />

                            </label>

                            <label>

                                SMS Notifications

                                <input

                                    type="checkbox"

                                />

                            </label>

                        </div>

                    </div>

                    )

                }

                {/* =======================
                    LANGUAGE
                ======================== */}

                {

                    activeTab==="language" && (

                    <div className="contentCard">

                        <h1>

                            Language

                        </h1>

                        <p>

                            Select your preferred language.

                        </p>

                        <div className="languageGrid">

                            <button>

                                English

                            </button>

                            <button>

                                தமிழ்

                            </button>

                            <button>

                                తెలుగు

                            </button>

                            <button>

                                हिन्दी

                            </button>

                            <button>

                                ಕನ್ನಡ

                            </button>

                        </div>

                    </div>

                    )

                }

                </div>

            </div>

        </div>

        <Footer/>

    </>

    );

};

export default Profile;