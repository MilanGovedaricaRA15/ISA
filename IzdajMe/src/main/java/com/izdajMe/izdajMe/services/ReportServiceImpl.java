package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.CottageReservationRepository;
import com.izdajMe.izdajMe.repository.FavorReservationRepository;
import com.izdajMe.izdajMe.repository.ReportRepository;
import com.izdajMe.izdajMe.repository.ShipReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService{
    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private CottageReservationRepository cottageReservationRepository;
    @Autowired
    private ShipReservationRepository shipReservationRepository;
    @Autowired
    private FavorReservationRepository favorReservationRepository;
    @Autowired
    private EmailService emailService;

    public List<Report> getAllReports() {
        Iterable<Report> allReports = reportRepository.findAll();
        ArrayList<Report> allReportsList = new ArrayList<>();
        allReports.forEach(allReportsList::add);
        return allReportsList;
    }

    public Boolean changeVerified(Long id) {
        Report modifiedReport = reportRepository.findById(id).get();
        modifiedReport.setVerified(true);
        reportRepository.save(modifiedReport);
        checkCottageReservations(modifiedReport);
        checkShipReservations(modifiedReport);
        checkFavorReservations(modifiedReport);

        return true;
    }

    private void checkCottageReservations(Report report) {
        List<CottageReservation> cottageReservations = cottageReservationRepository.findAll();
        for(CottageReservation cr : cottageReservations) {
            if(cr.getReport() != null && cr.getReport().getId() == report.getId()) {
                cr.setPenalty(new Penalty());
                cottageReservationRepository.save(cr);
                sendNotificationToCottageOwner(cr);
                sendNotificationForCottageReservationForPenalty(cr);
            }
        }
    }

    private void checkShipReservations(Report report) {
        List<ShipReservation> shipReservations = shipReservationRepository.findAll();
        for(ShipReservation sr : shipReservations) {
            if( sr.getReport() != null && sr.getReport().getId() == report.getId()) {
                sr.setPenalty(new Penalty());
                shipReservationRepository.save(sr);
                sendNotificationToShipOwner(sr);
                sendNotificationForShipReservationForPenalty(sr);
            }
        }
    }

    private void checkFavorReservations(Report report) {
        List<FavorReservation> favorReservations = favorReservationRepository.findAll();
        for(FavorReservation fr : favorReservations) {
            if(fr.getReport() != null && fr.getReport().getId() == report.getId()) {
                fr.setPenalty(new Penalty());
                favorReservationRepository.save(fr);
                sendNotificationToFavorOwner(fr);
                sendNotificationForFavorReservationForPenalty(fr);
            }
        }
    }

    public Boolean deleteReport(Long id) {
        Report report = reportRepository.findById(id).get();

        report.setVerified(true);
        reportRepository.save(report);
        sendNotificationForDecliningReport(report);
        return true;
    }

    private void sendNotificationForCottageReservationForPenalty(CottageReservation cottageReservation) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(cottageReservation.getClient().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Got penalty!");
        mail.setText("You got one penalty for reservation of cottage: " + cottageReservation.getCottage().getName());
        emailService.sendSimpleMessage(mail);
    }

    private void sendNotificationForShipReservationForPenalty(ShipReservation shipReservation) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(shipReservation.getClient().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Got penalty!");
        mail.setText("You got one penalty for reservation of ship: " + shipReservation.getShip().getName());
        emailService.sendSimpleMessage(mail);
    }

    private void sendNotificationForFavorReservationForPenalty(FavorReservation favorReservation) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(favorReservation.getClient().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Got penalty!");
        mail.setText("You got one penalty for reservation of favor: " + favorReservation.getFavor().getName());
        emailService.sendSimpleMessage(mail);
    }

    private void sendNotificationToCottageOwner(CottageReservation cottageReservation) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(cottageReservation.getCottage().getOwner().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Successfully getting penalty!");
        mail.setText("Your report for " + cottageReservation.getClient().getFirstName() + " " +
                cottageReservation.getClient().getLastName() + " has been accepted. User got one penalty!");
        emailService.sendSimpleMessage(mail);
    }

    private void sendNotificationToShipOwner(ShipReservation shipReservation) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(shipReservation.getShip().getOwner().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Successfully getting penalty!");
        mail.setText("Your report for " + shipReservation.getClient().getFirstName() + " " +
                shipReservation.getClient().getLastName() + " has been accepted. User got one penalty!");
        emailService.sendSimpleMessage(mail);
    }

    private void sendNotificationToFavorOwner(FavorReservation favorReservation) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(favorReservation.getFavor().getInstructor().getEmail());
        mail.setFrom("rajkorajkeza@gmail.com");
        mail.setSubject("Successfully getting penalty!");
        mail.setText("Your report for " + favorReservation.getClient().getFirstName() + " " +
                favorReservation.getClient().getLastName() + " has been accepted. User got one penalty!");
        emailService.sendSimpleMessage(mail);
    }

    private void sendNotificationForDecliningReport(Report report) throws MailException {
        if(findCottageReservation(report) != null) {
            CottageReservation cr = findCottageReservation(report);
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(cr.getCottage().getOwner().getEmail());
            mail.setFrom("rajkorajkeza@gmail.com");
            mail.setSubject("Report declined!");
            mail.setText("Your report for " + cr.getClient().getFirstName() + " " +
                    cr.getClient().getLastName() + " has been declined! ");
            emailService.sendSimpleMessage(mail);
        } else if(findShipReservation(report) != null) {
            ShipReservation sr = findShipReservation(report);
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(sr.getShip().getOwner().getEmail());
            mail.setFrom("rajkorajkeza@gmail.com");
            mail.setSubject("Report declined!");
            mail.setText("Your report for " + sr.getClient().getFirstName() + " " +
                    sr.getClient().getLastName() + " has been declined! ");
            emailService.sendSimpleMessage(mail);
        } else {
            FavorReservation fr = findFavorReservation(report);
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(fr.getFavor().getInstructor().getEmail());
            mail.setFrom("rajkorajkeza@gmail.com");
            mail.setSubject("Report declined!");
            mail.setText("Your report for " + fr.getClient().getFirstName() + " " +
                    fr.getClient().getLastName() + " has been declined! ");
            emailService.sendSimpleMessage(mail);
        }

    }

    private CottageReservation findCottageReservation(Report report) {
        List<CottageReservation> cottageReservations = cottageReservationRepository.findAll();

        for(CottageReservation cr: cottageReservations) {
            if(cr.getReport() != null && cr.getReport().getId() == report.getId())
                return cr;
        }

        return null;
    }

    private FavorReservation findFavorReservation(Report report) {
        List<FavorReservation> favorReservations = favorReservationRepository.findAll();

        for(FavorReservation fr: favorReservations) {
            if(fr.getReport() != null && fr.getReport().getId() == report.getId())
                return fr;
        }

        return null;
    }

    private ShipReservation findShipReservation(Report report) {
        List<ShipReservation> shipReservations = shipReservationRepository.findAll();

        for(ShipReservation sr: shipReservations) {
            if(sr.getReport() != null && sr.getReport().getId() == report.getId())
                return sr;
        }

        return null;
    }
}
