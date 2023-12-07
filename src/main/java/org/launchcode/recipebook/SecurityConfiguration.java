package org.launchcode.recipebook;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/index", "/register", "/custom-login").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login
                        .loginPage("/custom-login")
                        .loginProcessingUrl("/login") // Your login processing URL
                        .defaultSuccessUrl("/dashboard") // Redirect after successful login
                        .failureUrl("/custom-login?error=true") // Redirect on login failure
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // URL to logout
                        .logoutSuccessUrl("/custom-login?logout=true") // Redirect after logout
                        .permitAll()
                )
                .httpBasic(withDefaults())
                .sessionManagement(session -> session
                        .invalidSessionUrl("/custom-login?invalidSession=true") // Redirect for an invalid session
                );

        return http.build();
    }
}
