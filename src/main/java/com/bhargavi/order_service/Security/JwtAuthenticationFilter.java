package com.bhargavi.order_service.Security;

import com.bhargavi.order_service.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Agar Authorization header nahi hai ya Bearer token nahi hai
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Bearer hata kar actual token nikalo
        String token = authHeader.substring(7);

        // Token se username nikalo
        String username = jwtService.extractUsername(token);

        // UserDetails load karo
        UserDetails userDetails =
                userDetailsService.loadUserByUsername(username);

        // Token validate karo
        if (jwtService.validateToken(token, userDetails)) {

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());

            // User ko authenticate karo
            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);
        }

        // Request ko next filter/controller tak bhejo
        filterChain.doFilter(request, response);
    }
}