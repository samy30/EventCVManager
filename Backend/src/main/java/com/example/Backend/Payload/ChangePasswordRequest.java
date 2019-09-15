package com.example.Backend.Payload;

import javax.validation.constraints.NotBlank;

public class ChangePasswordRequest {
    @NotBlank
    private String password;

    @NotBlank
    private String oldPassword;

    public ChangePasswordRequest(@NotBlank String password, @NotBlank String oldPassword) {
        this.password = password;
        this.oldPassword = oldPassword;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }
}
