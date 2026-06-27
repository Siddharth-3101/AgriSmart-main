import React, { useState } from 'react';

export default function Login({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  regForm,
  setRegForm,
  handleLogin,
  handleRegister,
  errorMsg,
  successMsg,
  setErrorMsg,
  setSuccessMsg
}) {
  const [showRegister, setShowRegister] = useState(false);

  const onRegisterToggle = (reg) => {
    setErrorMsg('');
    setSuccessMsg('');
    setShowRegister(reg);
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div className="glass-card" style={{ maxWidth: '460px', width: '100%', padding: '36px', background: '#ffffff', borderRadius: '16px', border: '1px solid #c8dfd2' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)' }}>
            {showRegister ? 'Create Agricultural Account' : 'Sign in to AgriSmart'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginTop: '4px' }}>
            Farmer Advisory, Weather & Schemes
          </p>
        </div>

        {errorMsg && <div style={{ background: '#fee2e2', border: '1px solid var(--danger)', padding: '12px', borderRadius: '8px', color: 'var(--danger)', fontSize: '13px', marginBottom: '16px' }}>{errorMsg}</div>}
        {successMsg && <div style={{ background: '#dcfce7', border: '1px solid var(--primary)', padding: '12px', borderRadius: '8px', color: 'var(--primary)', fontSize: '13px', marginBottom: '16px' }}>{successMsg}</div>}

        {showRegister ? (
          <form onSubmit={handleRegister}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input type="text" placeholder="Full Name" required value={regForm.name} onChange={e => setRegForm({...regForm, name: e.target.value})} />
              <input type="text" placeholder="Mobile Number" required value={regForm.phone} onChange={e => setRegForm({...regForm, phone: e.target.value})} />
              <input type="email" placeholder="Email Address" required value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} />
              <input type="password" placeholder="Password" required value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Platform Role</label>
                <select value={regForm.role} onChange={e => setRegForm({...regForm, role: e.target.value, district: '', state: '', departmentId: ''})}>
                  <option value="FARMER">Farmer</option>
                  <option value="OFFICER">Agriculture Officer</option>
                </select>
              </div>

              {/* Farmer Role Specific Fields */}
              {regForm.role === 'FARMER' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input type="text" placeholder="District" required value={regForm.district} onChange={e => setRegForm({...regForm, district: e.target.value})} />
                  <input type="text" placeholder="State" required value={regForm.state} onChange={e => setRegForm({...regForm, state: e.target.value})} />
                </div>
              )}

              {/* Officer Role Specific Fields */}
              {regForm.role === 'OFFICER' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input type="text" placeholder="Department ID" required value={regForm.departmentId} onChange={e => setRegForm({...regForm, departmentId: e.target.value})} />
                  <input type="text" placeholder="District" required value={regForm.district} onChange={e => setRegForm({...regForm, district: e.target.value})} />
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Register Account</button>
              <button type="button" className="btn-secondary" onClick={() => onRegisterToggle(false)}>Back to Login</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Email / Phone" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              <input type="password" placeholder="Password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              
              <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Log In</button>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <button type="button" style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }} onClick={() => onRegisterToggle(true)}>
                  Create account
                </button>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  Demo: password
                </span>
              </div>
            </div>
          </form>
        )}

        <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          Default test logins:<br />
          Farmer: <strong>farmer@agrismart.com</strong> or <strong>9876543210</strong><br />
          Officer: <strong>officer@agrismart.com</strong><br />
          Admin: <strong>admin@agrismart.com</strong>
        </div>
      </div>
    </div>
  );
}
