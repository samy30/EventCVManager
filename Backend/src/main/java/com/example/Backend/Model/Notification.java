package com.example.Backend.Model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "notifications")
public class Notification extends AuditModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String response;


}
