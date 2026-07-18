import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAI from "../components/FloatingAI";

import "../styles/schemes.css";

import {
    Search,
    FileCheck,
    Sparkles,
    IndianRupee,
    Banknote,
    Leaf,
    ArrowRight,
    Filter,
    CircleAlert
} from "lucide-react";

function Schemes() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    /* ===========================
            DOCUMENTS
    =========================== */

    const documents = [

        { name:"Aadhaar Card", available:true },

        { name:"Bank Account", available:true },

        { name:"Farmer ID", available:true },

        { name:"Land Ownership", available:false },

        { name:"Soil Health Card", available:true },

        { name:"Mobile Number", available:true }

    ];

    /* ===========================
            CATEGORIES
    =========================== */

    const categories=[

        "All",

        "Financial Assistance",

        "Insurance",

        "Loans",

        "Subsidy",

        "Machinery",

        "Organic Farming"

    ];

    /* ===========================
            APPLIED
    =========================== */

    const appliedSchemes=[

        {

            id:1,

            name:"PM-KISAN",

            category:"Financial Assistance",

            description:"₹6,000 yearly income support.",

            status:"Approved"

        },

        {

            id:2,

            name:"Soil Health Card",

            category:"Soil",

            description:"Free soil testing.",

            status:"Pending"

        }

    ];

    /* ===========================
            RECOMMENDED
    =========================== */

    const recommendedSchemes=[

        {

            id:1,

            name:"PM-KISAN",

            category:"Financial Assistance",

            match:95,

            benefit:"₹6000 / Year",

            description:"Income support for eligible farmers.",

            missing:["Land Ownership Document"]

        },

        {

            id:2,

            name:"Kisan Credit Card",

            category:"Loans",

            match:86,

            benefit:"Low Interest Loan",

            description:"Agricultural credit support.",

            missing:["Income Certificate"]

        },

        {

            id:3,

            name:"Solar Pump Subsidy",

            category:"Subsidy",

            match:78,

            benefit:"60% Subsidy",

            description:"Subsidy for solar irrigation.",

            missing:["Electricity Proof"]

        }

    ];

    /* ===========================
            ALL SCHEMES
    =========================== */

    const schemes=[

        ...recommendedSchemes,

        {

            id:4,

            name:"PMFBY",

            category:"Insurance",

            match:74,

            benefit:"Crop Insurance",

            description:"Insurance against crop loss."

        },

        {

            id:5,

            name:"National Agriculture Market",

            category:"Financial Assistance",

            match:67,

            benefit:"Better Selling Price",

            description:"Digital agricultural marketplace."

        },

        {

            id:6,

            name:"Organic Farming Mission",

            category:"Organic Farming",

            match:82,

            benefit:"Training & Subsidy",

            description:"Support for organic farming."

        }

    ];

    const filteredSchemes = schemes.filter((scheme)=>{

        const searchMatch =

            scheme.name.toLowerCase()

            .includes(search.toLowerCase());

        const categoryMatch=

            selectedCategory==="All"

            ||

            scheme.category===selectedCategory;

        return searchMatch && categoryMatch;

    });

    return(

    <>

        <Navbar/>

        <div className="govSchemesPage">

            <section className="govSchemesHero">

                <div>

                    <h1>

                        Government Schemes & Subsidies

                    </h1>

                    <p>

                        Discover financial assistance,

                        insurance,

                        subsidies and support

                        designed for your farm.

                    </p>

                </div>

            </section>

            <section className="govSearchSection">

                <div className="govSchemeSearch">

                    <Search size={20}/>

                    <input

                        type="text"

                        placeholder="Search Government Schemes..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                </div>

            </section>

            <section className="govSchemesLayout">

                {/* SIDEBAR */}

                <aside className="govSchemesSidebar">

                    <div className="govSidebarCard">

                        <h3>

                            <FileCheck size={20}/>

                            Documents Checklist

                        </h3>

                        <div className="govDocumentList">

                            {

                                documents.map((doc)=>(

                                    <label

                                        key={doc.name}

                                        className="govDocumentItem"

                                    >

                                        <input

                                            type="checkbox"

                                            checked={doc.available}

                                            readOnly

                                        />

                                        <span>

                                            {doc.name}

                                        </span>

                                    </label>

                                ))

                            }

                        </div>

                    </div>

                    <div className="govSidebarCard">

                        <h3>

                            <Filter size={20}/>

                            Categories

                        </h3>

                        <div className="govCategoryList">

                            {

                                categories.map((category)=>(

                                    <button

                                        key={category}

                                        className={

                                            selectedCategory===category

                                            ?

                                            "govCategoryBtn active"

                                            :

                                            "govCategoryBtn"

                                        }

                                        onClick={()=>setSelectedCategory(category)}

                                    >

                                        {category}

                                    </button>

                                ))

                            }

                        </div>

                    </div>

                </aside>

                {/* MAIN */}

                <div className="govSchemesMain">

                    <section className="govAppliedSection">

                        <div className="govSectionHeader">

                            <h2>

                                My Applied Schemes

                            </h2>

                            <span>

                                {appliedSchemes.length} Applications

                            </span>

                        </div>

                        {

                            appliedSchemes.map((scheme)=>(

                                <div

                                    className="govAppliedCard"

                                    key={scheme.id}

                                >

                                    <div className="govAppliedLeft">

                                        <div className="govSchemeIcon">

                                            <Banknote size={28}/>

                                        </div>

                                        <div>

                                            <span className="govSchemeCategory">

                                                {scheme.category}

                                            </span>

                                            <h3>

                                                {scheme.name}

                                            </h3>

                                            <p>

                                                {scheme.description}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="govAppliedRight">

                                        <span className={`govStatusBadge ${scheme.status.toLowerCase()}`}>

                                            {scheme.status}

                                        </span>

                                        <button className="govOutlineBtn">

                                            View Details

                                            <ArrowRight size={16}/>

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </section>
                                        {/* ======================================
                            AI RECOMMENDED SCHEMES
                    ====================================== */}

                    <section className="govRecommendationSection">

                        <div className="govSectionHeader">

                            <h2>

                                <Sparkles size={20} />

                                AI Recommended Schemes

                            </h2>

                            <span>

                                Personalized For Your Farm

                            </span>

                        </div>

                        <div className="govRecommendationGrid">

                            {

                                recommendedSchemes.map((scheme) => (

                                    <div

                                        key={scheme.id}

                                        className="govRecommendationCard"

                                    >

                                        <div className="govRecommendationTop">

                                            <span className="govSchemeCategory">

                                                {scheme.category}

                                            </span>

                                            <span className="govMatchBadge">

                                                {scheme.match}% Match

                                            </span>

                                        </div>

                                        <h3>

                                            {scheme.name}

                                        </h3>

                                        <p>

                                            {scheme.description}

                                        </p>

                                        <div className="govBenefitRow">

                                            <IndianRupee size={18} />

                                            <span>

                                                {scheme.benefit}

                                            </span>

                                        </div>

                                        <div className="govMissingDocs">

                                            <h4>

                                                Missing Documents

                                            </h4>

                                            {

                                                scheme.missing.map((doc,index)=>(

                                                    <div

                                                        key={index}

                                                        className="govMissingItem"

                                                    >

                                                        <CircleAlert size={16}/>

                                                        <span>

                                                            {doc}

                                                        </span>

                                                    </div>

                                                ))

                                            }

                                        </div>

                                        <button className="govPrimaryBtn">

                                            Apply Now

                                        </button>

                                    </div>

                                ))

                            }

                        </div>

                    </section>

                    {/* ======================================
                            ALL GOVERNMENT SCHEMES
                    ====================================== */}

                    <section className="govAllSchemes">

                        <div className="govSectionHeader">

                            <h2>

                                Browse Government Schemes

                            </h2>

                            <span>

                                {filteredSchemes.length} Results

                            </span>

                        </div>

                        <div className="govSchemeGrid">

                            {

                                filteredSchemes.map((scheme)=>(

                                    <div

                                        key={scheme.id}

                                        className="govSchemeCard"

                                    >

                                        <div className="govSchemeCardTop">

                                            <div className="govSchemeIcon">

                                                <Leaf size={24}/>

                                            </div>

                                            <span className="govMatchBadge">

                                                {scheme.match}%

                                            </span>

                                        </div>

                                        <span className="govSchemeCategory">

                                            {scheme.category}

                                        </span>

                                        <h3>

                                            {scheme.name}

                                        </h3>

                                        <p>

                                            {scheme.description}

                                        </p>

                                        <div className="govBenefitRow">

                                            <IndianRupee size={18}/>

                                            <span>

                                                {scheme.benefit}

                                            </span>

                                        </div>

                                        <div className="govSchemeButtons">

                                            <button

                                                className="govPrimaryBtn"

                                            >

                                                Apply

                                            </button>

                                            <button

                                                className="govOutlineBtn"

                                                onClick={() => navigate(`/schemes/${scheme.id}`)}

                                            >

                                                Learn More

                                            </button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    </section>

                </div>

            </section>

        </div>

        <FloatingAI />

        <Footer />

    </>

    );

}

export default Schemes;