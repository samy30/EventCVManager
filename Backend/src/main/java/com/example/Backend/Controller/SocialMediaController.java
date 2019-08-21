package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.SocialMedia;
import com.example.Backend.Repository.SocialMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SocialMediaController {
    @Autowired
    SocialMediaRepository socialMediaRepository;

    // Get All SocialMedias
    @GetMapping("/social_media")
    public List<SocialMedia> getAllSocialMedias() {
        return socialMediaRepository.findAll();
    }

    // Create a new SocialMedia
    @PostMapping("/social_media")
    public SocialMedia createSocialMedia(@Valid @RequestBody SocialMedia social_media) {
        return socialMediaRepository.save(social_media);
    }

    // Get a Single SocialMedia
    @GetMapping("/social_media/{id}")
    public SocialMedia getSocialMediaById(@PathVariable(value = "id") Long id) {
        return socialMediaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SocialMedia", "id", id));
    }

    // Update a SocialMedia
    @PutMapping("/social_media/{id}")
    public SocialMedia updateSocialMedia(@PathVariable(value = "id") Long id,
                                   @Valid @RequestBody SocialMedia social_mediaDetails) {

        SocialMedia social_media = socialMediaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SocialMedia", "id", id));

        social_media.setType(social_mediaDetails.getType());
        social_media.setPath(social_mediaDetails.getPath());
        social_media.setCv(social_mediaDetails.getCv());

        SocialMedia updatedSocialMedia = socialMediaRepository.save(social_media);
        return updatedSocialMedia;
    }

    // Delete a SocialMedia
    @DeleteMapping("/social_media/{id}")
    public ResponseEntity<?> deleteSocialMedia(@PathVariable(value = "id") Long id) {
        SocialMedia social_media = socialMediaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SocialMedia", "id", id));

        socialMediaRepository.delete(social_media);

        return ResponseEntity.ok().build();
    }
}
