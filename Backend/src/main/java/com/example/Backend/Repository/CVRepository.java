package com.example.Backend.Repository;

import com.example.Backend.Model.CV;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CVRepository extends JpaRepository<CV, Long> {
//    Optional<CV> findById(Long cvId);
//
    List<CV> findByCreatedBy(Long userId);

    long countByCreatedBy(Long userId);

//    List<CV> findByIdIn(List<Long> cvIds);
//
//    List<CV> findByIdIn(List<Long> pollIds, Sort sort);
}
