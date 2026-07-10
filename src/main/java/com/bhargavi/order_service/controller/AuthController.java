package com.bhargavi.order_service.controller;

import com.bhargavi.order_service.dto.LoginRequest;
import com.bhargavi.order_service.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/token")
    public String getToken() {
        return jwtService.generateToken("bhargavi");
        //return "Hello JWT";
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        return jwtService.generateToken(request.getUsername());
    }
    @GetMapping("/test")
    public String test() {
        return "Auth Controller Working";
    }

}