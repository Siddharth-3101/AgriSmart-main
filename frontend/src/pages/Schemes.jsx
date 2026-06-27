import React from 'react';
import { Search, Award } from 'lucide-react';

export default function Schemes({
  user,
  farms,
  crops,
  possessedDocs,
  handleTogglePossessedDoc,
  appliedSchemeIds,
  handleToggleApplyScheme,
  schemesSearch,
  setSchemesSearch,
  schemesCategory,
  setSchemesCategory,
  selectedScheme,
  setSelectedScheme,
  getMockSchemesRaw
}) {
  const rawSchemes = getMockSchemesRaw();
  const currentFarms = farms;
  const totalArea = currentFarms.reduce((acc, f) => acc + (parseFloat(f.area) || 0), 0);
  const hasActiveCrop = crops.some(c => c.status === 'ACTIVE');

  const matchedSchemes = rawSchemes.map(item => {
    let score = 70;
    if (user && item.state !== 'All States' && user.state !== item.state) {
      score = 0;
    } else {
      if (user && item.state !== 'All States' && user.state === item.state) score += 15;
      if (hasActiveCrop && item.eligibilityCriteria.toLowerCase().includes("crop")) score += 10;
      if (item.eligibilityCriteria.toLowerCase().includes("landholding") || item.eligibilityCriteria.toLowerCase().includes("acres")) {
        if (totalArea > 0 && totalArea <= 5.0) score += 5;
        else if (totalArea > 5.0) score -= 10;
      }
    }

    // Check required documents against possessed documents
    const requiredList = item.requiredDocuments.split(',').map(d => d.trim());
    const missingDocs = requiredList.filter(reqDoc => {
      return !possessedDocs.some(posDoc => {
        return reqDoc.toLowerCase().includes(posDoc.toLowerCase()) || posDoc.toLowerCase().includes(reqDoc.toLowerCase());
      });
    });

    // Deduct 10% match score per missing document
    let finalScore = score;
    if (finalScore > 0) {
      finalScore = Math.max(0, finalScore - (missingDocs.length * 10));
    }

    return { 
      ...item, 
      eligibilityMatch: Math.min(100, Math.max(0, finalScore)),
      missingDocs: missingDocs
    };
  }).filter(item => item.eligibilityMatch > 0);

  matchedSchemes.sort((a, b) => b.eligibilityMatch - a.eligibilityMatch);

  const appliedSchemes = matchedSchemes.filter(s => appliedSchemeIds.includes(s.schemeId));
  const recommendedSchemesFiltered = matchedSchemes.filter(s => s.eligibilityMatch >= 60 && !appliedSchemeIds.includes(s.schemeId));
  const allSchemesFiltered = matchedSchemes.filter(s => {
    const sMatch = s.schemeName.toLowerCase().includes(schemesSearch.toLowerCase());
    const cMatch = schemesCategory === 'All' || s.category === schemesCategory;
    return sMatch && cMatch;
  });

  if (selectedScheme) {
    const isApplied = appliedSchemeIds.includes(selectedScheme.schemeId);
    return (
      <div className="glass-card" style={{ animation: 'fadeIn 0.3s ease', textAlign: 'left' }}>
        <button onClick={() => setSelectedScheme(null)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', marginBottom: '20px' }}>← Back to Schemes</button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>{selectedScheme.schemeName}</h3>
            <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '16px' }}>Match: {selectedScheme.eligibilityMatch}%</span>
          </div>

          <p style={{ margin: '4px 0 0 0' }}><strong>Category :</strong> {selectedScheme.category}</p>
          <p style={{ margin: '4px 0 0 0' }}><strong>Benefits :</strong> <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{selectedScheme.benefits}</span></p>
          <p style={{ margin: '4px 0 0 0' }}><strong>Eligibility :</strong> {selectedScheme.eligibilityCriteria}</p>
          
          <div style={{ background: '#f4faf6', padding: '16px', borderRadius: '8px', border: '1px solid #cbdcd0', marginTop: '10px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: 'var(--primary)', margin: 0 }}>Required Documents</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-main)', lineHeight: '1.6', marginTop: '8px', marginBottom: 0 }}>
              {selectedScheme.requiredDocuments.split(',').map((doc, idx) => {
                const isMissing = selectedScheme.missingDocs && selectedScheme.missingDocs.some(md => md.toLowerCase() === doc.trim().toLowerCase());
                return (
                  <li key={idx} style={{ color: isMissing ? '#dc2626' : 'var(--text-main)', fontWeight: isMissing ? '700' : 'normal' }}>
                    {isMissing ? '✗' : '✓'} {doc.trim()} {isMissing ? '(Missing from your checklist)' : '(Possessed)'}
                  </li>
                );
              })}
            </ul>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{selectedScheme.description}</p>

          <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
            <a href={selectedScheme.officialLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none', padding: '12px 24px' }}>
              Apply on Official Website
            </a>
            <button 
              onClick={() => handleToggleApplyScheme(selectedScheme.schemeId)} 
              className="btn-secondary" 
              style={{ borderColor: isApplied ? 'var(--danger)' : 'var(--primary)', color: isApplied ? 'var(--danger)' : 'var(--primary)' }}
            >
              {isApplied ? 'Revoke Application' : 'Mark as Applied'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '30px', alignItems: 'start', animation: 'fadeIn 0.3s ease' }}>
      {/* Left Column: Filter Sidebar & Documents Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Documents Checklist Card */}
        <div className="glass-card" style={{ padding: '20px', textAlign: 'left' }}>
          <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', margin: 0 }}>
            Documents Checklist
          </h4>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.4', marginTop: '6px' }}>
            Check documents you possess to filter schemes and check matching eligibility:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Aadhaar Card', 'Land Records', 'Bank Account Details', 'Land Possession Certificate', 'Sowing Certificate'].map(doc => {
              const checked = possessedDocs.includes(doc);
              return (
                <label key={doc} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-main)', cursor: 'pointer', fontWeight: '600' }}>
                  <input 
                    type="checkbox" 
                    checked={checked} 
                    onChange={() => handleTogglePossessedDoc(doc)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>{doc}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Scheme Category Filter Card */}
        <div className="glass-card" style={{ padding: '20px', textAlign: 'left' }}>
          <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--primary)', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', margin: 0 }}>
            Scheme Category
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            {['All', 'Subsidies', 'Insurance', 'Loans', 'Financial Assistance'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setSchemesCategory(cat)}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: schemesCategory === cat ? 'var(--primary)' : 'transparent',
                  background: schemesCategory === cat ? '#e2f3e9' : 'transparent',
                  color: schemesCategory === cat ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Search Results, Applied & Recommended Lists */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Search bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbdcd0', width: '100%' }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search schemes by name..." 
            value={schemesSearch} 
            onChange={e => setSchemesSearch(e.target.value)} 
            style={{ border: 'none', padding: 0, fontSize: '14.5px', width: '100%', outline: 'none' }}
          />
        </div>

        {/* My Applied Schemes */}
        <div className="glass-card" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', margin: 0 }}>
            My Applied Schemes ({appliedSchemes.length})
          </h3>
          {appliedSchemes.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '16px' }}>
              {appliedSchemes.map((scheme, idx) => (
                <div key={idx} style={{ background: '#f4faf6', padding: '16px', borderRadius: '12px', border: '1px solid #cbdcd0', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '10px', background: '#e2f3e9', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                      {scheme.category}
                    </span>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', marginTop: '10px', color: 'var(--text-main)', margin: '10px 0 0 0' }}>{scheme.schemeName}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', margin: '4px 0 0 0' }}>Benefits: {scheme.benefits}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => setSelectedScheme(scheme)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', flexGrow: 1 }}>Details</button>
                    <button onClick={() => handleToggleApplyScheme(scheme.schemeId)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--danger)', borderColor: 'var(--border-color)' }}>Revoke</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', margin: '16px 0 0 0' }}>
              No schemes currently marked as applied. Browse recommendations or all schemes below to mark them as applied.
            </p>
          )}
        </div>

        {/* Eligible Recommendations */}
        <div className="glass-card" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', margin: 0 }}>
            Eligible Scheme Recommendations
          </h3>
          {recommendedSchemesFiltered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '16px' }}>
              {recommendedSchemesFiltered.map((scheme, idx) => (
                <div key={idx} style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', background: '#e2f3e9', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                        {scheme.category}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '800' }}>
                        Match: {scheme.eligibilityMatch}%
                      </span>
                    </div>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', marginTop: '10px', color: 'var(--text-main)', margin: '10px 0 0 0' }}>{scheme.schemeName}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', margin: '4px 0 0 0' }}>{scheme.description}</p>
                    
                    {scheme.missingDocs && scheme.missingDocs.length > 0 && (
                      <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', color: '#b45309', marginTop: '8px', fontWeight: '600' }}>
                        ⚠️ Missing: {scheme.missingDocs.join(', ')}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => setSelectedScheme(scheme)} className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', flexGrow: 1 }}>View & Apply</button>
                    <button onClick={() => handleToggleApplyScheme(scheme.schemeId)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Mark Applied</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', margin: '16px 0 0 0' }}>
              No scheme recommendations matched your profile filters. Make sure your profile details are set correctly under Profile.
            </p>
          )}
        </div>

        {/* Browse All Schemes */}
        <div className="glass-card" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', margin: 0 }}>
            Browse All Schemes
          </h3>
          {allSchemesFiltered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '16px' }}>
              {allSchemesFiltered.map((scheme, idx) => {
                const isApplied = appliedSchemeIds.includes(scheme.schemeId);
                return (
                  <div key={idx} style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', background: '#e2f3e9', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                          {scheme.category}
                        </span>
                        {isApplied && (
                          <span style={{ fontSize: '10px', background: '#dcfce7', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                            Applied
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: '700', marginTop: '10px', color: 'var(--text-main)', margin: '10px 0 0 0' }}>{scheme.schemeName}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', margin: '4px 0 0 0' }}>{scheme.description}</p>
                      
                      {scheme.missingDocs && scheme.missingDocs.length > 0 && (
                        <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', color: '#b45309', marginTop: '8px', fontWeight: '600' }}>
                          ⚠️ Missing: {scheme.missingDocs.join(', ')}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button onClick={() => setSelectedScheme(scheme)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', flexGrow: 1 }}>Details</button>
                      <button 
                        onClick={() => handleToggleApplyScheme(scheme.schemeId)} 
                        className="btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '12px', color: isApplied ? 'var(--danger)' : 'var(--primary)', borderColor: 'var(--border-color)' }}
                      >
                        {isApplied ? 'Revoke' : 'Mark Applied'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', margin: '16px 0 0 0' }}>No schemes match your search criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}
