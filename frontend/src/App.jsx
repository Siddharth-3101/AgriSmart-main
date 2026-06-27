import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  CloudSun, 
  MessageSquare, 
  User, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  X, 
  Layers, 
  Users, 
  MapPin, 
  Database, 
  Activity, 
  AlertTriangle,
  Search,
  Award,
  CheckCircle,
  TrendingUp,
  Settings
} from 'lucide-react';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Crops from './pages/Crops';
import Schemes from './pages/Schemes';
import Weather from './pages/Weather';
import Chatbot from './pages/Chatbot';
import OfficerPortal from './pages/OfficerPortal';
import Profile from './pages/Profile';

// API Ports configuration
const PORTS = {
  user: '8081',
  farm: '8082',
  crop: '8083',
  weather: '8084',
  analytics: '8085'
};

const BASE_URL = 'http://localhost';

// Geodesic area calculation in acres using spherical Shoelace formula
const calculatePolygonAreaInAcres = (latlngs) => {
  if (!latlngs || latlngs.length < 3) return 0;
  let totalArea = 0; // in square meters
  const r = 6378137; // Earth radius in meters
  const len = latlngs.length;
  
  for (let i = 0; i < len; i++) {
    const p1 = latlngs[i];
    const p2 = latlngs[(i + 1) % len];
    const l1 = p1.lng * Math.PI / 180;
    const l2 = p2.lng * Math.PI / 180;
    const phi1 = p1.lat * Math.PI / 180;
    const phi2 = p2.lat * Math.PI / 180;
    
    totalArea += (l2 - l1) * (2 + Math.sin(phi1) + Math.sin(phi2));
  }
  
  totalArea = Math.abs(totalArea * r * r / 2.0); // area in sq meters
  const areaInAcres = totalArea * 0.000247105; // 1 sq meter = 0.000247105 acres
  return parseFloat(areaInAcres.toFixed(2));
};

const calculatePolygonCenter = (latlngs) => {
  if (!latlngs || latlngs.length === 0) return { lat: 0, lng: 0 };
  let sumLat = 0;
  let sumLng = 0;
  latlngs.forEach(p => {
    sumLat += p.lat;
    sumLng += p.lng;
  });
  return {
    lat: sumLat / latlngs.length,
    lng: sumLng / latlngs.length
  };
};

const getNPKRecommendations = (cropName, soilType) => {
  const crop = (cropName || '').toLowerCase();
  const soil = (soilType || '').toLowerCase();
  
  if (crop.includes('rice') || crop.includes('paddy')) {
    return {
      ratio: "NPK 120:60:60 kg/ha",
      advice: "Apply Nitrogen in 3 splits (sowing, tillering, panicle initiation). Full Phosphorus and Potassium at sowing. For Clayey/Black soils, ensure drainage to prevent root rot."
    };
  }
  if (crop.includes('cotton')) {
    return {
      ratio: "NPK 80:40:40 kg/ha",
      advice: "Apply Phosphorus and Potassium at sowing. Split Nitrogen into 2 doses at flowering and boll formation. Micronutrients like Boron are advised for Black soils."
    };
  }
  if (crop.includes('wheat')) {
    return {
      ratio: "NPK 120:50:40 kg/ha",
      advice: "Apply Nitrogen in 2 split doses: half at sowing, half at crown root initiation (21 days). Add zinc sulfate (25 kg/ha) if sowing on Alluvial soil."
    };
  }
  if (crop.includes('sugarcane')) {
    return {
      ratio: "NPK 250:75:110 kg/ha",
      advice: "Sugarcane has high nutrient requirements. Split Nitrogen into 3 doses at 30, 60, and 90 days. Top-dress with potassium to improve sugar yield."
    };
  }
  if (crop.includes('groundnut') || crop.includes('peanut')) {
    return {
      ratio: "NPK 20:40:40 kg/ha",
      advice: "Groundnut is a legume and fixes its own nitrogen; keep Nitrogen low. Apply Gypsum (400 kg/ha) at pegging stage to support pod development."
    };
  }
  return {
    ratio: "NPK 100:50:50 kg/ha",
    advice: "Standard split application: half Nitrogen and full PK at sowing. Top dress remaining Nitrogen at active vegetative stage."
  };
};

const getIrrigationSchedule = (cropName, soilType, forecast) => {
  const soil = (soilType || '').toLowerCase();
  
  let baseInterval = 7;
  let soilRetention = "Moderate water retention.";
  if (soil.includes('black') || soil.includes('clayey')) {
    baseInterval = 10;
    soilRetention = "High water holding capacity. Avoid over-watering to prevent waterlogging.";
  } else if (soil.includes('sandy')) {
    baseInterval = 4;
    soilRetention = "Low water holding capacity. Requires frequent, light irrigation cycles.";
  }
  
  // Check if rain > 5mm in the next 3 days
  let rainForecasted = false;
  let rainAmt = 0;
  let rainDate = '';
  
  if (forecast && forecast.length > 0) {
    for (let i = 0; i < Math.min(3, forecast.length); i++) {
      if (forecast[i].rainfall > 4.0) {
        rainForecasted = true;
        rainAmt += forecast[i].rainfall;
        if (!rainDate) rainDate = forecast[i].date;
      }
    }
  }

  if (rainForecasted) {
    return {
      soilInfo: soilRetention,
      status: `Rain predicted (${rainAmt.toFixed(1)}mm on ${new Date(rainDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}).`,
      advice: "DANGER/WARNING: Heavy rainfall forecast detected. Delay your scheduled irrigation to conserve water and prevent nutrient leaching."
    };
  }
  
  const nextIrrig = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  return {
    soilInfo: soilRetention,
    status: `Next irrigation scheduled on ${nextIrrig} (in 2 days).`,
    advice: "No heavy rain forecast in the next 3 days. Maintain standard irrigation intervals of " + baseInterval + " days."
  };
};

const getPredictiveYield = (cropName, area, soilType, waterSource, weather) => {
  const crop = (cropName || '').toLowerCase();
  const soil = (soilType || '').toLowerCase();
  const water = (waterSource || '').toLowerCase();
  const farmArea = parseFloat(area) || 1.0;
  
  let baseYieldFactor = 1.5; // Tons per acre
  if (crop.includes('rice') || crop.includes('paddy')) baseYieldFactor = 2.2;
  else if (crop.includes('cotton')) baseYieldFactor = 1.2;
  else if (crop.includes('wheat')) baseYieldFactor = 1.8;
  else if (crop.includes('sugarcane')) baseYieldFactor = 32.0;
  else if (crop.includes('groundnut')) baseYieldFactor = 1.0;
  else if (crop.includes('maize')) baseYieldFactor = 2.0;
  
  let soilMult = 1.0;
  if (soil.includes('black') || soil.includes('clayey')) {
    soilMult = (crop.includes('rice') || crop.includes('cotton')) ? 1.15 : 1.05;
  } else if (soil.includes('alluvial')) {
    soilMult = 1.2;
  } else if (soil.includes('sandy')) {
    soilMult = crop.includes('groundnut') ? 1.15 : 0.8;
  }
  
  let waterMult = 1.0;
  if (water.includes('canal') || water.includes('borewell')) waterMult = 1.1;
  else if (water.includes('rainfed')) waterMult = 0.75;
  
  let weatherMult = 1.0;
  if (weather) {
    if (weather.rainfall > 0 && weather.rainfall < 40) weatherMult = 1.08;
    else if (weather.rainfall > 80) weatherMult = 0.85; // Excess rain
  }
  
  const predicted = farmArea * baseYieldFactor * soilMult * waterMult * weatherMult;
  return predicted.toFixed(1);
};

