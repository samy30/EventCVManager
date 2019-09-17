package com.example.Backend.Controller;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.CV;
import com.example.Backend.Repository.CVRepository;
import com.example.Backend.Service.FileService;
import com.example.Backend.Service.JsonResumeService;
import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CVController {

    @Autowired
    private CVRepository cvRepository;

    @Autowired
    JsonResumeService jsonResumeService;

    @Autowired
    FileService fileService;

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
        CV resume = cvRepository.save(cv);
        fileService.saveBase64EncodedImage(resume.getId(), resume.getPhoto());
        return resume;
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
            CV resume = cvRepository.save(cv);
            fileService.saveBase64EncodedImage(resume.getId(), resume.getPhoto());
            return resume;
        }).orElseThrow(() -> new ResourceNotFoundException("ProfessionalExperience", "id", cvId));
    }


    @DeleteMapping("/cvs/{cvId}")
    public ResponseEntity<?> deleteCV(@PathVariable Long cvId) {
        return cvRepository.findById(cvId).map(CV -> {
            cvRepository.delete(CV);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("ProfessionalExperience", "id", cvId));
    }


    @GetMapping("/cvs/generatePdf/{resumeId}")
    public void generateResume(@PathVariable Long resumeId) {
        jsonResumeService.generateResume(resumeId);
    }

    @GetMapping(
            value = "/cvs/{resumeId}/download",
            produces = MediaType.APPLICATION_PDF_VALUE
    )
    public @ResponseBody byte[] getFile(@PathVariable Long resumeId) throws IOException {
        InputStream inputStream = new FileInputStream(new File(fileService.getResumePath(resumeId)));
        return IOUtils.toByteArray(inputStream);
    }
}
