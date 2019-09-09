package com.example.Backend;

import com.example.Backend.Model.*;
import com.example.Backend.Repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

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
			JobOfferRepository jobOfferRepository,
			JobDemandeRepository jobRequestRepository
	) {
		return (args) -> {
			User enterprise = new User("Enterprise", "google", "entreprise@gmail.com", "password");
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

			userRepository.save(enterprise);
			roleRepository.save(new Role(RoleName.ROLE_USER));
			roleRepository.save(new Role(RoleName.ROLE_ENTERPRISE));
			roleRepository.save(new Role(RoleName.ROLE_ADMIN));

		};
	}
}
