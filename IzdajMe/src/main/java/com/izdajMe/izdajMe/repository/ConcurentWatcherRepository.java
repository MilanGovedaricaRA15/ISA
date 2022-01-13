package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.ConcurentWatcher;
import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.CottageReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;
import java.util.List;

@Repository
public interface ConcurentWatcherRepository extends JpaRepository<ConcurentWatcher, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("Select c from ConcurentWatcher c where c.tableName = ?1")
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value ="0")})
    public ConcurentWatcher findByTableName(String tableName);
}
