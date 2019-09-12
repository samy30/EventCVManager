package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.Study;
import com.example.Backend.Repository.StudiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StudyController {
    @Autowired
    StudiesRepository studiesRepository;

    // Get All Studys
    @GetMapping("/study")
    public List<Study> getAllStudys() {
        return studiesRepository.findAll();
    }

    // Create a new Study
    @PostMapping("/study")
    public Study createStudy(@Valid @RequestBody Study study) {
        return studiesRepository.save(study);
    }

    // Get a Single Study
    @GetMapping("/study/{id}")
    public Study getStudyById(@PathVariable(value = "id") Long id) {
        return studiesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Study", "id", id));
    }

    // Update a Study
    @PutMapping("/study/{id}")
    public Study updateStudy(@PathVariable(value = "id") Long id,
                                   @Valid @RequestBody Study studyDetails) {

        Study study = studiesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Study", "id", id));

        study.setName(studyDetails.getName());
        study.setInstitution(studyDetails.getInstitution());
        study.setGraduationDate(studyDetails.getGraduationDate());
        study.setMention(studyDetails.getMention());
        study.setCv(studyDetails.getCv());

        Study updatedStudy = studiesRepository.save(study);
        return updatedStudy;
    }

    // Delete a Study
    @DeleteMapping("/study/{id}")
    public ResponseEntity<?> deleteStudy(@PathVariable(value = "id") Long id) {
        Study study = studiesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Study", "id", id));

        studiesRepository.delete(study);

        return ResponseEntity.ok().build();
    }
}
