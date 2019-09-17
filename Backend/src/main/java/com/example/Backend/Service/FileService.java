package com.example.Backend.Service;

import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;

@Service
public class FileService {

    final String IMAGES_OUTPUT_PATH = "src/output/images/";
    final String IMAGE_PREFIX = "image";
    final String RESUMES_OUTPUT_PATH = "src/output/resumes/";
    final String RESUME_PREFIX = "resume";

    public void saveBase64EncodedImage(Long resumeId, String base64EncodedImage) {
        try
        {
            //This will decode the String which is encoded by using Base64 class
            byte[] imageBytes = Base64.decodeBase64(base64EncodedImage);

            String filePath = getImagePath(resumeId);

            FileOutputStream fileOutputStream = new FileOutputStream(filePath);
            fileOutputStream.write(imageBytes);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    public String getImagePath(Long resumeId) {
        return System.getProperty("user.dir") + '/' + IMAGES_OUTPUT_PATH + IMAGE_PREFIX + resumeId + ".jpg";
    }

    public String getResumePath(Long resumeId) {
        return System.getProperty("user.dir") + '/' + RESUMES_OUTPUT_PATH + RESUME_PREFIX + resumeId + ".pdf";
    }

}
