package com.izdajMe.izdajMe.Service;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.InstructorsFavor;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.repository.CottageRepository;
import com.izdajMe.izdajMe.repository.InstructorsFavorRepository;
import com.izdajMe.izdajMe.services.CottageServiceImpl;
import com.izdajMe.izdajMe.services.InstructorsFavorServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

import static com.izdajMe.izdajMe.CONSTANTS.CottageConstant.*;
import static com.izdajMe.izdajMe.CONSTANTS.FavorConstant.DB_COST;
import static com.izdajMe.izdajMe.CONSTANTS.FavorConstant.DB_NUMOFPERSONS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {InstructorsFavor.class, User.class})
public class FavorServiceTest {

    @Mock
    private InstructorsFavorRepository instructorsFavorRepositoryMock;

    @Mock
    private InstructorsFavor instructorsFavorMock;

    @InjectMocks
    private InstructorsFavorServiceImpl instructorsFavorService;

    @Test
    void testFindAllFavors() {
        when(instructorsFavorRepositoryMock.findAll()).thenReturn(Arrays.asList(new InstructorsFavor(DB_ID,
                null,DB_NAME,DB_ADDRESS,DB_DESCRIPTION,null,DB_NUMOFPERSONS,DB_RULES,null,
                DB_COST, null,null,null, null)));

        List<InstructorsFavor> instructorsFavors = instructorsFavorService.getAllFavors();

        assertThat(instructorsFavors).hasSize(1);
        assertEquals(instructorsFavors.get(0).getName().toUpperCase(), DB_NAME.toUpperCase());
        verify(instructorsFavorRepositoryMock, times(1)).findAll();
        verifyNoMoreInteractions(instructorsFavorRepositoryMock);
    }
}