export default function App() {
  // Authentication & Session
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [activeTab, setActiveTab] = useState('home');
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
  const [apiOnline, setApiOnline] = useState(false);
  const [demoMode, setDemoMode] = useState(true);

  // Forms & CRUD States
  const [loginEmail, setLoginEmail] = useState('farmer@agrismart.com');
  const [loginPassword, setLoginPassword] = useState('password');
  const [regForm, setRegForm] = useState({
    name: '', email: '', password: '', phone: '', role: 'FARMER', district: '', state: '', departmentId: ''
  });
  const [showRegister, setShowRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Data States
  const [farms, setFarms] = useState([]);
  const [crops, setCrops] = useState([]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [usersList, setUsersList] = useState([]); // Admin view

  // Schemes Tab States
  const [schemes, setSchemes] = useState([]);
  const [appliedSchemeIds, setAppliedSchemeIds] = useState(() => {
    return JSON.parse(localStorage.getItem('appliedSchemeIds') || '[]');
  });
  const [schemesSyncStatus, setSchemesSyncStatus] = useState('Offline / Cached');
  const [schemesSearch, setSchemesSearch] = useState('');
  const [schemesCategory, setSchemesCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Profile Settings States
  const [profileForm, setProfileForm] = useState({ name: '', phone: '', district: '', state: '' });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [notifSettings, setNotifSettings] = useState({ emailNotif: true, smsNotif: true });
  const [profileSubTab, setProfileSubTab] = useState('insights'); // 'insights' or 'farms'
  const [farmSubView, setFarmSubView] = useState('list'); // 'list', 'add', 'edit', 'view'

  // Officer / Alert Broadcast States
  const [broadcastForm, setBroadcastForm] = useState({ title: '', type: 'General Alert', targetRegion: 'All Regions', message: '' });
  const [broadcastNotifications, setBroadcastNotifications] = useState(() => {
    return JSON.parse(localStorage.getItem('broadcast_notifications') || '[]');
  });

  // Routing View Selected IDs
  const [selectedFarmId, setSelectedFarmId] = useState(null);
  const [editFarmId, setEditFarmId] = useState(null);

  // Add/Edit Farm Form States
  const [farmForm, setFarmForm] = useState({ farmName: '', location: '', area: '', soilType: 'Black Soil', waterSource: 'Borewell', latitude: '', longitude: '' });

  // Active Crop Recommendation & Cultivation Form States
  const [showRecs, setShowRecs] = useState(false);
  const [recCrops, setRecCrops] = useState([]);
  const [showCultivationForm, setShowCultivationForm] = useState(false);
  const [selectedRecCrop, setSelectedRecCrop] = useState('');
  const [cultivationForm, setCultivationForm] = useState({ cropName: '', plantingDate: new Date().toISOString().split('T')[0], duration: 120 });

  // Crops Page specific states
  const [showCropsAddForm, setShowCropsAddForm] = useState(false);
  const [selectedFarmIdForCrop, setSelectedFarmIdForCrop] = useState('');
  const [cropsAddForm, setCropsAddForm] = useState({ cropName: '', plantingDate: new Date().toISOString().split('T')[0], duration: 120 });
  const [possessedDocs, setPossessedDocs] = useState(() => {
    return JSON.parse(localStorage.getItem('possessedDocs') || '[]');
  });
  const [selectedFarmFilterForHistory, setSelectedFarmFilterForHistory] = useState('All');
  const [aiAssistantTab, setAiAssistantTab] = useState('fertilizer');
  const [expandedAiCropId, setExpandedAiCropId] = useState(null);

  useEffect(() => {
    localStorage.setItem('possessedDocs', JSON.stringify(possessedDocs));
  }, [possessedDocs]);

  // Crop Harvest State
  const [harvestCropId, setHarvestCropId] = useState(null);
  const [harvestYield, setHarvestYield] = useState('');

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your AgriSmart AI Chatbot. How can I assist you with your farming today? (Available in English, Hindi, Punjabi, Telugu, and Tamil)', time: 'Just now' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLanguage, setChatLanguage] = useState('en');

  // Load user profile on startup if token exists
  useEffect(() => {
    if (token) {
      checkBackendStatus();
    }
  }, [token]);

  // Redirect on successful login
  useEffect(() => {
    if (user && activeTab === 'login') {
      setActiveTab(redirectAfterLogin || 'dashboard');
      setRedirectAfterLogin(null);
    }
  }, [user]);

  // Handle data fetching when tab/user changes
  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, activeTab, selectedFarmId]);

  // Fetch schemes when schemes tab is opened
  useEffect(() => {
    if (user && activeTab === 'schemes') {
      loadSchemesWithCache();
    }
  }, [user, activeTab]);

  const checkBackendStatus = async () => {
    try {
      const res = await fetch(`${BASE_URL}:${PORTS.user}/api/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        setProfileForm({ name: userData.name, phone: userData.phone || '', district: userData.district || '', state: userData.state || '' });
        setApiOnline(true);
        setDemoMode(false);
      } else {
        handleLogout();
      }
    } catch (e) {
      setApiOnline(false);
      setDemoMode(true);
      initializeMockUser();
    }
  };

  const initializeMockUser = () => {
    const mockUser = {
      userId: 101,
      name: 'Siddharth',
      email: 'farmer@agrismart.com',
      phone: '9876543210',
      role: 'FARMER',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      createdAt: '2026-01-10T10:30:00'
    };
    setUser(mockUser);
    setProfileForm({ name: mockUser.name, phone: mockUser.phone, district: mockUser.district, state: mockUser.state });
    setFarms([]);
    setCrops([]);
    setWeather(null);
    setForecast([]);
    setWeatherHistory([]);
    setAnalytics(null);
  };

  const fetchDashboardData = async () => {
    if (demoMode) {
      // In demo mode, fetch real-time weather directly from Open-Meteo in the browser for the selected/first farm
      if (farms.length > 0) {
        const currentFarm = selectedFarmId ? farms.find(f => f.farmId === selectedFarmId) : farms[0];
        if (currentFarm && currentFarm.latitude && currentFarm.longitude) {
          fetchWeatherDirectly(currentFarm.latitude, currentFarm.longitude);
        } else {
          setWeather(null);
          setForecast([]);
          setWeatherHistory([]);
        }
      }
      return;
    }

    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // 1. Fetch Farms
      const farmsRes = await fetch(`${BASE_URL}:${PORTS.farm}/api/farms`, { headers });
      let currentFarms = [];
      if (farmsRes.ok) {
        const farmData = await farmsRes.json();
        currentFarms = farmData.content || [];
        setFarms(currentFarms);
      }

      // 2. Fetch Crops
      const cropsRes = await fetch(`${BASE_URL}:${PORTS.crop}/api/crops?size=1000`, { headers });
      if (cropsRes.ok) {
        const cropData = await cropsRes.json();
        setCrops(cropData.content || []);
      }

      // 3. Fetch Analytics
      let analyticsEndpoint = '/api/analytics/farmer';
      if (user.role === 'OFFICER') analyticsEndpoint = '/api/analytics/officer';
      if (user.role === 'ADMIN') analyticsEndpoint = '/api/analytics/admin';

      const analyticsRes = await fetch(`${BASE_URL}:${PORTS.analytics}${analyticsEndpoint}`, { headers });
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }

      // 4. Fetch Weather for selected or first farm
      if (currentFarms.length > 0) {
        const activeFarmId = selectedFarmId || currentFarms[0].farmId;
        const activeFarm = currentFarms.find(f => f.farmId === activeFarmId);
        if (activeFarm && activeFarm.latitude && activeFarm.longitude) {
          const weatherRes = await fetch(`${BASE_URL}:${PORTS.weather}/api/weather/current/${activeFarmId}`, { headers });
          const forecastRes = await fetch(`${BASE_URL}:${PORTS.weather}/api/weather/forecast/${activeFarmId}`, { headers });
          const historyRes = await fetch(`${BASE_URL}:${PORTS.weather}/api/weather/history/${activeFarmId}`, { headers });

          if (weatherRes.ok) setWeather(await weatherRes.json());
          else setWeather(null);
          
          if (forecastRes.ok) {
            const forecastData = await forecastRes.json();
            setForecast(forecastData.forecast || []);
          } else setForecast([]);
          
          if (historyRes.ok) setWeatherHistory(await historyRes.json());
          else setWeatherHistory([]);
        } else {
          setWeather(null);
          setForecast([]);
          setWeatherHistory([]);
        }
      }

      // 5. Fetch Users List if Admin
      if (user.role === 'ADMIN') {
        setUsersList([
          { userId: 1, name: 'Siddharth Sharma', email: 'admin@agrismart.com', role: 'ADMIN', district: 'Chandigarh', state: 'Punjab' },
          { userId: 101, name: 'Siddharth', email: 'farmer@agrismart.com', role: 'FARMER', district: 'Coimbatore', state: 'Tamil Nadu' },
          { userId: 102, name: 'Officer Priya', email: 'officer@agrismart.com', role: 'OFFICER', district: 'Ambala', state: 'Haryana' }
        ]);
      }
    } catch (e) {
      console.warn("API disconnect, fell back to local state execution");
    }
  };

  const fetchWeatherDirectly = async (lat, lon) => {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,weather_code&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,rain_sum,weather_code&timezone=auto`);
      if (res.ok) {
        const data = await res.json();
        const current = data.current;
        const daily = data.daily;
        setWeather({
          temperature: current.temperature_2m,
          humidity: current.relative_humidity_2m,
          rainfall: current.rain,
          description: mapWmoCodeToDescription(current.weather_code),
          windSpeed: 4.5,
          recordedAt: new Date().toISOString()
        });
        const items = [];
        for (let i = 0; i < 7; i++) {
          items.push({
            date: daily.time[i],
            tempMax: daily.temperature_2m_max[i],
            tempMin: daily.temperature_2m_min[i],
            humidity: daily.relative_humidity_2m_max[i],
            rainfall: daily.rain_sum[i],
            description: mapWmoCodeToDescription(daily.weather_code[i])
          });
        }
        setForecast(items);
        
        // Populate mock weather history trend for profile SVG chart
        const mockHist = [];
        for (let j = 0; j < 5; j++) {
          mockHist.push({
            recordedAt: new Date(Date.now() - j * 24 * 60 * 60 * 1000).toISOString(),
            temperature: 26 + Math.sin(j) * 3,
            humidity: 65 + Math.cos(j) * 5,
            rainfall: j % 3 === 0 ? 3.5 : 0
          });
        }
        setWeatherHistory(mockHist);
      }
    } catch (e) {
      console.error("Direct Open-Meteo query failed", e);
    }
  };

  const mapWmoCodeToDescription = (code) => {
    switch (code) {
      case 0: return "Sunny";
      case 1: case 2: case 3: return "Partly Cloudy";
      case 45: case 48: return "Foggy";
      case 51: case 53: case 55: return "Drizzle";
      case 61: case 63: case 65: return "Rainy";
      case 71: case 73: case 75: return "Snowy";
      case 80: case 81: case 82: return "Rain Showers";
      case 95: case 96: case 99: return "Thunderstorm";
      default: return "Cloudy";
    }
  };

  // Government Schemes 3-day local storage caching logic
  const loadSchemesWithCache = async () => {
    const cachedSchemes = localStorage.getItem('schemes_cache');
    const cachedTimestamp = localStorage.getItem('schemes_timestamp');
    const threeDays = 3 * 24 * 60 * 60 * 1000;

    if (cachedSchemes && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp) < threeDays)) {
      setSchemes(JSON.parse(cachedSchemes));
      setSchemesSyncStatus('Offline / Cached (' + new Date(parseInt(cachedTimestamp)).toLocaleDateString() + ')');
      return;
    }

    await syncSchemesData();
  };

  const syncSchemesData = async () => {
    setSchemesSyncStatus('Syncing...');
    setErrorMsg('');

    if (demoMode) {
      // Offline local matching logic
      const list = getMockSchemesRaw();
      const matched = list.map(item => {
        let score = 70;
        const totalArea = farms.reduce((acc, f) => acc + (parseFloat(f.area) || 0), 0);
        const hasActiveCrop = crops.some(c => c.status === 'ACTIVE');

        if (item.state !== 'All States' && user.state !== item.state) {
          score = 0;
        } else {
          if (item.state !== 'All States' && user.state === item.state) score += 15;
          if (hasActiveCrop && item.eligibilityCriteria.toLowerCase().includes("crop")) score += 10;
          if (item.eligibilityCriteria.toLowerCase().includes("landholding") || item.eligibilityCriteria.toLowerCase().includes("acres")) {
            if (totalArea > 0 && totalArea <= 5.0) score += 5;
            else if (totalArea > 5.0) score -= 10;
          }
        }
        return { ...item, eligibilityMatch: Math.min(100, Math.max(0, score)) };
      }).filter(item => item.eligibilityMatch > 0);

      matched.sort((a, b) => b.eligibilityMatch - a.eligibilityMatch);
      localStorage.setItem('schemes_cache', JSON.stringify(matched));
      localStorage.setItem('schemes_timestamp', Date.now().toString());
      setSchemes(matched);
      setSchemesSyncStatus('Online (Direct Sync)');
      return;
    }

    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const res = await fetch(`${BASE_URL}:${PORTS.analytics}/api/schemes/recommend`, { headers });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('schemes_cache', JSON.stringify(data));
        localStorage.setItem('schemes_timestamp', Date.now().toString());
        setSchemes(data);
        setSchemesSyncStatus('Online (Synced)');
      }
    } catch (e) {
      // Fallback to cache if request fails
      const cachedSchemes = localStorage.getItem('schemes_cache');
      if (cachedSchemes) {
        setSchemes(JSON.parse(cachedSchemes));
        setSchemesSyncStatus('Offline / Cached (Sync Failed)');
      } else {
        setSchemes([]);
        setSchemesSyncStatus('Offline / No Cache Found');
      }
    }
  };

  const getMockSchemesRaw = () => {
    return [
      {
        schemeId: 1,
        schemeName: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
        category: 'Financial Assistance',
        description: 'Income support scheme providing financial benefit to all landholding farmer families across India to buy agriculture inputs.',
        benefits: '₹6,000 per year in 3 equal installments',
        eligibilityCriteria: 'All landholding farmer families with cultivable land in their name.',
        requiredDocuments: 'Aadhaar Card, Land Records, Bank Account Details',
        officialLink: 'https://pmkisan.gov.in',
        state: 'All States'
      },
      {
        schemeId: 2,
        schemeName: 'Kisan Credit Card (KCC)',
        category: 'Loans',
        description: 'Provides farmers with timely access to short-term credit loans for cultivation, crop production, and post-harvest maintenance expenses.',
        benefits: 'Short-term credit up to ₹3 Lakhs at low interest rate (4%)',
        eligibilityCriteria: 'All farmers, tenant farmers, and sharecroppers.',
        requiredDocuments: 'Aadhaar Card, Land Possession Certificate, Bank Account Details',
        officialLink: 'https://pmkisan.gov.in/Documents/KCC.pdf',
        state: 'All States'
      },
      {
        schemeId: 3,
        schemeName: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
        category: 'Insurance',
        description: 'Crop insurance scheme offering financial security to farmers against crop failure or damages caused by natural disasters, pests, or disease.',
        benefits: 'Comprehensive crop insurance coverage with low premium (1.5% to 5%)',
        eligibilityCriteria: 'All farmers growing notified crops in notified areas.',
        requiredDocuments: 'Aadhaar Card, Sowing Certificate, Land Records, Bank Passbook',
        officialLink: 'https://pmfby.gov.in',
        state: 'All States'
      },
      {
        schemeId: 4,
        schemeName: 'Tamil Nadu Free Agricultural Power Scheme',
        category: 'Subsidies',
        description: 'State government initiative providing free agricultural electricity to farmers to operate pump sets for crop irrigation.',
        benefits: '100% free electricity supply for agricultural irrigation pumps',
        eligibilityCriteria: 'Tamil Nadu resident landholding farmers owning agricultural pump sets.',
        requiredDocuments: 'Aadhaar Card, Land Ownership Documents (Patta/Chitta), Pump Set details',
        officialLink: 'https://www.tangedco.org',
        state: 'Tamil Nadu'
      },
      {
        schemeId: 5,
        schemeName: 'PM Kisan Maan-Dhan Yojana (PM-KMY)',
        category: 'Financial Assistance',
        description: 'A voluntary and contributory pension scheme for old age protection and social security of Small and Marginal Farmers (SMFs) owning cultivable land.',
        benefits: 'Minimum assured pension of ₹3,000 per month after reaching 60 years of age',
        eligibilityCriteria: 'Small and marginal farmers aged between 18 to 40 years with cultivable land up to 2 hectares.',
        requiredDocuments: 'Aadhaar Card, Savings Bank Account, Aadhaar-linked Mobile Number',
        officialLink: 'https://pmkmy.gov.in',
        state: 'All States'
      },
      {
        schemeId: 6,
        schemeName: 'PMKSY - Per Drop More Crop (PDMC)',
        category: 'Subsidies',
        description: 'Focuses on water use efficiency at farm level through micro-irrigation technologies like drip and sprinkler irrigation systems.',
        benefits: 'Up to 55% subsidy for small and marginal farmers, and 45% for other farmers for micro-irrigation installation',
        eligibilityCriteria: 'All landholding farmers with access to water sources.',
        requiredDocuments: 'Aadhaar Card, Land Records, Electricity Bill, Drip design installation plan',
        officialLink: 'https://pmksy.gov.in',
        state: 'All States'
      },
      {
        schemeId: 7,
        schemeName: 'Paramparagat Krishi Vikas Yojana (PKVY)',
        category: 'Subsidies',
        description: 'Promotes organic farming through a cluster approach and PGS certification. Supports organic farming practices and marketing.',
        benefits: 'Financial assistance of ₹50,000 per hectare over 3 years, with 62% provided as subsidy for organic inputs',
        eligibilityCriteria: 'Farmers formed in clusters of 20 hectares (minimum 50 farmers).',
        requiredDocuments: 'Aadhaar Card, Land Records, PGS Cluster Registration',
        officialLink: 'https://pgsindia-ncof.gov.in',
        state: 'All States'
      },
      {
        schemeId: 8,
        schemeName: 'Soil Health Card Scheme',
        category: 'Financial Assistance',
        description: 'Assists state governments to issue soil health cards to all farmers. Provides nutrient status of soil and recommendation of fertilizers.',
        benefits: 'Free soil testing and customized fertilizer recommendation card every 2 years',
        eligibilityCriteria: 'All farmers owning cultivable lands in India.',
        requiredDocuments: 'Aadhaar Card, Soil Sample Collection Slip, Land Records',
        officialLink: 'https://soilhealth.dac.gov.in',
        state: 'All States'
      },
      {
        schemeId: 9,
        schemeName: 'National Agriculture Market (e-NAM)',
        category: 'Financial Assistance',
        description: 'Pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities.',
        benefits: 'Direct online selling of produce to buyers across India without middlemen, getting competitive prices',
        eligibilityCriteria: 'All individual farmers, FPOs, and traders.',
        requiredDocuments: 'Aadhaar Card, Bank Account Details, Mobile Number',
        officialLink: 'https://enam.gov.in',
        state: 'All States'
      },
      {
        schemeId: 10,
        schemeName: 'SMAM (Sub-Mission on Agricultural Mechanization)',
        category: 'Subsidies',
        description: 'Promotes agricultural mechanization by providing subsidies for buying modern agricultural machinery like tractors, rotavators, power tillers.',
        benefits: '40% to 50% subsidy on purchase of verified agricultural machinery',
        eligibilityCriteria: 'All landholding farmers, special preference to women and SC/ST farmers.',
        requiredDocuments: 'Aadhaar Card, Land Records (Patta), Bank Account Details, Machinery quotation',
        officialLink: 'https://agrimachinery.nic.in',
        state: 'All States'
      },
      {
        schemeId: 11,
        schemeName: 'Punjab Free Power Scheme for Agriculture',
        category: 'Subsidies',
        description: 'State government initiative providing free electricity supply to agricultural tube wells to support irrigation for farmers in Punjab.',
        benefits: '100% free electricity supply for agricultural tubewells',
        eligibilityCriteria: 'Punjab resident landholding farmers owning agricultural electric pump tube wells.',
        requiredDocuments: 'Aadhaar Card, Electricity Connection Details, Land Ownership Certificate',
        officialLink: 'https://www.pspcl.in',
        state: 'Punjab'
      },
      {
        schemeId: 12,
        schemeName: 'Haryana Bhavantar Bharpayee Yojana (BBY)',
        category: 'Financial Assistance',
        description: 'State scheme compensating farmers for price deficit of horticultural crops (vegetables & fruits) when market prices fall below floor prices.',
        benefits: 'Price compensation difference deposited directly to bank accounts',
        eligibilityCriteria: 'Haryana resident farmers registered on Meri Fasal Mera Byora (MFMB) portal cultivating notified crops.',
        requiredDocuments: 'Aadhaar Card, Meri Fasal Mera Byora Registration Slip, Bank Account',
        officialLink: 'https://ekharid.haryana.gov.in',
        state: 'Haryana'
      }
    ];
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await fetch(`${BASE_URL}:${PORTS.user}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        setProfileForm({ name: data.user.name, phone: data.user.phone || '', district: data.user.district || '', state: data.user.state || '' });
        setApiOnline(true);
        setDemoMode(false);
        setSuccessMsg('Logged in successfully!');
      } else {
        const err = await res.json();
        setErrorMsg(err.message || 'Login failed. Invalid credentials.');
      }
    } catch (e) {
      // Demo Mode login fallback validation
      if ((loginEmail === 'farmer@agrismart.com' || loginEmail === '9876543210') && loginPassword === 'password') {
        setToken('mock-jwt-token-farmer');
        localStorage.setItem('token', 'mock-jwt-token-farmer');
        setDemoMode(true);
        setApiOnline(false);
        initializeMockUser();
      } else if (loginEmail === 'officer@agrismart.com' && loginPassword === 'password') {
        setToken('mock-jwt-token-officer');
        localStorage.setItem('token', 'mock-jwt-token-officer');
        setDemoMode(true);
        setApiOnline(false);
        setUser({ userId: 102, name: 'Officer Priya', email: 'officer@agrismart.com', phone: '9777766666', role: 'OFFICER', district: 'Ambala', state: 'Haryana', createdAt: new Date().toISOString() });
      } else if (loginEmail === 'admin@agrismart.com' && loginPassword === 'password') {
        setToken('mock-jwt-token-admin');
        localStorage.setItem('token', 'mock-jwt-token-admin');
        setDemoMode(true);
        setApiOnline(false);
        setUser({ userId: 1, name: 'Siddharth Sharma', email: 'admin@agrismart.com', phone: '9999988888', role: 'ADMIN', district: 'Chandigarh', state: 'Punjab', createdAt: new Date().toISOString() });
      } else {
        setErrorMsg('Invalid email or password. Use email (farmer@agrismart.com) or phone (9876543210) with password "password" to log in.');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    // Validate role-specific details are supplied
    if (regForm.role === 'FARMER' && (!regForm.district || !regForm.state)) {
      setErrorMsg('District and State are required for Farmers.');
      return;
    }
    if (regForm.role === 'OFFICER' && (!regForm.departmentId || !regForm.district)) {
      setErrorMsg('Department ID and District are required for Officers.');
      return;
    }

    // Strip departmentId before sending to backend to align with DB schema
    const payload = {
      name: regForm.name,
      email: regForm.email,
      password: regForm.password,
      phone: regForm.phone,
      role: regForm.role,
      district: regForm.district,
      state: regForm.state
    };

    try {
      const res = await fetch(`${BASE_URL}:${PORTS.user}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSuccessMsg('Account registered successfully! Please log in.');
        setShowRegister(false);
      } else {
        const err = await res.json();
        setErrorMsg(err.message || 'Registration failed');
      }
    } catch (e) {
      // Demo mode fallback registration
      setSuccessMsg('Registered successfully (Local Demo Mode)! Feel free to log in.');
      setShowRegister(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setSelectedFarmId(null);
    setEditFarmId(null);
    setActiveTab('dashboard');
  };

  // Farms CRUD Operations
  const handleFarmSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const endpoint = editFarmId 
        ? `${BASE_URL}:${PORTS.farm}/api/farms/${editFarmId}`
        : `${BASE_URL}:${PORTS.farm}/api/farms`;
      const method = editFarmId ? 'PUT' : 'POST';

      const payload = {
        ...farmForm,
        latitude: farmForm.latitude !== '' ? parseFloat(farmForm.latitude) : null,
        longitude: farmForm.longitude !== '' ? parseFloat(farmForm.longitude) : null
      };

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const wasFirstFarm = farms.length === 0;
        fetchDashboardData();
        resetFarmForm();
        if (wasFirstFarm) {
          setActiveTab('dashboard');
        } else {
          setActiveTab('profile');
          setProfileSubTab('farms');
          setFarmSubView('list');
        }
      } else {
        const err = await res.json();
        setErrorMsg(err.message || 'Failed to submit farm details');
      }
    } catch (e) {
      // Demo mode local states updates
      if (editFarmId) {
        setFarms(farms.map(f => f.farmId === editFarmId ? { ...f, ...farmForm } : f));
      } else {
        const newFarm = { 
          ...farmForm, 
          farmId: Date.now(), 
          userId: user.userId, 
          latitude: farmForm.latitude ? parseFloat(farmForm.latitude) : null,
          longitude: farmForm.longitude ? parseFloat(farmForm.longitude) : null 
        };
        setFarms([...farms, newFarm]);
      }
      const wasFirstFarm = farms.length === 0;
      setActiveTab(wasFirstFarm ? 'dashboard' : 'profile');
      if (!wasFirstFarm) {
        setProfileSubTab('farms');
        setFarmSubView('list');
      }
      resetFarmForm();
    }
  };

  const resetFarmForm = () => {
    setFarmForm({ farmName: '', location: '', area: '', soilType: 'Black Soil', waterSource: 'Borewell', latitude: '', longitude: '' });
    setEditFarmId(null);
  };

  const handleFarmEdit = (farm) => {
    setEditFarmId(farm.farmId);
    setFarmForm({
      farmName: farm.farmName,
      location: farm.location,
      area: farm.area,
      soilType: farm.soilType || 'Black Soil',
      waterSource: farm.waterSource || 'Borewell',
      latitude: farm.latitude || '',
      longitude: farm.longitude || ''
    });
    setActiveTab('profile');
    setProfileSubTab('farms');
    setFarmSubView('edit');
  };

  const handleFarmDelete = async (farmId) => {
    if (!confirm('Are you sure you want to delete this farm? This will also remove all associated crops.')) return;
    try {
      const res = await fetch(`${BASE_URL}:${PORTS.farm}/api/farms/${farmId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchDashboardData();
        if (selectedFarmId === farmId) setSelectedFarmId(null);
      }
    } catch (e) {
      setFarms(farms.filter(f => f.farmId !== farmId));
      setCrops(crops.filter(c => c.farmId !== farmId));
      if (selectedFarmId === farmId) setSelectedFarmId(null);
    }
  };

  // Crop Recommendation and Cultivation Setup
  const handleGetCropRecommendation = () => {
    if (!selectedFarmId) return;
    const currentFarm = farms.find(f => f.farmId === selectedFarmId);
    if (!currentFarm) return;

    // Direct logic recommendation based on farm soil and current season
    const recommendations = [];
    if (currentFarm.soilType === 'Black Soil' || currentFarm.soilType === 'Clayey') {
      recommendations.push('Rice', 'Cotton', 'Sugarcane');
    } else if (currentFarm.soilType === 'Sandy') {
      recommendations.push('Groundnut', 'Maize', 'Millet');
    } else {
      recommendations.push('Wheat', 'Maize', 'Pulses');
    }
    setRecCrops(recommendations);
    setShowRecs(true);
  };

  const handleStartCultivation = (cropName) => {
    setSelectedRecCrop(cropName);
    setShowCultivationForm(true);
  };

  const handleCultivationSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const duration = parseInt(cultivationForm.duration) || 120;
    const planted = new Date(cultivationForm.plantingDate);
    const expectedHarvest = new Date(planted.getTime() + duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const payload = {
      cropName: selectedRecCrop,
      duration: duration,
      description: 'Active cultivation log started.',
      status: 'ACTIVE',
      season: 'KHARIF',
      plantedDate: cultivationForm.plantingDate,
      expectedHarvestDate: expectedHarvest,
      farmId: selectedFarmId
    };

    try {
      const res = await fetch(`${BASE_URL}:${PORTS.crop}/api/crops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchDashboardData();
        setShowRecs(false);
        setShowCultivationForm(false);
      } else {
        const err = await res.json();
        setErrorMsg(err.message || 'Failed to start crop cultivation');
      }
    } catch (e) {
      const newCrop = {
        ...payload,
        cropId: Date.now(),
        yield: null
      };
      setCrops([...crops, newCrop]);
      setShowRecs(false);
      setShowCultivationForm(false);
    }
  };

  const handleHarvestSubmit = async (e) => {
    e.preventDefault();
    if (!harvestYield || isNaN(harvestYield)) {
      alert('Please enter a valid crop yield.');
      return;
    }

    const activeCrop = crops.find(c => c.cropId === harvestCropId);
    if (!activeCrop) return;

    const payload = {
      cropName: activeCrop.cropName,
      duration: activeCrop.duration,
      description: activeCrop.description,
      status: 'HARVESTED',
      season: activeCrop.season,
      plantedDate: activeCrop.plantedDate,
      farmId: activeCrop.farmId,
      yield: parseFloat(harvestYield)
    };

    try {
      const res = await fetch(`${BASE_URL}:${PORTS.crop}/api/crops/${harvestCropId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchDashboardData();
        setHarvestCropId(null);
        setHarvestYield('');
      }
    } catch (e) {
      setCrops(crops.map(c => c.cropId === harvestCropId ? { ...c, status: 'HARVESTED', yield: parseFloat(harvestYield) } : c));
      setHarvestCropId(null);
      setHarvestYield('');
    }
  };

  const handleCropFailed = async (cropId) => {
    if (!confirm('Mark this crop as FAILED? This will log it as a failed harvest in crop history.')) return;
    const activeCrop = crops.find(c => c.cropId === cropId);
    if (!activeCrop) return;

    const payload = {
      cropName: activeCrop.cropName,
      duration: activeCrop.duration,
      description: 'Crop growth failed due to environment factors.',
      status: 'FAILED',
      season: activeCrop.season,
      plantedDate: activeCrop.plantedDate,
      farmId: activeCrop.farmId,
      yield: 0.0
    };

    try {
      const res = await fetch(`${BASE_URL}:${PORTS.crop}/api/crops/${cropId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) fetchDashboardData();
    } catch (e) {
      setCrops(crops.map(c => c.cropId === cropId ? { ...c, status: 'FAILED', yield: 0.0, description: 'Crop growth failed due to environment factors.' } : c));
    }
  };

  const handleCropsPageCultivationSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!selectedFarmIdForCrop) {
      setErrorMsg('Please select a farm plot first.');
      return;
    }

    if (!cropsAddForm.cropName) {
      setErrorMsg('Please specify a crop name.');
      return;
    }

    const duration = parseInt(cropsAddForm.duration) || 120;
    const planted = new Date(cropsAddForm.plantingDate);
    const expectedHarvest = new Date(planted.getTime() + duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const payload = {
      cropName: cropsAddForm.cropName,
      duration: duration,
      description: 'Active cultivation log started.',
      status: 'ACTIVE',
      season: 'KHARIF',
      plantedDate: cropsAddForm.plantingDate,
      expectedHarvestDate: expectedHarvest,
      farmId: selectedFarmIdForCrop
    };

    try {
      const res = await fetch(`${BASE_URL}:${PORTS.crop}/api/crops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchDashboardData();
        setShowCropsAddForm(false);
        resetCropsAddForm();
      } else {
        const err = await res.json();
        setErrorMsg(err.message || 'Failed to start crop cultivation');
      }
    } catch (e) {
      const newCrop = {
        ...payload,
        cropId: Date.now(),
        yield: null
      };
      setCrops([...crops, newCrop]);
      setShowCropsAddForm(false);
      resetCropsAddForm();
    }
  };

  const resetCropsAddForm = () => {
    setCropsAddForm({ cropName: '', plantingDate: new Date().toISOString().split('T')[0], duration: 120 });
    setSelectedFarmIdForCrop('');
  };

  // Profile Update settings operations
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`${BASE_URL}:${PORTS.user}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });

      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        setSuccessMsg('Profile updated successfully!');
      } else {
        const err = await res.json();
        setErrorMsg(err.message || 'Failed to update profile');
      }
    } catch (e) {
      setUser({ ...user, ...profileForm });
      setSuccessMsg('Profile details updated (Demo mode)!');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMsg('New passwords do not match.');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}:${PORTS.user}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password: passwordForm.newPassword, ...profileForm })
      });

      if (res.ok) {
        setSuccessMsg('Password changed successfully!');
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (e) {
      setSuccessMsg('Password simulated change (Demo Mode)!');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  // AI Chatbot simulation language
  const handleChatSend = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const messageText = chatInput;
    const userMessage = { sender: 'user', text: messageText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    const token = localStorage.getItem('token');
    if (!demoMode) {
      try {
        const langCode = chatLanguage === 'pun' ? 'pb' : chatLanguage;
        const res = await fetch(`http://localhost:8083/api/crops/chatbot`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify({ message: messageText, language: langCode })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.reply) {
            setChatMessages(prev => [...prev, {
              sender: 'bot',
              text: data.reply,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            return;
          }
        }
      } catch (err) {
        console.warn("Local chatbot API failed, using fallback engine: ", err);
      }
    }

    // Fallback simulation
    setTimeout(() => {
      let botResponse = '';
      const input = messageText.toLowerCase();
      if (chatLanguage === 'hi') {
        botResponse = 'नमस्ते किसान भाई! आपकी मिट्टी और फसल के अनुसार, नाइट्रोजन (यूरिया) का पहला छिड़काव 25-30 दिनों के भीतर करें। मौसम साफ रहने पर ही छिड़काव करें।';
        if (input.includes('बारिश') || input.includes('मौसम') || input.includes('weather') || input.includes('rain')) {
          botResponse = 'मौसम विभाग के अनुसार अगले 48 घंटों में आपके क्षेत्र में हल्की बारिश और बादल छाए रहने की संभावना है। कृपया रासायनिक खाद का छिड़काव रोक दें।';
        } else if (input.includes('खाद') || input.includes('fertilizer') || input.includes('npk')) {
          botResponse = 'यूरिया और एनपीके (NPK) खाद को दो हिस्सों में बांटें: आधा बोआई के समय, और आधा बोआई के 21-25 दिनों बाद पहली सिंचाई के समय डालें।';
        }
      } else if (chatLanguage === 'pun') {
        botResponse = 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਝੋਨੇ ਦੀ ਫਸਲ ਲਈ ਸਮੇਂ ਸਿਰ ਨਹਿਰੀ ਪਾਣੀ ਲਗਾਓ ਅਤੇ ਯੂਰੀਆ ਸਹੀ ਮਾਤਰਾ ਵਿੱਚ ਪਾਓ।';
        if (input.includes('ਮੀਂਹ') || input.includes('ਮੌਸਮ') || input.includes('weather') || input.includes('rain')) {
          botResponse = 'ਅਗਲੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ ਹਲਕੀ ਬਾਰਸ਼ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਦਵਾਈਆਂ ਦਾ ਛਿੜਕਾਅ ਰੋਕ ਦਿਓ।';
        } else if (input.includes('ਖਾਦ') || input.includes('fertilizer') || input.includes('npk')) {
          botResponse = 'ਐਨ.ਪੀ.ਕੇ. (NPK) ਖਾਦ ਦੀ ਅੱਧੀ ਮਾਤਰਾ ਬਿਜਾਈ ਸਮੇਂ ਅਤੇ ਬਾਕੀ ਬਚੀ ਅੱਧੀ ਮਾਤਰਾ ਪਹਿਲੇ ਪਾਣੀ ਵੇਲੇ (21-25 ਦਿਨਾਂ ਵਿੱਚ) ਪਾਓ।';
        }
      } else if (chatLanguage === 'ta') {
        botResponse = 'வணக்கம் விவசாயி தோழரே! உங்கள் களிமண்/கரிசல் மண்ணிற்கு, பயிர் வளர்ச்சிக்கு NPK (12:32:16) உரத்தைப் பயன்படுத்த பரிந்துரைக்கிறோம்.';
        if (input.includes('மழை') || input.includes('வானிலை') || input.includes('weather') || input.includes('rain')) {
          botResponse = 'வானிலை அறிக்கை: அடுத்த 48 மணிநேரத்தில் லேசான மழை பெய்ய வாய்ப்புள்ளது. மருந்து தெளிப்பதை தற்காலிகமாக தவிர்க்கவும்.';
        } else if (input.includes('உரம்') || input.includes('fertilizer') || input.includes('npk')) {
          botResponse = 'NPK உரம்: பாதியை விதைக்கும் போதும், மீதியை விதைத்த 21-25 நாட்களுக்குப் பிறகு முதல் நீர்ப்பாசனத்தின் போதும் இடவும்.';
        }
      } else {
        botResponse = 'Hello! Based on agricultural best practices for Clayey/Black soil, we recommend NPK (12:32:16) during tillering. Please ensure adequate canal irrigation.';
        if (input.includes('fertilizer') || input.includes('npk')) {
          botResponse = 'NPK dose is best split: half during sowing, and remaining during first irrigation at 21-25 days. Organic compost will improve soil yield.';
        } else if (input.includes('weather') || input.includes('rain')) {
          botResponse = 'Hold chemical spraying until rain clears. Crop weather tracking shows current parameters to be ideal.';
        }
      }

      setChatMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const getRiceGrowthStage = (days) => {
    if (days <= 10) return 'Germination';
    if (days <= 30) return 'Vegetative';
    if (days <= 60) return 'Tillering';
    if (days <= 90) return 'Flowering';
    if (days <= 120) return 'Harvest Ready';
    return 'Overdue for Harvest';
  };

  const getGeneralGrowthStage = (days, duration) => {
    const pct = (days / duration) * 100;
    if (pct <= 10) return 'Germination';
    if (pct <= 30) return 'Vegetative';
    if (pct <= 50) return 'Tillering';
    if (pct <= 80) return 'Flowering';
    if (pct <= 100) return 'Harvest Ready';
    return 'Overdue for Harvest';
  };

  // Map References
  const [mapInstance, setMapInstance] = useState(null);
  const [mapPolygon, setMapPolygon] = useState(null);
  const [mapVertexMarkers, setMapVertexMarkers] = useState([]);

  // Leaflet Map Initialization and Interaction
  useEffect(() => {
    const isAddMap = (user && user.role === 'FARMER' && farms.length === 0) || (activeTab === 'profile' && profileSubTab === 'farms' && farmSubView === 'add');
    const isEditMap = activeTab === 'profile' && profileSubTab === 'farms' && farmSubView === 'edit';
    const containerId = isAddMap ? 'add-map' : (isEditMap ? 'edit-map' : null);

    if (!containerId) {
      setMapInstance(null);
      setMapPolygon(null);
      setMapVertexMarkers([]);
      return;
    }

    const interval = setInterval(() => {
      if (window.L && document.getElementById(containerId)) {
        clearInterval(interval);
        
        const container = document.getElementById(containerId);
        if (container && container._leaflet_id) {
          return; // Map is already initialized
        }

        let centerLat = 11.0168;
        let centerLng = 76.9558;

        if (isEditMap && farmForm.latitude && farmForm.longitude) {
          centerLat = parseFloat(farmForm.latitude);
          centerLng = parseFloat(farmForm.longitude);
        } else if (user && user.district) {
          if (user.district.toLowerCase() === 'coimbatore') {
            centerLat = 11.0168;
            centerLng = 76.9558;
          } else if (user.district.toLowerCase() === 'ambala') {
            centerLat = 30.3782;
            centerLng = 76.7767;
          }
        }

        const map = window.L.map(containerId).setView([centerLat, centerLng], 17);
        window.L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
          maxZoom: 21,
          attribution: '© Google Satellite Hybrid'
        }).addTo(map);

        let initialArea = parseFloat(farmForm.area) || 1.0;
        let latOffset = 0.0004;
        let lngOffset = 0.0004;

        if (initialArea > 0) {
          const sideLength = Math.sqrt(initialArea * 4046.86);
          latOffset = (sideLength / 2) / 111320;
          lngOffset = (sideLength / 2) / (111320 * Math.cos(centerLat * Math.PI / 180));
        }

        let pts = [
          window.L.latLng(centerLat + latOffset, centerLng - lngOffset),
          window.L.latLng(centerLat + latOffset, centerLng + lngOffset),
          window.L.latLng(centerLat - latOffset, centerLng + lngOffset),
          window.L.latLng(centerLat - latOffset, centerLng - lngOffset)
        ];

        let polygon = window.L.polygon(pts, {
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 0.3,
          weight: 3
        }).addTo(map);

        let vertexMarkers = [];

        const updatePolygonGeo = (updatedMarkers) => {
          const markersToUse = updatedMarkers || vertexMarkers;
          if (!markersToUse || markersToUse.length === 0) return;
          const latlngs = markersToUse.map(m => m.getLatLng());
          polygon.setLatLngs(latlngs);
          
          const areaAcres = calculatePolygonAreaInAcres(latlngs);
          const center = calculatePolygonCenter(latlngs);
          
          setFarmForm(prev => ({
            ...prev,
            area: areaAcres.toString(),
            latitude: center.lat.toFixed(6),
            longitude: center.lng.toFixed(6)
          }));
          
          // Reverse geocode the center point
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${center.lat}&lon=${center.lng}`)
            .then(res => res.json())
            .then(data => {
              if (data && data.address) {
                const village = data.address.village || data.address.suburb || data.address.town || data.address.city || '';
                const road = data.address.road || '';
                const resolvedLocation = [village, road].filter(Boolean).join(', ');
                if (resolvedLocation) {
                  setFarmForm(prev => ({
                    ...prev,
                    location: resolvedLocation
                  }));
                }
              }
            })
            .catch(err => console.warn("Reverse geocoding failed: ", err));
        };

        // Create draggable markers at vertices
        pts.forEach((pt) => {
          let vMarker = window.L.marker(pt, {
            draggable: true,
            icon: window.L.divIcon({
              className: 'custom-vertex-marker',
              html: `<div style="background: white; border: 3px solid #10b981; width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
              iconSize: [14, 14],
              iconAnchor: [7, 7]
            })
          }).addTo(map);

          vMarker.on('drag', () => {
            updatePolygonGeo();
          });

          vMarker.on('dragend', () => {
            updatePolygonGeo();
          });

          vertexMarkers.push(vMarker);
        });

        // Click listener on map to snap entire boundary box to clicked spot
        map.on('click', (e) => {
          const { lat, lng } = e.latlng;
          
          let curArea = parseFloat(farmForm.area) || 1.0;
          let loff = 0.0004;
          let lngoff = 0.0004;
          if (curArea > 0) {
            const sideLength = Math.sqrt(curArea * 4046.86);
            loff = (sideLength / 2) / 111320;
            lngoff = (sideLength / 2) / (111320 * Math.cos(lat * Math.PI / 180));
          }
          
          const newPts = [
            window.L.latLng(lat + loff, lng - lngoff),
            window.L.latLng(lat + loff, lng + lngoff),
            window.L.latLng(lat - loff, lng + lngoff),
            window.L.latLng(lat - loff, lng - lngoff)
          ];
          
          polygon.setLatLngs(newPts);
          vertexMarkers[0].setLatLng(newPts[0]);
          vertexMarkers[1].setLatLng(newPts[1]);
          vertexMarkers[2].setLatLng(newPts[2]);
          vertexMarkers[3].setLatLng(newPts[3]);
          
          updatePolygonGeo(vertexMarkers);
        });

        setMapInstance(map);
        setMapPolygon(polygon);
        setMapVertexMarkers(vertexMarkers);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [activeTab, user, farms, profileSubTab, farmSubView]);

  const handleMapSearch = async (query, containerId) => {
    if (!query || !window.L) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const first = data[0];
          const lat = parseFloat(first.lat);
          const lon = parseFloat(first.lon);
          
          if (mapInstance) {
            mapInstance.flyTo([lat, lon], 17);
            
            // Re-center the polygon and its vertex markers around the new search location
            let initialArea = parseFloat(farmForm.area) || 1.0;
            let latOffset = 0.0004;
            let lngOffset = 0.0004;
            if (initialArea > 0) {
              const sideLength = Math.sqrt(initialArea * 4046.86);
              latOffset = (sideLength / 2) / 111320;
              lngOffset = (sideLength / 2) / (111320 * Math.cos(lat * Math.PI / 180));
            }
            
            const newPts = [
              window.L.latLng(lat + latOffset, lon - lngOffset),
              window.L.latLng(lat + latOffset, lon + lngOffset),
              window.L.latLng(lat - latOffset, lon + lngOffset),
              window.L.latLng(lat - latOffset, lon - lngOffset)
            ];
            
            if (mapPolygon) {
              mapPolygon.setLatLngs(newPts);
            }
            
            if (mapVertexMarkers && mapVertexMarkers.length === 4) {
              mapVertexMarkers[0].setLatLng(newPts[0]);
              mapVertexMarkers[1].setLatLng(newPts[1]);
              mapVertexMarkers[2].setLatLng(newPts[2]);
              mapVertexMarkers[3].setLatLng(newPts[3]);
            }
          }
          
          setFarmForm(prev => ({
            ...prev,
            latitude: lat.toFixed(6),
            longitude: lon.toFixed(6),
            location: first.display_name.split(',')[0]
          }));
        } else {
          alert("Location not found on map search.");
        }
      }
    } catch (e) {
      console.warn("Geocoding search failed: ", e);
    }
  };

  const handleTabClick = (tab) => {
    setErrorMsg('');
    setSuccessMsg('');
    const isFarmerWithNoFarms = user && user.role === 'FARMER' && farms.length === 0;

    if (isFarmerWithNoFarms) {
      alert("Please register your first farm plot to activate AgriSmart features.");
      return;
    }

    if (!user && tab !== 'home' && tab !== 'login') {
      setRedirectAfterLogin(tab);
      setActiveTab('login');
      return;
    }
    
    if (tab !== 'profile') {
      resetFarmForm();
    }
    
    // If going to profile, default subtab to insights and subview to list
    if (tab === 'profile') {
      setProfileSubTab('insights');
      setFarmSubView('list');
    }
    
    setActiveTab(tab);
  };

  // Crop Recommendation Logic based on Soil, Weather and Region
  const getDynamicRecommendations = (farm, weatherState, userState) => {
    if (!farm) return [];
    
    const recs = [];
    const state = userState?.state || '';
    const soil = farm.soilType || '';
    const temp = weatherState?.temperature;
    
    if (soil === 'Clayey' || soil === 'Black Soil') {
      if (state.toLowerCase().includes('tamil nadu') || state.toLowerCase().includes('coimbatore')) {
        recs.push({
          crop: 'Rice',
          duration: 120,
          reason: 'Well-suited for Clayey/Black soil in Tamil Nadu\'s warm climate and water retention.'
        });
        recs.push({
          crop: 'Cotton',
          duration: 150,
          reason: 'Thrives in deep Black soil under warm Tamil Nadu conditions.'
        });
      } else {
        recs.push({
          crop: 'Wheat',
          duration: 110,
          reason: 'Highly recommended for Clayey/Alluvial soils in Northern regions.'
        });
      }
    }

    if (soil === 'Sandy' || soil === 'Red Soil') {
      recs.push({
        crop: 'Groundnut',
        duration: 105,
        reason: 'Prefers well-drained Sandy/Red soils typical of Southern regions.'
      });
      recs.push({
        crop: 'Maize',
        duration: 90,
        reason: 'Drought-tolerant crop suitable for light Sandy soils.'
      });
      recs.push({
        crop: 'Millet',
        duration: 80,
        reason: 'Low water requirement, perfect for dry Sandy/Red soil regions.'
      });
    }

    if (soil === 'Alluvial') {
      recs.push({
        crop: 'Sugarcane',
        duration: 360,
        reason: 'Deep fertile Alluvial soil supports high-yielding Sugarcane.'
      });
      recs.push({
        crop: 'Rice',
        duration: 120,
        reason: 'Excellent water capacity in fertile Alluvial river basins.'
      });
    }

    // Climate-based adjustment
    if (temp !== undefined) {
      if (temp > 28) {
        if (!recs.some(r => r.crop === 'Sugarcane') && (soil === 'Alluvial' || soil === 'Clayey')) {
          recs.push({ crop: 'Sugarcane', duration: 360, reason: 'High temperatures (>28°C) accelerate sugarcane sucrose accumulation.' });
        }
      } else if (temp < 20) {
        if (!recs.some(r => r.crop === 'Mustard')) {
          recs.push({ crop: 'Mustard', duration: 110, reason: 'Cool winter temperature (<20°C) is ideal for winter oilseed germination.' });
        }
      }
    }

    if (recs.length === 0) {
      recs.push({ crop: 'Rice', duration: 120, reason: 'General crop recommended for standard soil conditions.' });
      recs.push({ crop: 'Maize', duration: 90, reason: 'Fast growing general crop suited for standard climates.' });
    }

    return recs;
  };

  // Agri Officer Analytics Aggregation
  const getRegionalAnalytics = () => {
    const stats = {};
    farms.forEach(f => {
      const region = f.location || 'Unknown';
      const district = region.split(',')[0].trim();
      if (!stats[district]) {
        stats[district] = { farmers: new Set(), totalArea: 0, crops: {} };
      }
      stats[district].farmers.add(f.userId);
      stats[district].totalArea += parseFloat(f.area) || 0;
      
      const farmCrops = crops.filter(c => c.farmId === f.farmId);
      farmCrops.forEach(c => {
        stats[district].crops[c.cropName] = (stats[district].crops[c.cropName] || 0) + 1;
      });
    });

    return Object.keys(stats).map(district => {
      const s = stats[district];
      let primaryCrop = 'None';
      let maxCount = 0;
      Object.keys(s.crops).forEach(cName => {
        if (s.crops[cName] > maxCount) {
          maxCount = s.crops[cName];
          primaryCrop = cName;
        }
      });

      return {
        district,
        farmerCount: s.farmers.size,
        totalArea: s.totalArea,
        primaryCrop
      };
    });
  };

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!broadcastForm.title.trim() || !broadcastForm.message.trim()) {
      setErrorMsg('Notification title and message are required.');
      return;
    }
    const newNotif = {
      id: Date.now(),
      title: broadcastForm.title,
      type: broadcastForm.type,
      targetRegion: broadcastForm.targetRegion || 'All Regions',
      message: broadcastForm.message,
      sender: user ? user.name : 'Agri Officer',
      timestamp: new Date().toISOString()
    };
    
    const updated = [newNotif, ...broadcastNotifications];
    setBroadcastNotifications(updated);
    localStorage.setItem('broadcast_notifications', JSON.stringify(updated));
    setSuccessMsg('Broadcast Alert sent successfully to ' + newNotif.targetRegion + '!');
    setBroadcastForm({ title: '', type: 'General Alert', targetRegion: 'All Regions', message: '' });
  };

  const handleTogglePossessedDoc = (doc) => {
    setPossessedDocs(prev => {
      const updated = prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc];
      return updated;
    });
  };

  const handleToggleApplyScheme = (schemeId) => {
    let updated;
    if (appliedSchemeIds.includes(schemeId)) {
      updated = appliedSchemeIds.filter(id => id !== schemeId);
    } else {
      updated = [...appliedSchemeIds, schemeId];
    }
    setAppliedSchemeIds(updated);
    localStorage.setItem('appliedSchemeIds', JSON.stringify(updated));
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => handleTabClick('home')}>
          <div style={{ background: '#e2f3e9', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <Sprout size={24} color="var(--primary)" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.5px' }}>AgriSmart</span>
        </div>

        <nav className="nav-links">
          <button 
            onClick={() => handleTabClick('home')} 
            className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
          >
            <Sprout size={18} /> Home
          </button>

          <button 
            onClick={() => handleTabClick('dashboard')} 
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button 
            onClick={() => handleTabClick('crops')} 
            className={`nav-button ${activeTab === 'crops' ? 'active' : ''}`}
          >
            <Layers size={18} /> Crop Records
          </button>

          {(!user || user.role === 'FARMER') && (
            <button 
              onClick={() => handleTabClick('schemes')} 
              className={`nav-button ${activeTab === 'schemes' ? 'active' : ''}`}
            >
              <Award size={18} /> Schemes
            </button>
          )}

          <button 
            onClick={() => handleTabClick('weather')} 
            className={`nav-button ${activeTab === 'weather' ? 'active' : ''}`}
          >
            <CloudSun size={18} /> Weather
          </button>

          <button 
            onClick={() => handleTabClick('chatbot')} 
            className={`nav-button ${activeTab === 'chatbot' ? 'active' : ''}`}
          >
            <MessageSquare size={18} /> AI Chatbot
          </button>

          {user && (user.role === 'OFFICER' || user.role === 'ADMIN') && (
            <button 
              onClick={() => handleTabClick('officer-portal')} 
              className={`nav-button ${activeTab === 'officer-portal' ? 'active' : ''}`}
            >
              <Users size={18} /> Officer Portal
            </button>
          )}

          <button 
            onClick={() => handleTabClick('profile')} 
            className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <User size={18} /> Profile
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {user ? (
            <>
              <div style={{ textAlign: 'right' }} onClick={() => handleTabClick('profile')} style={{ cursor: 'pointer' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>{user.name}</p>
                <span className={`badge badge-${user.role.toLowerCase()}`} style={{ fontSize: '9px', padding: '2px 6px', display: 'inline-block' }}>
                  {user.role}
                </span>
              </div>
              <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', fontSize: '13px' }}>
                <LogOut size={13} /> Exit
              </button>
            </>
          ) : (
            <button onClick={() => handleTabClick('login')} className="btn-primary" style={{ padding: '8px 16px', fontSize: '13.5px' }}>
              Sign In
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        {user && user.role === 'FARMER' && farms.length === 0 ? (
          <Profile 
            user={user}
            farms={farms}
            crops={crops}
            profileSubTab="farms"
            setProfileSubTab={setProfileSubTab}
            farmSubView="add"
            setFarmSubView={setFarmSubView}
            selectedFarmId={selectedFarmId}
            setSelectedFarmId={setSelectedFarmId}
            farmForm={farmForm}
            setFarmForm={setFarmForm}
            handleFarmSubmit={handleFarmSubmit}
            handleMapSearch={handleMapSearch}
            resetFarmForm={resetFarmForm}
            handleFarmEdit={handleFarmEdit}
            handleFarmDelete={handleFarmDelete}
            errorMsg={errorMsg}
            successMsg={successMsg}
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            handleProfileUpdate={handleProfileUpdate}
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
            handlePasswordChange={handlePasswordChange}
            notifSettings={notifSettings}
            setNotifSettings={setNotifSettings}
            getRiceGrowthStage={getRiceGrowthStage}
            getGeneralGrowthStage={getGeneralGrowthStage}
            getDynamicRecommendations={getDynamicRecommendations}
            weather={weather}
            showRecs={showRecs}
            handleGetCropRecommendation={handleGetCropRecommendation}
            showCultivationForm={showCultivationForm}
            setShowCultivationForm={setShowCultivationForm}
            selectedRecCrop={selectedRecCrop}
            cultivationForm={cultivationForm}
            setCultivationForm={setCultivationForm}
            handleCultivationSubmit={handleCultivationSubmit}
            handleStartCultivation={handleStartCultivation}
            setHarvestCropId={setHarvestCropId}
            handleCropFailed={handleCropFailed}
            harvestCropId={harvestCropId}
            harvestYield={harvestYield}
            setHarvestYield={setHarvestYield}
            handleHarvestSubmit={handleHarvestSubmit}
            isFirstFarmGate={true}
          />
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>
                  {activeTab === 'home' && 'AgriSmart Hub'}
                  {activeTab === 'login' && 'Account Gateway'}
                  {activeTab === 'dashboard' && `Welcome, ${user?.name}`}
                  {activeTab === 'crops' && 'Crop Cultivation Log'}
                  {activeTab === 'weather' && 'Weather Intelligence'}
                  {activeTab === 'chatbot' && 'AgriSmart AI Assistant'}
                  {activeTab === 'schemes' && 'Government Schemes & Eligibility'}
                  {activeTab === 'officer-portal' && 'Agriculture Officer Hub'}
                  {activeTab === 'profile' && 'Profile & Farming Achievements'}
                </h2>
              </div>

              {/* Sync Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '9999px', background: demoMode ? '#fef3c7' : '#dcfce7', border: `1px solid ${demoMode ? 'var(--warning)' : 'var(--primary)'}` }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: demoMode ? 'var(--warning)' : 'var(--primary)' }}></div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: demoMode ? 'var(--warning)' : 'var(--primary)' }}>
                  {demoMode ? 'Local Offline Mode' : 'Connected to Cloud'}
                </span>
              </div>
            </div>

            {/* Content switch block */}
            {activeTab === 'home' && <Home user={user} setActiveTab={setActiveTab} />}
            {activeTab === 'login' && (
              <Login 
                loginEmail={loginEmail}
                setLoginEmail={setLoginEmail}
                loginPassword={loginPassword}
                setLoginPassword={setLoginPassword}
                regForm={regForm}
                setRegForm={setRegForm}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
                errorMsg={errorMsg}
                successMsg={successMsg}
                setErrorMsg={setErrorMsg}
                setSuccessMsg={setSuccessMsg}
              />
            )}
            {activeTab === 'dashboard' && (
              <Dashboard 
                user={user}
                crops={crops}
                farms={farms}
                broadcastNotifications={broadcastNotifications}
                weather={weather}
                setActiveTab={setActiveTab}
                setProfileSubTab={setProfileSubTab}
                setFarmSubView={setFarmSubView}
                setSelectedFarmId={setSelectedFarmId}
                usersList={usersList}
                demoMode={demoMode}
              />
            )}
            {activeTab === 'crops' && (
              <Crops 
                user={user}
                crops={crops}
                farms={farms}
                weather={weather}
                forecast={forecast}
                showCropsAddForm={showCropsAddForm}
                setShowCropsAddForm={setShowCropsAddForm}
                selectedFarmIdForCrop={selectedFarmIdForCrop}
                setSelectedFarmIdForCrop={setSelectedFarmIdForCrop}
                cropsAddForm={cropsAddForm}
                setCropsAddForm={setCropsAddForm}
                resetCropsAddForm={resetCropsAddForm}
                handleCropsPageCultivationSubmit={handleCropsPageCultivationSubmit}
                errorMsg={errorMsg}
                expandedAiCropId={expandedAiCropId}
                setExpandedAiCropId={setExpandedAiCropId}
                harvestCropId={harvestCropId}
                setHarvestCropId={setHarvestCropId}
                harvestYield={harvestYield}
                setHarvestYield={setHarvestYield}
                handleHarvestSubmit={handleHarvestSubmit}
                handleCropFailed={handleCropFailed}
                selectedFarmFilterForHistory={selectedFarmFilterForHistory}
                setSelectedFarmFilterForHistory={setSelectedFarmFilterForHistory}
                getRiceGrowthStage={getRiceGrowthStage}
                getGeneralGrowthStage={getGeneralGrowthStage}
                getNPKRecommendations={getNPKRecommendations}
                getIrrigationSchedule={getIrrigationSchedule}
                getPredictiveYield={getPredictiveYield}
                getDynamicRecommendations={getDynamicRecommendations}
              />
            )}
            {activeTab === 'weather' && (
              <Weather 
                weather={weather}
                forecast={forecast}
                demoMode={demoMode}
              />
            )}
            {activeTab === 'chatbot' && (
              <Chatbot 
                chatLanguage={chatLanguage}
                setChatLanguage={setChatLanguage}
                chatMessages={chatMessages}
                chatInput={chatInput}
                setChatInput={setChatInput}
                handleChatSend={handleChatSend}
              />
            )}
            {activeTab === 'schemes' && (
              <Schemes 
                user={user}
                farms={farms}
                crops={crops}
                possessedDocs={possessedDocs}
                handleTogglePossessedDoc={handleTogglePossessedDoc}
                appliedSchemeIds={appliedSchemeIds}
                handleToggleApplyScheme={handleToggleApplyScheme}
                schemesSearch={schemesSearch}
                setSchemesSearch={setSchemesSearch}
                schemesCategory={schemesCategory}
                setSchemesCategory={setSchemesCategory}
                selectedScheme={selectedScheme}
                setSelectedScheme={setSelectedScheme}
                getMockSchemesRaw={getMockSchemesRaw}
              />
            )}
            {activeTab === 'officer-portal' && (
              <OfficerPortal 
                user={user}
                broadcastNotifications={broadcastNotifications}
                handleNotifDelete={handleNotifDelete}
                errorMsg={errorMsg}
                successMsg={successMsg}
                broadcastForm={broadcastForm}
                setBroadcastForm={setBroadcastForm}
                handleBroadcastSubmit={handleBroadcastSubmit}
                getRegionalAnalytics={getRegionalAnalytics}
              />
            )}
            {activeTab === 'profile' && (
              <Profile 
                user={user}
                farms={farms}
                crops={crops}
                profileSubTab={profileSubTab}
                setProfileSubTab={setProfileSubTab}
                farmSubView={farmSubView}
                setFarmSubView={setFarmSubView}
                selectedFarmId={selectedFarmId}
                setSelectedFarmId={setSelectedFarmId}
                farmForm={farmForm}
                setFarmForm={setFarmForm}
                handleFarmSubmit={handleFarmSubmit}
                handleMapSearch={handleMapSearch}
                resetFarmForm={resetFarmForm}
                handleFarmEdit={handleFarmEdit}
                handleFarmDelete={handleFarmDelete}
                errorMsg={errorMsg}
                successMsg={successMsg}
                profileForm={profileForm}
                setProfileForm={setProfileForm}
                handleProfileUpdate={handleProfileUpdate}
                passwordForm={passwordForm}
                setPasswordForm={setPasswordForm}
                handlePasswordChange={handlePasswordChange}
                notifSettings={notifSettings}
                setNotifSettings={setNotifSettings}
                getRiceGrowthStage={getRiceGrowthStage}
                getGeneralGrowthStage={getGeneralGrowthStage}
                getDynamicRecommendations={getDynamicRecommendations}
                weather={weather}
                showRecs={showRecs}
                handleGetCropRecommendation={handleGetCropRecommendation}
                showCultivationForm={showCultivationForm}
                setShowCultivationForm={setShowCultivationForm}
                selectedRecCrop={selectedRecCrop}
                cultivationForm={cultivationForm}
                setCultivationForm={setCultivationForm}
                handleCultivationSubmit={handleCultivationSubmit}
                handleStartCultivation={handleStartCultivation}
                setHarvestCropId={setHarvestCropId}
                handleCropFailed={handleCropFailed}
                harvestCropId={harvestCropId}
                harvestYield={harvestYield}
                setHarvestYield={setHarvestYield}
                handleHarvestSubmit={handleHarvestSubmit}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
