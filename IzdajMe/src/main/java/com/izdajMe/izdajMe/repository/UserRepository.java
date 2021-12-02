package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmailAndPassword(String email,String password);
    public User findByIdAndPassword(long id,String password);
    public User findByEmail(String email);

    @Query("Select u from User u where u.email = ?1 and u.verified = true")
    public User findByEmailVerified(String email);
    @Query("Select u from User u where u.email = ?1 and u.password = ?2 and u.verified = true")
    public User findByEmailAndPasswordVerified(String email,String password);

}
