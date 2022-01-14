package com.izdajMe.izdajMe.Service;

import com.izdajMe.izdajMe.CONSTANTS.CottageConstant;
import com.izdajMe.izdajMe.CONSTANTS.CottageReservationConstant;
import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.ConcurentWatcherRepository;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.CottageReservationRepository;
import com.izdajMe.izdajMe.services.CottageReservationServiceImpl;
import com.izdajMe.izdajMe.services.CottageServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.izdajMe.izdajMe.CONSTANTS.CottageConstant.*;
import static com.izdajMe.izdajMe.CONSTANTS.CottageConstant.DB_COSTPERNIGHT;
import static com.izdajMe.izdajMe.CONSTANTS.CottageReservationConstant.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {CottageReservation.class, Cottage.class, User.class})
public class ReservationServiceTest {

    @Mock
    private ConcurentWatcherRepository concurentWatcherRepositoryMock;

    @Mock
    private CottageReservationRepository cottageReservationRepositoryMock;

    @Mock
    private CottageRepository cottageRepositoryMock;

    @Mock
    private CottageReservation cottageReservationMock;

    @Mock
    private HotOffer hotOfferMock;

    @Mock
    private ConcurentWatcher concurentWatcher;

    @InjectMocks
    private CottageReservationServiceImpl cottageReservationService;

    @Test
    public void changeReservationPositive() {
        when(cottageReservationRepositoryMock.getById(1L)).thenReturn(new CottageReservation(CottageReservationConstant.DB_ID,null,null,DB_AVAILABLEFROM,DB_AVAILABLETILL,DB_COST,null,new Cottage(CottageConstant.DB_ID,null,
                null,DB_NAME,DB_ADDRESS,DB_DESCRIPTION,null,DB_NUMOFROOMS,DB_NUMOFBEDS,DB_RULES,null,
                null, null,new ArrayList<HotOffer>(),DB_COSTPERNIGHT, null),null));

        Boolean changed = cottageReservationService.changeReservationByOwner(new CottageReservation(CottageReservationConstant.DB_ID,null,null,DB_AVAILABLEFROM,DB_AVAILABLETILL,DB_COST,null,new Cottage(CottageConstant.DB_ID,null,
                null,DB_NAME,DB_ADDRESS,DB_DESCRIPTION,null,DB_NUMOFROOMS,DB_NUMOFBEDS,DB_RULES,null,
                null, null,new ArrayList<HotOffer>(),DB_COSTPERNIGHT, null),null));

        assertThat(changed).isEqualTo(true);
    }

    @Test
    public void changeReservationNegative() {
        when(cottageReservationRepositoryMock.getById(1L)).thenReturn(new CottageReservation(CottageReservationConstant.DB_ID,null,null,LocalDateTime.of(LocalDate.of(2022,06,13),LocalTime.of(00,00,00,00)),LocalDateTime.of(LocalDate.of(2022,06,01),LocalTime.of(00,00,00,00)),DB_COST,null,new Cottage(CottageConstant.DB_ID,null,
                null,DB_NAME,DB_ADDRESS,DB_DESCRIPTION,null,DB_NUMOFROOMS,DB_NUMOFBEDS,DB_RULES,null,
                null, null,new ArrayList<HotOffer>(),DB_COSTPERNIGHT, null),null));

        Boolean changed = cottageReservationService.changeReservationByOwner(new CottageReservation(CottageReservationConstant.DB_ID,null,null,LocalDateTime.of(LocalDate.of(2022,06,13),LocalTime.of(00,00,00,00)), LocalDateTime.of(LocalDate.of(2022,06,01), LocalTime.of(00,00,00,00)),DB_COST,null,new Cottage(CottageConstant.DB_ID,null,
                null,DB_NAME,DB_ADDRESS,DB_DESCRIPTION,null,DB_NUMOFROOMS,DB_NUMOFBEDS,DB_RULES,null,
                null, null,new ArrayList<HotOffer>(),DB_COSTPERNIGHT, null),null));

        assertThat(changed).isEqualTo(false);
    }

}
