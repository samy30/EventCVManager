package com.example.Backend.Repository;

import com.example.Backend.Model.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudiesRepository extends JpaRepository<Study, Long> {
}
