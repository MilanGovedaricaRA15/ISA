package com.izdajMe.izdajMe.CONSTANTS;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class FavorReservationConstant {
    public static final Long DB_ID = 1L;
    public static final LocalDateTime DB_AVAILABLEFROM =  LocalDateTime.of(LocalDate.of(2022,02,01), LocalTime.of(00,00,00,00));
    public static final LocalDateTime DB_AVAILABLETILL =  LocalDateTime.of(LocalDate.of(2022,02,13),LocalTime.of(00,00,00,00));
    public static final Float DB_COST = 300f;
}
