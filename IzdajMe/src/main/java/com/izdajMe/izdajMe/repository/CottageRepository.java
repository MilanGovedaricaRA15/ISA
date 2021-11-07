package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CottageRepository extends JpaRepository<Cottage, Long> {


}
