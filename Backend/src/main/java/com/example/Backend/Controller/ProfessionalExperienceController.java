package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.ProfessionalExperience;
import com.example.Backend.Repository.ProfessionalExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProfessionalExperienceController {
    @Autowired
    ProfessionalExperienceRepository professionalExperienceRepository;

    // Get All ProfessionalExperiences
    @GetMapping("/professional_experience")
    public List<ProfessionalExperience> getAllProfessionalExperiences() {
        return professionalExperienceRepository.findAll();
    }

    // Create a new ProfessionalExperience
    @PostMapping("/professional_experience")
    public ProfessionalExperience createProfessionalExperience(@Valid @RequestBody ProfessionalExperience professionalExperience) {
        return professionalExperienceRepository.save(professionalExperience);
    }

    // Get a Single ProfessionalExperience
    @GetMapping("/professional_experience/{id}")
    public ProfessionalExperience getProfessionalExperienceById(@PathVariable(value = "id") Long id) {
        return professionalExperienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProfessionalExperience", "id", id));
    }

    // Update a ProfessionalExperience
    @PutMapping("/professional_experience/{id}")
    public ProfessionalExperience updateProfessionalExperience(@PathVariable(value = "id") Long id,
                           @Valid @RequestBody ProfessionalExperience professionalExperienceDetails) {

        ProfessionalExperience professionalExperience = professionalExperienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProfessionalExperience", "id", id));

        professionalExperience.setEnterprise(professionalExperienceDetails.getEnterprise());
        professionalExperience.setPost(professionalExperienceDetails.getPost());
        professionalExperience.setStartingDate(professionalExperienceDetails.getStartingDate());
        professionalExperience.setFinishingDate(professionalExperienceDetails.getFinishingDate());
        professionalExperience.setCv(professionalExperienceDetails.getCv());

        ProfessionalExperience updatedProfessionalExperience = professionalExperienceRepository.save(professionalExperience);
        return updatedProfessionalExperience;
    }

    // Delete a ProfessionalExperience
    @DeleteMapping("/professional_experience/{id}")
    public ResponseEntity<?> deleteProfessionalExperience(@PathVariable(value = "id") Long id) {
        ProfessionalExperience professionalExperience = professionalExperienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProfessionalExperience", "id", id));

        professionalExperienceRepository.delete(professionalExperience);

        return ResponseEntity.ok().build();
    }
}
