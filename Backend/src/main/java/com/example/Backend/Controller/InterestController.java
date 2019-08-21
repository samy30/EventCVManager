package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.Interest;
import com.example.Backend.Repository.InterestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class InterestController {
    @Autowired
    InterestRepository interestRepository;

    // Get All Interests
    @GetMapping("/interest")
    public List<Interest> getAllInterests() {
        return interestRepository.findAll();
    }

    // Create a new Interest
    @PostMapping("/interest")
    public Interest createInterest(@Valid @RequestBody Interest interest) {
        return interestRepository.save(interest);
    }

    // Get a Single Interest
    @GetMapping("/interest/{id}")
    public Interest getInterestById(@PathVariable(value = "id") Long id) {
        return interestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interest", "id", id));
    }

    // Update a Interest
    @PutMapping("/interest/{id}")
    public Interest updateInterest(@PathVariable(value = "id") Long id,
                                                               @Valid @RequestBody Interest interestDetails) {

        Interest interest = interestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interest", "id", id));

        interest.setName(interestDetails.getName());
        interest.setDescription(interestDetails.getDescription());
        interest.setCv(interestDetails.getCv());

        Interest updatedInterest = interestRepository.save(interest);
        return updatedInterest;
    }

    // Delete a Interest
    @DeleteMapping("/interest/{id}")
    public ResponseEntity<?> deleteInterest(@PathVariable(value = "id") Long id) {
        Interest interest = interestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interest", "id", id));

        interestRepository.delete(interest);

        return ResponseEntity.ok().build();
    }
}
