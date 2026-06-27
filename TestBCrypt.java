import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestBCrypt {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "password";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println("Encoded hash: " + encodedPassword);
        System.out.println("Matches pre-seeded hash: " + encoder.matches(rawPassword, "$2a$10$e0MYzAdyPDkJJJGD3YnUGOJjY051Kk385Jk1h5eE7uC08H6X7i992"));
    }
}
