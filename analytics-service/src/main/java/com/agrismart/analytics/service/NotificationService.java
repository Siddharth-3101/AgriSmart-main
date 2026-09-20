package com.agrismart.analytics.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.context.event.EventListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NotificationService {

    private final JdbcTemplate jdbcTemplate;

    public NotificationService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @EventListener(ContextRefreshedEvent.class)
    public void createTable() {
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS notifications (" +
            "notification_id BIGINT AUTO_INCREMENT PRIMARY KEY," +
            "title VARCHAR(255) NOT NULL," +
            "message TEXT NOT NULL," +
            "type VARCHAR(50)," +
            "priority VARCHAR(20) DEFAULT 'Normal'," +
            "target_region VARCHAR(100) DEFAULT 'All Farmers'," +
            "sender_id BIGINT," +
            "sender_name VARCHAR(100)," +
            "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
        ")");
    }

    public Map<String, Object> createNotification(String title, String message, String type, String priority, String targetRegion, Long senderId, String fallbackSenderName) {
        String senderName = fallbackSenderName;
        String officerDistrict = null;
        String officerState = null;
        if (senderId != null) {
            try {
                List<Map<String, Object>> users = jdbcTemplate.queryForList(
                    "SELECT name, district, state FROM users WHERE user_id = ?", senderId
                );
                if (!users.isEmpty()) {
                    Map<String, Object> u = users.get(0);
                    if (u.get("name") != null && !((String) u.get("name")).trim().isEmpty()) {
                        senderName = (String) u.get("name");
                    }
                    officerDistrict = (String) u.get("district");
                    officerState = (String) u.get("state");
                }
            } catch (Exception ignored) {}
        }
        if (targetRegion == null || targetRegion.trim().isEmpty()) {
            targetRegion = officerDistrict != null ? officerDistrict : (officerState != null ? officerState : "All Farmers");
        }
        jdbcTemplate.update(
            "INSERT INTO notifications (title, message, type, priority, target_region, sender_id, sender_name) VALUES (?, ?, ?, ?, ?, ?, ?)",
            title, message, type, priority, targetRegion, senderId, senderName
        );
        return jdbcTemplate.queryForMap("SELECT * FROM notifications ORDER BY notification_id DESC LIMIT 1");
    }

    public List<Map<String, Object>> getAllNotifications(Authentication authentication) {
        if (authentication != null && authentication.getCredentials() instanceof Long) {
            Long userId = (Long) authentication.getCredentials();
            try {
                List<Map<String, Object>> users = jdbcTemplate.queryForList(
                    "SELECT role, district, state FROM users WHERE user_id = ?", userId
                );
                if (!users.isEmpty()) {
                    Map<String, Object> user = users.get(0);
                    String role = (String) user.get("role");
                    String district = (String) user.get("district");
                    String state = (String) user.get("state");

                    if ("FARMER".equalsIgnoreCase(role)) {
                        String distVal = district != null ? district.trim() : "";
                        String stateVal = state != null ? state.trim() : "";
                        return jdbcTemplate.queryForList(
                            "SELECT DISTINCT n.* FROM notifications n " +
                            "LEFT JOIN users u ON n.sender_id = u.user_id " +
                            "WHERE LOWER(n.target_region) IN ('all farmers', 'all states', 'all regions') " +
                            "   OR (LENGTH(?) > 0 AND (LOWER(n.target_region) = LOWER(?) OR LOWER(u.district) = LOWER(?) OR LOWER(u.state) = LOWER(?))) " +
                            "   OR (LENGTH(?) > 0 AND (LOWER(n.target_region) = LOWER(?) OR LOWER(u.district) = LOWER(?) OR LOWER(u.state) = LOWER(?))) " +
                            "ORDER BY n.created_at DESC",
                            distVal, distVal, distVal, distVal,
                            stateVal, stateVal, stateVal, stateVal
                        );
                    }
                }
            } catch (Exception ignored) {}
        }
        return jdbcTemplate.queryForList("SELECT * FROM notifications ORDER BY created_at DESC");
    }

    public List<Map<String, Object>> getAllNotifications() {
        return getAllNotifications(null);
    }

    public void deleteNotification(Long id) {
        jdbcTemplate.update("DELETE FROM notifications WHERE notification_id = ?", id);
    }

    public Map<String, Object> getNotificationStats() {
        Map<String, Object> stats = new HashMap<>();
        
        Integer total = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM notifications", Integer.class);
        stats.put("total", total);
        
        List<Map<String, Object>> byType = jdbcTemplate.queryForList("SELECT type, COUNT(*) as count FROM notifications GROUP BY type");
        stats.put("byType", byType);
        
        List<Map<String, Object>> byPriority = jdbcTemplate.queryForList("SELECT priority, COUNT(*) as count FROM notifications GROUP BY priority");
        stats.put("byPriority", byPriority);
        
        return stats;
    }
}
