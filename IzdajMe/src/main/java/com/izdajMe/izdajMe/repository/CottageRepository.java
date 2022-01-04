package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CottageRepository extends JpaRepository<Cottage, Long> {
    @Query("Select c from Cottage c where c.owner.email=?1")
    public List<Cottage> findAllByCottageEmail(String email);
    @Query("Select c from Cottage c where c.owner.id=?1")
    public List<Cottage> findCottagesById(long id);
}
