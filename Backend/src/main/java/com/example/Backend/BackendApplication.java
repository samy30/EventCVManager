package com.example.Backend;

import com.example.Backend.Model.*;
import com.example.Backend.Repository.CVRepository;
import com.example.Backend.Repository.JobRepository;
import com.example.Backend.Repository.RoleRepository;
import com.example.Backend.Repository.UserRepository;
import com.example.Backend.Service.FileService;
import com.example.Backend.Service.InterviewService;
import com.example.Backend.Service.JsonResumeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedDatabase(
			RoleRepository roleRepository,
			UserRepository userRepository,
			JobRepository jobRepository,
			PasswordEncoder passwordEncoder,
			CVRepository cvRepository,
			JsonResumeService jsonResumeService,
			InterviewService interviewService,
			FileService fileService
	) {
		return (args) -> {

			User enterprise = new User("Enterprise", "google", "entreprise@gmail.com", passwordEncoder.encode("password"));
			User[] jobSeekers = new User[10];
			for(int i = 0; i < 10; i++) {
				jobSeekers[i] = userRepository.save(new User(
						"Miras" + i,
						"user" + i,
						"ayedmiras" + i + "@gmail.com",
						passwordEncoder.encode("password")
						)
				);
			}

			Job architectJob = jobRepository.save(new Job("Architect"));
			Job softwareEngineerJob = jobRepository.save(new Job("Software Engineer"));
			Job designerJob = jobRepository.save(new Job("Designer"));
			Job bioTechnologyJob = jobRepository.save(new Job("BioTechnology Engineer"));
			Job machineLearningJob = jobRepository.save(new Job("MachineLearning Engineer"));

			JobOffer architectJobOffer = new JobOffer(architectJob, new String[] {"architectSkill"}, "Tunis", enterprise);
			enterprise.getJobOffers().add(architectJobOffer);
			JobOffer softwareEngineerJobOffer = new JobOffer(softwareEngineerJob, new String[] {"softwareEngineerSkill"}, "Tunis", enterprise);
			enterprise.getJobOffers().add(softwareEngineerJobOffer);
			JobOffer designerJobOffer = new JobOffer(designerJob, new String[] {"designerJobSkill"}, "Tunis", enterprise);
			enterprise.getJobOffers().add(designerJobOffer);
			JobOffer bioTechnologyJobOffer = new JobOffer(bioTechnologyJob, new String[] {"bioTechnologyJobSkill"}, "Tunis", enterprise);
			enterprise.getJobOffers().add(bioTechnologyJobOffer);
			JobOffer machineLearningJobOffer = new JobOffer(machineLearningJob, new String[] {"machineLearningJobSkill"}, "Tunis", enterprise);
			enterprise.getJobOffers().add(machineLearningJobOffer);

			JobDemande[] jobRequests = new JobDemande[10];
			jobRequests[0] = new JobDemande(architectJobOffer, null, enterprise, jobSeekers[0], Status.PENDING);
			jobRequests[1] = new JobDemande(architectJobOffer, null, enterprise, jobSeekers[1], Status.PENDING);
			jobRequests[2] = new JobDemande(architectJobOffer, null, enterprise, jobSeekers[2], Status.PENDING);
			architectJobOffer.getJobRequests().add(jobRequests[0]);
			architectJobOffer.getJobRequests().add(jobRequests[1]);
			architectJobOffer.getJobRequests().add(jobRequests[2]);
			jobRequests[3] = new JobDemande(softwareEngineerJobOffer, null, enterprise, jobSeekers[3], Status.PENDING);
			jobRequests[4] = new JobDemande(softwareEngineerJobOffer, null, enterprise, jobSeekers[4], Status.PENDING);
			softwareEngineerJobOffer.getJobRequests().add(jobRequests[3]);
			softwareEngineerJobOffer.getJobRequests().add(jobRequests[4]);
			jobRequests[5] = new JobDemande(designerJobOffer, null, enterprise, jobSeekers[5], Status.PENDING);
			designerJobOffer.getJobRequests().add(jobRequests[5]);
			jobRequests[6] = new JobDemande(bioTechnologyJobOffer, null, enterprise, jobSeekers[6], Status.PENDING);
			jobRequests[7] = new JobDemande(bioTechnologyJobOffer, null, enterprise, jobSeekers[7], Status.PENDING);
			bioTechnologyJobOffer.getJobRequests().add(jobRequests[6]);
			bioTechnologyJobOffer.getJobRequests().add(jobRequests[7]);
			jobRequests[8] = new JobDemande(machineLearningJobOffer, null, enterprise, jobSeekers[8], Status.PENDING);
			jobRequests[9] = new JobDemande(machineLearningJobOffer, null, enterprise, jobSeekers[9], Status.PENDING);
			machineLearningJobOffer.getJobRequests().add(jobRequests[8]);
			machineLearningJobOffer.getJobRequests().add(jobRequests[9]);

			Arrays.stream(jobRequests)
					.forEach(jobRequest -> {
						jobRequest.setStatus(Status.ACCEPTED);
						jobRequest.setConfirmedByUser(true);
					});
			jobRequests[0].setStatus(Status.REFUSED);

			Role enterpriseRole = new Role(RoleName.ROLE_ENTERPRISE);
			enterprise.getRoles().add(enterpriseRole);
			Role userRole = new Role(RoleName.ROLE_USER);
			jobSeekers[1].getRoles().add(userRole);
			roleRepository.save(userRole);
			jobSeekers[1] = userRepository.save(jobSeekers[1]);
			roleRepository.save(enterpriseRole);
			roleRepository.save(new Role(RoleName.ROLE_ADMIN));

			CV resume = CV.builder()
					.address("My address, Tunis, Tunisa")
					.email("email@gmail.com")
					.firstName("myFirstName")
					.lastName("myLastName")
					.phone("+21611111111")
					.build();

			Set<Interest> interests = new HashSet<>();
			for(int i = 0; i < 3; i++) {
				interests.add(Interest.builder()
						.description("MyInterestDescription" + i)
						.name("SuperInterest" + i)
						.cv(resume)
						.build()
				);
			}
			Set<ProfessionalExperience> professionalExperiences = new HashSet<>();
			for(int i = 0; i < 3; i++) {
				professionalExperiences.add(ProfessionalExperience.builder()
						.enterprise("MyEntreprise" + i)
						.startingDate("201" + (6 + i) + "-01-01")
						.finishingDate("201" + (6 + i + 1) + "-01-01")
						.post("Software Developer")
						.description("I am very professional")
						.cv(resume)
						.build()
				);
			}
			Set<Language> languages = new HashSet<>();
			for(int i = 0; i < 3; i++) {
				languages.add(Language.builder()
						.name("language" + i)
						.level("5L")
						.cv(resume)
						.build()
				);
			}
			Set<SocialMedia> socialMedia = new HashSet<>();
			socialMedia.add(SocialMedia.builder()
					.path("myPath" )
					.type("facebook")
					.cv(resume)
					.build()
			);
			socialMedia.add(SocialMedia.builder()
					.path("myPath" )
					.type("twitter")
					.cv(resume)
					.build()
			);
			socialMedia.add(SocialMedia.builder()
					.path("myPath" )
					.type("linkedin")
					.cv(resume)
					.build())
			;
			Set<Software> softwares = new HashSet<>();
			for(int i = 0; i < 3; i++) {
				softwares.add(Software.builder()
						.name("mySoftware" + i)
						.level("5L")
						.cv(resume)
						.build()
				);
			}
			Set<Study> studies = new HashSet<>();
			for(int i = 0; i < 3; i++) {
				studies.add(Study.builder()
						.name("myStudy" + i)
						.graduationDate("201" + (6 + i) + "-01-01")
						.institution("myInstitution" + i)
						.mention("HyperGood")
						.cv(resume)
						.build()
				);
			}
			resume.setInterests(interests);
			resume.setLanguages(languages);
			resume.setProfessionalExperiences(professionalExperiences);
			resume.setSocialMedias(socialMedia);
			resume.setSoftwares(softwares);
			resume.setStudies(studies);
			resume.setNationality("Tunisian");
			resume.setDrivingLicence(Boolean.TRUE);
			resume.setPhoto("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");
			resume.setJobRequest(jobRequests[1]);
			jobRequests[1].setCv(resume);
			userRepository.save(enterprise);

			interviewService.createInterviewCalendar();
			interviewService.getInterviewSessions()
					.stream()
					.forEach(interviewSessionPayload -> System.out.println(interviewSessionPayload.toString()));
			interviewService.getEnterpriseInterviewSessions("google")
					.stream()
					.forEach(interviewSessionPayload -> {
						System.out.println(interviewSessionPayload.toString());
					});
			interviewService.getCandidateInterviewSessions("user1")
					.stream()
					.forEach(interviewSessionPayload -> {
						System.out.println(interviewSessionPayload.toString());
					});
			fileService.saveBase64EncodedImage(1L, resume.getPhoto());
			jsonResumeService.generateResume(1L);
		};
	}
}
