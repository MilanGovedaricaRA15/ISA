package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.CottageDTO;
import com.izdajMe.izdajMe.dto.ShipDTO;
import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.Ship;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ShipController {
    @Autowired
    private ShipService shipService;

    @GetMapping("/ships/getShipById")
    public ResponseEntity<Ship> getShipById(@RequestParam("ship") Long id) {
        Ship ship = shipService.getShipById(id);
        if (ship != null) {
            return new ResponseEntity<Ship>(ship, HttpStatus.OK);
        } else {
            return new ResponseEntity<Ship>(ship, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/ships/getAllShips")
    public ResponseEntity<List<Ship>> getAllShips() {
        List<Ship> allShips = new ArrayList<>();
        for (Ship ship : shipService.getAllShips()) {
            allShips.add(ship);
        }

        return new ResponseEntity<List<Ship>>(allShips, HttpStatus.OK);
    }

    @GetMapping("/ships/getAllAvailableShips")
    public ResponseEntity<List<ShipDTO>> getAllAvailableShips(@RequestParam("from") String from, @RequestParam("to") String to, @RequestParam("numOfGuests") int numOfGuests){
        List<ShipDTO> availableShips = new ArrayList<>();

        Timestamp fromDateTs = new Timestamp(Long.parseLong(from));
        Timestamp toDateTs = new Timestamp(Long.parseLong(to));
        LocalDateTime fromDate = fromDateTs.toLocalDateTime();
        LocalDateTime toDate = toDateTs.toLocalDateTime();

        for(Ship ship : shipService.getAllAvailableShips(fromDate, toDate, numOfGuests)) {
            availableShips.add(new ShipDTO(ship));
        }

        return new ResponseEntity<List<ShipDTO>>(availableShips, HttpStatus.OK);
    }

    @GetMapping("/ships/searchShipsByName")
    public ResponseEntity<List<Ship>> searchShipsByName(@RequestParam("name") String name) {
        return new ResponseEntity<List<Ship>>(shipService.searchShipsByName(name), HttpStatus.OK);
    }

    @GetMapping("/ships/searchShipsByAddress")
    public ResponseEntity<List<Ship>> searchShipsByAddress(@RequestParam("address") String address) {
        return new ResponseEntity<List<Ship>>(shipService.searchShipsByAddress(address), HttpStatus.OK);
    }

    @GetMapping("/ships/searchShipsByCost")
    public ResponseEntity<List<Ship>> searchShipsByCost(@RequestParam("minCost") Float minCost, @RequestParam("maxCost") Float maxCost) {
        return new ResponseEntity<List<Ship>>(shipService.searchShipsByCost(minCost, maxCost), HttpStatus.OK);
    }

    @GetMapping("/ships/getShipAverageGrade")
    public ResponseEntity<Float> getShipAverageGrade(@RequestParam("id") Long id) {
        return new ResponseEntity<Float>(shipService.getShipAverageGrade(id), HttpStatus.OK);
    }

    @GetMapping("/ships/getAllShipsOfOwner")
    public ResponseEntity<List<Ship>> getAllShipsOfOwner(@RequestParam("email") String email, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                return new ResponseEntity<List<Ship>>(shipService.getAllShipsOfOwner(email), HttpStatus.OK);
            } else {
                return new ResponseEntity<List<Ship>>(new ArrayList<Ship>(), HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<List<Ship>>(new ArrayList<Ship>(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/ships/removeShipImg")
    public ResponseEntity<Void> removeShipImg(@RequestBody Ship ship, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                if (shipService.removeShipImg(ship)) {
                    return ResponseEntity.ok(null);
                } else {
                    return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/ships/removeShip")
    public ResponseEntity<Void> removeShip(@RequestBody Long id, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                if (shipService.removeShip(id)) {
                    return ResponseEntity.ok(null);
                } else {
                    return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/ships/removeShipByAdministrator")
    public ResponseEntity<Boolean> removeShipByAdministrator(@RequestBody Long id, HttpServletRequest request) {
        return new ResponseEntity<Boolean>(shipService.removeShipByAdministrator(id), HttpStatus.OK);
    }

    @PostMapping("/ships/uploadImg")
    public ResponseEntity<Boolean> uploadImg(@RequestPart("file") MultipartFile file, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                if (shipService.uploadImg(file)) {
                    return new ResponseEntity<Boolean>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/ships/addShip")
    public ResponseEntity<ShipDTO> addShip(@RequestBody Ship ship, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                return new ResponseEntity<ShipDTO>(new ShipDTO(shipService.addShip(ship)), HttpStatus.OK);
            } else {
                return new ResponseEntity<ShipDTO>(new ShipDTO(), HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<ShipDTO>(new ShipDTO(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/ships/changeShip")
    public ResponseEntity<Boolean> changeShip(@RequestBody Ship ship, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                if (shipService.changeShip(ship)) {
                    return new ResponseEntity<Boolean>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/ships/checkIsReserved")
    public ResponseEntity<Boolean> checkIsReserved(@RequestBody Ship ship, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                if (shipService.checkIsReserved(ship)) {
                    return new ResponseEntity<Boolean>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<Boolean>(false, HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/ships/removeHotOffer")
    public ResponseEntity<Boolean> removeHotOffer(@RequestBody Ship ship, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                if (shipService.removeHotOffer(ship)) {
                    return new ResponseEntity<Boolean>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/ships/deleteShipHotOffer")
    public ResponseEntity<Boolean> deleteShipHotOffer(@RequestBody Ship ship, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                if (shipService.deleteShipHotOffer(ship)) {
                    return new ResponseEntity<Boolean>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/ships/addHotOfferToShip")
    public ResponseEntity<Boolean> addHotOfferToShip(@RequestBody Ship ship, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.boatAdvertiser) {
                return new ResponseEntity<Boolean>(shipService.addHotOfferToShip(ship), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/ships/addSubscribedUserToShip")
    public ResponseEntity<Boolean> addSubscribedUserToShip(@RequestBody Ship ship, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(shipService.addSubscribedUserToShip(ship), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/ships/removeSubscribedUserFromShip")
    public ResponseEntity<Boolean> removeSubscribedUserFromShip(@RequestBody Ship ship, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(shipService.removeSubscribedUserFromShip(ship), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/ships/getUsersSubscribedShips")
    public ResponseEntity<List<Ship>> getUsersSubscribedShips(@RequestParam("email") String email, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<List<Ship>>(shipService.getUsersSubscribedShips(email), HttpStatus.OK);
            } else {
                return new ResponseEntity<List<Ship>>((List<Ship>) null, HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity<List<Ship>>((List<Ship>) null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/ships/isUserSubscribedToShip")
    public ResponseEntity<Boolean> isUserSubscribedToShip(@RequestParam("email") String email, @RequestParam("shipId") Long shipId, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(shipService.isUserSubscribedToShip(email, shipId), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }
}
