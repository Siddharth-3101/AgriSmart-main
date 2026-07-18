import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/farm.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";

import {
    FaPlus,
    FaSearch,
    FaArrowRight,
    FaWarehouse,
    FaLeaf,
    FaMapMarkerAlt,
    FaRulerCombined,
    FaChartLine
} from "react-icons/fa";

const farmData = [

    {

        id:1,

        name:"Green Valley Farm",

        location:"Coimbatore",

        soil:"Black Soil",

        area:"4 Acres",

        crops:"Rice, Maize",

        image:"https://images.pexels.com/photos/29294526/pexels-photo-29294526.jpeg"

    },

    {

        id:2,

        name:"South Farm",

        location:"Pollachi",

        soil:"Red Soil",

        area:"2 Acres",

        crops:"Cotton",

        image:"https://images.pexels.com/photos/33669658/pexels-photo-33669658.jpeg"

    },

    {

        id:3,

        name:"West Farm",

        location:"Erode",

        soil:"Sandy Soil",

        area:"3 Acres",

        crops:"Groundnut",

        image:"https://images.pexels.com/photos/37838036/pexels-photo-37838036.jpeg"

    }

];

function Farms(){

    const navigate = useNavigate();

    const [search,setSearch] = useState("");

    const filteredFarms = farmData.filter(farm=>

        farm.name.toLowerCase().includes(search.toLowerCase()) ||

        farm.location.toLowerCase().includes(search.toLowerCase()) ||

        farm.soil.toLowerCase().includes(search.toLowerCase())

    );

    return(

    <>

        <Navbar/>

        <FloatingAI/>

        <div className="farmPage">

            {/* ========================================
                        HERO
            ========================================= */}

            <section className="farmHero">

                <div className="farmHeroOverlay">

                    <div className="farmHeroLeft">

                        <h1>

                            Farm Management

                        </h1>

                        <p>

                            Register, monitor and manage all your
                            agricultural lands in one place.

                        </p>

                    </div>

                    <button

                        className="farmAddBtn"

                        onClick={()=>navigate("/farm-management/add")}

                    >

                        <FaPlus/>

                        Add Farm

                    </button>

                </div>

            </section>

            {/* ========================================
                        CONTENT
            ========================================= */}

            <section className="farmContainer">

                {/* ================= SUMMARY ================= */}

                <div className="farmStats">

                    <div className="farmStatCard">

                        <FaWarehouse/>

                        <div>

                            <span>

                                Registered Farms

                            </span>

                            <h2>

                                3

                            </h2>

                        </div>

                    </div>

                    <div className="farmStatCard">

                        <FaRulerCombined/>

                        <div>

                            <span>

                                Total Area

                            </span>

                            <h2>

                                9 Acres

                            </h2>

                        </div>

                    </div>

                    <div className="farmStatCard">

                        <FaLeaf/>

                        <div>

                            <span>

                                Active Crops

                            </span>

                            <h2>

                                6

                            </h2>

                        </div>

                    </div>

                    <div className="farmStatCard">

                        <FaChartLine/>

                        <div>

                            <span>

                                Average Yield

                            </span>

                            <h2>

                                3.6 Tons

                            </h2>

                        </div>

                    </div>

                </div>

                {/* ================= SEARCH ================= */}

                <div className="farmSearch">

                    <FaSearch/>

                    <input

                        type="text"

                        placeholder="Search your farms..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                </div>

                <div className="farmTitle">

                    <div>

                        <h2>

                            My Farms

                        </h2>

                        <p>

                            Manage every farm registered in AgriSmart.

                        </p>

                    </div>

                </div>
                                {/* ========================================
                        FARM LIST
                ========================================= */}

                <div className="farmList">

                    {

                        filteredFarms.map((farm)=>(

                            <div

                                className="farmCard"

                                key={farm.id}

                            >

                                {/* Left Image */}

                                <div className="farmCardImage">

                                    <img

                                        src={farm.image}

                                        alt={farm.name}

                                    />

                                </div>

                                {/* Right Details */}

                                <div className="farmCardContent">

                                    <div className="farmCardTop">

                                        <div>

                                            <h3>

                                                {farm.name}

                                            </h3>

                                            <p>

                                                <FaMapMarkerAlt/>

                                                {farm.location}

                                            </p>

                                        </div>

                                        <button

                                            className="farmViewBtn"

                                            onClick={()=>

                                                navigate(

                                                    `/farm-management/${farm.id}`

                                                )

                                            }

                                        >

                                            View Farm

                                            <FaArrowRight/>

                                        </button>

                                    </div>

                                    <div className="farmInfoGrid">

                                        <div className="farmInfoBox">

                                            <span>

                                                Soil Type

                                            </span>

                                            <h4>

                                                {farm.soil}

                                            </h4>

                                        </div>

                                        <div className="farmInfoBox">

                                            <span>

                                                Area

                                            </span>

                                            <h4>

                                                {farm.area}

                                            </h4>

                                        </div>

                                        <div className="farmInfoBox">

                                            <span>

                                                Crops

                                            </span>

                                            <h4>

                                                {farm.crops}

                                            </h4>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </section>

        </div>

        <Footer/>

    </>

    );

}

export default Farms;