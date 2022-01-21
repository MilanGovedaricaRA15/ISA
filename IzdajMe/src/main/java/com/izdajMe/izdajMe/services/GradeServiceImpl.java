package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class GradeServiceImpl implements GradeService{
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private CottageRepository cottageRepository;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InstructorsFavorRepository instructorsFavorRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private ConcurentWatcherRepository concurentWatcherRepository;

    public List<Grade> getAllGrades() {
        Iterable<Grade> allGrades = gradeRepository.findAll();
        ArrayList<Grade> allGradesList = new ArrayList<>();
        allGrades.forEach(allGradesList::add);

        return allGradesList;
    }

    public Boolean acceptGrade(long id) {
        Grade grade = gradeRepository.findById(id).get();
        grade.setSeen(true);
        gradeRepository.save(grade);
        sendNotificationForAcceptingGrade(grade);
        return true;
    }

    private void sendNotificationForAcceptingGrade(Grade grade) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(grade.getUser().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Accepting grade");
        mail.setText("You have just been rated!");
        emailService.sendSimpleMessage(mail);
    }

    public Boolean deleteGrade(long id) {
        deleteFromCottageGrades(id);
        deleteFromShipGrades(id);
        gradeRepository.deleteById(id);
        return true;
    }

    private void deleteFromCottageGrades(long id) {
        List<Cottage> cottages = cottageRepository.findAll();
        for(Cottage c: cottages){
            List<Grade> checkedGrades = checkGrades(c.getGrades(), id);
            if(checkedGrades.size() != c.getGrades().size()) {
                c.setGrades(checkedGrades);
                cottageRepository.save(c);
            }
        }
    }

    private void deleteFromShipGrades(long id) {
        List<Ship> ships = shipRepository.findAll();
        for (Ship s : ships) {
            List<Grade> checkedGrades = checkGrades(s.getGrades(), id);
            if (checkedGrades.size() != s.getGrades().size()) {
                s.setGrades(checkedGrades);
                shipRepository.save(s);
            }
        }
    }

    private List<Grade> checkGrades(List<Grade> checkingGrades, long id){
        List<Grade> newGrades = new ArrayList<>();
        for(Grade g: checkingGrades) {
            if(g.getId() != id)
                newGrades.add(g);
        }

        return newGrades;
    }

    @Override
    @Transactional(readOnly = false)
    public Boolean addGradeToCottage(Cottage cottage) {
        if (!concurentWatcherRepository.findByTableName("Cottage").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("Grade");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            cottageRepository.save(cottage);

            cw.setWriting(false);
            concurentWatcherRepository.save(cw);

            return true;
        } else {
            return  false;
        }
    }

    @Override
    @Transactional(readOnly = false)
    public Boolean addGradeToShip(Ship ship) {
        if (!concurentWatcherRepository.findByTableName("Ship").getWriting()) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("Grade");
            cw.setWriting(true);
            concurentWatcherRepository.save(cw);

            shipRepository.save(ship);

            cw.setWriting(false);
            concurentWatcherRepository.save(cw);

            return true;
        } else {
            return  false;
        }
    }

    @Override
    public Boolean addGradeToUser(User user) {
        userRepository.save(user);
        return true;
    }
}
