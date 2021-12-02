package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmailAndPassword(String email,String password);
    public User findByEmail(String email);

}
