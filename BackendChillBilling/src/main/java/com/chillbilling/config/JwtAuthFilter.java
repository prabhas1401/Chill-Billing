package com.chillbilling.config;

import com.chillbilling.entity.User;
import com.chillbilling.repository.UserRepository;
import com.chillbilling.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

public class JwtAuthFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserRepository userRepository;

    public JwtAuthFilter(TokenService tokenService, UserRepository userRepository) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            try {
                // Validate & parse token
                if (tokenService.validateToken(token)) {
                    Long userId = tokenService.getUserIdFromToken(token);
                    String role = tokenService.getRoleFromToken(token); // e.g. ADMIN/ACCOUNTANT/CUSTOMER

                    Optional<User> opt = userRepository.findById(userId);
                    if (opt.isPresent()) {
                        User user = opt.get();

                        // Build authorities as ROLE_*
                        var authority = new SimpleGrantedAuthority("ROLE_" + role);
                        var auth = new UsernamePasswordAuthenticationToken(
                                /* principal = */ user.getEmailId(),  // so auth.getName() == email (your controllers rely on this)
                                /* credentials = */ null,
                                /* authorities = */ Collections.singletonList(authority)
                        );

                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            } catch (Exception ex) {
                // If token invalid/expired, leave context unauthenticated and let entry point return 401
            }
        }

        filterChain.doFilter(request, response);
    }
}
