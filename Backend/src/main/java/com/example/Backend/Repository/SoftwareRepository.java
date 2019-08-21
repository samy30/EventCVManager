package com.example.Backend.Repository;

import com.example.Backend.Model.Software;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoftwareRepository extends JpaRepository<Software, Long> {
}
