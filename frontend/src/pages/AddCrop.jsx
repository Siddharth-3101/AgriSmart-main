import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
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
  Trash2
} from "lucide-react";

import { MapContainer, TileLayer, Polygon, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";

import "../styles/sid.css";
import { addCropAction } from "../main";

// Fix Leaflet marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

// Fit map to farm boundary
function FitBoundsToFarm({ farmPolygon }) {
  const map = useMapEvents({});
  useEffect(() => {
    if (farmPolygon && farmPolygon.length >= 3) {
      const bounds = L.latLngBounds(farmPolygon);
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 18 });
    }
  }, [farmPolygon, map]);
  return null;
}

// Click listener to draw crop area strictly within farm boundaries
function CropMapClickHandler({ farmPolygon, cropCoordinates, setCropCoordinates, setLandUsed }) {
  useMapEvents({
    click(e) {
      if (!farmPolygon || farmPolygon.length < 3) {
        toast.warning("Please select a farm with a valid registered boundary first.");
        return;
      }

      // 1. Create a Turf polygon of the farm (Turf expects [lng, lat])
      const farmGeoJson = turf.polygon([
        farmPolygon.map(p => [p[1], p[0]]).concat([[farmPolygon[0][1], farmPolygon[0][0]]])
      ]);

      // 2. Check if clicked point is inside the farm polygon
      const clickPoint = turf.point([e.latlng.lng, e.latlng.lat]);
      const isInside = turf.booleanPointInPolygon(clickPoint, farmGeoJson);

      if (!isInside) {
        toast.warning("Click is outside your farm boundary! Crop area must be located entirely within your own farm plot.");
        return;
      }

      const newCoords = [...cropCoordinates, [e.latlng.lat, e.latlng.lng]];
      setCropCoordinates(newCoords);

      // 3. If we have a crop polygon, calculate its area
      if (newCoords.length >= 3) {
        const cropGeoJson = turf.polygon([
          newCoords.map(p => [p[1], p[0]]).concat([[newCoords[0][1], newCoords[0][0]]])
        ]);
        const sqm = turf.area(cropGeoJson);
        const acres = sqm * 0.000247105;
        setLandUsed(Number(acres.toFixed(2)));
      }
    }
  });
  return null;
}

