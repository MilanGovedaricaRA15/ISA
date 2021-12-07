package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
    public Administrator findByIdAndPassword(long id, String password);
    public Administrator findById(long id);
}
