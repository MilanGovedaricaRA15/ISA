package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.BookingRevenue;

public interface BookingRevenueService {
    public BookingRevenue getRevenues();
    public Boolean changeRevenue(int regularRevenue, int silverRevenue, int goldRevenue);
}
