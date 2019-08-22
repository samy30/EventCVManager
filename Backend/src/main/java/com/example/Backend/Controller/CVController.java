package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.CV;
import com.example.Backend.Repository.CVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CVController {
    @Autowired
    private CVRepository cvRepository;

    @GetMapping("/cvs")
    public List<CV> getAllCVs() {
        return cvRepository.findAll();
    }

    @GetMapping("/cvs/{id}")
    public CV getCVById(@PathVariable(value = "id") Long id) {
        return cvRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CV", "id", id));
    }

    @PostMapping("/cvs")
    public CV createCV(@Valid @RequestBody CV cv) {
        return cvRepository.save(cv);
    }

    @PutMapping("/cvs/{cvId}")
    public CV updateCV(@PathVariable Long cvId, @Valid @RequestBody CV cvRequest) {
        return cvRepository.findById(cvId).map(cv -> {
            cv.setFirstName(cvRequest.getFirstName());
            cv.setLastName(cvRequest.getLastName());
            cv.setAddress(cvRequest.getAddress());
            cv.setEmail(cvRequest.getEmail());
            cv.setPhone(cvRequest.getPhone());
            cv.setPhoto(cvRequest.getPhoto());
            cv.setProfessionalExperiences(cvRequest.getProfessionalExperiences());
            return cvRepository.save(cv);
        }).orElseThrow(() -> new ResourceNotFoundException("ProfessionalExperience", "id", cvId));
    }


    @DeleteMapping("/cvs/{cvId}")
    public ResponseEntity<?> deleteCV(@PathVariable Long cvId) {
        return cvRepository.findById(cvId).map(CV -> {
            cvRepository.delete(CV);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("ProfessionalExperience", "id", cvId));
    }
}
