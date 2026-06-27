import React from 'react';
import { TrendingUp, Trash2 } from 'lucide-react';

export default function OfficerPortal({
  user,
  broadcastNotifications,
  handleNotifDelete,
  errorMsg,
  successMsg,
  broadcastForm,
  setBroadcastForm,
  handleBroadcastSubmit,
  getRegionalAnalytics
}) {
  if (!user || (user.role !== 'OFFICER' && user.role !== 'ADMIN')) {
    return <p style={{ color: 'var(--text-muted)' }}>Access denied: Officer role required.</p>;
  }

  const regionalStats = getRegionalAnalytics();
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
        
        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', margin: 0 }}>Region-Specific Farmer Analytics</h3>
          {regionalStats.length > 0 ? (
            <div style={{ overflowX: 'auto', marginTop: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px' }}>Region/District</th>
                    <th style={{ padding: '10px' }}>Farmers</th>
                    <th style={{ padding: '10px' }}>Cultivated Area (Acres)</th>
                    <th style={{ padding: '10px' }}>Primary Crop</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalStats.map((stat, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '10px', fontWeight: '700' }}>{stat.district}</td>
                      <td style={{ padding: '10px' }}>{stat.farmerCount}</td>
                      <td style={{ padding: '10px' }}>{stat.totalArea} Acres</td>
                      <td style={{ padding: '10px' }}><span className="badge badge-farmer">{stat.primaryCrop}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginTop: '16px', margin: 0 }}>No farmer analytics found (Requires registered farm location addresses).</p>
          )}
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} /> Regional Cultivation Distribution
          </h3>
          {regionalStats.length > 0 ? (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <svg viewBox="0 0 400 150" style={{ width: '100%', height: '150px' }}>
                {regionalStats.map((stat, idx) => {
                  const barWidth = 35;
                  const spacing = 45;
                  const x = 50 + idx * (barWidth + spacing);
                  const maxArea = Math.max(...regionalStats.map(s => s.totalArea), 1);
                  const barHeight = (stat.totalArea / maxArea) * 90;
                  const y = 110 - barHeight;
                  return (
                    <g key={idx}>
                      <rect x={x} y={y} width={barWidth} height={barHeight} fill="var(--primary)" rx="4" />
                      <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--primary)">{stat.totalArea}A</text>
                      <text x={x + barWidth / 2} y="130" textAnchor="middle" fontSize="11" fill="var(--text-main)" fontWeight="600">{stat.district}</text>
                    </g>
                  );
                })}
                <line x1="20" y1="110" x2="380" y2="110" stroke="var(--border-color)" strokeWidth="1.5" />
              </svg>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', textAlign: 'center', marginTop: '16px', margin: 0 }}>No chart data available.</p>
          )}
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', margin: 0 }}>Past Broadcast Alerts ({broadcastNotifications.length})</h3>
          {broadcastNotifications.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              {broadcastNotifications.map(alert => (
                <div key={alert.id} style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '4px' }}>
                      <span className="badge badge-officer" style={{ fontSize: '9px' }}>{alert.type}</span>
                      <strong style={{ fontSize: '13.5px' }}>{alert.title}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>To: {alert.targetRegion}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{alert.message}</p>
                  </div>
                  <button 
                    onClick={() => handleNotifDelete(alert.id)}
                    className="btn-secondary"
                    style={{ padding: '6px', color: 'var(--danger)', borderColor: 'var(--border-color)', background: 'none' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginTop: '16px', margin: 0 }}>No previous alert broadcasts recorded.</p>
          )}
        </div>
      </div>

      <div className="glass-card" style={{ height: 'fit-content', textAlign: 'left' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)', margin: 0 }}>
          Broadcast Alerts Dispatch
        </h3>
        {errorMsg && <div style={{ background: '#fee2e2', border: '1px solid var(--danger)', padding: '12px', borderRadius: '8px', color: 'var(--danger)', fontSize: '13px', marginBottom: '16px', marginTop: '16px' }}>{errorMsg}</div>}
        {successMsg && <div style={{ background: '#dcfce7', border: '1px solid var(--primary)', padding: '12px', borderRadius: '8px', color: 'var(--primary)', fontSize: '13px', marginBottom: '16px', marginTop: '16px' }}>{successMsg}</div>}
        
        <form onSubmit={handleBroadcastSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600' }}>Alert Title</label>
            <input 
              type="text" 
              placeholder="e.g. Heavy Rainfall Alert / New Subsidies" 
              required 
              value={broadcastForm.title} 
              onChange={e => setBroadcastForm({...broadcastForm, title: e.target.value})} 
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Alert Type</label>
              <select 
                value={broadcastForm.type} 
                onChange={e => setBroadcastForm({...broadcastForm, type: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}
              >
                <option value="Rain Alert">Rain Alert</option>
                <option value="Scheme Alert">Scheme Announcement</option>
                <option value="General Alert">General Advisory</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Target Region</label>
              <select 
                value={broadcastForm.targetRegion} 
                onChange={e => setBroadcastForm({...broadcastForm, targetRegion: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}
              >
                <option value="All Regions">All Regions</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Ambala">Ambala</option>
                <option value="Chandigarh">Chandigarh</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600' }}>Broadcasting Message</label>
            <textarea 
              rows="4" 
              placeholder="Compose notification text to display on Farmer dashboards..." 
              required
              value={broadcastForm.message}
              onChange={e => setBroadcastForm({...broadcastForm, message: e.target.value})}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0', fontSize: '14px', resize: 'none', width: '100%' }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '12px', fontWeight: '700', fontSize: '14.5px', marginTop: '10px', width: '100%' }}>
            Dispatch Broadcast Alert
          </button>
        </form>
      </div>
    </div>
  );
}
