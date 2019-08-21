package com.example.Backend.Repository;

import com.example.Backend.Model.SocialMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialMediaRepository extends JpaRepository<SocialMedia, Long> {
}
