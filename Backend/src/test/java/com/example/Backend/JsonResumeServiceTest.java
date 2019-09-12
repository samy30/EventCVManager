package com.example.Backend;

import com.example.Backend.Model.*;
import com.example.Backend.Repository.CVRepository;
import com.example.Backend.Service.JsonResumeService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RunWith(SpringRunner.class)
public class JsonResumeServiceTest {

    @TestConfiguration
    static class EmployeeServiceImplTestContextConfiguration {

        @Bean
        public JsonResumeService jsonResumeService() {
            return new JsonResumeService();
        }
    }

    @Autowired
    private JsonResumeService jsonResumeService;

    @MockBean
    private CVRepository cvRepository;

    @Before
    public void setUp() {
        Set<Interest> interests = new HashSet<>();
        for(int i = 0; i < 3; i++) {
            interests.add(Interest.builder()
                    .description("MyInterestDescription" + i)
                    .name("SuperInterest" + i)
                    .build()
            );
        }
        Set<ProfessionalExperience> professionalExperiences = new HashSet<>();
        for(int i = 0; i < 3; i++) {
            professionalExperiences.add(ProfessionalExperience.builder()
                    .enterprise("MyEntreprise" + i)
                    .startingDate(("201" + i) + "-01-01")
                    .finishingDate(("201" + (i + 1)) + "-01-01")
                    .post("Software Developer")
                    .build()
            );
        }
        Set<Language> languages = new HashSet<>();
        for(int i = 0; i < 3; i++) {
            languages.add(Language.builder()
                    .name("language" + i)
                    .level(5L)
                    .build()
            );
        }
        Set<SocialMedia> socialMedia = new HashSet<>();
        String[] socialMediaTypes = {"facebook", "twitter", "instagram"};
        for(int i = 0; i < 3; i++) {
            socialMedia.add(SocialMedia.builder()
                    .path("myPath + i")
                    .type(socialMediaTypes[i])
                    .build()
            );
        }
        Set<Software> softwares = new HashSet<>();
        for(int i = 0; i < 3; i++) {
            softwares.add(Software.builder()
                    .name("mySoftware" + i)
                    .level(5L)
                    .build()
            );
        }
        Set<Study> studies = new HashSet<>();
        for(int i = 0; i < 3; i++) {
            studies.add(Study.builder()
                    .name("myStudy" + i)
                    .graduationDate(("201" + i) + "-01-01")
                    .institution("myInstitution" + i)
                    .mention("HyperGood")
                    .build()
            );
        }
        CV resume = CV.builder()
                .address("My address, Tunis, Tunisa")
                .email("email@gmail.com")
                .firstName("myFirstName")
                .lastName("myLastName")
                .phone("+21611111111")
                .interests(interests)
                .languages(languages)
                .professionalExperiences(professionalExperiences)
                .socialMedias(socialMedia)
                .softwares(softwares)
                .studies(studies)
                .build();

        Mockito.when(cvRepository.findById(0L))
                .thenReturn(Optional.of(resume));
    }

    // write test cases here
    @Test
    public void whenGenerateResume_ReturnJsonResume() {
        jsonResumeService.generateResume(0L);
    }

}