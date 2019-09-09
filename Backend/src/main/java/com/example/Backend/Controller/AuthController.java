package com.example.Backend.Controller;

import com.example.Backend.Exception.AppException;
import com.example.Backend.Model.Role;
import com.example.Backend.Model.RoleName;
import com.example.Backend.Model.User;
import com.example.Backend.Payload.ApiResponse;
import com.example.Backend.Payload.JwtAuthenticationResponse;
import com.example.Backend.Payload.LoginRequest;
import com.example.Backend.Payload.SignUpRequest;
import com.example.Backend.Repository.RoleRepository;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Security.JwtTokenProvider;
import com.example.Backend.Service.ReCaptchaService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    ReCaptchaService captchaService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        List<User> userList = userRepository.findAll();
        System.out.println(userList.get(0).getUsername() + " " + userList.get(0).getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(
            @Valid @RequestBody SignUpRequest signUpRequest,
            HttpServletRequest request
    ) {

        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Verify reCaptcha
        String ip = request.getRemoteAddr();
        String reCaptchaResponse = signUpRequest.getCaptchaResponse();
        String captchaVerifyMessage =
                captchaService.verifyRecaptcha(ip, reCaptchaResponse);

        if(StringUtils.isNotEmpty(captchaVerifyMessage)) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", captchaVerifyMessage);
            System.out.println(captchaVerifyMessage);
            return ResponseEntity.badRequest()
                    .body(response);
        }

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword());

        if(signUpRequest.getRole() != null) {
            if (signUpRequest.getRole().equals("ROLE_USER")) {
                user = new User(signUpRequest.getFirstName(), signUpRequest.getLastName(), signUpRequest.getAge(), signUpRequest.getGender(), signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPassword(),signUpRequest.getNotificationID());
            }
            if (signUpRequest.getRole().equals("ROLE_ENTERPRISE")) {
                user = new User(signUpRequest.getName(), signUpRequest.getDescription(), signUpRequest.getActivity(), signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPassword(),signUpRequest.getNotificationID());
            }
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));
        if(signUpRequest.getRole() != null) {
            if (signUpRequest.getRole().equals("ROLE_ENTERPRISE")) {
                userRole = roleRepository.findByName(RoleName.ROLE_ENTERPRISE)
                        .orElseThrow(() -> new AppException("User Role not set."));
            } else if (signUpRequest.getRole().equals("ROLE_ADMIN")) {
                userRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                        .orElseThrow(() -> new AppException("User Role not set."));
            }
        }


        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
