import React from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  CloudSun, 
  MessageSquare, 
  Award, 
  Activity, 
  MapPin, 
  TrendingUp 
} from 'lucide-react';

export default function Home({ user, setActiveTab }) {
  const handleFeatureClick = (tab) => {
    if (!user) {
      setActiveTab('login');
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Premium Hero Banner Section */}
      <div 
        style={{ 
          position: 'relative', 
          height: '420px', 
          borderRadius: '24px', 
          overflow: 'hidden', 
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url("/banner_farm.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px 60px',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ maxWidth: '550px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <span style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '6px 12px', borderRadius: '20px', alignSelf: 'flex-start', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Smart Agriculture Ecosystem
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: '800', lineHeight: '1.2', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            Empowering Farmers with AI Agronomy
          </h1>
          <p style={{ fontSize: '16px', color: '#e2e8f0', lineHeight: '1.6', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Log cultivations, track soil-climate matches, schedule smart irrigation, check real-time weather alerts, and unlock personalized government scheme benefits in one dashboard.
          </p>
          <button 
            onClick={() => handleFeatureClick('dashboard')} 
            className="btn-primary" 
            style={{ 
              alignSelf: 'flex-start', 
              padding: '14px 28px', 
              fontSize: '15px', 
              fontWeight: '700', 
              marginTop: '10px',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
            }}
          >
            Get Started &rarr;
          </button>
        </div>
      </div>

      {/* Features Showcase Section */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Explore AgriSmart Capabilities
        </h2>
        <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 30px auto' }}>
          Unlock premium agricultural services designed to maximize crop yield efficiency and simplify daily farm administration.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          
          {/* Feature 1: Dashboard */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'left', transition: 'transform 0.2s ease' }}>
            <div style={{ background: '#e2f3e9', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start' }}>
              <LayoutDashboard size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '4px 0 0 0' }}>Farmer Dashboard</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Get a centralized operational overview of all your registered plots, active crops, local weather sync status, and district notification tickers.
            </p>
            <button onClick={() => handleFeatureClick('dashboard')} className="btn-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12.5px', padding: '6px 12px' }}>
              Access Dashboard
            </button>
          </div>

          {/* Feature 2: Maps */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'left' }}>
            <div style={{ background: '#e2f3e9', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start' }}>
              <MapPin size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '4px 0 0 0' }}>Google Earth Boundaries</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Locate and trace your exact crop fields using hybrid satellite views. Reshape polygons to automatically calculate precise geodesic acreage in acres.
            </p>
            <button onClick={() => handleFeatureClick('profile')} className="btn-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12.5px', padding: '6px 12px' }}>
              Map My Land
            </button>
          </div>

          {/* Feature 3: Crops */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'left' }}>
            <div style={{ background: '#e2f3e9', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start' }}>
              <Sprout size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '4px 0 0 0' }}>Crop Logs & recommendations</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Start cultivation cycles directly on the Crops page. Leverage regional suitability lists or choose custom varieties, keeping histories separate.
            </p>
            <button onClick={() => handleFeatureClick('crops')} className="btn-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12.5px', padding: '6px 12px' }}>
              Manage Crops
            </button>
          </div>

          {/* Feature 4: AI Insights */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'left' }}>
            <div style={{ background: '#e2f3e9', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start' }}>
              <Activity size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '4px 0 0 0' }}>AI Agronomist Insights</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Access NPK fertilizer dosing guides, smart irrigation planners cross-referenced with live rain forecasts, and regression yield models.
            </p>
            <button onClick={() => handleFeatureClick('crops')} className="btn-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12.5px', padding: '6px 12px' }}>
              View Crop Insights
            </button>
          </div>

          {/* Feature 5: Schemes */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'left' }}>
            <div style={{ background: '#e2f3e9', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start' }}>
              <Award size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '4px 0 0 0' }}>Schemes & Documents</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Input possessed document checklist parameters to instantly find government scheme eligibility matches and missing document warnings.
            </p>
            <button onClick={() => handleFeatureClick('schemes')} className="btn-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12.5px', padding: '6px 12px' }}>
              Check Schemes
            </button>
          </div>

          {/* Feature 6: Weather */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'left' }}>
            <div style={{ background: '#e2f3e9', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start' }}>
              <CloudSun size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '4px 0 0 0' }}>Weather & Twilio Alerts</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Get 7-day weather sync feeds from Open-Meteo and configure SMS alert dispatch triggers on heavy rainfall forecasts.
            </p>
            <button onClick={() => handleFeatureClick('weather')} className="btn-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12.5px', padding: '6px 12px' }}>
              Sync Weather
            </button>
          </div>

          {/* Feature 7: Chatbot */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'left' }}>
            <div style={{ background: '#e2f3e9', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start' }}>
              <MessageSquare size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '4px 0 0 0' }}>Local Language AI Chatbot</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Consult the AI assistant for fertilizer doses and rain safety measures in English, Hindi (हिन्दी), Punjabi (ਪੰਜਾਬੀ), or Tamil (தமிழ்).
            </p>
            <button onClick={() => handleFeatureClick('chatbot')} className="btn-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12.5px', padding: '6px 12px' }}>
              Chat with AI
            </button>
          </div>

          {/* Feature 8: Officer Portal */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'left' }}>
            <div style={{ background: '#e2f3e9', padding: '10px', borderRadius: '10px', alignSelf: 'flex-start' }}>
              <TrendingUp size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)', margin: '4px 0 0 0' }}>Officer Broadcast Center</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Agricultural officers can review district analytics on total acreage, crop distributions, and dispatch announcements.
            </p>
            <button onClick={() => handleFeatureClick('officerPortal')} className="btn-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '12.5px', padding: '6px 12px' }}>
              Officer Portal
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
