package com.example.Backend;

import com.example.Backend.Model.*;
import com.example.Backend.Repository.CVRepository;
import com.example.Backend.Repository.JobRepository;
import com.example.Backend.Repository.RoleRepository;
import com.example.Backend.Repository.UserRepository;
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
			InterviewService interviewService
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
					.forEach(jobRequest -> jobRequest.setStatus(Status.ACCEPTED));
			jobRequests[0].setStatus(Status.REFUSED);

			Role enterpriseRole = new Role(RoleName.ROLE_ENTERPRISE);
			enterprise.getRoles().add(enterpriseRole);
			roleRepository.save(new Role(RoleName.ROLE_USER));
			roleRepository.save(enterpriseRole);
			roleRepository.save(new Role(RoleName.ROLE_ADMIN));
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
//			CV resume = CV.builder()
//					.address("My address, Tunis, Tunisa")
//					.email("email@gmail.com")
//					.firstName("myFirstName")
//					.lastName("myLastName")
//					.phone("+21611111111")
//					.build();
//
//			Set<Interest> interests = new HashSet<>();
//			for(int i = 0; i < 3; i++) {
//				interests.add(Interest.builder()
//						.description("MyInterestDescription" + i)
//						.name("SuperInterest" + i)
//						.cv(resume)
//						.build()
//				);
//			}
//			Set<ProfessionalExperience> professionalExperiences = new HashSet<>();
//			for(int i = 0; i < 3; i++) {
//				professionalExperiences.add(ProfessionalExperience.builder()
//						.enterprise("MyEntreprise" + i)
//						.startingDate("201" + (6 + i) + "-01-01")
//						.finishingDate("201" + (6 + i + 1) + "-01-01")
//						.post("Software Developer")
//						.cv(resume)
//						.build()
//				);
//			}
//			Set<Language> languages = new HashSet<>();
//			for(int i = 0; i < 3; i++) {
//				languages.add(Language.builder()
//						.name("language" + i)
//						.level("5L")
//						.cv(resume)
//						.build()
//				);
//			}
//			Set<SocialMedia> socialMedia = new HashSet<>();
//			for(int i = 0; i < 3; i++) {
//				socialMedia.add(SocialMedia.builder()
//						.path("myPath" + i)
//						.type("myType" + i)
//						.cv(resume)
//						.build()
//				);
//			}
//			Set<Software> softwares = new HashSet<>();
//			for(int i = 0; i < 3; i++) {
//				softwares.add(Software.builder()
//						.name("mySoftware" + i)
//			-			.level("5L")
//						.cv(resume)
//						.build()
//				);
//			}
//			Set<Study> studies = new HashSet<>();
//			for(int i = 0; i < 3; i++) {
//				studies.add(Study.builder()
//						.name("myStudy" + i)
//						.graduationDate("201" + (6 + i) + "-01-01")
//						.institution("myInstitution" + i)
//						.mention("HyperGood")
//						.cv(resume)
//						.build()
//				);
//			}
//			resume.setInterests(interests);
//			resume.setLanguages(languages);
//			resume.setProfessionalExperiences(professionalExperiences);
//			resume.setSocialMedias(socialMedia);
//			resume.setSoftwares(softwares);
//			resume.setStudies(studies);
//			resume = cvRepository.save(resume);
//			System.out.println(resume.getId());
			//jsonResumeService.generateResume(resume.getId());
		};
	}
}
