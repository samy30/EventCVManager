package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.Language;
import com.example.Backend.Repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LanguageController {
    @Autowired
    LanguageRepository languageRepository;

    // Get All Languages
    @GetMapping("/language")
    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    // Create a new Language
    @PostMapping("/language")
    public Language createLanguage(@Valid @RequestBody Language language) {
        return languageRepository.save(language);
    }

    // Get a Single Language
    @GetMapping("/language/{id}")
    public Language getLanguageById(@PathVariable(value = "id") Long id) {
        return languageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Language", "id", id));
    }

    // Update a Language
    @PutMapping("/language/{id}")
    public Language updateLanguage(@PathVariable(value = "id") Long id,
                                                               @Valid @RequestBody Language languageDetails) {

        Language language = languageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Language", "id", id));

        language.setName(languageDetails.getName());
        language.setLevel(languageDetails.getLevel());
        language.setCv(languageDetails.getCv());

        Language updatedLanguage = languageRepository.save(language);
        return updatedLanguage;
    }

    // Delete a Language
    @DeleteMapping("/language/{id}")
    public ResponseEntity<?> deleteLanguage(@PathVariable(value = "id") Long id) {
        Language language = languageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Language", "id", id));

        languageRepository.delete(language);

        return ResponseEntity.ok().build();
    }
}
