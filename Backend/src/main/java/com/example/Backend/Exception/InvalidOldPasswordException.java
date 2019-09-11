package com.example.Backend.Exception;

public class InvalidOldPasswordException extends RuntimeException {

    public InvalidOldPasswordException() {
        super("Invalid Old Password");
    }
}
