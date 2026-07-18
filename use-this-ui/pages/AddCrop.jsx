import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";
import {
    ArrowLeft,
    Tractor,
    Wheat,
    MapPinned,
    Leaf,
    Brain,
    Plus,
} from "lucide-react";

import "../styles/sid.css";

function AddCrop() {
    const navigate = useNavigate();

    const [useMap, setUseMap] = useState(false);

    return (
        <>
            <Navbar />

            <div className="cropFormPage">

                {/* Header */}

                <div className="formHeader">

                    <button
                        className="backBtn"
                        onClick={() => navigate("/crops")}
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <h1>Add New Crop</h1>

                    <p>
                        Register a crop for one of your farms and begin AI-powered crop
                        monitoring.
                    </p>

                </div>

                {/* Main Content */}

                <div className="cropFormContainer">

                    {/* Left Side */}

                    <div className="cropFormCard">

                        <h2>Crop Information</h2>

                        <div className="formGroup">
                            <label>Select Farm</label>

                            <select>
                                <option>Green Valley Farm</option>
                                <option>West Farm</option>
                                <option>South Farm</option>
                            </select>
                        </div>

                        <div className="formGroup">
                            <label>Crop Name</label>

                            <select>
                                <option>Rice</option>
                                <option>Maize</option>
                                <option>Groundnut</option>
                                <option>Cotton</option>
                                <option>Wheat</option>
                            </select>
                        </div>

                        <div className="formGroup">
                            <label>Planting Date</label>

                            <input type="date" />
                        </div>

                        <div className="formGroup">
                            <label>Land Used (Acres)</label>

                            <input
                                type="number"
                                placeholder="Example : 3"
                            />
                        </div>

                        <div className="mapOption">

                            <input
                                type="checkbox"
                                checked={useMap}
                                onChange={() => setUseMap(!useMap)}
                            />

                            <span>
                                Mark crop area on interactive map
                            </span>

                        </div>

                        {useMap && (

                            <div className="leafletPlaceholder">

                                <MapPinned size={50} />

                                <h3>Leaflet Map</h3>

                                <p>
                                    Interactive map will be integrated here during backend
                                    development.
                                </p>

                            </div>

                        )}

                        <div className="formButtons">

                            <button
                                className="cancelBtn"
                                onClick={() => navigate("/crops")}
                            >
                                Cancel
                            </button>

                            <button className="submitBtn">

                                <Plus size={18} />

                                Register Crop

                            </button>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="cropSidePanel">

                        {/* Farm Summary */}

                        <div className="infoCard">

                            <div className="cardTitle">

                                <Tractor />

                                <h3>Farm Summary</h3>

                            </div>

                            <div className="summaryRow">
                                <span>Total Area</span>
                                <strong>10 Acres</strong>
                            </div>

                            <div className="summaryRow">
                                <span>Allocated</span>
                                <strong>6 Acres</strong>
                            </div>

                            <div className="summaryRow">
                                <span>Available</span>
                                <strong>4 Acres</strong>
                            </div>

                        </div>

                        {/* AI Recommendation */}

                        <div className="infoCard">

                            <div className="cardTitle">

                                <Brain />

                                <h3>AI Suggested Crops</h3>

                            </div>

                            <div className="suggestion">

                                <Leaf />

                                <div>

                                    <h4>Rice</h4>

                                    <p>95% Compatibility</p>

                                </div>

                            </div>

                            <div className="suggestion">

                                <Leaf />

                                <div>

                                    <h4>Cotton</h4>

                                    <p>92% Compatibility</p>

                                </div>

                            </div>

                            <div className="suggestion">

                                <Leaf />

                                <div>

                                    <h4>Groundnut</h4>

                                    <p>89% Compatibility</p>

                                </div>

                            </div>

                        </div>

                        {/* Tips */}

                        <div className="infoCard">

                            <div className="cardTitle">

                                <Wheat />

                                <h3>Quick Tips</h3>

                            </div>

                            <ul className="tips">

                                <li>Select the correct farm.</li>

                                <li>Enter only the area used for this crop.</li>

                                <li>
                                    Use the map option for accurate land allocation.
                                </li>

                                <li>
                                    AI recommendations improve after weather sync.
                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>
            <FloatingAI />
            <Footer />
        </>
    );
}

export default AddCrop;