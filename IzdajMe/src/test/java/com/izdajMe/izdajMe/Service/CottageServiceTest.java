package com.izdajMe.izdajMe.Service;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.ConcurentWatcherRepository;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.services.CottageService;
import com.izdajMe.izdajMe.services.CottageServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static com.izdajMe.izdajMe.CONSTANTS.CottageConstant.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {Cottage.class,User.class})
public class CottageServiceTest {

    @Mock
    private CottageRepository cottageRepositoryMock;

    @Mock
    private Cottage cottageMock;

    @InjectMocks
    private CottageServiceImpl cottageService;

    @Test
    public void testFindAllCottage() {
        when(cottageRepositoryMock.findAll()).thenReturn(Arrays.asList(new Cottage(DB_ID,null,
                null,DB_NAME,DB_ADDRESS,DB_DESCRIPTION,null,DB_NUMOFROOMS,DB_NUMOFBEDS,DB_RULES,null,
                null, null,null,DB_COSTPERNIGHT, null)));

        List<Cottage> cottages = cottageService.getAllCottages();

        assertThat(cottages).hasSize(1);
        assertEquals(cottages.get(0).getName().toUpperCase(), DB_NAME.toUpperCase());
        verify(cottageRepositoryMock, times(1)).findAll();
        verifyNoMoreInteractions(cottageRepositoryMock);
    }

}
