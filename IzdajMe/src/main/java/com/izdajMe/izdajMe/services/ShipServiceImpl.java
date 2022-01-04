package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShipServiceImpl implements  ShipService {
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private ShipReservationRepository shipReservationRepository;

    @Override
    public List<Ship> getAllShips() {
        Iterable<Ship> allShips = shipRepository.findAll();
        ArrayList<Ship> allShipsList = new ArrayList<Ship>();
        allShips.forEach(allShipsList::add);

        return allShipsList;
    }

    @Override
    public Ship getShipById(Long id) {
        return shipRepository.findById(id).get();
    }

    @Override
    public List<Ship> searchShipsByName(String name) {
        List<Ship> searchedShips = new ArrayList<>();

        List<Ship> ships = shipRepository.findAll();
        for (Ship s : ships) {
            if (s.getName().toLowerCase().contains(name.toLowerCase())){
                searchedShips.add(s);
            }
        }

        return searchedShips;
    }

    @Override
    public float getShipAverageGrade(Long id){
        float averageGrade = 0.0F;
        int sum = 0;

        List<Grade> grades = this.getShipById(id).getGrades();
        for (Grade g : grades) {
            sum += g.getValue();
        }
        if (grades.size() > 0) {
            averageGrade = (float) sum / grades.size();
        }

        return averageGrade;
    }

    public List<Ship> getAllShipsOfOwner(String email){
        List<Ship> ownerShipsList = shipRepository.findAllByShipEmail(email);
        return ownerShipsList;
    }

    public Boolean removeShipImg(Ship ship){
        if(!isReserved(ship.getId())) {
            shipRepository.save(ship);
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean removeShip(Long id){
        if(!isReserved(id)) {
            shipRepository.deleteById(id);
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean checkIsReserved(Ship ship){
        if(!isReserved(ship.getId())) {
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean changeShip(Ship ship){
        if(!isReserved(ship.getId())) {
            shipRepository.save(ship);
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean removeHotOffer(Ship ship){
        if(shipRepository.existsById(ship.getId())) {
            shipRepository.save(ship);
            return true;
        }
        else{
            return false;
        }
    }

    public Boolean canAddHotOffer(List<ShipHotOffer> hotOffers, ShipHotOffer addedHotOffer, List<ShipReservation> shipReservations){
        boolean slobodno = true;
        for(ShipHotOffer hotOffer1 : hotOffers) {
            if(addedHotOffer.getAvailableFrom().isBefore(hotOffer1.getAvailableFrom()) && addedHotOffer.getAvailableTill().isAfter(hotOffer1.getAvailableFrom())){
                slobodno = false;
                break;
            }
            if(addedHotOffer.getAvailableFrom().isBefore(hotOffer1.getAvailableTill()) && addedHotOffer.getAvailableTill().isAfter(hotOffer1.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(hotOffer1.getAvailableFrom().isBefore(addedHotOffer.getAvailableFrom()) && hotOffer1.getAvailableTill().isAfter(addedHotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(hotOffer1.getAvailableFrom().isEqual(addedHotOffer.getAvailableFrom()) || hotOffer1.getAvailableTill().isEqual(addedHotOffer.getAvailableTill()) || hotOffer1.getAvailableTill().isEqual(addedHotOffer.getAvailableFrom()) || hotOffer1.getAvailableFrom().isEqual(addedHotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
        }
        if(addedHotOffer.getAvailableFrom().equals(addedHotOffer.getAvailableTill())){
            slobodno = false;
        }
        if(addedHotOffer.getAvailableFrom().isAfter(addedHotOffer.getAvailableTill())){
            slobodno = false;
        }

        for(ShipReservation shipReservation : shipReservations) {
            if(addedHotOffer.getAvailableFrom().isBefore(shipReservation.getAvailableFrom()) && addedHotOffer.getAvailableTill().isAfter(shipReservation.getAvailableFrom())){
                slobodno = false;
                break;
            }
            if(addedHotOffer.getAvailableFrom().isBefore(shipReservation.getAvailableTill()) && addedHotOffer.getAvailableTill().isAfter(shipReservation.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(shipReservation.getAvailableFrom().isBefore(addedHotOffer.getAvailableFrom()) && shipReservation.getAvailableTill().isAfter(addedHotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
            if(shipReservation.getAvailableFrom().isEqual(addedHotOffer.getAvailableFrom()) || shipReservation.getAvailableTill().isEqual(addedHotOffer.getAvailableTill()) || shipReservation.getAvailableTill().isEqual(addedHotOffer.getAvailableFrom()) || shipReservation.getAvailableFrom().isEqual(addedHotOffer.getAvailableTill())){
                slobodno = false;
                break;
            }
        }


        return slobodno;
    }

    public Boolean addHotOfferToShip(Ship ship){
        List<ShipHotOffer> shipHotOffers = ship.getHotOffers();
        Ship ship1 = shipRepository.findById(ship.getId()).get();
        List<ShipHotOffer> hotOffersWithout = ship1.getHotOffers();
        List<ShipReservation> allThisShipReservations = shipReservationRepository.findAllByShipId(ship.getId());

        ShipHotOffer addedHotOffer = new ShipHotOffer();
        boolean postoji = false;
        for (ShipHotOffer offer : shipHotOffers){
            postoji = false;
            for(ShipHotOffer offer1 : ship1.getHotOffers()){
                if (offer1.getId() == offer.getId()){
                    postoji = true;
                    break;
                }
            }
            if(!postoji){
                addedHotOffer = offer;
                break;
            }
        }
        boolean slobodno = canAddHotOffer(hotOffersWithout,addedHotOffer,allThisShipReservations);

        if(slobodno){
            shipRepository.save(ship);
        }
        return slobodno;
    }



    public Ship addShip(Ship ship){
        shipRepository.save(ship);
        ship.setHotOffers(new ArrayList<ShipHotOffer>());
        ship.setImages(new ArrayList<String>());
        ship.setPriceList(new ArrayList<ShipServicePrice>());
        ship.setServices(new ArrayList<Ship.Services>());
        ship.setGrades(new ArrayList<Grade>());
        ship.setFishingEquipment(new ArrayList<FishingEquipment>());
        ship.setNavigationEquipment(new ArrayList<NavigationEquipment>());
        return ship;
    }

    public Boolean uploadImg(MultipartFile file){

        String orgName = file.getOriginalFilename();

        String filePath = "../front/src/assets/images/" + orgName +".jpg";
        File dest = new File(filePath);
        if(!dest.exists())
        {

        }
        try {
            file.transferTo(Paths.get(filePath));
            return true;
        }
        catch (IllegalStateException | IOException e)
        {
            e.printStackTrace();
            return false;
        }
    }

    public boolean isReserved(Long id){
        List<ShipReservation> allShipReservationsList = shipReservationRepository.findAllByShipId(id);
        for(ShipReservation shipReservation : allShipReservationsList){
            if(LocalDateTime.now().isBefore(shipReservation.getAvailableTill())){
                return true;
            }
        }
        return false;
    }
}
