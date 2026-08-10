package com.agrismart.analytics.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SchemeService {

    private final JdbcTemplate jdbcTemplate;
    public SchemeService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @org.springframework.context.event.EventListener(org.springframework.context.event.ContextRefreshedEvent.class)
    public void seedSchemesIfNecessary() {
        try {
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS schemes (" +
                "    scheme_id BIGINT AUTO_INCREMENT PRIMARY KEY," +
                "    scheme_name VARCHAR(255) NOT NULL," +
                "    category VARCHAR(100) NOT NULL," +
                "    description TEXT," +
                "    benefits VARCHAR(255)," +
                "    eligibility_criteria TEXT," +
                "    required_documents TEXT," +
                "    official_link VARCHAR(255)," +
                "    state VARCHAR(100)," +
                "    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" +
                ")");

            // After creating schemes table, also create scheme_applications table
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS scheme_applications (" +
                "application_id BIGINT AUTO_INCREMENT PRIMARY KEY," +
                "user_id BIGINT NOT NULL," +
                "scheme_id BIGINT NOT NULL," +
                "status VARCHAR(20) DEFAULT 'APPLIED'," +
                "applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
            ")");

            Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM schemes", Integer.class);
            if (count == null || count < 5) {
                jdbcTemplate.execute("TRUNCATE TABLE schemes");
                
                String insertQuery = "INSERT INTO schemes (scheme_id, scheme_name, category, description, benefits, eligibility_criteria, required_documents, official_link, state) VALUES " +
                    "(1, 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)', 'Financial Assistance', 'Income support scheme providing financial benefit to all landholding farmer families across India to buy agriculture inputs.', '₹6,000 per year in 3 equal installments', 'All landholding farmer families with cultivable land in their name.', 'Aadhaar Card, Land Records, Bank Account Details', 'https://pmkisan.gov.in', 'All States')," +
                    "(2, 'Kisan Credit Card (KCC)', 'Loans', 'Provides farmers with timely access to short-term credit loans for cultivation, crop production, and post-harvest maintenance expenses.', 'Short-term credit up to ₹3 Lakhs at low interest rate (4%)', 'All farmers, tenant farmers, and sharecroppers.', 'Aadhaar Card, Land Possession Certificate, Bank Account Details', 'https://pmkisan.gov.in/Documents/KCC.pdf', 'All States')," +
                    "(3, 'PMFBY (Pradhan Mantri Fasal Bima Yojana)', 'Insurance', 'Crop insurance scheme offering financial security to farmers against crop failure or damages caused by natural disasters, pests, or disease.', 'Comprehensive crop insurance coverage with low premium (1.5% to 5%)', 'All farmers growing notified crops in notified areas.', 'Aadhaar Card, Sowing Certificate, Land Records, Bank Passbook', 'https://pmfby.gov.in', 'All States')," +
                    "(4, 'Tamil Nadu Free Agricultural Power Scheme', 'Subsidies', 'State government initiative providing free agricultural electricity to farmers to operate pump sets for crop irrigation.', '100% free electricity supply for agricultural irrigation pumps', 'Tamil Nadu resident landholding farmers owning agricultural pump sets.', 'Aadhaar Card, Land Ownership Documents (Patta/Chitta), Pump Set details', 'https://www.tangedco.org', 'Tamil Nadu')," +
                    "(5, 'PM Kisan Maan-Dhan Yojana (PM-KMY)', 'Financial Assistance', 'A voluntary and contributory pension scheme for old age protection and social security of Small and Marginal Farmers (SMFs) owning cultivable land.', 'Minimum assured pension of ₹3,000 per month after reaching 60 years of age', 'Small and marginal farmers aged between 18 to 40 years with cultivable land up to 2 hectares.', 'Aadhaar Card, Savings Bank Account, Aadhaar-linked Mobile Number', 'https://pmkmy.gov.in', 'All States')," +
                    "(6, 'PMKSY - Per Drop More Crop (PDMC)', 'Subsidies', 'Focuses on water use efficiency at farm level through micro-irrigation technologies like drip and sprinkler irrigation systems.', 'Up to 55% subsidy for small and marginal farmers, and 45% for other farmers for micro-irrigation installation', 'All landholding farmers with access to water sources.', 'Aadhaar Card, Land Records, Electricity Bill, Drip design installation plan', 'https://pmksy.gov.in', 'All States')," +
                    "(7, 'Paramparagat Krishi Vikas Yojana (PKVY)', 'Subsidies', 'Promotes organic farming through a cluster approach and PGS certification. Supports organic farming practices and marketing.', 'Financial assistance of ₹50,000 per hectare over 3 years, with 62% provided as subsidy for organic inputs', 'Farmers formed in clusters of 20 hectares (minimum 50 farmers).', 'Aadhaar Card, Land Records, PGS Cluster Registration', 'https://pgsindia-ncof.gov.in', 'All States')," +
                    "(8, 'Soil Health Card Scheme', 'Financial Assistance', 'Assists state governments to issue soil health cards to all farmers. Provides nutrient status of soil and recommendation of fertilizers.', 'Free soil testing and customized fertilizer recommendation card every 2 years', 'All farmers owning cultivable lands in India.', 'Aadhaar Card, Soil Sample Collection Slip, Land Records', 'https://soilhealth.dac.gov.in', 'All States')," +
                    "(9, 'National Agriculture Market (e-NAM)', 'Financial Assistance', 'Pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities.', 'Direct online selling of produce to buyers across India without middlemen, getting competitive prices', 'All individual farmers, FPOs, and traders.', 'Aadhaar Card, Bank Account Details, Mobile Number', 'https://enam.gov.in', 'All States')," +
                    "(10, 'SMAM (Sub-Mission on Agricultural Mechanization)', 'Subsidies', 'Promotes agricultural mechanization by providing subsidies for buying modern agricultural machinery like tractors, rotavators, power tillers.', '40% to 50% subsidy on purchase of verified agricultural machinery', 'All landholding farmers, special preference to women and SC/ST farmers.', 'Aadhaar Card, Land Records (Patta), Bank Account Details, Machinery quotation', 'https://agrimachinery.nic.in', 'All States')," +
                    "(11, 'Punjab Free Power Scheme for Agriculture', 'Subsidies', 'State government initiative providing free electricity supply to agricultural tube wells to support irrigation for farmers in Punjab.', '100% free electricity supply for agricultural tubewells', 'Punjab resident landholding farmers owning agricultural electric pump tube wells.', 'Aadhaar Card, Electricity Connection Details, Land Ownership Certificate', 'https://www.pspcl.in', 'Punjab')," +
                    "(12, 'Haryana Bhavantar Bharpayee Yojana (BBY)', 'Financial Assistance', 'State scheme compensating farmers for price deficit of horticultural crops (vegetables & fruits) when market prices fall below floor prices.', 'Price compensation difference deposited directly to bank accounts', 'Haryana resident farmers registered on Meri Fasal Mera Byora (MFMB) portal cultivating notified crops.', 'Aadhaar Card, Meri Fasal Mera Byora Registration Slip, Bank Account', 'https://ekharid.haryana.gov.in', 'Haryana')";
                jdbcTemplate.execute(insertQuery);
                System.out.println("Seeded 12 schemes successfully into the SQL database.");
            }
        } catch (Exception e) {
            System.err.println("Failed to seed schemes: " + e.getMessage());
        }
    }

    public List<Map<String, Object>> getAllSchemes() {
        return jdbcTemplate.queryForList("SELECT * FROM schemes ORDER BY last_updated DESC");
    }

    public List<Map<String, Object>> getRecommendedSchemes(Long userId) {
        // 1. Fetch user state & district
        Map<String, Object> user;
        try {
            user = jdbcTemplate.queryForMap(
                "SELECT state, district, role FROM users WHERE user_id = ?", userId);
        } catch (Exception e) {
            return new ArrayList<>(); // User not found
        }

        String userState = user.get("state") != null ? ((String) user.get("state")).trim() : "";
        
        // 2. Fetch total farm area
        Double totalArea = 0.0;
        List<Double> areas = jdbcTemplate.queryForList(
                "SELECT area FROM farms WHERE user_id = ?", Double.class, userId);
        for (Double area : areas) {
            if (area != null) totalArea += area;
        }

        // 3. Fetch active crops list
        List<String> activeCrops = jdbcTemplate.queryForList(
                "SELECT DISTINCT c.crop_name FROM crops c JOIN farms f ON c.farm_id = f.farm_id " +
                "WHERE f.user_id = ? AND c.status = 'ACTIVE'", String.class, userId);

        // 4. Fetch all schemes
        List<Map<String, Object>> allSchemes = jdbcTemplate.queryForList("SELECT * FROM schemes");
        List<Map<String, Object>> recommended = new ArrayList<>();

        for (Map<String, Object> scheme : allSchemes) {
            String schemeState = scheme.get("state") != null ? (String) scheme.get("state") : "All States";
            String criteria = scheme.get("eligibility_criteria") != null ? (String) scheme.get("eligibility_criteria") : "";
            String category = scheme.get("category") != null ? (String) scheme.get("category") : "";
            String name = (String) scheme.get("scheme_name");

            // Eligibility Rule 1: State Match check
            boolean isStateEligible = "All States".equalsIgnoreCase(schemeState) || 
                                      userState.equalsIgnoreCase(schemeState);

            if (!isStateEligible) {
                continue; // Skip ineligible state schemes
            }

            // Calculate matching score base
            int matchPercent = 70;

            // Rule 2: State Specific premium
            if (!"All States".equalsIgnoreCase(schemeState) && userState.equalsIgnoreCase(schemeState)) {
                matchPercent += 15;
            }

            // Rule 3: Crop Match
            boolean cropMatches = false;
            for (String crop : activeCrops) {
                if (criteria.toLowerCase().contains(crop.toLowerCase())) {
                    cropMatches = true;
                    break;
                }
            }
            if (cropMatches) {
                matchPercent += 10;
            }

            // Rule 4: Land size limit matching (PM-KISAN or small holder indicators)
            if (criteria.toLowerCase().contains("landholding") || criteria.toLowerCase().contains("acres")) {
                if (totalArea > 0 && totalArea <= 5.0) {
                    matchPercent += 5;
                } else if (totalArea > 5.0) {
                    matchPercent -= 10;
                }
            }

            // Cap matching percent
            matchPercent = Math.min(100, Math.max(0, matchPercent));

            Map<String, Object> item = new HashMap<>(scheme);
            item.put("eligibilityMatch", matchPercent);
            recommended.add(item);
        }

        // Sort recommended schemes by eligibilityMatch descending
        recommended.sort((a, b) -> ((Integer) b.get("eligibilityMatch")).compareTo((Integer) a.get("eligibilityMatch")));
        return recommended;
    }

    public Map<String, Object> applyToScheme(Long userId, Long schemeId) {
        // Check if already applied
        List<Map<String, Object>> existing = jdbcTemplate.queryForList(
            "SELECT * FROM scheme_applications WHERE user_id = ? AND scheme_id = ?", userId, schemeId);
        if (!existing.isEmpty()) {
            throw new RuntimeException("Already applied to this scheme");
        }

        jdbcTemplate.update(
            "INSERT INTO scheme_applications (user_id, scheme_id) VALUES (?, ?)",
            userId, schemeId
        );
        
        return jdbcTemplate.queryForMap(
            "SELECT * FROM scheme_applications WHERE user_id = ? AND scheme_id = ? ORDER BY applied_at DESC LIMIT 1",
            userId, schemeId
        );
    }

    public void withdrawApplication(Long userId, Long schemeId) {
        jdbcTemplate.update(
            "DELETE FROM scheme_applications WHERE user_id = ? AND scheme_id = ?",
            userId, schemeId
        );
    }

    public List<Map<String, Object>> getUserApplications(Long userId) {
        return jdbcTemplate.queryForList(
            "SELECT a.*, s.scheme_name, s.category, s.benefits, s.official_link " +
            "FROM scheme_applications a " +
            "JOIN schemes s ON a.scheme_id = s.scheme_id " +
            "WHERE a.user_id = ? ORDER BY a.applied_at DESC", 
            userId
        );
    }

    public List<Map<String, Object>> getAllApplications() {
        return jdbcTemplate.queryForList(
            "SELECT a.*, s.scheme_name, s.category, u.name as user_name, u.email as user_email " +
            "FROM scheme_applications a " +
            "JOIN schemes s ON a.scheme_id = s.scheme_id " +
            "JOIN users u ON a.user_id = u.user_id " +
            "ORDER BY a.applied_at DESC"
        );
    }

    public Map<String, Object> getSchemeStats() {
        Map<String, Object> stats = new HashMap<>();
        
        Integer totalSchemes = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM schemes", Integer.class);
        Integer totalApplications = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM scheme_applications", Integer.class);
        
        List<Map<String, Object>> byStatus = jdbcTemplate.queryForList(
            "SELECT status, COUNT(*) as count FROM scheme_applications GROUP BY status"
        );
        
        stats.put("totalSchemes", totalSchemes);
        stats.put("totalApplications", totalApplications);
        stats.put("applicationsByStatus", byStatus);
        
        return stats;
    }

    public void updateApplicationStatus(Long applicationId, String status) {
        jdbcTemplate.update(
            "UPDATE scheme_applications SET status = ? WHERE application_id = ?",
            status, applicationId
        );
    }
}
