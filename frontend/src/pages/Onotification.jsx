import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "../styles/onotification.css";

import {
  FaBars,
  FaHome,
  FaUsers,
  FaTractor,
  FaLeaf,
  FaClipboardList,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaCog,
  FaBullhorn,
  FaExclamationTriangle,
  FaPaperPlane,
  FaFilter,
  FaCheckCircle,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { WiDaySunny } from "react-icons/wi";

import { addBroadcastNotificationAction } from "../main";

export default function ONotification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showSidebar, setShowSidebar] = useState(false);

  const broadcastNotifications = useSelector((state) => state.agri.broadcastNotifications) || [];
  const usersList = useSelector((state) => state.agri.usersList) || [];
  const farms = useSelector((state) => state.agri.farms) || [];
  const crops = useSelector((state) => state.agri.crops) || [];
  const user = useSelector((state) => state.agri.user);

  // Form states
  const [category, setCategory] = useState("Heavy Rain");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipients, setRecipients] = useState("All Farmers");
  const [priority, setPriority] = useState("High");

  const officer = {
    name: user ? user.name : "Rajesh Kumar",
    designation: "Agriculture Officer"
  };

  const categoryData = [
    { name: "Weather Alerts", value: broadcastNotifications.filter(n => n.type.toLowerCase().includes("rain") || n.type.toLowerCase().includes("heat") || n.type.toLowerCase().includes("cyclone")).length || 3 },
    { name: "Pests/Disease", value: broadcastNotifications.filter(n => n.type.toLowerCase().includes("pest") || n.type.toLowerCase().includes("disease")).length || 2 },
    { name: "Government Schemes", value: broadcastNotifications.filter(n => n.type.toLowerCase().includes("scheme")).length || 2 },
    { name: "General Updates", value: broadcastNotifications.filter(n => !n.type.toLowerCase().includes("rain") && !n.type.toLowerCase().includes("pest") && !n.type.toLowerCase().includes("scheme")).length || 1 }
  ];

  const categoryColors = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"];

  const publishData = [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 18 },
    { month: "Mar", count: 22 },
    { month: "Apr", count: 16 },
    { month: "May", count: 28 },
    { month: "Jun", count: 32 + broadcastNotifications.length }
  ];

  const reachData = [
    { name: "Viewed", value: 70 },
    { name: "Unread", value: 20 },
    { name: "Acknowledged", value: 10 }
  ];

  const reachColors = ["#2563eb", "#f59e0b", "#10b981"];

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/officer/dashboard" },
    { name: "Farmers", icon: <FaUsers />, path: "/officer/farmers" },
    { name: "Farms", icon: <FaTractor />, path: "/officer/ofarms" },
    { name: "Schemes", icon: <FaClipboardList />, path: "/officer/oschemes" },
    { name: "Crops", icon: <FaLeaf />, path: "/officer/ocrop" },
    { name: "Weather", icon: <WiDaySunny />, path: "/officer/oweather" },
    { name: "Notifications", icon: <FaBell />, path: "/officer/onification" },
    { name: "Profile", icon: <FaUserCircle />, path: "/officer/oprofile" }
  ];

  const stats = [
    {
      title: "Total Notifications",
      value: String(broadcastNotifications.length + 8),
      icon: <FaBell />,
      color: "#2563eb",
      bg: "#dbeafe"
    },
    {
      title: "Active Alerts",
      value: String(broadcastNotifications.filter((n) => n.priority === "High").length + 2),
      icon: <FaExclamationTriangle />,
      color: "#ef4444",
      bg: "#fee2e2"
    },
    {
      title: "Broadcast Messages",
      value: String(broadcastNotifications.length),
      icon: <FaBullhorn />,
      color: "#16a34a",
      bg: "#dcfce7"
    },
    {
      title: "Farmers Registered",
      value: String(usersList.filter(u => u.role === "FARMER").length || 45),
      icon: <FaUsers />,
      color: "#8b5cf6",
      bg: "#ede9fe"
    }
  ];

  const handlePublish = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Please enter a title and description.");
      return;
    }

    const newAlert = {
      id: Date.now(),
      title: `${category.toUpperCase()}: ${title}`,
      message: description,
      type: category,
      priority: priority,
      targetRegion: recipients,
      sender: officer.name,
      timestamp: new Date().toISOString()
    };

    dispatch(addBroadcastNotificationAction(newAlert));
    toast.success("Broadcast alert dispatched to all farmers!");
    setTitle("");
    setDescription("");
  };

  // Combine static and dynamic activities for display
  const activities = [
    ...broadcastNotifications.map(n => ({
      title: "Alert Broadcasted",
      description: `Dispatched "${n.title}" to ${n.targetRegion}.`,
      time: new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })),
    {
      title: "New Farmer Registered",
      description: "Ramesh Kumar has been added to the district database.",
      time: "10 minutes ago"
    },
    {
      title: "Crop Harvested",
      description: "Rice harvest updated by Lakshmi Devi.",
      time: "30 minutes ago"
    },
    {
      title: "Scheme Application",
      description: "15 new PM-Kisan applications received for verification.",
      time: "1 hour ago"
    }
  ];

  return (
    <div className="officer-container">
      <div
        className={`sidebar-overlay ${showSidebar ? "show-overlay" : ""}`}
        onClick={() => setShowSidebar(false)}
      ></div>

      <aside className={`officer-sidebar ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="sidebar-header">
          <h2>AgriSmart</h2>
          <p>Notification Center</p>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`sidebar-menu-item ${item.name === "Notifications" ? "active-menu" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <div className="menu-icon">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-navbar">
          <div className="navbar-left">
            <div className="menu-toggle-btn" onClick={() => setShowSidebar(true)}>
              <FaBars />
            </div>
            <h1>Broadcast Center</h1>
          </div>

          <div className="navbar-right">
            <div className="officer-profile-pill">
              <FaUserCircle size={20} />
              <div>
                <h4>{officer.name}</h4>
                <span>{officer.designation}</span>
              </div>
            </div>
          </div>
        </header>

        {/* STATS TILES */}
        <section className="stats-row">
          {stats.map((stat, index) => (
            <div className="stat-tile" key={index}>
              <div className="tile-left">
                <span>{stat.title}</span>
                <h2>{stat.value}</h2>
              </div>
              <div
                className="tile-icon-box"
                style={{
                  color: stat.color,
                  backgroundColor: stat.bg
                }}
              >
                {stat.icon}
              </div>
            </div>
          ))}
        </section>

        {/* COMPOSE ALERT FORM */}
        <section className="compose-card">
          <div className="card-header">
            <h2>
              <FaBullhorn /> Broadcast New Alert Dispatch
            </h2>
            <p>Compose emergency advisories, warnings or scheme updates to all agricultural plots.</p>
          </div>

          <form onSubmit={handlePublish}>
            <div className="compose-grid">
              <div className="input-group">
                <label>Advisory Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Heavy Rain">Heavy Rain</option>
                  <option value="Cyclone">Cyclone</option>
                  <option value="Heat Wave">Heat Wave</option>
                  <option value="Pest Outbreak">Pest Outbreak</option>
                  <option value="Disease Alert">Disease Alert</option>
                  <option value="Irrigation Advisory">Irrigation Advisory</option>
                  <option value="New Scheme">New Scheme</option>
                  <option value="Training Camp">Training Camp</option>
                  <option value="Fertilizer Distribution">Fertilizer Distribution</option>
                </select>
              </div>

              <div className="input-group full-width">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter notification title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Description / Message Content</label>
                <textarea
                  rows="5"
                  placeholder="Write notification warning or advice details here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="input-group">
                <label>Recipients</label>
                <select value={recipients} onChange={(e) => setRecipients(e.target.value)}>
                  <option value="All Farmers">All Farmers</option>
                  <option value="Selected Village">Selected Village</option>
                  <option value="Selected Farmers">Selected Farmers</option>
                </select>
              </div>

              <div className="input-group">
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="publish-buttons" style={{ marginTop: "20px" }}>
              <button className="publish-btn" type="submit">
                <FaPaperPlane />
                Publish Notification
              </button>
            </div>
          </form>
        </section>

        {/* ALERTS & NOTIFICATIONS LISTS */}
        <section className="notification-layout">
          {/* ACTIVE ALERTS */}
          <div className="alerts-card">
            <h3>Active Broadcast Alerts ({broadcastNotifications.length})</h3>
            <div className="alert-list">
              {broadcastNotifications.length > 0 ? (
                broadcastNotifications.map((alert) => (
                  <div key={alert.id} className={`alert-item ${alert.priority === "High" ? "danger" : "warning"}`}>
                    <h4>📢 {alert.title}</h4>
                    <p>{alert.message}</p>
                    <span style={{ fontSize: "11px", color: "gray" }}>
                      Priority: {alert.priority} • Sent: {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ padding: "20px", color: "gray", fontSize: "13px", textAlign: "center" }}>
                  No alert broadcasts currently active. Use the form above to dispatch alerts.
                </div>
              )}

              {/* Static fallbacks */}
              <div className="alert-item danger">
                <h4>🌧 Heavy Rain Alert</h4>
                <p>Heavy rainfall expected within next 24 hours.</p>
                <span>High Priority</span>
              </div>
              <div className="alert-item warning">
                <h4>🔥 Heat Wave Warning</h4>
                <p>Temperature likely to exceed 40°C.</p>
                <span>Medium Priority</span>
              </div>
            </div>
          </div>

          {/* NOTIFICATION FEED */}
          <div className="feed-card">
            <div className="feed-header">
              <h3>Recent Activity Feed</h3>
            </div>

            <div className="notification-feed">
              <div className="feed-item">
                <div className="feed-icon">
                  <FaUsers />
                </div>
                <div className="feed-content">
                  <h4>New Farmer Registered</h4>
                  <p>Ramesh Kumar has been added to the district database.</p>
                  <span>10 mins ago</span>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-icon">
                  <FaLeaf />
                </div>
                <div className="feed-content">
                  <h4>Crop Harvested</h4>
                  <p>Rice harvest updated by Lakshmi Devi.</p>
                  <span>30 mins ago</span>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-icon">
                  <FaClipboardList />
                </div>
                <div className="feed-content">
                  <h4>Scheme Application Submitted</h4>
                  <p>15 new PM-Kisan applications received for approval.</p>
                  <span>1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NOTIFICATION ANALYTICS CHARTS */}
        <section className="analytics-section">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Notification Categories</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={95}
                  innerRadius={55}
                  paddingAngle={5}
                >
                  {categoryData.map((item, index) => (
                    <Cell key={index} fill={categoryColors[index % categoryColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Notifications Published</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={publishData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={4} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Farmer Reach</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={reachData} dataKey="value" innerRadius={60} outerRadius={90}>
                  {reachData.map((item, index) => (
                    <Cell key={index} fill={reachColors[index % reachColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* TIMELINE ACTIVITY */}
        <section className="timeline-card">
          <div className="card-header">
            <h2>Recent Activity Logs</h2>
          </div>
          <div className="timeline">
            {activities.map((activity, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}