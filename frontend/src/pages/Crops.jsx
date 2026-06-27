import React from 'react';
import { 
  Plus, 
  Activity, 
  Sprout, 
  CloudSun, 
  TrendingUp 
} from 'lucide-react';

export default function Crops({
  user,
  crops,
  farms,
  weather,
  forecast,
  showCropsAddForm,
  setShowCropsAddForm,
  selectedFarmIdForCrop,
  setSelectedFarmIdForCrop,
  cropsAddForm,
  setCropsAddForm,
  resetCropsAddForm,
  handleCropsPageCultivationSubmit,
  errorMsg,
  expandedAiCropId,
  setExpandedAiCropId,
  harvestCropId,
  setHarvestCropId,
  harvestYield,
  setHarvestYield,
  handleHarvestSubmit,
  handleCropFailed,
  selectedFarmFilterForHistory,
  setSelectedFarmFilterForHistory,
  getRiceGrowthStage,
  getGeneralGrowthStage,
  getNPKRecommendations,
  getIrrigationSchedule,
  getPredictiveYield,
  getDynamicRecommendations
}) {
  const isFarmer = user && user.role === 'FARMER';
  const activeCrops = crops.filter(c => c.status === 'ACTIVE');
  const cropHistory = crops.filter(c => c.status === 'HARVESTED' || c.status === 'FAILED');

  if (showCropsAddForm && isFarmer) {
    const selectedFarm = farms.find(f => f.farmId === selectedFarmIdForCrop);
    const dynamicRecs = selectedFarm ? getDynamicRecommendations(selectedFarm, weather, user) : [];

    return (
      <div className="glass-card" style={{ maxWidth: '650px', margin: '20px auto', padding: '30px', animation: 'fadeIn 0.3s ease', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>Add Crop for Cultivation</h3>
          <button type="button" onClick={() => { setShowCropsAddForm(false); resetCropsAddForm(); }} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>Cancel</button>
        </div>

        {errorMsg && <div style={{ background: '#fee2e2', border: '1px solid var(--danger)', padding: '12px', borderRadius: '8px', color: 'var(--danger)', fontSize: '13px', marginBottom: '16px' }}>{errorMsg}</div>}

        <form onSubmit={handleCropsPageCultivationSubmit} autoComplete="off">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Select Farm Plot</label>
              <select 
                value={selectedFarmIdForCrop} 
                required
                onChange={e => {
                  const id = e.target.value ? parseInt(e.target.value) : '';
                  setSelectedFarmIdForCrop(id);
                }}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}
              >
                <option value="">-- Choose a Farm Plot --</option>
                {farms.map(f => (
                  <option key={f.farmId} value={f.farmId}>{f.farmName} ({f.location})</option>
                ))}
              </select>
              {farms.length === 0 && (
                <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px' }}>
                  You don't have any registered farms. Please go to Profile &rarr; Manage Farm Plots to add a farm.
                </span>
              )}
            </div>

            {selectedFarm && (
              <div style={{ background: '#f4faf6', padding: '16px', borderRadius: '12px', border: '1px solid #cbdcd0', marginTop: '4px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: 'var(--primary)', margin: 0 }}>
                  AI Recommendations (Based on Soil & District)
                </h4>
                {dynamicRecs.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                    {dynamicRecs.map((rec, i) => (
                      <div key={i} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbdcd0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                          <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{rec.crop}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>{rec.reason}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setCropsAddForm(prev => ({ ...prev, cropName: rec.crop, duration: rec.duration }))}
                          className="btn-primary" 
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Cultivate
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '8px 0 0 0' }}>No recommendations calculated for this soil type.</p>
                )}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Crop Name</label>
              <input 
                type="text" 
                placeholder="e.g. Rice / Cotton / Wheat" 
                required 
                value={cropsAddForm.cropName} 
                onChange={e => setCropsAddForm({...cropsAddForm, cropName: e.target.value})} 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}
              />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                {['Wheat', 'Rice', 'Sugarcane', 'Cotton', 'Maize', 'Groundnut', 'Millet', 'Pulses', 'Mustard'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCropsAddForm({...cropsAddForm, cropName: c})}
                    className="btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '12px', background: '#f8fafc' }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Planting Date</label>
                <input 
                  type="date" 
                  required 
                  value={cropsAddForm.plantingDate} 
                  onChange={e => setCropsAddForm({...cropsAddForm, plantingDate: e.target.value})} 
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Growth Cycle (Days)</label>
                <input 
                  type="number" 
                  required 
                  value={cropsAddForm.duration} 
                  onChange={e => setCropsAddForm({...cropsAddForm, duration: e.target.value})} 
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '14.5px', fontWeight: '700', marginTop: '10px' }}>
              Start Cultivation Log
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>Crop Records Log</h3>
        {isFarmer && (
          <button 
            onClick={() => {
              if (farms.length === 0) {
                alert("Please register a farm plot first before adding crops.");
              } else {
                resetCropsAddForm();
                setShowCropsAddForm(true);
              }
            }} 
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={16} /> Add Crop
          </button>
        )}
      </div>

      {/* 1. Active Cultivations (Current Crops) */}
      <div className="glass-card" style={{ textAlign: 'left' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px', margin: 0 }}>
          Active Cultivations (Current Crops)
        </h4>
        {activeCrops.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
            {activeCrops.map((crop, idx) => {
              const associatedFarm = farms.find(f => f.farmId === crop.farmId);
              const planted = new Date(crop.plantedDate);
              const daysSince = Math.max(0, Math.floor((Date.now() - planted) / (1000 * 60 * 60 * 24)));
              const stage = crop.cropName.toLowerCase() === 'rice' 
                ? getRiceGrowthStage(daysSince)
                : getGeneralGrowthStage(daysSince, crop.duration);
              const progress = Math.min(100, Math.round((daysSince / crop.duration) * 100));
              const isAiExpanded = expandedAiCropId === crop.cropId;

              return (
                <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #cbdcd0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h5 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>{crop.cropName}</h5>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Plot: {associatedFarm ? associatedFarm.farmName : `Plot #${crop.farmId}`}
                      </span>
                    </div>
                    <span className="badge badge-active">{crop.status}</span>
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    <p style={{ margin: '0 0 4px 0' }}><strong>Stage:</strong> <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{stage}</span> ({daysSince} days elapsed)</p>
                    <p style={{ margin: '0 0 4px 0' }}><strong>Planting Date:</strong> {crop.plantedDate}</p>
                    <p style={{ margin: 0 }}><strong>Expected Harvest:</strong> {crop.expectedHarvestDate}</p>
                  </div>

                  <div style={{ marginTop: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ height: '8px', background: '#e2f3e9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                  </div>

                  {isFarmer && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button onClick={() => setHarvestCropId(crop.cropId)} className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', flexGrow: 1 }}>Mark Harvested</button>
                      <button onClick={() => handleCropFailed(crop.cropId)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--danger)', borderColor: 'var(--border-color)' }}>Failed</button>
                    </div>
                  )}

                  <button 
                    type="button"
                    onClick={() => setExpandedAiCropId(isAiExpanded ? null : crop.cropId)} 
                    className="btn-secondary" 
                    style={{ marginTop: '4px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', padding: '6px' }}
                  >
                    <Activity size={14} /> {isAiExpanded ? "Hide AI Agronomist Insights" : "View AI Agronomist Insights"}
                  </button>

                  {isAiExpanded && (
                    <div style={{ marginTop: '8px', background: '#f0f9f4', padding: '14px', borderRadius: '10px', border: '1px solid #cbdcd0', display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeIn 0.2s ease', textAlign: 'left' }}>
                      {/* 1. NPK Fertilizer Advisor */}
                      <div>
                        <h6 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px', margin: 0 }}>
                          <Sprout size={14} /> NPK Fertilizer Advisor
                        </h6>
                        <p style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: '700', margin: '4px 0 0 0' }}>
                          Recommended: {getNPKRecommendations(crop.cropName, associatedFarm?.soilType).ratio}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                          {getNPKRecommendations(crop.cropName, associatedFarm?.soilType).advice}
                        </p>
                      </div>

                      {/* 2. Irrigation Scheduler */}
                      <div style={{ borderTop: '1px dashed #cbdcd0', paddingTop: '8px' }}>
                        <h6 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px', margin: 0 }}>
                          <CloudSun size={14} /> Smart Irrigation Scheduler
                        </h6>
                        <p style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: '700', margin: '4px 0 0 0' }}>
                          Status: {getIrrigationSchedule(crop.cropName, associatedFarm?.soilType, forecast).status}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                          {getIrrigationSchedule(crop.cropName, associatedFarm?.soilType, forecast).advice}
                        </p>
                      </div>

                      {/* 3. Predictive Yield Model */}
                      <div style={{ borderTop: '1px dashed #cbdcd0', paddingTop: '8px' }}>
                        <h6 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px', margin: 0 }}>
                          <TrendingUp size={14} /> ML Yield Predictor
                        </h6>
                        <p style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: '700', margin: '4px 0 0 0' }}>
                          Forecasted Yield: {getPredictiveYield(crop.cropName, associatedFarm?.area, associatedFarm?.soilType, associatedFarm?.waterSource, weather)} Tons
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>
                          Calculated based on farm size ({associatedFarm?.area || 0} acres), soil ({associatedFarm?.soilType || 'N/A'}), irrigation, and rain parameters. (92% Confidence)
                        </p>
                      </div>
                    </div>
                  )}

                  {harvestCropId === crop.cropId && (
                    <form onSubmit={handleHarvestSubmit} style={{ marginTop: '10px', background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #c8dfd2' }}>
                      <label style={{ fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Enter Yield (Tons)</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="number" step="any" placeholder="e.g. 4.5" required value={harvestYield} onChange={e => setHarvestYield(e.target.value)} style={{ flexGrow: 1, padding: '4px 8px', fontSize: '12px', border: '1px solid #cbdcd0', borderRadius: '4px' }} />
                        <button type="submit" className="btn-primary" style={{ padding: '4px 10px', fontSize: '12px' }}>Save</button>
                        <button type="button" className="btn-secondary" onClick={() => { setHarvestCropId(null); setHarvestYield(''); }} style={{ padding: '4px 10px', fontSize: '12px' }}>Cancel</button>
                      </div>
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', padding: '10px 0', margin: 0 }}>No active cultivations right now. Click "Add Crop" to log a new cultivation cycle.</p>
        )}
      </div>

      {/* 2. Historical Harvests (Crop History) */}
      <div className="glass-card" style={{ textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>
            Historical Harvests (Crop History)
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>Filter by Farm Plot:</span>
            <select 
              value={selectedFarmFilterForHistory} 
              onChange={e => setSelectedFarmFilterForHistory(e.target.value)}
              style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbdcd0', fontSize: '12px' }}
            >
              <option value="All">All Plots</option>
              {farms.map(f => (
                <option key={f.farmId} value={f.farmId}>{f.farmName}</option>
              ))}
            </select>
          </div>
        </div>
        {cropHistory.filter(c => selectedFarmFilterForHistory === 'All' || c.farmId === parseInt(selectedFarmFilterForHistory)).length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
            {cropHistory.filter(c => selectedFarmFilterForHistory === 'All' || c.farmId === parseInt(selectedFarmFilterForHistory)).map((crop, idx) => {
              const associatedFarm = farms.find(f => f.farmId === crop.farmId);
              return (
                <div key={idx} style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h5 style={{ fontSize: '14.5px', fontWeight: '700', margin: 0 }}>{crop.cropName}</h5>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Plot: {associatedFarm ? associatedFarm.farmName : `Plot #${crop.farmId}`}
                      </span>
                    </div>
                    <span className={`badge badge-${crop.status.toLowerCase()}`}>{crop.status}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <p style={{ margin: '0 0 4px 0' }}><strong>Planted Date:</strong> {crop.plantedDate}</p>
                    <p style={{ margin: '0 0 4px 0' }}><strong>Cycle Duration:</strong> {crop.duration} Days</p>
                    {crop.status === 'HARVESTED' && <p style={{ margin: 0 }}><strong>Final Yield:</strong> <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{crop.yield} Tons</span></p>}
                    {crop.status === 'FAILED' && <p style={{ color: 'var(--danger)', margin: 0 }}><strong>Description:</strong> {crop.description || 'Growth failed'}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', padding: '10px 0', margin: 0 }}>No historical harvests found for this selection.</p>
        )}
      </div>
    </div>
  );
}
