package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.NeededJob;
import com.example.Backend.Repository.NeededJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NeededJobController {
    @Autowired
    NeededJobRepository neededJobRepository;

    // Get All NeededJobs
    @GetMapping("/neededJob")
    public List<NeededJob> getAllNeededJobs() {
        return neededJobRepository.findAll();
    }

    // Create a new NeededJob
    @PostMapping("/neededJob")
    public NeededJob createNeededJob(@Valid @RequestBody NeededJob neededJob) {
        return neededJobRepository.save(neededJob);
    }

    // Get a Single NeededJob
    @GetMapping("/neededJob/{id}")
    public NeededJob getNeededJobById(@PathVariable(value = "id") Long id) {
        return neededJobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NeededJob", "id", id));
    }

    // Update a NeededJob
    @PutMapping("/neededJob/{id}")
    public NeededJob updateNeededJob(@PathVariable(value = "id") Long id,
                                   @Valid @RequestBody NeededJob neededJobDetails) {

        NeededJob neededJob = neededJobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NeededJob", "id", id));

        neededJob.setJobName(neededJobDetails.getJobName());
        neededJob.setExpired(neededJobDetails.isExpired());
        neededJob.setNumber(neededJobDetails.getNumber());

        NeededJob updatedNeededJob = neededJobRepository.save(neededJob);
        return updatedNeededJob;
    }

    // Delete a NeededJob
    @DeleteMapping("/neededJob/{id}")
    public ResponseEntity<?> deleteNeededJob(@PathVariable(value = "id") Long id) {
        NeededJob neededJob = neededJobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("NeededJob", "id", id));

        neededJobRepository.delete(neededJob);

        return ResponseEntity.ok().build();
    }
}
