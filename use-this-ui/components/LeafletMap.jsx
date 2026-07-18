import { useState, useEffect } from "react";

import {

    MapContainer,
    TileLayer,
    Polygon,
    Marker,
    LayersControl,
    ScaleControl,
    useMapEvents

} from "react-leaflet";

import L from "leaflet";
import * as turf from "@turf/turf";

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
        CLICK HANDLER
========================================== */

function MapClickHandler({

    coordinates,
    setCoordinates

}){

    useMapEvents({

        click(e){

            setCoordinates(prev=>[

                ...prev,

                [

                    e.latlng.lat,

                    e.latlng.lng

                ]

            ]);

        }

    });

    return null;

}

/* ==========================================
        MAIN MAP
========================================== */

function LeafletMap({

    onPolygonChange

}){

    const [coordinates,setCoordinates] = useState([]);

    const defaultCenter = [

        11.0168,

        76.9558

    ];

    useEffect(()=>{

        if(coordinates.length<3){

            onPolygonChange({

                geoJson:null,

                coordinates,

                areaSquareMeters:0,

                areaAcres:0,

                areaHectares:0,

                center:null

            });

            return;

        }

        const geoJson = turf.polygon([

            coordinates.map(point=>

                [

                    point[1],

                    point[0]

                ]

            ).concat([

                [

                    coordinates[0][1],

                    coordinates[0][0]

                ]

            ])

        ]);

        const sqm = turf.area(geoJson);

        const acres = sqm*0.000247105;

        const hectares = sqm/10000;

        const bounds = L.latLngBounds(coordinates);

        const center = bounds.getCenter();

        onPolygonChange({

            geoJson,

            coordinates,

            center,

            areaSquareMeters:Number(sqm.toFixed(2)),

            areaAcres:Number(acres.toFixed(2)),

            areaHectares:Number(hectares.toFixed(2))

        });

    },[coordinates,onPolygonChange]);

    return(

        <div className="leafletWrapper">

            <MapContainer

                center={defaultCenter}

                zoom={16}

                scrollWheelZoom={true}

                style={{

                    width:"100%",

                    height:"550px",

                    borderRadius:"18px"

                }}

            >

                <LayersControl position="topright">

                    <BaseLayer checked name="Satellite">

                        <TileLayer

                            attribution="Esri"

                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

                        />

                    </BaseLayer>

                    <BaseLayer name="Street">

                        <TileLayer

                            attribution="OpenStreetMap"

                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                        />

                    </BaseLayer>
                                        <BaseLayer name="Satellite + Labels">

                        <TileLayer
                            attribution="Esri"
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />

                        <TileLayer
                            attribution="OpenStreetMap"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            opacity={0.35}
                        />

                    </BaseLayer>

                </LayersControl>

                <ScaleControl position="bottomleft" />

                <MapClickHandler

                    coordinates={coordinates}

                    setCoordinates={setCoordinates}

                />

                {/* ===============================
                        POLYGON VERTICES
                ================================ */}

                {

                    coordinates.map((point,index)=>(

                        <Marker

                            key={index}

                            position={point}

                        />

                    ))

                }

                {/* ===============================
                        DRAW POLYGON
                ================================ */}

                {

                    coordinates.length>=3 && (

                        <Polygon

                            positions={coordinates}

                            pathOptions={{

                                color:"#2E7D32",

                                fillColor:"#4CAF50",

                                fillOpacity:0.35,

                                weight:4

                            }}

                        />

                    )

                }

            </MapContainer>

            {/* ===============================
                    MAP ACTIONS
            ================================ */}

            <div className="mapActions">

                <button

                    type="button"

                    className="clearPolygonBtn"

                    onClick={()=>setCoordinates([])}

                >

                    Clear Polygon

                </button>

                <div className="polygonInfo">

                    <span>

                        Points :

                        <strong>

                            {coordinates.length}

                        </strong>

                    </span>

                </div>

            </div>

        </div>

    );

}

export default LeafletMap;