package com.nubbymedia.scmsp.repository;

import com.nubbymedia.scmsp.entity.AuditLog;
import com.nubbymedia.scmsp.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    @EntityGraph(attributePaths = {"user", "file"})
    List<AuditLog> findByUserOrderByActionTimestampDesc(User user);

    @EntityGraph(attributePaths = {"user", "file"})
    List<AuditLog> findAllByOrderByActionTimestampDesc();
}
