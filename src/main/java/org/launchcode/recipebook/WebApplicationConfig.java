package org.launchcode.recipebook;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebApplicationConfig implements WebMvcConfigurer {

    // Create spring-managed object to allow the app to access our filter
    @Bean
    public AuthenticationFilter authenticationFilter() {
        return new AuthenticationFilter();
    }

    // Register the filter with the Spring container
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor( authenticationFilter() );
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/get-user")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Content-Type", "Authorization")
                .exposedHeaders("Authorization");
    }
}
