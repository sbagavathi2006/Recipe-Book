package org.launchcode.recipebook.services;
import org.launchcode.recipebook.models.User;
import org.launchcode.recipebook.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import jakarta.servlet.http.HttpSession;


@Service
public class UserSessionService {

    private final String userSessionKey = "user";
    private final UserRepository userRepository;

    @Autowired
    public UserSessionService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);

        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    public void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }
}
