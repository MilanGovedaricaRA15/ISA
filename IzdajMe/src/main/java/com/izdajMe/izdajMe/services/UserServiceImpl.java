package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CottageRepository cottageRepository;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    InstructorsFavorRepository instructorsFavorRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private CottageReservationRepository cottageReservationRepository;
    @Autowired
    private ShipReservationRepository shipReservationRepository;
    @Autowired
    private FavorReservationRepository favorReservationRepository;

    @Override
    public List<User> getAllUsers() {
        Iterable<User> allUsers = userRepository.findAll();
        ArrayList<User> allUsersList = new ArrayList<User>();
        allUsers.forEach(allUsersList::add);

        return allUsersList;
    }

    @Override
    public List<User> getAllInstructors() {
        Iterable<User> allUsers = userRepository.findAll();
        ArrayList<User> allInstructorsList = new ArrayList<User>();
        for (User user : allUsers) {
            if (user.getRole().equals(User.Role.instructor)) {
                allInstructorsList.add(user);
            }
        }

        return allInstructorsList;
    }

    public Boolean loginUser(User user) {
        User foundUser = userRepository.findByEmailAndPasswordVerified(user.getEmail(),user.getPassword());

        if (foundUser != null){
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean saveUser(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());

        if(foundUser != null){
            return true;
        }

        user.setVerified(false); //false
        userRepository.save(user);
        return false;
    }

    public User getUserByEmail(String email) {
        User foundUser = userRepository.findByEmailVerified(email);
        if(foundUser != null) {
            return foundUser;
        }
        else {
            return null;
        }
    }

    public Boolean changeUser(User user) {
        User foundUser = userRepository.findByIdAndPassword(user.getId(),user.getPassword());
       if (foundUser != null){
           userRepository.save(user);
           return true;
        }
        else {
            return false;
        }
    }

    public Boolean changePasswordUser(List<User> users) {
        User foundUser = userRepository.findByIdAndPassword(users.get(0).getId(),users.get(1).getPassword());
        if (foundUser != null){
            if(users.get(0).getRole().toString() == User.Role.administratorFirstLogged.toString())
                users.get(0).setRole(User.Role.administrator);
            userRepository.save(users.get(0));
            foundUser.setPassword(users.get(0).getPassword());
            userRepository.save(foundUser);
            return true;
        }
        else {
            return false;
        }
    }

    public Boolean changeAdministratorsPassword(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser != null){
            user.setRole(User.Role.administrator);
            userRepository.save(user);
            return true;
        }
        else {
            return false;
        }
    }

    public Boolean saveAdmin(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());

        if(foundUser != null){
            return false;
        }

        user.setRole(User.Role.administratorFirstLogged);
        user.setVerified(true);
        userRepository.save(user);
        return true;

    }

    public Boolean deleteUser(long id) {
        User user = userRepository.findById(id).get();
        if(user.getRole().equals(User.Role.cottageAdvertiser))
            deleteCottageAdvertiser(id);
        else if(user.getRole().equals(User.Role.boatAdvertiser))
            deleteShipAdvertiser(id);
        else if(user.getRole().equals(User.Role.instructor))
            deleteInstructor(id);

        userRepository.deleteById(id);
        return true;
    }

    private void deleteCottageAdvertiser(long id) {
        List<Cottage> cottages = cottageRepository.findCottagesById(id);
        if(cottages.size() != 0){
            for(Cottage c : cottages){
                removeCottageReservations(c.getId());
                cottageRepository.deleteById(c.getId());
            }
        }
    }

    private void deleteShipAdvertiser(long id) {
        List<Ship> ships = shipRepository.findShipsById(id);
        if(ships.size() != 0){
            for(Ship s : ships){
                removeShipReservations(s.getId());
                shipRepository.deleteById(s.getId());
            }
        }
    }

    private void deleteInstructor(long id) {
        List<InstructorsFavor> instructorFavors = instructorsFavorRepository.findInstructorFavorsById(id);
        if(instructorFavors.size() != 0){
            for(InstructorsFavor i : instructorFavors){
                removeFavorReservations(i.getId());
                instructorsFavorRepository.deleteById(i.getId());
            }
        }
    }

    private void removeCottageReservations(long id) {
        List<CottageReservation> cottageReservations = cottageReservationRepository.findAllByCottageId(id);
        if(cottageReservations.size() != 0) {
            for(CottageReservation cr : cottageReservations){
                cottageReservationRepository.delete(cr);
            }
        }
    }

    private void removeShipReservations(long id) {
        List<ShipReservation> shipReservations = shipReservationRepository.findAllByShipId(id);
        if(shipReservations.size() != 0) {
            for(ShipReservation sr : shipReservations){
                shipReservationRepository.delete(sr);
            }
        }
    }

    private void removeFavorReservations(long id) {
        List<FavorReservation> favorReservations = favorReservationRepository.findAllByReservationId(id);
        if(favorReservations.size() != 0) {
            for(FavorReservation fr : favorReservations){
                favorReservationRepository.delete(fr);
            }
        }
    }

    @Override
    public List<User> searchUsersByName(String firstName, String lastName) {
        List<User> searchedShips = new ArrayList<>();

        List<User> users = userRepository.findAll();
        for (User s : users) {
            if (s.getFirstName().toLowerCase().contains(firstName.toLowerCase())
            && s.getLastName().toLowerCase().contains(lastName.toLowerCase())){
                searchedShips.add(s);
            }
        }

        return searchedShips;
    }

    @Override
    public List<User> searchInstructorsByName(String firstName, String lastName) {
        List<User> searchedShips = new ArrayList<>();

        List<User> users = userRepository.findAll();
        for (User s : users) {
            if (s.getRole().equals(User.Role.instructor)) {
                if (s.getFirstName().toLowerCase().contains(firstName.toLowerCase())
                        && s.getLastName().toLowerCase().contains(lastName.toLowerCase())){
                    searchedShips.add(s);
                }
            }
        }

        return searchedShips;
    }

    public Boolean saveClient(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());

        if(foundUser != null){
            return true;
        }

        user.setVerified(false); //false
        userRepository.save(user);
        sendNotificationForReservation(user);
        return false;
    }

    private void sendNotificationForReservation(User user) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Activate your account");
        mail.setText("To activate your account press this link: " + "http://localhost:8080/users/activate?id=" + user.getId());
        emailService.sendSimpleMessage(mail);
    }

    public void activate(Long id){
        User user = userRepository.findById(id).get();
        user.setVerified(true);
        userRepository.save(user);
    }

    public Boolean acceptUser(long id){
        User user = userRepository.findById(id).get();
        user.setVerified(true);
        userRepository.save(user);
        sendNotificationFromAdminForSuccessRegistration(user);
        return true;
    }

    private void sendNotificationFromAdminForSuccessRegistration(User user) throws MailException{
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Accepting registration");
        mail.setText("Your registration request has been accepted. Welcome! :)");
        emailService.sendSimpleMessage(mail);
    }
}
