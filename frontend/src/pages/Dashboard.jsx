import React from 'react';
import { 
  MapPin, 
  Layers, 
  AlertTriangle, 
  CloudSun, 
  Plus, 
  Award, 
  MessageSquare, 
  Users 
} from 'lucide-react';

export default function Dashboard({
  user,
  crops,
  farms,
  broadcastNotifications,
  weather,
  setActiveTab,
  setProfileSubTab,
  setFarmSubView,
  setSelectedFarmId,
  usersList,
  demoMode
}) {
  if (!user) return null;

  if (user.role === 'FARMER') {
    const activeCrops = crops.filter(c => c.status === 'ACTIVE');
    const filteredAlerts = broadcastNotifications.filter(n => {
      return n.targetRegion === 'All Regions' || 
             (user.district && n.targetRegion.toLowerCase() === user.district.toLowerCase()) ||
             (user.state && n.targetRegion.toLowerCase() === user.state.toLowerCase());
    });

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', animation: 'fadeIn 0.3s ease' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f4faf6', padding: '16px', borderRadius: '12px' }}>
              <MapPin size={28} color="var(--primary)" />
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Total Farms</span>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>{farms.length}</h3>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f4faf6', padding: '16px', borderRadius: '12px' }}>
              <Layers size={28} color="var(--primary)" />
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Active Crops</span>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                  {activeCrops.length}
                </h3>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ borderLeft: '5px solid var(--primary)', textAlign: 'left' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} /> Official Advisories & Warnings
            </h3>
            {filteredAlerts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredAlerts.map(alert => (
                  <div key={alert.id} style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '700', fontSize: '14px', color: alert.type === 'Rain Alert' ? 'var(--danger)' : 'var(--primary)' }}>
                        [{alert.type}] {alert.title}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {new Date(alert.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.4', margin: 0 }}>{alert.message}</p>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '6px', textAlign: 'right' }}>
                      — Dispatcher: {alert.sender}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', margin: 0 }}>
                No warnings in your region today. Weather forecast is stable; keep monitoring updates.
              </p>
            )}
          </div>

          <div className="glass-card" style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>Current Weather Snapshot</h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {weather ? `Last Sync: ${new Date(weather.recordedAt).toLocaleTimeString()}` : 'Syncing...'}
              </span>
            </div>
            {weather ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CloudSun size={48} color="var(--primary)" />
                  <div>
                    <h2 style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>{weather.temperature}°C</h2>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>{weather.description}</span>
                  </div>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  <p style={{ margin: '0 0 4px 0' }}><strong>Humidity :</strong> {weather.humidity}%</p>
                  <p style={{ margin: 0 }}><strong>Rainfall :</strong> {weather.rainfall || 0} mm</p>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', padding: '10px 0', margin: 0 }}>
                No weather data synced. Please add coordinates to your farm plot under Profile to fetch live weather details.
              </p>
            )}
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', margin: 0 }}>Quick Actions</h3>
          
          <button onClick={() => { setActiveTab('profile'); setProfileSubTab('farms'); setFarmSubView('add'); }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', padding: '16px' }}>
            <Plus size={18} /> Register New Farm
          </button>

          <button 
            onClick={() => {
              if (farms.length === 0) {
                alert('Please add a farm plot first.');
              } else {
                setSelectedFarmId(farms[0].farmId);
                setActiveTab('profile');
                setProfileSubTab('farms');
                setFarmSubView('view');
              }
            }} 
            className="btn-secondary" 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', padding: '16px' }}
          >
            <Layers size={18} /> Add Crop to Cultivate
          </button>

          <button onClick={() => setActiveTab('schemes')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', padding: '16px' }}>
            <Award size={18} /> Scheme Recommendations
          </button>

          <button onClick={() => setActiveTab('chatbot')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', padding: '16px' }}>
            <MessageSquare size={18} /> Chat with AI Bot
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', animation: 'fadeIn 0.3s ease' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
            <Users size={32} color="var(--primary)" />
            <div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Registered Farmers</span>
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '4px 0 0 0' }}>{usersList.length || 3}</h2>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
            <MapPin size={32} color="var(--primary)" />
            <div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Monitor Area</span>
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '4px 0 0 0' }}>15 Acres</h2>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Registered User Accounts</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>ID</th>
                  <th style={{ padding: '12px' }}>Name</th>
                  <th style={{ padding: '12px' }}>Email</th>
                  <th style={{ padding: '12px' }}>Role</th>
                  <th style={{ padding: '12px' }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {(usersList.length > 0 ? usersList : [
                  { userId: 1, name: 'Siddharth Sharma', email: 'admin@agrismart.com', role: 'ADMIN', district: 'Chandigarh', state: 'Punjab' },
                  { userId: 101, name: 'Siddharth', email: 'farmer@agrismart.com', role: 'FARMER', district: 'Coimbatore', state: 'Tamil Nadu' },
                  { userId: 102, name: 'Officer Priya', email: 'officer@agrismart.com', role: 'OFFICER', district: 'Ambala', state: 'Haryana' }
                ]).map((u, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px' }}>#{u.userId}</td>
                    <td style={{ padding: '12px', fontWeight: '700' }}>{u.name}</td>
                    <td style={{ padding: '12px' }}>{u.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`badge badge-${u.role.toLowerCase()}`}>{u.role}</span>
                    </td>
                    <td style={{ padding: '12px' }}>{u.district || 'N/A'}, {u.state || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
