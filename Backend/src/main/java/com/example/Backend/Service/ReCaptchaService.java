package com.example.Backend.Service;

import com.example.Backend.Util.ReCaptchaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReCaptchaService {

    @Value("${google.recaptcha.key.secret}")
    String reCaptchaSecret;

    private static final String GOOGLE_RECAPTCHA_VERIFY_URL =
            "https://www.google.com/recaptcha/api/siteverify";

    @Autowired
    RestTemplateBuilder restTemplateBuilder;

    public String verifyRecaptcha(String ip, String recaptchaResponse) {

        Map<String, String> body = new HashMap<>();
        body.put("secret", reCaptchaSecret);
        body.put("response", recaptchaResponse);
        body.put("remoteip", ip);

        ResponseEntity<Map> reCaptchaResponseEntity =
                restTemplateBuilder.build()
                        .postForEntity(GOOGLE_RECAPTCHA_VERIFY_URL +
                                        "?secret={secret}&response={response}&remoteip={remoteip}",
                                body,
                                Map.class,
                                body
                        );

        Map<String, Object> responseBody = reCaptchaResponseEntity.getBody();
        boolean reCaptchaSuccess = (Boolean)responseBody.get("success");

        if ( !reCaptchaSuccess) {
            List<String> errorCodes =
                    (List)responseBody.get("error-codes");

            String errorMessage = errorCodes.stream()
                    .map(s -> ReCaptchaUtil.RECAPTCHA_ERROR_CODE.get(s))
                    .collect(Collectors.joining(", "));

            return errorMessage;
        } else {
            return StringUtils.EMPTY;
        }
    }
}