import React from 'react';
import { 
  User, 
  Settings, 
  TrendingUp, 
  Plus, 
  MapPin, 
  Trash2 
} from 'lucide-react';

export default function Profile({
  user,
  farms,
  crops,
  profileSubTab,
  setProfileSubTab,
  farmSubView,
  setFarmSubView,
  selectedFarmId,
  setSelectedFarmId,
  farmForm,
  setFarmForm,
  handleFarmSubmit,
  handleMapSearch,
  resetFarmForm,
  handleFarmEdit,
  handleFarmDelete,
  errorMsg,
  successMsg,
  profileForm,
  setProfileForm,
  handleProfileUpdate,
  passwordForm,
  setPasswordForm,
  handlePasswordChange,
  notifSettings,
  setNotifSettings,
  getRiceGrowthStage,
  getGeneralGrowthStage,
  getDynamicRecommendations,
  weather,
  showRecs,
  handleGetCropRecommendation,
  showCultivationForm,
  setShowCultivationForm,
  selectedRecCrop,
  cultivationForm,
  setCultivationForm,
  handleCultivationSubmit,
  handleStartCultivation,
  setHarvestCropId,
  handleCropFailed,
  harvestCropId,
  harvestYield,
  setHarvestYield,
  handleHarvestSubmit,
  isFirstFarmGate
}) {
  if (!user) return null;

  const totalArea = farms.reduce((acc, f) => acc + (parseFloat(f.area) || 0), 0);
  const activeCropsCount = crops.filter(c => c.status === 'ACTIVE').length;
  const completedCrops = crops.filter(c => c.status === 'HARVESTED');
  const completedCount = completedCrops.length;
  
  const activeCrop = crops.find(c => c.status === 'ACTIVE');
  let activeDays = 0;
  let activeStage = 'N/A';
  if (activeCrop) {
    activeDays = Math.floor((Date.now() - new Date(activeCrop.plantedDate)) / (1000 * 60 * 60 * 24));
    activeDays = Math.max(0, activeDays);
    activeStage = activeCrop.cropName.toLowerCase() === 'rice' 
      ? getRiceGrowthStage(activeDays)
      : getGeneralGrowthStage(activeDays, activeCrop.duration);
  }

  let bestPerformingCrop = 'No data found';
  let highestYieldVal = 0;

  if (completedCount > 0) {
    const highestCrop = [...completedCrops].sort((a, b) => b.yield - a.yield)[0];
    bestPerformingCrop = highestCrop.cropName;
    highestYieldVal = highestCrop.yield;
  }

  const yieldTrendMap = {};
  completedCrops.forEach(c => {
    const year = new Date(c.plantedDate).getFullYear();
    yieldTrendMap[year] = (yieldTrendMap[year] || 0) + (c.yield || 0);
  });
  const yieldTrendYears = Object.keys(yieldTrendMap).sort();

  const renderAddFarmForm = (isGate = false) => {
    return (
      <div style={{ textAlign: 'left' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-main)' }}>
          {isGate ? 'Register Your First Farm Plot' : 'Register New Farm Plot'}
        </h3>
        <form onSubmit={handleFarmSubmit} autoComplete="off">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Farm Name</label>
              <input type="text" placeholder="e.g. Green Valley Farm" autoComplete="off" required value={farmForm.farmName} onChange={e => setFarmForm({...farmForm, farmName: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Location (Village/Town)</label>
              <input type="text" placeholder="e.g. Coimbatore" autoComplete="off" required value={farmForm.location} onChange={e => setFarmForm({...farmForm, location: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Area (Acres)</label>
              <input type="number" step="any" placeholder="e.g. 5" autoComplete="off" required value={farmForm.area} onChange={e => setFarmForm({...farmForm, area: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Soil Type</label>
                <select value={farmForm.soilType} onChange={e => setFarmForm({...farmForm, soilType: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Clayey">Clayey</option>
                  <option value="Alluvial">Alluvial</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Water Source</label>
                <select value={farmForm.waterSource} onChange={e => setFarmForm({...farmForm, waterSource: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}>
                  <option value="Borewell">Borewell</option>
                  <option value="Canal">Canal</option>
                  <option value="Rainfed">Rainfed</option>
                  <option value="Open Well">Open Well</option>
                </select>
              </div>
            </div>

            {/* Interactive Leaflet Map Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Mark Your Land on Interactive Map (Leaflet)</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input 
                  type="text" 
                  id="map-search-input-add"
                  placeholder="Search village/town (e.g. Coimbatore)" 
                  style={{ flexGrow: 1, padding: '8px', fontSize: '13px', border: '1px solid #cbdcd0', borderRadius: '6px' }} 
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleMapSearch(e.target.value, 'add-map'); } }}
                />
                <button type="button" className="btn-primary" onClick={() => {
                  const val = document.getElementById('map-search-input-add')?.value;
                  if (val) handleMapSearch(val, 'add-map');
                }} style={{ padding: '8px 16px', fontSize: '13px' }}>Search</button>
              </div>
              
              <div id="add-map" style={{ height: '300px', width: '100%', borderRadius: '12px', border: '1px solid #c8dfd2', marginBottom: '10px' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Latitude (Optional)</label>
                <input type="number" step="any" placeholder="e.g. 11.0168" autoComplete="off" value={farmForm.latitude} onChange={e => setFarmForm({...farmForm, latitude: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Longitude (Optional)</label>
                <input type="number" step="any" placeholder="e.g. 76.9558" autoComplete="off" value={farmForm.longitude} onChange={e => setFarmForm({...farmForm, longitude: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '12px' }}>Save Farm Plot</button>
            {!isGate && (
              <button type="button" className="btn-secondary" onClick={() => setFarmSubView('list')} style={{ padding: '12px' }}>Cancel</button>
            )}
          </div>
        </form>
      </div>
    );
  };

  if (isFirstFarmGate) {
    return (
      <div className="glass-card" style={{ maxWidth: '650px', margin: '40px auto', padding: '36px', animation: 'fadeIn 0.3s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ background: '#e2f3e9', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <MapPin size={32} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>Setup Your AgriSmart Profile</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px', lineHeight: '1.5', margin: '8px 0 0 0' }}>
            To activate your agricultural dashboard and unlock real-time weather analytics, AI crop advisor, and schemes recommendations, please register your first farm plot.
          </p>
        </div>
        {errorMsg && <div style={{ background: '#fee2e2', border: '1px solid var(--danger)', padding: '12px', borderRadius: '8px', color: 'var(--danger)', fontSize: '13px', marginBottom: '16px' }}>{errorMsg}</div>}
        {renderAddFarmForm(true)}
      </div>
    );
  }

  const renderEditFarmForm = () => {
    return (
      <div style={{ textAlign: 'left' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'var(--text-main)' }}>Update Farm Plot Details</h3>
        <form onSubmit={handleFarmSubmit} autoComplete="off">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Farm Name</label>
              <input type="text" autoComplete="off" required value={farmForm.farmName} onChange={e => setFarmForm({...farmForm, farmName: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Location (Village/Town)</label>
              <input type="text" autoComplete="off" required value={farmForm.location} onChange={e => setFarmForm({...farmForm, location: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Area (Acres)</label>
              <input type="number" step="any" autoComplete="off" required value={farmForm.area} onChange={e => setFarmForm({...farmForm, area: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Soil Type</label>
                <select value={farmForm.soilType} onChange={e => setFarmForm({...farmForm, soilType: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Clayey">Clayey</option>
                  <option value="Alluvial">Alluvial</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Water Source</label>
                <select value={farmForm.waterSource} onChange={e => setFarmForm({...farmForm, waterSource: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }}>
                  <option value="Borewell">Borewell</option>
                  <option value="Canal">Canal</option>
                  <option value="Rainfed">Rainfed</option>
                  <option value="Open Well">Open Well</option>
                </select>
              </div>
            </div>

            {/* Interactive Leaflet Map Section for Editing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Mark Your Land on Interactive Map (Leaflet)</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input 
                  type="text" 
                  id="map-search-input-edit"
                  placeholder="Search village/town (e.g. Coimbatore)" 
                  style={{ flexGrow: 1, padding: '8px', fontSize: '13px', border: '1px solid #cbdcd0', borderRadius: '6px' }} 
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleMapSearch(e.target.value, 'edit-map'); } }}
                />
                <button type="button" className="btn-primary" onClick={() => {
                  const val = document.getElementById('map-search-input-edit')?.value;
                  if (val) handleMapSearch(val, 'edit-map');
                }} style={{ padding: '8px 16px', fontSize: '13px' }}>Search</button>
              </div>
              <div id="edit-map" style={{ height: '300px', width: '100%', borderRadius: '12px', border: '1px solid #c8dfd2', marginBottom: '10px' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input type="number" step="any" placeholder="Latitude" autoComplete="off" value={farmForm.latitude} onChange={e => setFarmForm({...farmForm, latitude: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
              <input type="number" step="any" placeholder="Longitude" autoComplete="off" value={farmForm.longitude} onChange={e => setFarmForm({...farmForm, longitude: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '12px' }}>Update Farm Details</button>
            <button type="button" className="btn-secondary" onClick={() => setFarmSubView('list')} style={{ padding: '12px' }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', gap: '15px', borderBottom: '2px solid var(--border-color)', marginBottom: '24px' }}>
        <button 
          onClick={() => { setProfileSubTab('insights'); setFarmSubView('list'); }}
          style={{
            padding: '10px 20px',
            fontWeight: '700',
            fontSize: '15px',
            border: 'none',
            background: 'none',
            color: profileSubTab === 'insights' ? 'var(--primary)' : 'var(--text-muted)',
            borderBottom: profileSubTab === 'insights' ? '3px solid var(--primary)' : 'none',
            cursor: 'pointer'
          }}
        >
          Farming Profile
        </button>
        {user.role === 'FARMER' && (
          <button 
            onClick={() => { setProfileSubTab('farms'); setFarmSubView('list'); }}
            style={{
              padding: '10px 20px',
              fontWeight: '700',
              fontSize: '15px',
              border: 'none',
              background: 'none',
              color: profileSubTab === 'farms' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: profileSubTab === 'farms' ? '3px solid var(--primary)' : 'none',
              cursor: 'pointer'
            }}
          >
            Manage Farm Plots
          </button>
        )}
      </div>

      {profileSubTab === 'insights' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '30px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e2f3e9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <User size={40} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>{user.name}</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px' }}>Account ID: #{user.userId}</span>
              
              <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', marginTop: '20px', paddingTop: '16px', textAlign: 'left', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ margin: 0 }}><strong>Mobile :</strong> {user.phone || 'N/A'}</p>
                <p style={{ margin: 0 }}><strong>Email :</strong> {user.email}</p>
                <p style={{ margin: 0 }}><strong>District :</strong> {user.district || 'N/A'}</p>
                <p style={{ margin: 0 }}><strong>State :</strong> {user.state || 'N/A'}</p>
                {user.createdAt && <p style={{ margin: 0 }}><strong>Member Since :</strong> {new Date(user.createdAt).toLocaleDateString([], { month: 'short', year: 'numeric' })}</p>}
              </div>
            </div>

            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}><Settings size={18} /> Settings</h3>
              
              {errorMsg && <div style={{ background: '#fee2e2', border: '1px solid var(--danger)', padding: '12px', borderRadius: '8px', color: 'var(--danger)', fontSize: '13px' }}>{errorMsg}</div>}
              {successMsg && <div style={{ background: '#dcfce7', border: '1px solid var(--primary)', padding: '12px', borderRadius: '8px', color: 'var(--primary)', fontSize: '13px' }}>{successMsg}</div>}

              <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0 }}>Update Profile Details</h4>
                <input type="text" placeholder="Full Name" required value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
                <input type="text" placeholder="Mobile" required value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
                <button type="submit" className="btn-primary" style={{ padding: '8px' }}>Save Changes</button>
              </form>

              <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0 }}>Change Account Password</h4>
                <input type="password" placeholder="New Password" required value={passwordForm.newPassword} onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
                <input type="password" placeholder="Confirm Password" required value={passwordForm.confirmPassword} onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
                <button type="submit" className="btn-secondary" style={{ padding: '8px' }}>Update Password</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', fontSize: '13px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0 }}>SMS Advisories Alert Preferences</h4>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" checked={notifSettings.smsNotif} onChange={e => setNotifSettings({...notifSettings, smsNotif: e.target.checked})} style={{ width: 'auto' }} />
                  Receive Heavy Rain Warnings (SMS)
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ background: '#f4faf6', padding: '14px', borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Farms</span>
                <h4 style={{ fontSize: '20px', fontWeight: '800', margin: '4px 0 0 0' }}>{farms.length}</h4>
              </div>
              <div style={{ background: '#f4faf6', padding: '14px', borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cultivated Area</span>
                <h4 style={{ fontSize: '20px', fontWeight: '800', margin: '4px 0 0 0' }}>{totalArea} Acres</h4>
              </div>
              <div style={{ background: '#f4faf6', padding: '14px', borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Active Crops</span>
                <h4 style={{ fontSize: '20px', fontWeight: '800', margin: '4px 0 0 0' }}>{activeCropsCount}</h4>
              </div>
              <div style={{ background: '#f4faf6', padding: '14px', borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Completed Harvests</span>
                <h4 style={{ fontSize: '20px', fontWeight: '800', margin: '4px 0 0 0' }}>{completedCount}</h4>
              </div>
            </div>

            <div className="glass-card">
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '14px', margin: 0 }}>Current Farming Activity</h3>
              {activeCrop ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '14px', marginTop: '14px' }}>
                  <p style={{ margin: 0 }}><strong>Crop Name :</strong> {activeCrop.cropName}</p>
                  <p style={{ margin: 0 }}><strong>Growth Stage :</strong> {activeStage}</p>
                  <p style={{ margin: 0 }}><strong>Days Since Planting :</strong> {activeDays} Days</p>
                  <p style={{ margin: 0 }}><strong>Expected Harvest :</strong> {activeCrop.expectedHarvestDate}</p>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '14px', margin: 0 }}>No active crops currently planted.</p>
              )}
            </div>

            <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '12px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Best Performing Crop</span>
                <p style={{ fontWeight: '700', fontSize: '14px', marginTop: '2px', margin: 0 }}>{bestPerformingCrop}</p>
              </div>
              <div style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '12px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Highest Yield</span>
                <p style={{ fontWeight: '700', fontSize: '14px', marginTop: '2px', margin: 0 }}>{highestYieldVal ? `${highestYieldVal} Tons` : 'No data found'}</p>
              </div>
            </div>

            <div className="glass-card">
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', margin: 0 }}><TrendingUp size={16} /> Yield Trends History</h3>
              {yieldTrendYears.length > 1 ? (
                <div style={{ marginTop: '16px' }}>
                  <svg viewBox="0 0 400 120" style={{ width: '100%', height: '120px' }}>
                    <line x1="20" y1="10" x2="380" y2="10" stroke="#f1f5f9" />
                    <line x1="20" y1="50" x2="380" y2="50" stroke="#f1f5f9" />
                    <line x1="20" y1="90" x2="380" y2="90" stroke="#f1f5f9" />
                    
                    {(() => {
                      const points = yieldTrendYears.map((yr, i) => {
                        const x = 50 + i * (300 / (yieldTrendYears.length - 1));
                        const val = yieldTrendMap[yr];
                        const maxVal = Math.max(...Object.values(yieldTrendMap), 1);
                        const y = 90 - (val / maxVal) * 70;
                        return { x, y, yr, val };
                      });

                      const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

                      return (
                        <>
                          <path d={pathD} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          {points.map((p, idx) => (
                            <g key={idx}>
                              <circle cx={p.x} cy={p.y} r="5" fill="#ffffff" stroke="var(--primary)" strokeWidth="3" />
                              <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--primary)">{p.val}T</text>
                              <text x={p.x} y="110" textAnchor="middle" fontSize="10" fill="var(--text-muted)">{p.yr}</text>
                            </g>
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', padding: '10px 0', marginTop: '16px', margin: 0 }}>No historical trend data found (requires harvests across multiple years).</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          {farmSubView === 'list' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => { resetFarmForm(); setFarmSubView('add'); }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={16} /> Add Farm Plot
                </button>
              </div>

              {farms.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px', textAlign: 'left' }}>
                  {farms.map((farm, idx) => (
                    <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{farm.farmName}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', margin: '4px 0 0 0' }}>Location: {farm.location}</p>
                      </div>
                      <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <p style={{ margin: 0 }}><strong>Area :</strong> {farm.area} Acres</p>
                        <p style={{ margin: 0 }}><strong>Soil :</strong> {farm.soilType}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                        <button 
                          onClick={() => { setSelectedFarmId(farm.farmId); setFarmSubView('view'); }}
                          className="btn-primary" 
                          style={{ flexGrow: 1, padding: '10px', fontSize: '14px' }}
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => { handleFarmEdit(farm); setFarmSubView('edit'); }}
                          className="btn-secondary" 
                          style={{ padding: '10px' }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleFarmDelete(farm.farmId)}
                          className="btn-secondary" 
                          style={{ color: 'var(--danger)', borderColor: 'var(--border-color)' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '60px 0', border: '2px dashed #c8dfd2', borderRadius: '16px', textAlign: 'center' }}>
                  <MapPin size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
                  <p style={{ color: 'var(--text-muted)', fontWeight: '600', margin: 0 }}>No farm plots registered yet. Click "Add Farm Plot" to begin mapping your fields.</p>
                </div>
              )}
            </div>
          )}

          {farmSubView === 'add' && renderAddFarmForm(false)}
          {farmSubView === 'edit' && renderEditFarmForm()}
          
          {farmSubView === 'view' && (() => {
            const farm = farms.find(f => f.farmId === selectedFarmId);
            if (!farm) return <p style={{ color: 'var(--text-muted)' }}>No farm details found.</p>;

            const farmCrops = crops.filter(c => c.farmId === selectedFarmId);
            const activeCrop = farmCrops.find(c => c.status === 'ACTIVE');
            const cropHistory = farmCrops.filter(c => c.status === 'HARVESTED' || c.status === 'FAILED');

            let daysSince = 0;
            let stage = 'N/A';
            let progress = 0;

            if (activeCrop) {
              const planted = new Date(activeCrop.plantedDate);
              daysSince = Math.floor((Date.now() - planted) / (1000 * 60 * 60 * 24));
              daysSince = Math.max(0, daysSince);
              stage = activeCrop.cropName.toLowerCase() === 'rice' 
                ? getRiceGrowthStage(daysSince)
                : getGeneralGrowthStage(daysSince, activeCrop.duration);
              progress = Math.min(100, Math.round((daysSince / activeCrop.duration) * 100));
            }

            const dynamicRecs = getDynamicRecommendations(farm, weather, user);

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <button onClick={() => setFarmSubView('list')} className="btn-secondary" style={{ padding: '8px 16px' }}>← Back to Farm Plots</button>
                </div>

                <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Farm Name</span>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', marginTop: '4px', margin: '4px 0 0 0' }}>{farm.farmName}</h3>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Location</span>
                    <p style={{ fontWeight: '700', marginTop: '4px', margin: '4px 0 0 0' }}>{farm.location}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Area</span>
                    <p style={{ fontWeight: '700', marginTop: '4px', margin: '4px 0 0 0' }}>{farm.area} Acres</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Soil Type</span>
                    <p style={{ fontWeight: '700', marginTop: '4px', margin: '4px 0 0 0' }}>{farm.soilType}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Water Source</span>
                    <p style={{ fontWeight: '700', marginTop: '4px', margin: '4px 0 0 0' }}>{farm.waterSource}</p>
                  </div>
                </div>

                <div className="glass-card">
                  <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px', margin: 0 }}>Active Crop Cultivation</h3>
                  {activeCrop ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <h4 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>{activeCrop.cropName}</h4>
                          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px', margin: '4px 0 0 0' }}>Growth Stage: <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{stage}</span></p>
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                          <p style={{ margin: '0 0 4px 0' }}><strong>Planting Date :</strong> {activeCrop.plantedDate}</p>
                          <p style={{ margin: '0 0 4px 0' }}><strong>Days Since Planting :</strong> {daysSince} Days</p>
                          <p style={{ margin: 0 }}><strong>Expected Harvest :</strong> {activeCrop.expectedHarvestDate}</p>
                        </div>
                      </div>

                      <div style={{ marginTop: '10px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Cultivation Duration Progress ({progress}%)</span>
                        <div style={{ height: '12px', background: '#e2f3e9', borderRadius: '6px', overflow: 'hidden' }}>
                          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)' }}></div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '14px', marginTop: '16px' }}>
                        <button onClick={() => setHarvestCropId(activeCrop.cropId)} className="btn-primary" style={{ flexGrow: 1 }}>Mark as Harvested</button>
                        <button onClick={() => handleCropFailed(activeCrop.cropId)} className="btn-secondary" style={{ color: 'var(--danger)', borderColor: 'var(--border-color)' }}>Mark as Failed</button>
                      </div>

                      {harvestCropId === activeCrop.cropId && (
                        <form onSubmit={handleHarvestSubmit} style={{ marginTop: '16px', background: '#f4faf6', padding: '20px', borderRadius: '12px', border: '1px solid #c8dfd2' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', margin: 0 }}>Enter Harvest Yield</h4>
                          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <input type="number" step="any" placeholder="Yield (e.g. 4.5 Tons)" required value={harvestYield} onChange={e => setHarvestYield(e.target.value)} style={{ flexGrow: 1, padding: '10px', border: '1px solid #cbdcd0', borderRadius: '6px' }} />
                            <button type="submit" className="btn-primary">Save Harvest</button>
                            <button type="button" className="btn-secondary" onClick={() => setHarvestCropId(null)}>Cancel</button>
                          </div>
                        </form>
                      )}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '30px 0' }}>
                      <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '16px', margin: 0 }}>No Active Crop Cultivated</p>
                      
                      {!showRecs ? (
                        <button onClick={handleGetCropRecommendation} className="btn-primary" style={{ marginTop: '16px' }}>Get AI Crop Recommendations</button>
                      ) : (
                        <div style={{ background: '#f4faf6', padding: '20px', borderRadius: '12px', border: '1px solid #c8dfd2', marginTop: '16px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', color: 'var(--primary)', margin: 0 }}>Recommended Crops (Based on Soil & Climate)</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px', margin: '12px auto 0 auto', textAlign: 'left' }}>
                            {dynamicRecs.map((rec, i) => (
                              <div key={i} style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbdcd0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <strong style={{ fontSize: '14.5px', color: 'var(--text-main)' }}>{rec.crop}</strong>
                                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>{rec.reason}</span>
                                </div>
                                <button onClick={() => handleStartCultivation(rec.crop)} className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                                  Select
                                </button>
                              </div>
                            ))}
                          </div>
                          
                          <div style={{ marginTop: '20px', borderTop: '1px solid #cbdcd0', paddingTop: '15px' }}>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', margin: 0 }}>Or cultivate any other crop of your preference:</p>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
                              {['Wheat', 'Rice', 'Sugarcane', 'Cotton', 'Maize', 'Groundnut', 'Millet', 'Pulses', 'Mustard'].map((c, idx) => (
                                <button key={idx} onClick={() => handleStartCultivation(c)} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12.5px' }}>
                                  + {c}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {showCultivationForm && (
                        <form onSubmit={handleCultivationSubmit} style={{ marginTop: '20px', background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #c8dfd2', textAlign: 'left' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)', margin: 0 }}>Start Cultivation: {selectedRecCrop}</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                            <div>
                              <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Planting Date</label>
                              <input type="date" required value={cultivationForm.plantingDate} onChange={e => setCultivationForm({...cultivationForm, plantingDate: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
                            </div>
                            <div>
                              <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Growth Duration (Days)</label>
                              <input type="number" required value={cultivationForm.duration} onChange={e => setCultivationForm({...cultivationForm, duration: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbdcd0' }} />
                            </div>
                            <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '10px' }}>Start Cultivation</button>
                            <button type="button" className="btn-secondary" onClick={() => setShowCultivationForm(false)} style={{ padding: '10px' }}>Cancel</button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>

                <div className="glass-card">
                  <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px', margin: 0 }}>Crop History</h3>
                  {cropHistory.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                      {cropHistory.map((ch, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                          <div>
                            <h4 style={{ fontSize: '15px', fontWeight: '700', margin: 0 }}>{ch.cropName}</h4>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Planted: {ch.plantedDate}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '14px', fontWeight: '700' }}>{ch.yield ? `${ch.yield} Tons` : '0 Tons'}</span>
                            <span className={`badge badge-${ch.status.toLowerCase()}`} style={{ display: 'block', fontSize: '9px', marginTop: '4px' }}>{ch.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginTop: '16px', margin: 0 }}>No historical crops data found.</p>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
