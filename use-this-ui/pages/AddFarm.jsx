import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/farm.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";
import LeafletMap from "../components/LeafletMap";

import {

    FaArrowLeft,
    FaSeedling,
    FaTint,
    FaFileUpload,
    FaSave

} from "react-icons/fa";

function AddFarm(){

    const navigate = useNavigate();

    const [farm,setFarm] = useState({

        farmName:"",
        village:"",
        district:"",
        state:"",
        soil:"",
        ownership:"",
        waterSource:"",
        irrigation:"",
        crop:"",
        season:"",
        plantingDate:""

    });

    const [boundary,setBoundary] = useState({

        geoJson:null,

        coordinates:[],

        center:null,

        bounds:null,

        areaSquareMeters:0,

        areaAcres:0,

        areaHectares:0

    });

    const handleChange = (e)=>{

        setFarm({

            ...farm,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit = (e)=>{

        e.preventDefault();

        console.log({

            ...farm,

            boundary

        });

        alert("Farm Registered Successfully");

        navigate("/farm-management");

    };

    return(

        <>

            <Navbar/>

            <FloatingAI/>

            <div className="addFarmPage">

                <div className="addFarmContainer">

                    <button

                        className="backButton"

                        onClick={()=>navigate("/farm-management")}

                    >

                        <FaArrowLeft/>

                        Back to Farms

                    </button>

                    <div className="pageHeader">

                        <h1>

                            Register New Farm

                        </h1>

                        <p>

                            Register your farm by drawing its exact boundary.

                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* ============================
                                BASIC INFORMATION
                        ============================ */}

                        <div className="formSection">

                            <h2>

                                Basic Information

                            </h2>

                            <div className="formGrid">

                                <div className="formGroup">

                                    <label>

                                        Farm Name

                                    </label>

                                    <input

                                        type="text"

                                        name="farmName"

                                        value={farm.farmName}

                                        onChange={handleChange}

                                        placeholder="Green Valley Farm"

                                        required

                                    />

                                </div>

                                <div className="formGroup">

                                    <label>

                                        Village

                                    </label>

                                    <input

                                        type="text"

                                        name="village"

                                        value={farm.village}

                                        onChange={handleChange}

                                        placeholder="Village"

                                        required

                                    />

                                </div>

                                <div className="formGroup">

                                    <label>

                                        District

                                    </label>

                                    <input

                                        type="text"

                                        name="district"

                                        value={farm.district}

                                        onChange={handleChange}

                                        placeholder="District"

                                        required

                                    />

                                </div>

                                <div className="formGroup">

                                    <label>

                                        State

                                    </label>

                                    <input

                                        type="text"

                                        name="state"

                                        value={farm.state}

                                        onChange={handleChange}

                                        placeholder="State"

                                        required

                                    />

                                </div>

                            </div>

                        </div>

                        {/* ============================
                                FARM BOUNDARY
                        ============================ */}

                        <div className="formSection">

                            <h2>

                                Farm Boundary

                            </h2>

                            <p>

                                Search your village, switch to satellite view and draw the exact farm boundary.

                                The polygon can later be edited, dragged and resized.

                            </p>

                            <LeafletMap

                                onPolygonChange={setBoundary}

                            />

                            {

                                boundary.geoJson && (

                                    <div className="polygonSummary">

                                        <div className="summaryBox">

                                            <span>

                                                Area

                                            </span>

                                            <h3>

                                                {boundary.areaAcres} Acres

                                            </h3>

                                        </div>

                                        <div className="summaryBox">

                                            <span>

                                                Hectares

                                            </span>

                                            <h3>

                                                {boundary.areaHectares}

                                            </h3>

                                        </div>

                                        <div className="summaryBox">

                                            <span>

                                                Boundary Points

                                            </span>

                                            <h3>

                                                {boundary.coordinates.length}

                                            </h3>

                                        </div>

                                    </div>

                                )

                            }

                        </div>

                        {/* ============================
                                LAND DETAILS
                        ============================ */}

                        <div className="formSection">

                            <h2>

                                Land Details

                            </h2>

                            <div className="formGrid">

                                <div className="formGroup">

                                    <label>

                                        Calculated Area

                                    </label>

                                    <input

                                        type="text"

                                        value={

                                            boundary.areaAcres

                                                ? `${boundary.areaAcres} Acres`

                                                : ""

                                        }

                                        readOnly

                                    />

                                </div>

                                <div className="formGroup">

                                    <label>

                                        Soil Type

                                    </label>

                                    <select

                                        name="soil"

                                        value={farm.soil}

                                        onChange={handleChange}

                                    >

                                        <option value="">

                                            Select Soil

                                        </option>

                                        <option>

                                            Black Soil

                                        </option>

                                        <option>

                                            Red Soil

                                        </option>

                                        <option>

                                            Alluvial Soil

                                        </option>

                                        <option>

                                            Laterite Soil

                                        </option>

                                        <option>

                                            Sandy Soil

                                        </option>

                                    </select>

                                </div>

                                <div className="formGroup">

                                    <label>

                                        Ownership

                                    </label>

                                    <select

                                        name="ownership"

                                        value={farm.ownership}

                                        onChange={handleChange}

                                    >

                                        <option value="">

                                            Select Ownership

                                        </option>

                                        <option>

                                            Owned

                                        </option>

                                        <option>

                                            Leased

                                        </option>

                                        <option>

                                            Shared

                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>
                                                {/* ============================
                                WATER & IRRIGATION
                        ============================ */}

                        <div className="formSection">

                            <h2>

                                <FaTint />

                                Water & Irrigation

                            </h2>

                            <div className="formGrid">

                                <div className="formGroup">

                                    <label>

                                        Water Source

                                    </label>

                                    <select

                                        name="waterSource"

                                        value={farm.waterSource}

                                        onChange={handleChange}

                                    >

                                        <option value="">

                                            Select Water Source

                                        </option>

                                        <option>Borewell</option>

                                        <option>Canal</option>

                                        <option>River</option>

                                        <option>Rain Water</option>

                                        <option>Lake</option>

                                        <option>Pond</option>

                                    </select>

                                </div>

                                <div className="formGroup">

                                    <label>

                                        Irrigation Method

                                    </label>

                                    <select

                                        name="irrigation"

                                        value={farm.irrigation}

                                        onChange={handleChange}

                                    >

                                        <option value="">

                                            Select Irrigation</option>

                                        <option>Drip Irrigation</option>

                                        <option>Sprinkler Irrigation</option>

                                        <option>Flood Irrigation</option>

                                        <option>Manual Irrigation</option>

                                    </select>

                                </div>

                            </div>

                        </div>

                        {/* ============================
                                CURRENT CROP
                        ============================ */}

                        <div className="formSection">

                            <h2>

                                <FaSeedling />

                                Current Crop

                            </h2>

                            <div className="formGrid">

                                <div className="formGroup">

                                    <label>

                                        Crop Name

                                    </label>

                                    <input

                                        type="text"

                                        name="crop"

                                        value={farm.crop}

                                        onChange={handleChange}

                                        placeholder="Rice"

                                    />

                                </div>

                                <div className="formGroup">

                                    <label>

                                        Season

                                    </label>

                                    <select

                                        name="season"

                                        value={farm.season}

                                        onChange={handleChange}

                                    >

                                        <option value="">

                                            Select Season

                                        </option>

                                        <option>Kharif</option>

                                        <option>Rabi</option>

                                        <option>Zaid</option>

                                    </select>

                                </div>

                                <div className="formGroup">

                                    <label>

                                        Planting Date

                                    </label>

                                    <input

                                        type="date"

                                        name="plantingDate"

                                        value={farm.plantingDate}

                                        onChange={handleChange}

                                    />

                                </div>

                            </div>

                        </div>

                        {/* ============================
                                DOCUMENTS
                        ============================ */}

                        <div className="formSection">

                            <h2>

                                <FaFileUpload />

                                Upload Documents

                            </h2>

                            <div className="formGrid">

                                <div className="formGroup">

                                    <label>

                                        Land Ownership Certificate

                                    </label>

                                    <input

                                        type="file"

                                    />

                                </div>

                                <div className="formGroup">

                                    <label>

                                        Soil Health Card

                                    </label>

                                    <input

                                        type="file"

                                    />

                                </div>

                                <div className="formGroup">

                                    <label>

                                        Farm Photograph

                                    </label>

                                    <input

                                        type="file"

                                    />

                                </div>

                            </div>

                        </div>

                        {/* ============================
                                ACTION BUTTONS
                        ============================ */}

                        <div className="formButtons">

                            <button

                                type="button"

                                className="cancelBtn"

                                onClick={()=>

                                    navigate("/farm-management")

                                }

                            >

                                Cancel

                            </button>

                            <button

                                type="submit"

                                className="saveFarmBtn"

                            >

                                <FaSave />

                                Save Farm

                            </button>

                        </div>

                    </form>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default AddFarm;