package com.nubbymedia.scmsp.repository;

import com.nubbymedia.scmsp.entity.User;
import com.nubbymedia.scmsp.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    List<UserRole> findByUser(User user);
}
