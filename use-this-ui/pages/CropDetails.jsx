import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";
import {
  ArrowLeft,
  Leaf,
  TrendingUp,
  Calendar,
  Droplets,
  Sun,
  CloudRain,
  Brain,
  MapPinned,
  Activity,
  Sprout,
} from "lucide-react";

import "../styles/sid.css";

function CropDetails() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="cropDetailsPage">

        {/* Header */}

<div className="detailsHeader">

    <button
        className="backBtn"
        onClick={() => navigate("/crops")}
    >
        <ArrowLeft size={18} />
        Back
    </button>

</div>

{/* Hero */}

<div className="cropDetailsHero">

    <img
        src="https://images.pexels.com/photos/236474/pexels-photo-236474.jpeg"
        alt="Rice"
        className="heroImage"
    />

    <div className="heroContent">

        <span className="heroBadge">
            Healthy
        </span>

        <h1>Rice</h1>

        <p>
            Green Valley Farm • Flowering Stage
        </p>

    </div>

</div>
<br></br>

        {/* Summary */}

        <div className="detailsStats">

          <div className="detailsCard">
            <Leaf />
            <h3>Health</h3>
            <h2>92%</h2>
          </div>

          <div className="detailsCard">
            <TrendingUp />
            <h3>Yield</h3>
            <h2>3.4 Tons</h2>
          </div>

          <div className="detailsCard">
            <Calendar />
            <h3>Harvest</h3>
            <h2>18 Days</h2>
          </div>

          <div className="detailsCard">
            <Droplets />
            <h3>Soil Moisture</h3>
            <h2>68%</h2>
          </div>

        </div>

        {/* Main Grid */}

        <div className="detailsGrid">

          {/* Left */}

          <div>

            {/* Progress */}

            <div className="glassCard">

              <h2>Growth Progress</h2>

              <div className="progressBar">

                <div
                  className="progressFill"
                  style={{ width: "78%" }}
                ></div>

              </div>

              <p>Flowering Stage • 78%</p>

            </div>

            {/* Weather */}

            <div className="glassCard">

              <h2>Weather Snapshot</h2>

              <div className="weatherRow">

                <div>

                  <Sun />

                  <h4>29°C</h4>

                  <span>Temperature</span>

                </div>

                <div>

                  <CloudRain />

                  <h4>40%</h4>

                  <span>Rain Chance</span>

                </div>

                <div>

                  <Droplets />

                  <h4>68%</h4>

                  <span>Humidity</span>

                </div>

              </div>

            </div>

            {/* Map */}

            <div className="glassCard">

              <h2>Crop Location</h2>

              <div className="leafletPlaceholder">

                <MapPinned size={50}/>

                <h3>Leaflet Map</h3>

                <p>
                  Interactive crop location will appear here.
                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            {/* AI */}

            <div className="glassCard">

              <h2>

                <Brain size={22}/>

                AI Recommendation

              </h2>

              <div className="recommendationBox">

                Continue irrigation tomorrow morning.

                Rain is expected within 48 hours.

              </div>

            </div>

            {/* Timeline */}

            <div className="glassCard">

              <h2>

                <Sprout size={22}/>

                Growth Timeline

              </h2>

              <div className="timeline">

                <div className="timelineItem">

                  <span className="dot"></span>

                  Seeded

                </div>

                <div className="timelineItem">

                  <span className="dot active"></span>

                  Germination

                </div>

                <div className="timelineItem">

                  <span className="dot active"></span>

                  Vegetative

                </div>

                <div className="timelineItem">

                  <span className="dot active"></span>

                  Flowering

                </div>

                <div className="timelineItem">

                  <span className="dot"></span>

                  Harvest

                </div>

              </div>

            </div>

            {/* Activity */}

            <div className="glassCard">

              <h2>

                <Activity size={22}/>

                Recent Activity

              </h2>

              <ul className="activityList">

                <li>✔ Irrigation completed yesterday.</li>

                <li>✔ AI updated yield prediction.</li>

                <li>✔ Fertilizer applied 4 days ago.</li>

                <li>✔ Weather synced successfully.</li>

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

export default CropDetails;