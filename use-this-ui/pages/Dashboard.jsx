import React from "react";
import "../App.css";
import "../styles/sanjay.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Tractor,
  Sprout,
  ClipboardList,
  Landmark,
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
  CalendarDays,
  TriangleAlert,
  ListTodo,
  Bot
} from "lucide-react";

const dashboard = {
  farmerName: "Sanjay",

  weather: {
    temperature: "31°C",
    condition: "Partly Cloudy",
    humidity: "70%",
    rainChance: "45%",
    wind: "14 km/h",
    updated: "Today, 8:30 AM"
  },

  summary: {
    farms: 4,
    crops: 9,
    pendingTasks: 5,
    schemes: 3
  },

  advisory: [
    {
      id: 1,
      type: "alert",
      title: "Heavy Rain Alert",
      message: "Heavy rainfall expected over the next 24 hours."
    },
    {
      id: 2,
      type: "warning",
      title: "Pest Advisory",
      message: "High possibility of stem borer infestation."
    },
    {
      id: 3,
      type: "info",
      title: "Government Update",
      message: "PM-KISAN applications are now open."
    },
    {
      id: 4,
      type: "info",
      title: "Soil Testing",
      message: "Free soil testing camp starts next week."
    }
  ],

  tasks: [
    {
      id: 1,
      title: "Irrigate Paddy Field",
      time: "08:00 AM"
    },
    {
      id: 2,
      title: "Apply Urea Fertilizer",
      time: "10:30 AM"
    },
    {
      id: 3,
      title: "Inspect Tomato Crop",
      time: "02:00 PM"
    },
    {
      id: 4,
      title: "Harvest Groundnut",
      time: "05:00 PM"
    }
  ],

  recommendations: [
    {
      id: 1,
      title: "Skip Irrigation",
      message: "Rain is expected tomorrow."
    },
    {
      id: 2,
      title: "Fertilizer Recommendation",
      message: "Apply Potassium within 2 days."
    },
    {
      id: 3,
      title: "Government Scheme",
      message: "You are eligible for PM-KISAN."
    }
  ],

  events: [
    {
      id: 1,
      title: "Rice Harvest",
      month: "JUL",
      day: "05",
      date: "5 July 2026"
    },
    {
      id: 2,
      title: "PM-KISAN Deadline",
      month: "JUL",
      day: "15",
      date: "15 July 2026"
    },
    {
      id: 3,
      title: "Fertilizer Application",
      month: "JUL",
      day: "20",
      date: "20 July 2026"
    }
  ]
};

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard">

        {/* ===========================
            Welcome Section
        ============================ */}

        <div className="dashboard-welcome-card">

          <div>

            <h1>
              Welcome back,
              <span>{dashboard.farmerName}</span>
            </h1>

            <p>
              Here's a quick overview of your farm activities today.
            </p>

          </div>

          <div className="dashboard-date-card">

            <CalendarDays />

            <div>

              <h4>30 June 2026</h4>

              <p>Tuesday</p>

            </div>

          </div>

        </div>

        {/* ===========================
            Summary Cards
        ============================ */}

        <div className="dashboard-summary-grid">

          <div className="dashboard-summary-card">

            <div className="dashboard-icon dashboard-green">
              <Tractor />
            </div>

            <div>

              <h4>Total Farms</h4>

              <h2>{dashboard.summary.farms}</h2>

            </div>

          </div>

          <div className="dashboard-summary-card">

            <div className="dashboard-icon dashboard-lightgreen">
              <Sprout />
            </div>

            <div>

              <h4>Active Crops</h4>

              <h2>{dashboard.summary.crops}</h2>

            </div>

          </div>

          <div className="dashboard-summary-card">

            <div className="dashboard-icon dashboard-orange">
              <ClipboardList />
            </div>

            <div>

              <h4>Pending Tasks</h4>

              <h2>{dashboard.summary.pendingTasks}</h2>

            </div>

          </div>

          <div className="dashboard-summary-card">

            <div className="dashboard-icon dashboard-purple">
              <Landmark />
            </div>

            <div>

              <h4>Eligible Schemes</h4>

              <h2>{dashboard.summary.schemes}</h2>

            </div>

          </div>

        </div>

        {/* ===========================
            Weather Card
        ============================ */}

        <div className="dashboard-weather-card">

          <div className="dashboard-weather-header">

            <CloudSun />

            <h2>Today's Weather Update</h2>

          </div>

          <div className="dashboard-weather-content">

            <div className="dashboard-weather-left">

              <CloudSun className="dashboard-weather-icon" />

              <h1>{dashboard.weather.temperature}</h1>

              <h3>{dashboard.weather.condition}</h3>

            </div>

            <div className="dashboard-weather-right">

              <div>

                <Droplets />

                <span>Humidity</span>

                <strong>{dashboard.weather.humidity}</strong>

              </div>

              <div>

                <CloudRain />

                <span>Rain Chance</span>

                <strong>{dashboard.weather.rainChance}</strong>

              </div>

              <div>

                <Wind />

                <span>Wind Speed</span>

                <strong>{dashboard.weather.wind}</strong>

              </div>

              <div>

                <CalendarDays />

                <span>Updated</span>

                <strong>{dashboard.weather.updated}</strong>

              </div>

            </div>

          </div>

        </div>

        <div className="dashboard-grid">
          
                {/* ===========================
            Advisory Panel
        ============================ */}

        <div className="dashboard-glass-panel">

          <div className="dashboard-section-title">

            <TriangleAlert />

            <h2>Official Advisory & Warnings</h2>

          </div>

          <div className="dashboard-scroll-box">

            {dashboard.advisory.map((item) => (

              <div
                key={item.id}
                className={`dashboard-advisory ${item.type}`}
              >

                <h4>{item.title}</h4>

                <p>{item.message}</p>

              </div>

            ))}

          </div>

        </div>

        {/* ===========================
            Today's Tasks
        ============================ */}

        <div className="dashboard-glass-panel">

          <div className="dashboard-section-title">

            <ListTodo />

            <h2>Today's Tasks</h2>

          </div>

          <div className="dashboard-scroll-box">

            {dashboard.tasks.map((task) => (

              <div
                className="dashboard-task-item"
                key={task.id}
              >

                <div>

                  <h4>{task.title}</h4>

                  <p>{task.time}</p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ===========================
            AI Recommendations
        ============================ */}

        <div className="dashboard-glass-panel">

          <div className="dashboard-section-title">

            <Bot />

            <h2>AI Recommendations</h2>

          </div>

          <div className="dashboard-scroll-box">

            {dashboard.recommendations.map((item) => (

              <div
                className="dashboard-recommend-card"
                key={item.id}
              >

                <h4>{item.title}</h4>

                <p>{item.message}</p>

              </div>

            ))}

          </div>

        </div>

        {/* ===========================
            Upcoming Events
        ============================ */}

        <div className="dashboard-glass-panel">

          <div className="dashboard-section-title">

            <CalendarDays />

            <h2>Upcoming Events</h2>

          </div>

          <div className="dashboard-scroll-box">

            {dashboard.events.map((event) => (

              <div
                className="dashboard-event-card"
                key={event.id}
              >

                <div className="dashboard-event-date">

                  <span className="dashboard-event-month">
                    {event.month}
                  </span>

                  <span className="dashboard-event-day">
                    {event.day}
                  </span>

                </div>

                <div className="dashboard-event-details">

                  <h4>{event.title}</h4>

                  <p>{event.date}</p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

    <Footer />

    </>
  );
}