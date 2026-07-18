import { useMemo, useEffect } from "react";

import {

    MapContainer,
    TileLayer,
    Polygon,
    Marker,
    Popup,
    LayersControl,
    ScaleControl,
    useMap

} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl: markerIcon2x,

    iconUrl: markerIcon,

    shadowUrl: markerShadow

});

const { BaseLayer } = LayersControl;

/* ==========================================
        FIT MAP TO FARM
========================================== */

function FitBounds({ polygon }){

    const map = useMap();

    useEffect(()=>{

        if(!polygon || polygon.length < 3)

            return;

        const bounds = L.latLngBounds(polygon);

        map.fitBounds(bounds,{

            padding:[40,40],

            maxZoom:18

        });

    },[map,polygon]);

    return null;

}

/* ==========================================
        MAIN COMPONENT
========================================== */

function LeafletViewer({

    farm

}){

    const polygon = useMemo(()=>{

        if(

            !farm ||

            !farm.coordinates ||

            farm.coordinates.length < 3

        )

            return [];

        return farm.coordinates;

    },[farm]);

    const center = useMemo(()=>{

        if(polygon.length===0)

            return [11.0168,76.9558];

        const bounds = L.latLngBounds(polygon);

        return bounds.getCenter();

    },[polygon]);

    return(

        <div className="viewerContainer">

            <MapContainer

                center={center}

                zoom={16}

                scrollWheelZoom={true}

                style={{

                    width:"100%",

                    height:"500px",

                    borderRadius:"18px"

                }}

            >

                <LayersControl position="topright">

                    <BaseLayer checked name="Satellite">

                        <TileLayer

                            attribution="Tiles © Esri"

                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

                        />

                    </BaseLayer>

                    <BaseLayer name="Street">

                        <TileLayer

                            attribution="© OpenStreetMap"

                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                        />

                    </BaseLayer>

                </LayersControl>

                <ScaleControl />

                <FitBounds polygon={polygon} />
                                {/* ==========================================
                        FARM POLYGON
                ========================================== */}

                {

                    polygon.length >= 3 && (

                        <Polygon

                            positions={polygon}

                            pathOptions={{

                                color:"#2E7D32",

                                fillColor:"#43A047",

                                fillOpacity:0.35,

                                weight:4

                            }}

                        />

                    )

                }

                {/* ==========================================
                        FARM CENTER MARKER
                ========================================== */}

                {

                    polygon.length > 0 && (

                        <Marker position={center}>

                            <Popup>

                                <div>

                                    <strong>

                                        {farm.name}

                                    </strong>

                                    <br/>

                                    🌱 {farm.soil}

                                    <br/>

                                    📐 {farm.area}

                                    <br/>

                                    💧 {farm.water}

                                </div>

                            </Popup>

                        </Marker>

                    )

                }

            </MapContainer>

            {/* ==========================================
                    FARM INFORMATION
            ========================================== */}

            <div className="viewerInfo">

                <div>

                    <h3>

                        {farm.name}

                    </h3>

                    <p>

                        📍 {farm.village}, {farm.state}

                    </p>

                </div>

                <div>

                    <p>

                        🌱 <strong>Soil:</strong> {farm.soil}

                    </p>

                    <p>

                        📐 <strong>Area:</strong> {farm.area}

                    </p>

                </div>

                <div>

                    <p>

                        💧 <strong>Water:</strong> {farm.water}

                    </p>

                    <p>

                        🌾 <strong>Crop:</strong> {farm.crop}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default LeafletViewer;