function AddCrop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const farms = useSelector((state) => state.agri.farms) || [];
  const token = useSelector((state) => state.agri.token);
  const demoMode = useSelector((state) => state.agri.demoMode);

  const [selectedFarmId, setSelectedFarmId] = useState(
    farms.length > 0 ? String(farms[0].farmId) : ""
  );
  const [cropName, setCropName] = useState("Rice");
  const [plantingDate, setPlantingDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [duration, setDuration] = useState(120);
  const [landUsed, setLandUsed] = useState(1.0);
  const [useMap, setUseMap] = useState(false);
  const [cropCoordinates, setCropCoordinates] = useState([]);

  const selectedFarm = farms.find((f) => String(f.farmId) === selectedFarmId);

  // Parse farm coordinates
  const farmCoordinates = useMemo(() => {
    if (!selectedFarm) return [];
    
    // Parse from serialized location field
    if (selectedFarm.location && selectedFarm.location.includes(" | ")) {
      try {
        const coords = JSON.parse(selectedFarm.location.split(" | ")[1]);
        if (Array.isArray(coords) && coords.length >= 3) {
          return coords;
        }
      } catch (e) {
        console.error("Failed to parse farm coordinates from location string", e);
      }
    }

    // Try localStorage fallback
    const saved = localStorage.getItem(`farm_coords_${selectedFarm.farmId}`);
    if (saved) {
      try {
        const coords = JSON.parse(saved);
        if (Array.isArray(coords) && coords.length >= 3) {
          return coords;
        }
      } catch (e) {}
    }

    // Default bounding box if missing
    if (selectedFarm.latitude && selectedFarm.longitude) {
      const lat = selectedFarm.latitude;
      const lng = selectedFarm.longitude;
      const d = 0.0006;
      return [
        [lat - d, lng - d],
        [lat + d, lng - d],
        [lat + d, lng + d],
        [lat - d, lng + d]
      ];
    }

    return [];
  }, [selectedFarm]);

  // Clean farm name/village display helper
  const cleanFarmName = (farm) => {
    const locName = farm.location ? farm.location.split(" | ")[0] : "Coimbatore";
    return `${farm.farmName} (${locName})`;
  };

  // Derive dynamic AI crop recommendations based on soil type
  const getAiRecommendations = () => {
    if (!selectedFarm) return [];
    const soil = selectedFarm.soilType.toLowerCase();
    if (soil.includes("black") || soil.includes("clay")) {
      return [
        { crop: "Rice", compat: "95%" },
        { crop: "Cotton", compat: "92%" },
        { crop: "Sugarcane", compat: "88%" },
      ];
    } else if (soil.includes("sandy")) {
      return [
        { crop: "Groundnut", compat: "91%" },
        { crop: "Maize", compat: "87%" },
        { crop: "Millet", compat: "82%" },
      ];
    } else {
      return [
        { crop: "Wheat", compat: "94%" },
        { crop: "Maize", compat: "90%" },
        { crop: "Pulses", compat: "85%" },
      ];
    }
  };

  const aiSuggestions = getAiRecommendations();

  // Reset crop coordinates when changing selected farm
  useEffect(() => {
    setCropCoordinates([]);
  }, [selectedFarmId]);

  const handleSuggestionClick = (suggestedCrop) => {
    setCropName(suggestedCrop);
    if (suggestedCrop === "Sugarcane") setDuration(300);
    else if (suggestedCrop === "Cotton") setDuration(150);
    else if (suggestedCrop === "Rice") setDuration(120);
    else if (suggestedCrop === "Wheat") setDuration(120);
    else if (suggestedCrop === "Groundnut") setDuration(105);
    else setDuration(120);
    toast.info(`Pre-filled crop type: ${suggestedCrop}`);
  };

  const handleRegisterCrop = async (e) => {
    e.preventDefault();

    if (!selectedFarmId) {
      toast.error("Please select or register a farm first.");
      return;
    }

    if (useMap && cropCoordinates.length < 3) {
      toast.error("Please draw a valid boundary polygon for the crop area on the map.");
      return;
    }

    const durationDays = Number(duration) || 120;
    const planted = new Date(plantingDate);
    const expectedHarvest = new Date(
      planted.getTime() + durationDays * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];

    // Serialize crop coordinates and area in the description field
    const serializedDesc = cropCoordinates.length > 0
      ? `Area: ${landUsed} Acres | Coordinates: ${JSON.stringify(cropCoordinates)}`
      : `Cultivated Area: ${landUsed} Acres`;

    const payload = {
      cropName: cropName,
      duration: durationDays,
      description: serializedDesc,
      status: "ACTIVE",
      season: "KHARIF",
      plantedDate: plantingDate,
      expectedHarvestDate: expectedHarvest,
      farmId: Number(selectedFarmId)
    };

    try {
      if (!demoMode) {
        const res = await fetch("http://localhost:8083/api/crops", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const createdCrop = await res.json();
          // Store crop coordinates locally for matching references
          localStorage.setItem(`crop_coords_${createdCrop.cropId}`, JSON.stringify(cropCoordinates));
          dispatch(addCropAction(createdCrop));
          toast.success("Crop registered successfully inside farm boundaries!");
          navigate("/crops");
          return;
        } else {
          const err = await res.json();
          toast.error(err.message || "Failed to save crop.");
        }
      }
    } catch (err) {
      console.warn("Crop Service offline, adding locally.", err);
    }

    // Mock/Demo Mode Fallback
    const mockCropId = Date.now();
    const mockCrop = {
      ...payload,
      cropId: mockCropId,
      yield: null,
    };
    localStorage.setItem(`crop_coords_${mockCropId}`, JSON.stringify(cropCoordinates));
    dispatch(addCropAction(mockCrop));
    toast.success("Crop registered locally (Demo Mode)!");
    navigate("/crops");
  };

  return (
    <>
      <Navbar />

      <div className="cropFormPage">
        {/* Header */}
        <div className="formHeader">
          <button className="backBtn" onClick={() => navigate("/crops")}>
            <ArrowLeft size={18} />
            Back
          </button>
          <h1>Add New Crop</h1>
          <p>
            Choose a farm, mark out the crop area inside its boundaries, and begin monitoring.
          </p>
        </div>

        {/* Main Content */}
        <div className="cropFormContainer">
          {/* Left Side */}
          <div className="cropFormCard">
            <h2>Crop Information</h2>
            <form onSubmit={handleRegisterCrop}>
              <div className="formGroup">
                <label>Select Farm</label>
                {farms.length > 0 ? (
                  <select
                    value={selectedFarmId}
                    onChange={(e) => setSelectedFarmId(e.target.value)}
                    required
                  >
                    {farms.map((f) => (
                      <option key={f.farmId} value={f.farmId}>
                        {cleanFarmName(f)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div style={{ padding: "10px", color: "red", fontSize: "13px", background: "#fff0f0", borderRadius: "6px" }}>
                    No registered farms found. Please register a farm plot first!
                    <button
                      type="button"
                      onClick={() => navigate("/farm-management/add")}
                      style={{ marginLeft: "10px", textDecoration: "underline", color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Add Farm Plot
                    </button>
                  </div>
                )}
              </div>

              <div className="formGroup">
                <label>Crop Name</label>
                <select
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  required
                >
                  <option value="Rice">Rice</option>
                  <option value="Maize">Maize</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Sugarcane">Sugarcane</option>
                </select>
              </div>

              <div className="formGroup">
                <label>Planting Date</label>
                <input
                  type="date"
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                  required
                />
              </div>

              <div className="formGroup">
                <label>Cultivation Duration (Days)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>

              <div className="formGroup">
                <label>Land Used (Acres)</label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g. 2.5"
                  value={landUsed}
                  onChange={(e) => setLandUsed(e.target.value)}
                  required
                  disabled={useMap}
                  style={{ backgroundColor: useMap ? "#f1f5f9" : "" }}
                />
                {useMap && (
                  <span style={{ fontSize: "11.5px", color: "var(--primary)", marginTop: "4px", display: "block" }}>
                    ℹ Area is calculated automatically from the map boundaries.
                  </span>
                )}
              </div>

              <div className="mapOption">
                <input
                  type="checkbox"
                  checked={useMap}
                  onChange={() => setUseMap(!useMap)}
                />
                <span>Mark crop area on interactive map (draw inside your farm)</span>
              </div>

              {useMap && (
                <div style={{ marginTop: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", color: "gray" }}>
                      Click inside the farm boundaries (orange polygon) to define the crop area (green polygon).
                    </span>
                    {cropCoordinates.length > 0 && (
                      <button
                        type="button"
                        onClick={() => { setCropCoordinates([]); setLandUsed(1.0); }}
                        style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
                      >
                        <Trash2 size={14} /> Clear Map
                      </button>
                    )}
                  </div>

                  <div style={{ border: "1px solid #cbdcd0", borderRadius: "12px", overflow: "hidden" }}>
                    {farmCoordinates.length >= 3 ? (
                      <MapContainer
                        center={farmCoordinates[0]}
                        zoom={17}
                        scrollWheelZoom={true}
                        style={{ width: "100%", height: "400px" }}
                      >
                        <TileLayer
                          attribution="Esri"
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                        <FitBoundsToFarm farmPolygon={farmCoordinates} />

                        {/* Render Farm Limits Guide */}
                        <Polygon
                          positions={farmCoordinates}
                          pathOptions={{
                            color: "#d97706",
                            dashArray: "6,6",
                            fillColor: "#fef3c7",
                            fillOpacity: 0.1,
                            weight: 3
                          }}
                        />

                        {/* Render Crop Area Markers */}
                        {cropCoordinates.map((point, index) => (
                          <Marker
                            key={index}
                            position={point}
                            draggable={true}
                            eventHandlers={{
                              dragend: (e) => {
                                const latLng = e.target.getLatLng();
                                // Validate if inside farm
                                if (farmCoordinates && farmCoordinates.length >= 3) {
                                  const farmGeoJson = turf.polygon([
                                    farmCoordinates.map(p => [p[1], p[0]]).concat([[farmCoordinates[0][1], farmCoordinates[0][0]]])
                                  ]);
                                  const dragPoint = turf.point([latLng.lng, latLng.lat]);
                                  const isInside = turf.booleanPointInPolygon(dragPoint, farmGeoJson);
                                  if (!isInside) {
                                    toast.warning("Cannot drag marker outside the farm boundary!");
                                    // Reset marker position
                                    e.target.setLatLng(point);
                                    return;
                                  }
                                }
                                
                                setCropCoordinates((prev) => {
                                  const newCoords = [...prev];
                                  newCoords[index] = [latLng.lat, latLng.lng];
                                  
                                  // Recalculate area
                                  if (newCoords.length >= 3) {
                                    const cropGeoJson = turf.polygon([
                                      newCoords.map(p => [p[1], p[0]]).concat([[newCoords[0][1], newCoords[0][0]]])
                                    ]);
                                    const sqm = turf.area(cropGeoJson);
                                    const acres = sqm * 0.000247105;
                                    setLandUsed(Number(acres.toFixed(2)));
                                  }
                                  return newCoords;
                                });
                              }
                            }}
                          />
                        ))}

                        {/* Render Crop Area Polygon */}
                        {cropCoordinates.length >= 3 && (
                          <Polygon
                            positions={cropCoordinates}
                            pathOptions={{
                              color: "#16a34a",
                              fillColor: "#4ca35a",
                              fillOpacity: 0.4,
                              weight: 3
                            }}
                          />
                        )}

                        <CropMapClickHandler
                          farmPolygon={farmCoordinates}
                          cropCoordinates={cropCoordinates}
                          setCropCoordinates={setCropCoordinates}
                          setLandUsed={setLandUsed}
                        />
                      </MapContainer>
                    ) : (
                      <div className="leafletPlaceholder">
                        <MapPinned size={50} />
                        <h3>Missing Farm Limits</h3>
                        <p>This farm plot doesn't have a registered boundary to draw inside.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="formButtons">
                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() => navigate("/crops")}
                >
                  Cancel
                </button>
                <button className="submitBtn" type="submit">
                  <Plus size={18} />
                  Register Crop
                </button>
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="cropSidePanel">
            {/* Farm Summary */}
            <div className="infoCard">
              <div className="cardTitle">
                <Tractor />
                <h3>Farm Summary</h3>
              </div>
              {selectedFarm ? (
                <>
                  <div className="summaryRow">
                    <span>Total Area</span>
                    <strong>{selectedFarm.area} Acres</strong>
                  </div>
                  <div className="summaryRow">
                    <span>Soil Type</span>
                    <strong>{selectedFarm.soilType}</strong>
                  </div>
                  <div className="summaryRow">
                    <span>Water Source</span>
                    <strong>{selectedFarm.waterSource}</strong>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: "12px", color: "gray" }}>
                  Please select a farm to load stats.
                </div>
              )}
            </div>

            {/* AI Recommendation */}
            <div className="infoCard">
              <div className="cardTitle">
                <Brain />
                <h3>AI Suggested Crops</h3>
              </div>
              {selectedFarm ? (
                aiSuggestions.map((s, idx) => (
                  <div
                    className="suggestion"
                    key={idx}
                    onClick={() => handleSuggestionClick(s.crop)}
                    style={{ cursor: "pointer" }}
                  >
                    <Leaf />
                    <div>
                      <h4>{s.crop}</h4>
                      <p>{s.compat} Compatibility</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: "12px", color: "gray" }}>
                  Select farm plot to compute soil recommendations.
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="infoCard">
              <div className="cardTitle">
                <Wheat />
                <h3>Quick Tips</h3>
              </div>
              <ul className="tips">
                <li>Select the correct farm plot.</li>
                <li>Your crop coordinates must sit entirely inside the orange farm polygon limits.</li>
                <li>Click points in order. You can clear the points using the "Clear Map" action.</li>
                <li>Crop acreage will be auto-calculated using Turf.js.</li>
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