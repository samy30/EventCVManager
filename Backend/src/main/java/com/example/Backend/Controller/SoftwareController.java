package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.Software;
import com.example.Backend.Repository.SoftwareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SoftwareController {
    @Autowired
    SoftwareRepository softwareRepository;

    // Get All Softwares
    @GetMapping("/software")
    public List<Software> getAllSoftwares() {
        return softwareRepository.findAll();
    }

    // Create a new Software
    @PostMapping("/software")
    public Software createSoftware(@Valid @RequestBody Software language) {
        return softwareRepository.save(language);
    }

    // Get a Single Software
    @GetMapping("/software/{id}")
    public Software getSoftwareById(@PathVariable(value = "id") Long id) {
        return softwareRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Software", "id", id));
    }

    // Update a Software
    @PutMapping("/software/{id}")
    public Software updateSoftware(@PathVariable(value = "id") Long id,
                                   @Valid @RequestBody Software languageDetails) {

        Software language = softwareRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Software", "id", id));

        language.setName(languageDetails.getName());
        language.setLevel(languageDetails.getLevel());
        language.setCv(languageDetails.getCv());

        Software updatedSoftware = softwareRepository.save(language);
        return updatedSoftware;
    }

    // Delete a Software
    @DeleteMapping("/software/{id}")
    public ResponseEntity<?> deleteSoftware(@PathVariable(value = "id") Long id) {
        Software language = softwareRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Software", "id", id));

        softwareRepository.delete(language);

        return ResponseEntity.ok().build();
    }
}
