package com.chillbilling.config;

import com.chillbilling.repository.UserRepository;
import com.chillbilling.service.TokenService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableMethodSecurity(prePostEnabled = true) // enables @PreAuthorize on your controllers
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationEntryPoint unauthorizedHandler() {
        return (request, response, ex) -> {
            response.setStatus(401);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Unauthorized\"}");
        };
    }

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http,
            TokenService tokenService,
            UserRepository userRepository
    ) throws Exception {

        // JWT filter
        var jwtFilter = new JwtAuthFilter(tokenService, userRepository);

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(req -> {
                var c = new CorsConfiguration();
                c.setAllowedOrigins(List.of("*")); // tighten in production
                c.setAllowedMethods(List.of("GET","POST","PUT","DELETE","PATCH","OPTIONS"));
                c.setAllowedHeaders(List.of("*"));
                c.setExposedHeaders(List.of("Authorization"));
                return c;
            }))
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(eh -> eh.authenticationEntryPoint(unauthorizedHandler()))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/login",
                		"/api/auth/register",
                        "/api/auth/verify",
                        "/api/auth/forgot-password",
                        "/api/auth/reset-password",
                        "/api/auth/notify",
                        "/api/payments/webhook").permitAll()

                // (Optional) allow actuator/health if you use it:
                //.requestMatchers("/actuator/health").permitAll()

                // Everything else requires authentication; fine-grained rules are done via @PreAuthorize
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .httpBasic(Customizer.withDefaults()); // not used, but harmless

        return http.build();
    }
}
