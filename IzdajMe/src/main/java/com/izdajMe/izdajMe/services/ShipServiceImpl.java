package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.*;
import com.izdajMe.izdajMe.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShipServiceImpl implements ShipService {
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private ShipReservationRepository shipReservationRepository;
    @Autowired
    private ConcurentWatcherRepository concurentWatcherRepository;

    @Override
    public List<Ship> getAllShips() {
        Iterable<Ship> allShips = shipRepository.findAll();
        ArrayList<Ship> allShipsList = new ArrayList<Ship>();
        allShips.forEach(allShipsList::add);

        return allShipsList;
    }

    @Override
    public List<Ship> getAllAvailableShips(LocalDateTime from, LocalDateTime to, int numOfGuests) {
        Iterable<Ship> allCottages = getAllShips();
        ArrayList<Ship> allAvailableShips = new ArrayList<>();

        for (Ship s : allCottages) {
            if (isShipAvailable(s.getId(), from, to, numOfGuests)) {
                allAvailableShips.add(s);
            }
        }

        return allAvailableShips;
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
            if (s.getName().toLowerCase().contains(name.toLowerCase())) {
                searchedShips.add(s);
            }
        }

        return searchedShips;
    }

    @Override
    public float getShipAverageGrade(Long id) {
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

    public List<Ship> getAllShipsOfOwner(String email) {
        List<Ship> ownerShipsList = shipRepository.findAllByShipEmail(email);
        return ownerShipsList;
    }

    public Boolean removeShipImg(Ship ship) {
        if (!isReserved(ship.getId())) {
            shipRepository.save(ship);
            return true;
        } else {
            return false;
        }
    }

    public Boolean removeShip(Long id) {
        if (!isReserved(id)) {
            shipRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Boolean removeShipByAdministrator(Long id) {
        if (!isReserved(id)) {
            shipRepository.deleteById(id);
        } else {
            removeShipReservations(id);
            shipRepository.deleteById(id);
        }
        return true;
    }

    private void removeShipReservations(long id) {
        List<ShipReservation> shipReservations = shipReservationRepository.findAllByShipId(id);
        if (shipReservations.size() != 0) {
            for (ShipReservation sr : shipReservations) {
                shipReservationRepository.delete(sr);
            }
        }
    }

    public Boolean checkIsReserved(Ship ship) {
        if (!isReserved(ship.getId())) {
            return true;
        } else {
            return false;
        }
    }

    @Transactional(readOnly = false)
    public Boolean changeShip(Ship ship) {
        if (concurentWatcherRepository.findByTableName("ShipReservation").getWriting() == false) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("Ship");
            cw.setWriting(true);
            if (!isReserved(ship.getId())) {
                shipRepository.save(ship);
                cw.setWriting(false);
                concurentWatcherRepository.save(cw);
                return true;
            } else {
                cw.setWriting(false);
                concurentWatcherRepository.save(cw);
                return false;
            }
        } else {
            return false;
        }
    }

    @Transactional(readOnly = false)
    public Boolean removeHotOffer(Ship ship) {
        if (concurentWatcherRepository.findByTableName("ShipReservation").getWriting() == false) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("ShipHotOffer");
            cw.setWriting(true);
            if (shipRepository.existsById(ship.getId())) {
                shipRepository.save(ship);
                cw.setWriting(false);
                concurentWatcherRepository.save(cw);
                return true;
            } else {
                cw.setWriting(false);
                concurentWatcherRepository.save(cw);
                return false;
            }
        } else {
            return false;
        }
    }

    public Boolean deleteShipHotOffer(Ship ship) {
        if (shipRepository.existsById(ship.getId())) {
            shipRepository.save(ship);
            return true;
        }

        return false;
    }

    public Boolean canAddHotOffer(List<ShipHotOffer> hotOffers, ShipHotOffer addedHotOffer, List<ShipReservation> shipReservations) {
        boolean slobodno = true;
        for (ShipHotOffer hotOffer1 : hotOffers) {
            if (addedHotOffer.getAvailableFrom().isBefore(hotOffer1.getAvailableFrom()) && addedHotOffer.getAvailableTill().isAfter(hotOffer1.getAvailableFrom())) {
                slobodno = false;
                break;
            }
            if (addedHotOffer.getAvailableFrom().isBefore(hotOffer1.getAvailableTill()) && addedHotOffer.getAvailableTill().isAfter(hotOffer1.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (hotOffer1.getAvailableFrom().isBefore(addedHotOffer.getAvailableFrom()) && hotOffer1.getAvailableTill().isAfter(addedHotOffer.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (hotOffer1.getAvailableFrom().isEqual(addedHotOffer.getAvailableFrom()) || hotOffer1.getAvailableTill().isEqual(addedHotOffer.getAvailableTill()) || hotOffer1.getAvailableTill().isEqual(addedHotOffer.getAvailableFrom()) || hotOffer1.getAvailableFrom().isEqual(addedHotOffer.getAvailableTill())) {
                slobodno = false;
                break;
            }
        }
        if (addedHotOffer.getAvailableFrom().equals(addedHotOffer.getAvailableTill())) {
            slobodno = false;
        }
        if (addedHotOffer.getAvailableFrom().isAfter(addedHotOffer.getAvailableTill())) {
            slobodno = false;
        }

        for (ShipReservation shipReservation : shipReservations) {
            if (addedHotOffer.getAvailableFrom().isBefore(shipReservation.getAvailableFrom()) && addedHotOffer.getAvailableTill().isAfter(shipReservation.getAvailableFrom())) {
                slobodno = false;
                break;
            }
            if (addedHotOffer.getAvailableFrom().isBefore(shipReservation.getAvailableTill()) && addedHotOffer.getAvailableTill().isAfter(shipReservation.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (shipReservation.getAvailableFrom().isBefore(addedHotOffer.getAvailableFrom()) && shipReservation.getAvailableTill().isAfter(addedHotOffer.getAvailableTill())) {
                slobodno = false;
                break;
            }
            if (shipReservation.getAvailableFrom().isEqual(addedHotOffer.getAvailableFrom()) || shipReservation.getAvailableTill().isEqual(addedHotOffer.getAvailableTill()) || shipReservation.getAvailableTill().isEqual(addedHotOffer.getAvailableFrom()) || shipReservation.getAvailableFrom().isEqual(addedHotOffer.getAvailableTill())) {
                slobodno = false;
                break;
            }
        }


        return slobodno;
    }

    @Transactional(readOnly = false)
    public Boolean addHotOfferToShip(Ship ship) {
        if (concurentWatcherRepository.findByTableName("ShipReservation").getWriting() == false) {
            ConcurentWatcher cw = concurentWatcherRepository.findByTableName("ShipHotOffer");
            cw.setWriting(true);
            List<ShipHotOffer> shipHotOffers = ship.getHotOffers();
            Ship ship1 = shipRepository.findById(ship.getId()).get();
            List<ShipHotOffer> hotOffersWithout = ship1.getHotOffers();
            List<ShipReservation> allThisShipReservations = shipReservationRepository.findAllByShipId(ship.getId());

            ShipHotOffer addedHotOffer = new ShipHotOffer();
            boolean postoji = false;
            for (ShipHotOffer offer : shipHotOffers) {
                postoji = false;
                for (ShipHotOffer offer1 : ship1.getHotOffers()) {
                    if (offer1.getId() == offer.getId()) {
                        postoji = true;
                        break;
                    }
                }
                if (!postoji) {
                    addedHotOffer = offer;
                    break;
                }
            }
            boolean slobodno = canAddHotOffer(hotOffersWithout, addedHotOffer, allThisShipReservations);

            if (slobodno) {
                shipRepository.save(ship);
            }
            cw.setWriting(false);
            concurentWatcherRepository.save(cw);
            return slobodno;
        } else {
            return false;
        }
    }


    public Ship addShip(Ship ship) {
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

    public Boolean uploadImg(MultipartFile file) {

        String orgName = file.getOriginalFilename();

        String filePath = "../front/src/assets/images/" + orgName + ".jpg";
        File dest = new File(filePath);
        if (!dest.exists()) {

        }
        try {
            file.transferTo(Paths.get(filePath));
            return true;
        } catch (IllegalStateException | IOException e) {
            return false;
        }
    }

    public boolean isReserved(Long id) {
        List<ShipReservation> allShipReservationsList = shipReservationRepository.findAllByShipId(id);
        for (ShipReservation shipReservation : allShipReservationsList) {
            if (LocalDateTime.now().isBefore(shipReservation.getAvailableTill())) {
                return true;
            }
        }
        return false;
    }

    public boolean isShipAvailable(long id, LocalDateTime from, LocalDateTime to, int numOfGuests) {
        Ship s = shipRepository.findById(id).get();
        if (from.compareTo(s.getAvailableTill()) > 0 || to.compareTo(s.getAvailableTill()) > 0  ||
                to.compareTo(s.getAvailableFrom()) < 0 || from.compareTo(s.getAvailableFrom()) < 0 ) {
            return false;
        } else {
            if (isReservedFromTill(id, from, to)) {
                return false;
            } else {
                if (s.getCapacity() < numOfGuests) {
                    return false;
                }
            }
        }

        return true;
    }

    public boolean isReservedFromTill(long id, LocalDateTime from, LocalDateTime to) {
        List<ShipReservation> cottageReservations = shipReservationRepository.findAllByShipId(id);

        for (ShipReservation s : cottageReservations) {
            if ((from.compareTo(s.getAvailableFrom()) > 0 && from.compareTo(s.getAvailableTill()) < 0) ||
                    (to.compareTo(s.getAvailableFrom()) > 0 && to.compareTo(s.getAvailableTill()) < 0) ||
                    (from.compareTo(s.getAvailableFrom()) < 0 && to.compareTo(s.getAvailableTill()) > 0)) {
                return true;
            }
        }

        return false;
    }

    @Override
    public Boolean addSubscribedUserToShip(Ship ship) {
        shipRepository.save(ship);
        return true;
    }

    @Override
    public Boolean removeSubscribedUserFromShip(Ship ship) {
        shipRepository.save(ship);
        return true;
    }

    @Override
    public List<Ship> getUsersSubscribedShips(String email) {
        List<Ship> usersSubscribedShips = new ArrayList<Ship>();
        List<Ship> allShips = shipRepository.findAll();

        for (Ship s : allShips) {
            for (User u : s.getSubscribedUsers()) {
                if (u.getEmail().equals(email)) {
                    usersSubscribedShips.add(s);
                    break;
                }
            }
        }

        return usersSubscribedShips;
    }

    @Override
    public Boolean isUserSubscribedToShip(String email, Long shipId) {
        List<Ship> usersSubscribedShips = getUsersSubscribedShips(email);

        for (Ship s : usersSubscribedShips) {
            if (s.getId() == shipId) {
                return true;
            }
        }

        return false;
    }
}
