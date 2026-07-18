import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/farm.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";
import LeafletViewer from "../components/LeafletViewer";
import {

  FaArrowLeft,
  FaMapMarkerAlt,
  FaLeaf,
  FaTint,
  FaSeedling,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaChartLine,
  FaCloudSun,
  FaFileAlt

} from "react-icons/fa";

function FarmDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  // Dummy data
  const farm = {

    id,

    name: "Green Valley Farm",

    village: "Coimbatore",

    district: "Coimbatore",

    state: "Tamil Nadu",

    soil: "Black Soil",

    area: "4 Acres",

    irrigation: "Drip Irrigation",

    water: "Borewell",

    crop: "Rice",

    season: "Kharif",

    expectedYield: "3.2 Tons",

    harvestDays: "45 Days",

    status: "Healthy"

  };

  return (

    <>

      <Navbar />

      <FloatingAI />

      <div className="farmDetailsPage">

        <div className="farmDetailsContainer">

          <button

            className="backButton"

            onClick={() => navigate("/farm-management")}

          >

            <FaArrowLeft />

            Back to Farms

          </button>

          {/* ================= HEADER ================= */}

          <div className="detailsHeader">

            <div>

              <h1>

                {farm.name}

              </h1>

              <p>

                <FaMapMarkerAlt />

                {farm.village},

                {" "}

                {farm.state}

              </p>

            </div>

            <span className="farmStatus">

              🟢 Healthy

            </span>

          </div>

          {/* ================= STATS ================= */}

          <div className="farmStatsGrid">

            <div className="statCard">

              <FaSeedling />

              <span>

                Area

              </span>

              <h3>

                {farm.area}

              </h3>

            </div>

            <div className="statCard">

              <FaLeaf />

              <span>

                Soil Type

              </span>

              <h3>

                {farm.soil}

              </h3>

            </div>

            <div className="statCard">

              <FaTint />

              <span>

                Water Source

              </span>

              <h3>

                {farm.water}

              </h3>

            </div>

            <div className="statCard">

              <FaChartLine />

              <span>

                Expected Yield

              </span>

              <h3>

                {farm.expectedYield}

              </h3>

            </div>

          </div>

          {/* ================= INFORMATION ================= */}

          <div className="infoGrid">

            <div className="infoCard">

              <h2>

                Farm Information

              </h2>

              <ul>

                <li>

                  <strong>Current Crop:</strong>

                  {farm.crop}

                </li>

                <li>

                  <strong>Season:</strong>

                  {farm.season}

                </li>

                <li>

                  <strong>Irrigation:</strong>

                  {farm.irrigation}

                </li>

                <li>

                  <strong>District:</strong>

                  {farm.district}

                </li>

                <li>

                  <strong>State:</strong>

                  {farm.state}

                </li>

              </ul>

            </div>

            <div className="infoCard">

              <h2>

                Farm Boundary

              </h2>

              <div className="detailsMap">

                <LeafletViewer

                  farm={{

                    name: farm.name,

                    village: farm.village,

                    state: farm.state,

                    soil: farm.soil,

                    area: farm.area,

                    water: farm.water,

                    crop: farm.crop,

                    coordinates: [

                      [11.0173, 76.9553],

                      [11.0181, 76.9575],

                      [11.0166, 76.9584],

                      [11.0158, 76.9564]

                    ]

                  }}

                />

              </div>

            </div>

          </div>
          {/* ================= CURRENT CROP ================= */}

          <div className="detailsSection">

            <h2>

              Current Crop

            </h2>

            <div className="cropCard">

              <div>

                <h3>

                  🌾 {farm.crop}

                </h3>

                <p>

                  Current Season: {farm.season}

                </p>

                <p>

                  Harvest Expected In: {farm.harvestDays}

                </p>

              </div>

              <span className="healthyBadge">

                Healthy

              </span>

            </div>

          </div>

          {/* ================= WEATHER ================= */}

          <div className="detailsSection">

            <h2>

              Weather Overview

            </h2>

            <div className="weatherCard">

              <div>

                <FaCloudSun />

                <h3>

                  28°C

                </h3>

              </div>

              <div>

                <span>

                  Humidity

                </span>

                <h4>

                  72%

                </h4>

              </div>

              <div>

                <span>

                  Wind

                </span>

                <h4>

                  14 km/h

                </h4>

              </div>

              <div>

                <span>

                  Forecast

                </span>

                <h4>

                  Rain Tomorrow

                </h4>

              </div>

            </div>

          </div>

          {/* ================= DOCUMENTS ================= */}

          <div className="detailsSection">

            <h2>

              Documents

            </h2>

            <div className="documentList">

              <div className="documentItem">

                <FaFileAlt />

                <span>

                  Land Ownership Certificate.pdf

                </span>

              </div>

              <div className="documentItem">

                <FaFileAlt />

                <span>

                  Soil Health Card.pdf

                </span>

              </div>

              <div className="documentItem">

                <FaFileAlt />

                <span>

                  Farm Photograph.jpg

                </span>

              </div>

            </div>

          </div>

          {/* ================= RECENT ACTIVITY ================= */}

          <div className="detailsSection">

            <h2>

              Recent Activity

            </h2>

            <div className="timeline">

              <div className="timelineItem">

                <FaCalendarAlt />

                <div>

                  <h4>

                    Farm Registered

                  </h4>

                  <p>

                    10 June 2026

                  </p>

                </div>

              </div>

              <div className="timelineItem">

                <FaLeaf />

                <div>

                  <h4>

                    Soil Details Updated

                  </h4>

                  <p>

                    18 June 2026

                  </p>

                </div>

              </div>

              <div className="timelineItem">

                <FaSeedling />

                <div>

                  <h4>

                    Rice Crop Added

                  </h4>

                  <p>

                    25 June 2026

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= ACTION BUTTONS ================= */}

          <div className="detailsButtons">

            <button

              className="editFarmBtn"

              onClick={() =>

                navigate(`/farm-management/edit/${farm.id}`)

              }

            >

              <FaEdit />

              Edit Farm

            </button>

            <button

              className="deleteFarmBtn"

              onClick={() =>

                alert("Delete functionality coming soon.")

              }

            >

              <FaTrash />

              Delete Farm

            </button>

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

}

export default FarmDetails;