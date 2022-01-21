package com.izdajMe.izdajMe.repository;

import com.izdajMe.izdajMe.model.BookingRevenue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRevenueRepository extends JpaRepository<BookingRevenue, Long> {
}
