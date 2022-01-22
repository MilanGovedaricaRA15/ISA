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
    private InstructorsFavorRepository instructorsFavorRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private CottageReservationRepository cottageReservationRepository;
    @Autowired
    private ShipReservationRepository shipReservationRepository;
    @Autowired
    private FavorReservationRepository favorReservationRepository;
    @Autowired
    private ComplaintRepository complaintRepository;
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private GradeService gradeService;
    @Autowired
    private CottageReservationService cottageReservationService;
    @Autowired
    private ShipReservationService shipReservationService;
    @Autowired
    private FavorReservationService favorReservationService;

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
            initialize();
            addPictures();
            return true;
        }
        else{
            return false;
        }
    }

    private void addPictures() {
        List<Cottage> allCotages = cottageRepository.findAll();
        for (Cottage c : allCotages) {
            if (c.getId() != 1) {
                if (c.getImages() == null) {
                    ArrayList<String> images = new ArrayList<String>();
                    String imageName = "cottage";
                    if (c.getId() > 10) {
                        imageName += c.getId() % 10;
                    } else {
                        imageName += c.getId();
                    }
                    images.add(imageName);
                    c.setImages(images);
                    cottageRepository.save(c);
                }
            }
        }

        List<Ship> allShips = shipRepository.findAll();
        for (Ship s : allShips) {
            if (s.getId() != 1) {
                if (s.getImages() == null) {
                    ArrayList<String> images = new ArrayList<String>();
                    String imageName = "boat";
                    if (s.getId() > 10) {
                        imageName += s.getId() % 10;
                    } else {
                        imageName += s.getId();
                    }
                    images.add(imageName);
                    s.setImages(images);
                    shipRepository.save(s);
                }
            }
        }
    }

    private void initialize(){
        Cottage c = cottageRepository.getById(1L);
        ArrayList<Cottage.Services> services = new ArrayList<Cottage.Services>();
        services.add(Cottage.Services.Parking);
        services.add(Cottage.Services.Pool);
        ArrayList<String> images = new ArrayList<String>();
        images.add("vikendica1");
        images.add("vikendica2");
        images.add("vikendica3");
        images.add("vikendica4");
        images.add("vikendica5");
        int doz = 0;
        if(c.getServices() == null || c.getImages() == null){
            doz = 1;
        }
        if(c.getServices() == null) {
            c.setServices(services);
        }
        if(c.getImages() == null){
            c.setImages(images);
        }
        if(doz == 1) {
            cottageRepository.save(c);
        }


        Ship s = shipRepository.getById(1L);
        ArrayList<Ship.Services> services1 = new ArrayList<Ship.Services>();
        services1.add(Ship.Services.HairDryer);
        services1.add(Ship.Services.Minibar);
        images = new ArrayList<String>();
        images.add("ship1");
        images.add("ship2");
        images.add("ship3");
        int doz2 = 0;
        if(s.getServices() == null || s.getImages() == null){
            doz2 = 1;
        }
        if(s.getServices() == null) {
            s.setServices(services1);
        }
        if(s.getImages() == null){
            s.setImages(images);
        }
        if(doz2 == 1) {
            shipRepository.save(s);
        }

        ArrayList<InstructorsFavor.FavorServices> favorServices = new ArrayList<>();
        favorServices.add(InstructorsFavor.FavorServices.Boat);
        favorServices.add(InstructorsFavor.FavorServices.FishingRod);
        InstructorsFavor favor = instructorsFavorRepository.getById(1L);
        images = new ArrayList<String>();
        images.add("pecanjepecaljkom1");
        images.add("pecanjepecaljkom2");
        images.add("pecanjepecaljkom3");
        int doz3 = 0;
        if(favor.getServices() == null || favor.getImages() == null){
            doz3 = 1;
        }
        if(favor.getServices() == null) {
            favor.setServices(favorServices);
        }
        if(favor.getImages() == null){
            favor.setImages(images);
        }
        if(doz3 == 1) {
            instructorsFavorRepository.save(favor);
        }
    }

    public Boolean saveUser(User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());

        if(foundUser != null){
            return true;
        }

        user.setVerified(false); //false
        user.setPrepaid(false);
        user.setType(User.Type.Regular);
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
            if(users.get(0).getRole().toString().equals(User.Role.administratorFirstLogged.toString()))
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

    public Boolean declineUser(String text) {
        User user = userRepository.findById((long) Integer.parseInt(text.split(" ")[0])).get();
        userRepository.deleteById((long) Integer.parseInt(text.split(" ")[0]));
        sendNotificationFromAdminForFailedRegistration(user, text.split(" ")[1]);
        return true;
    }

    public Boolean deleteUser(long id) {
        User user = userRepository.findById(id).get();
        cottageReservationService.deleteByClientId(id);
        shipReservationService.deleteByClientId(id);
        favorReservationService.deleteByClientId(id);
        deleteSubscribedUsers(user);
        deleteComplaints(id);
        deleteGrades(id);
        user.setGrades(new ArrayList<>());
        if(user.getRole().equals(User.Role.cottageAdvertiser))
            deleteCottageAdvertiser(id);
        else if(user.getRole().equals(User.Role.boatAdvertiser))
            deleteShipAdvertiser(id);
        else if(user.getRole().equals(User.Role.instructor)) {
            deleteInstructor(id);
            user.setSubscribedUsers(new ArrayList<>());
        }

        userRepository.deleteById(id);
        return true;
    }

    private void deleteSubscribedUsers(User user) {
        List<User> users = userRepository.findAll();
        List<Cottage> cottages = cottageRepository.findAll();
        List<Ship> ships = shipRepository.findAll();

        for(Cottage cottage: cottages) {
            checkSubscribedUsersForCottage(cottage, user);
        }

        for(Ship ship: ships) {
            checkSubscribedUsersForShips(ship, user);
        }

        for(User thisUser: users) {
            if(thisUser.getRole() == User.Role.instructor)
                checkSubscribedUsersForInstructor(thisUser, user);
        }
    }

    private void checkSubscribedUsersForCottage(Cottage cottage, User user) {
        List<User> users = new ArrayList<>();
        for(User thisUser: cottage.getSubscribedUsers()) {
            if(thisUser.getId() != user.getId())
                users.add(thisUser);

            cottage.setSubscribedUsers(users);
            cottageRepository.save(cottage);
        }
    }

    private void checkSubscribedUsersForShips(Ship ship, User user) {
        List<User> users = new ArrayList<>();
        for(User thisUser: ship.getSubscribedUsers()) {
            if(thisUser.getId() != user.getId())
                users.add(thisUser);

            ship.setSubscribedUsers(users);
            shipRepository.save(ship);
        }
    }

    private void checkSubscribedUsersForInstructor(User instructor, User user) {
        List<User> users = new ArrayList<>();
        for(User thisUser: instructor.getSubscribedUsers()) {
            if(thisUser.getId() != user.getId())
                users.add(thisUser);

            instructor.setSubscribedUsers(users);
            userRepository.save(instructor);
        }
    }

    private void deleteGrades(long id) {
        List<Grade> grades = gradeRepository.findGradesById(id);
        if(grades.size() != 0){
            for(Grade g: grades){
                deleteGradesFromCottages(g.getId());
                deleteGradesFromShips(g.getId());
                deleteGradesFromFavors(g.getId());
                deleteGradesFromOwner(g.getId());
                gradeService.deleteGrade(g.getId());
            }
        }
    }

    private void deleteGradesFromOwner(long id) {
        List<User> users = userRepository.findAll();
        for(User user: users) {
            checkUserGrades(user, id);
        }
    }

    private void checkUserGrades(User user, long gradeId){
        if(user.getGrades() != null) {
            List<Grade> grades = new ArrayList<>();
            for(Grade grade: user.getGrades()) {
                if(grade.getId() != gradeId)
                    grades.add(grade);
            }
            user.setGrades(grades);
            userRepository.save(user);
        }
    }

    private void deleteGradesFromCottages(long id) {
        List<Cottage> cottages = cottageRepository.findAll();
        for(Cottage cottage : cottages) {
            checkCottageGrades(cottage, id);
        }
    }

    private void checkCottageGrades(Cottage cottage, long gradeId) {
        if(cottage.getGrades() != null) {
            List<Grade> grades = new ArrayList<>();
            for(Grade grade: cottage.getGrades()) {
                if(grade.getId() != gradeId)
                    grades.add(grade);
            }
            cottage.setGrades(grades);
            cottageRepository.save(cottage);
        }
    }

    private void deleteGradesFromShips(long id) {
        List<Ship> ships = shipRepository.findAll();
        for(Ship ship : ships) {
            checkShipGrades(ship, id);
        }
    }

    private void checkShipGrades(Ship ship, long gradeId) {
        if(ship.getGrades() != null) {
            List<Grade> grades = new ArrayList<>();
            for (Grade grade : ship.getGrades()) {
                if(grade.getId() != gradeId)
                    grades.add(grade);
            }
            ship.setGrades(grades);
            shipRepository.save(ship);
        }
    }

    private void deleteGradesFromFavors(long id) {
        List<InstructorsFavor> instructorsFavors = instructorsFavorRepository.findAll();
        for(InstructorsFavor instructorsFavor : instructorsFavors) {
            checkfavorGrades(instructorsFavor, id);
        }
    }

    private void checkfavorGrades(InstructorsFavor instructorsFavor, long gradeId) {
        if(instructorsFavor.getGrades() != null) {
            List<Grade> grades = new ArrayList<>();
            for(Grade grade: instructorsFavor.getGrades()) {
                if(grade.getId() != gradeId)
                    grades.add(grade);
            }
            instructorsFavor.setGrades(grades);
            instructorsFavorRepository.save(instructorsFavor);
        }
    }

    private void deleteComplaints(long id) {
        List<Complaint> complaintsByAuthor = complaintRepository.findComplaintsByAuthorId(id);
        if(complaintsByAuthor.size() != 0) {
            for(Complaint c : complaintsByAuthor) {
                complaintRepository.deleteById(c.getId());
            }
        }
        List<Complaint> complaintsOfComplaintUser = complaintRepository.findComplaintsByComplaintUserId(id);
        if(complaintsOfComplaintUser.size() != 0) {
            for(Complaint c : complaintsOfComplaintUser) {
                complaintRepository.deleteById(c.getId());
            }
        }
    }

    private void deleteCottageAdvertiser(long id) {
        List<Cottage> cottages = cottageRepository.findCottagesById(id);
        if(cottages.size() != 0){
            for(Cottage c : cottages){
                removeCottageReservations(c.getId());
                c.setServices(new ArrayList<>());
                c.setHotOffers(new ArrayList<>());
                c.setPriceList(new ArrayList<>());
                c.setSubscribedUsers(new ArrayList<>());
                removeCottageFromComplaints(c);
                c.setGrades(new ArrayList<>());
                cottageRepository.deleteById(c.getId());
            }
        }
    }

    private void removeCottageFromComplaints(Cottage cottage) {
        for(Complaint complaint: complaintRepository.findAll()){
            if(complaint.getComplaintCottage() != null && complaint.getComplaintCottage().getId() == cottage.getId())
                complaintRepository.deleteById(complaint.getId());
        }
    }

    private void deleteShipAdvertiser(long id) {
        List<Ship> ships = shipRepository.findShipsById(id);
        if(ships.size() != 0){
            for(Ship s : ships){
                removeShipReservations(s.getId());
                s.setServices(new ArrayList<>());
                s.setHotOffers(new ArrayList<>());
                s.setPriceList(new ArrayList<>());
                s.setSubscribedUsers(new ArrayList<>());
                removeShipFromComplaints(s);
                s.setGrades(new ArrayList<>());
                shipRepository.deleteById(s.getId());
            }
        }
    }

    private void removeShipFromComplaints(Ship ship) {
        for(Complaint complaint: complaintRepository.findAll()){
            if(complaint.getComplaintShip() != null && complaint.getComplaintShip().getId() == ship.getId())
                complaintRepository.deleteById(complaint.getId());
        }
    }

    private void deleteInstructor(long id) {
        List<InstructorsFavor> instructorFavors = instructorsFavorRepository.findInstructorFavorsById(id);
        if(instructorFavors.size() != 0){
            for(InstructorsFavor i : instructorFavors){
                removeFavorReservations(i.getId());
                i.setGrades(new ArrayList<>());
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
            if (s.getRole().equals(User.Role.instructor) && s.getFirstName().toLowerCase().contains(firstName.toLowerCase())
                    && s.getLastName().toLowerCase().contains(lastName.toLowerCase())) {
                    searchedShips.add(s);
            }
        }

        return searchedShips;
    }

    @Override
    public List<User> searchInstructorsByCountry(String country) {
        List<User> searchedShips = new ArrayList<>();

        List<User> users = userRepository.findAll();
        for (User s : users) {
            if (s.getRole().equals(User.Role.instructor) && s.getCountry().toLowerCase().contains(country.toLowerCase())) {
                searchedShips.add(s);
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

    private void sendNotificationFromAdminForFailedRegistration(User user, String text) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Failed registration");
        mail.setText("Your request for registration has been declined!" + "\n"
                + "Reason: " + text);
        emailService.sendSimpleMessage(mail);
    }

    public Boolean changePrepaid(long id) {
        User user = userRepository.findById(id).get();
        if(user.getPrepaid())
            user.setPrepaid(false);
        else
            user.setPrepaid(true);
        userRepository.save(user);

        return true;
    }

    @Override
    public Boolean addSubscribedUserToInstructor(User user) {
        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean removeSubscribedUserFromInstructor(User user) {
        userRepository.save(user);
        return true;
    }

    @Override
    public List<User> getUsersSubscribedInstructors(String email) {
        List<User> usersSubscribedInstructors = new ArrayList<User>();
        List<User> allUsers = userRepository.findAll();

        for (User u : allUsers) {
            if (u.getRole().equals(User.Role.instructor)) {
                for (User i : u.getSubscribedUsers()) {
                    if (i.getEmail().equals(email)) {
                        usersSubscribedInstructors.add(u);
                        break;
                    }
                }
            }
        }

        return usersSubscribedInstructors;
    }

    @Override
    public Boolean isUserSubscribedToInstructor(String email, String instructorEmail) {
        List<User> usersSubscribedInstructors = getUsersSubscribedInstructors(email);

        for (User i : usersSubscribedInstructors) {
            if (i.getEmail().equals(instructorEmail)) {
                return true;
            }
        }

        return false;
    }
}
