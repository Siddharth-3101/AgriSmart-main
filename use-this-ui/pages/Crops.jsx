import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/sid.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";

import {
    Search,
    Plus,
    Leaf,
    Sprout,
    Calendar,
    TrendingUp,
    MapPinned,
    ArrowRight,
    Brain,
    CircleCheck,
    Activity,
    CloudRain,
    Droplets,
    FlaskConical
} from "lucide-react";

function Crops() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const cropData = [

        {
            id: 1,
            name: "Rice",
            image: "https://images.pexels.com/photos/236474/pexels-photo-236474.jpeg",
            farm: "Green Valley Farm",
            health: "Healthy",
            progress: 78,
            stage: "Flowering",
            area: "3 Acres",
            harvest: "18 Days",
            yield: "3.4 Tons",
            recommendation: "Continue irrigation tomorrow morning."
        },

        {
            id: 2,
            name: "Cotton",
            image: "https://images.pexels.com/photos/13924871/pexels-photo-13924871.jpeg",
            farm: "South Farm",
            health: "Growing",
            progress: 55,
            stage: "Vegetative",
            area: "2 Acres",
            harvest: "42 Days",
            yield: "2.2 Tons",
            recommendation: "Apply nitrogen fertilizer next week."
        },

        {
            id: 3,
            name: "Groundnut",
            image: "https://images.pexels.com/photos/9799037/pexels-photo-9799037.jpeg",
            farm: "West Farm",
            health: "Healthy",
            progress: 91,
            stage: "Pod Formation",
            area: "1.5 Acres",
            harvest: "8 Days",
            yield: "1.8 Tons",
            recommendation: "Harvest preparation can begin soon."
        },

        {
            id: 4,
            name: "Maize",
            image: "https://images.pexels.com/photos/7878030/pexels-photo-7878030.jpeg",
            farm: "East Farm",
            health: "Attention",
            progress: 34,
            stage: "Early Growth",
            area: "4 Acres",
            harvest: "67 Days",
            yield: "4.5 Tons",
            recommendation: "Water stress detected. Irrigate immediately."
        }

    ];

    const filteredCrops = cropData.filter((crop) =>
        crop.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <>

            <Navbar />

            <div className="cropPage">

                {/* HERO */}

                <section className="cropHero">

                    <div className="cropHeader">

                        <div className="cropHeaderLeft">

                            <h1>Crop Management</h1>

                            <p>
                                Monitor all your active crops with AI-powered insights and live tracking.
                            </p>

                        </div>

                        <button
                            className="addCropBtn"
                            onClick={() => navigate("/crops/add")}
                        >

                            <Plus size={18} />

                            Add Crop

                        </button>

                    </div>

                </section>

                {/* WHITE CONTENT */}

                <section className="cropContent">

                    {/* SUMMARY CARD */}

                    <div className="summaryCard">

                        <div className="summaryItem">

                            <Leaf size={34} />

                            <div>

                                <span>Active Crops</span>

                                <h3>{cropData.length}</h3>

                            </div>

                        </div>

                        <div className="summaryDivider"></div>

                        <div className="summaryItem">

                            <CircleCheck size={34} />

                            <div>

                                <span>Healthy Crops</span>

                                <h3>

                                    {
                                        cropData.filter(
                                            crop => crop.health === "Healthy"
                                        ).length
                                    }

                                </h3>

                            </div>

                        </div>

                        <div className="summaryDivider"></div>

                        <div className="summaryItem">

                            <Calendar size={34} />

                            <div>

                                <span>Next Harvest</span>

                                <h3>18 Days</h3>

                            </div>

                        </div>

                        <div className="summaryDivider"></div>

                        <div className="summaryItem">

                            <TrendingUp size={34} />

                            <div>

                                <span>Average Yield</span>

                                <h3>3.4 Tons</h3>

                            </div>

                        </div>

                    </div>

                    {/* SEARCH */}

                    <div className="searchBar">

                        <Search size={20} />

                        <input

                            type="text"

                            placeholder="Search crops..."

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                        />

                    </div>

                    {/* CURRENT CROPS */}

                    <div className="sectionTitle">

                        <h2>Current Crops</h2>

                    </div>

                    <div className="cropGrid">
                        {filteredCrops.length > 0 ? (

    filteredCrops.map((crop) => (

        <div
            className="cropCard"
            key={crop.id}
        >

            <img
                src={crop.image}
                alt={crop.name}
                className="cropImage"
            />

            <div className="cropBody">

                <div className="cropTop">

                    <div>

                        <h2>{crop.name}</h2>

                        <p>{crop.stage}</p>

                    </div>

                    <span
                        className={`cropStatus ${crop.health.toLowerCase()}`}
                    >

                        {crop.health}

                    </span>

                </div>

                <div className="progressSection">

                    <div className="progressHeader">

                        <span>Growth Progress</span>

                        <span>{crop.progress}%</span>

                    </div>

                    <div className="progressBar">

                        <div
                            className="progressFill"
                            style={{
                                width: `${crop.progress}%`
                            }}
                        ></div>

                    </div>

                </div>

                <div className="cropInfo">

                    <div>

                        <MapPinned size={18} />

                        <span>{crop.farm}</span>

                    </div>

                    <div>

                        <Sprout size={18} />

                        <span>{crop.area}</span>

                    </div>

                    <div>

                        <Calendar size={18} />

                        <span>{crop.harvest}</span>

                    </div>

                </div>

                <button
                    className="detailsBtn"
                    onClick={() =>
                        navigate(`/crops/${crop.id}`)
                    }
                >

                    View Details

                    <ArrowRight size={18} />

                </button>

            </div>

        </div>

    ))

) : (

    <div className="emptyCrop">

        <Leaf size={70} />

        <h2>No Crops Registered</h2>

        <p>

            You haven't added any crops yet.

            Start by registering your first crop.

        </p>

        <button
            className="addCropBtn"
            onClick={() => navigate("/crops/add")}
        >

            <Plus size={18} />

            Add Crop

        </button>

    </div>

)}

</div>


{/* End Crop Content */}

</section>

</div>

<FloatingAI />

<Footer />

</>

);

}

export default Crops;