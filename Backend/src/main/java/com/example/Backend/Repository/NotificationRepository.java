package com.example.Backend.Repository;

import com.example.Backend.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReceiverID(Long userId);
    List<Notification>  findBySenderID(Long userID);
    Long countBySeenAndReceiverID(boolean seen, Long userID);
}
