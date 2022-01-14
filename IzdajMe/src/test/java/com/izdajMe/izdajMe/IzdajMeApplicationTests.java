package com.izdajMe.izdajMe;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.User;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {Cottage.class, User.class})
public class IzdajMeApplicationTests {

	@Test
	public void contextLoads() {
	}

}
