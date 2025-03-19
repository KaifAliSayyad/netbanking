package com.ourbank.dev.repos;


import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ourbank.dev.models.User;

public interface UserRepo extends JpaRepository<User, UUID>{
    
}
