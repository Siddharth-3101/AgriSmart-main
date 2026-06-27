import React from 'react';
import { CloudSun } from 'lucide-react';

export default function Weather({ weather, forecast, demoMode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', animation: 'fadeIn 0.3s ease' }}>
      {weather ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px' }}>
            <CloudSun size={64} color="var(--primary)" style={{ marginBottom: '16px' }} />
            <span style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>Today's Weather</span>
            <h1 style={{ fontSize: '54px', fontWeight: '800', color: 'var(--text-main)', marginTop: '10px', margin: '10px 0 0 0' }}>{weather.temperature}°C</h1>
            <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', marginTop: '6px', margin: '6px 0 0 0' }}>{weather.description}</p>
            
            <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', marginTop: '24px', paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Humidity</span>
                <p style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px', margin: '4px 0 0 0' }}>{weather.humidity}%</p>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Rainfall</span>
                <p style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px', margin: '4px 0 0 0' }}>{weather.rainfall || 0} mm</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="glass-card" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', margin: 0 }}>7-Day Forecast</h3>
              {forecast.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '14px', marginTop: '16px' }}>
                  {forecast.map((day, idx) => (
                    <div key={idx} style={{ background: '#f4faf6', border: '1px solid #e2f3e9', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
                        {new Date(day.date).toLocaleDateString([], { weekday: 'short', day: 'numeric' })}
                      </span>
                      <CloudSun size={24} color="var(--primary)" style={{ margin: '12px auto' }} />
                      <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>{day.tempMax}°</h4>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>{day.tempMin}°</span>
                      <p style={{ fontSize: '10px', marginTop: '6px', color: 'var(--text-muted)', fontWeight: '600', margin: '6px 0 0 0' }}>{day.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '16px', margin: 0 }}>No forecast data found.</p>
              )}
            </div>

            <div className="glass-card" style={{ background: '#f8fafc', borderColor: '#e2e8f0', textAlign: 'left' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '10px', margin: 0 }}>Sync Status</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', margin: 0 }}>
                <strong>Last Sync :</strong> {new Date(weather.recordedAt).toLocaleString()}<br />
                <strong>Status :</strong> {demoMode ? "Offline / Using Last Synced Cache" : "Online / Synced"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 0', border: '2px dashed #c8dfd2', borderRadius: '16px' }}>
          <CloudSun size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
          <p style={{ color: 'var(--text-muted)', fontWeight: '600', margin: 0 }}>No weather data found. Please register a farm plot with location coordinates under Profile to sync weather.</p>
        </div>
      )}
    </div>
  );
}
