package com.example.erp_system.service;

import com.example.erp_system.dtos.request.SignUpRequest;
import com.example.erp_system.dtos.request.SigninRequest;
import com.example.erp_system.dtos.response.JwtAuthenticationResponse;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SigninRequest request);
}