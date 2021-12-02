package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.AccountDeleteRequest;
import com.izdajMe.izdajMe.model.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountDeleteRequestRepository extends JpaRepository<AccountDeleteRequest, Long> {
    @Query("Select a from AccountDeleteRequest a where a.user.id=?1")
    public List<AccountDeleteRequest> findAllByUserId(Long id);

    @Query("Select a from AccountDeleteRequest a where a.user.id=?1 and a.seen = false")
    public List<AccountDeleteRequest> findAllNotSeenByUserId(Long id);
}
