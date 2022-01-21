package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.BookingRevenue;
import com.izdajMe.izdajMe.model.Grade;
import com.izdajMe.izdajMe.repository.BookingRevenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingRevenueServiceImpl implements BookingRevenueService{
    @Autowired
    private BookingRevenueRepository bookingRevenueRepository;

    public BookingRevenue getRevenues() {

        return bookingRevenueRepository.findById(1L).get();
    }

    public Boolean changeRevenue(int regularRevenue, int silverRevenue, int goldRevenue) {
        BookingRevenue bookingRevenue = bookingRevenueRepository.findById(1L).get();
        bookingRevenue.setNumOfRevenueRegular(regularRevenue);
        bookingRevenue.setNumOfRevenueSilver(silverRevenue);
        bookingRevenue.setNumOfRevenueGold(goldRevenue);

        bookingRevenueRepository.save(bookingRevenue);
        return true;
    }
}
