package com.example.Backend.Service;

import com.example.Backend.Exception.ResourceNotFoundException;
import com.example.Backend.Model.CV;
import com.example.Backend.Repository.CVRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;

@Service
public class JsonResumeService {

    @Autowired
    CVRepository cvRepository;

    final String OUTPUT_PATH = "src/output/resume/";

    public JSONObject generateResume(Long cvId) {
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new ResourceNotFoundException("CV", "id", cvId));
        JSONObject jsonResume = new JSONObject();

        // Basics Json Object
        JSONObject basicsJsonObject = new JSONObject();
        basicsJsonObject.put("name", cv.getFirstName() + " " + cv.getLastName());
        basicsJsonObject.put("email", cv.getEmail());
        JSONObject location = new JSONObject();
        location.put("address", cv.getAddress());
        basicsJsonObject.put("location", location);
        JSONArray profilesJsonArray = new JSONArray();
        cv.getSocialMedias().stream()
                .forEach(socialMedia -> {
                    JSONObject profileJsonObject = new JSONObject();
                    profileJsonObject.put("network", socialMedia.getType());
                    profileJsonObject.put("url", socialMedia.getPath());
                    profilesJsonArray.put(profileJsonObject);
                });
        basicsJsonObject.put("profiles", profilesJsonArray);
        basicsJsonObject.put("picture", "yo.jpg");
        jsonResume.put("basics", basicsJsonObject);

        // Work Json Array
        JSONArray workJsonArray = new JSONArray();
        cv.getProfessionalExperiences().stream()
                .forEach(professionalExperience -> {
                    JSONObject workJsonObject = new JSONObject();
                    workJsonObject.put("company", professionalExperience.getEnterprise());
                    workJsonObject.put("position", professionalExperience.getPost());
                    workJsonObject.put("startDate", professionalExperience.getStartingDate());
                    workJsonObject.put("endDate", professionalExperience.getFinishingDate());
                    workJsonArray.put(workJsonObject);
                });
        jsonResume.put("work", workJsonArray);

        // Education Json Array
        JSONArray educationJsonArray = new JSONArray();
        cv.getStudies().stream()
                .forEach(study -> {
                    JSONObject educationJsonObject = new JSONObject();
                    educationJsonObject.put("institution", study.getInstitution());
                    educationJsonObject.put("area", study.getName());
                    educationJsonObject.put("endDate", study.getGraduationDate());
                    educationJsonArray.put(educationJsonObject);
                });
        jsonResume.put("education", educationJsonArray);

        // Skills Json Array
        JSONArray skillsJsonArray = new JSONArray();
        cv.getSoftwares().stream()
                .forEach(software -> {
                    JSONObject skillJsonObject = new JSONObject();
                    skillJsonObject.put("name", software.getName());
                    skillJsonObject.put("level", software.getLevel().toString());
                    skillsJsonArray.put(skillJsonObject);
                });
        jsonResume.put("skills", skillsJsonArray);

        // Languages Json Array
        JSONArray languagesJsonArray = new JSONArray();
        cv.getLanguages().stream()
                .forEach(language -> {
                    JSONObject languageJsonObject = new JSONObject();
                    languageJsonObject.put("language", language.getName());
                    languageJsonObject.put("fluency", language.getLevel().toString());
                    languagesJsonArray.put(languageJsonObject);
                });
        jsonResume.put("languages", languagesJsonArray);

        // Interests Json Array
        JSONArray interestsJsonArray = new JSONArray();
        cv.getInterests().stream()
                .forEach(interest -> {
                    JSONObject interestJsonObject = new JSONObject();
                    interestJsonObject.put("name", interest.getName());
                    JSONArray keywordsJsonArray = new JSONArray();
                    keywordsJsonArray.put(interest.getDescription());
                    interestJsonObject.put("keywords", keywordsJsonArray);
                    interestsJsonArray.put(interestJsonObject);
                });
        jsonResume.put("interests", interestsJsonArray);
        System.out.println(jsonResume.toString(2));
        try {
            String fileName = "resume_" + cvId.toString();
            generateHTMLFromJson(jsonResume, fileName);
            generatePDFFromHTML(fileName);
        } catch(Exception e) {
            e.printStackTrace();
        }
        return jsonResume;
    }

    // json-resume-elegant-jali npm package should be installed
    private void generateHTMLFromJson(JSONObject jsonResume, String fileName) throws Exception {
        FileWriter file = new FileWriter(OUTPUT_PATH + "resume.json");
        file.write(jsonResume.toString(2));
        file.close();
        executeShellCommandLine(
                "jaliresume",
                "resume.json",
                fileName + ".html"
        );
    }

    // chrome-headless-render-pdf npm package should be installed
    private void generatePDFFromHTML(String filename) throws Exception {
        String htmlFilePath = getAbsoluteOutputPathDirectory() + "/" + filename + ".html";
        executeShellCommandLine(
                "chrome-headless-render-pdf",
                "--url", "file://" + htmlFilePath,
                "--pdf", filename + ".pdf"
        );
    }

    private String getAbsoluteOutputPathDirectory() {
        String currentDirectory = System.getProperty("user.dir");
        return currentDirectory + "/" + OUTPUT_PATH;
    }

    private void executeShellCommandLine(String... commands) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(commands);
        String absoluteOutputPath = getAbsoluteOutputPathDirectory();
        pb.directory(new File(absoluteOutputPath));
        Process process = pb.start();
        StringBuilder output = new StringBuilder();

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));

        String line;
        while ((line = reader.readLine()) != null) {
            output.append(line + "\n");
        }
        process.waitFor();
        System.out.println(output.toString());
    }
}