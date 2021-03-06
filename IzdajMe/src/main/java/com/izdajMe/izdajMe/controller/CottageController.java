package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.CottageDTO;
import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.CottageService;
import com.izdajMe.izdajMe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.InputStream;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class CottageController {
    @Autowired
    private CottageService cottageService;

    @GetMapping("/cottages/getAllCottagesOfOwner")
    public ResponseEntity<List<Cottage>> getAllCottagesOfOwner(@RequestParam("email") String email, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                return new ResponseEntity<List<Cottage>>(cottageService.getAllCottagesOfOwner(email), HttpStatus.OK);
            } else {
                return new ResponseEntity<List<Cottage>>(new ArrayList<Cottage>(), HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<List<Cottage>>(new ArrayList<Cottage>(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/cottages/getCottageById")
    public ResponseEntity<CottageDTO> getCottageById(@RequestParam("cottage") Long id) {
        Cottage cottage = cottageService.getCottageById(id);
        if (cottage != null) {
            return new ResponseEntity<CottageDTO>(new CottageDTO(cottage), HttpStatus.OK);
        } else {
            return new ResponseEntity<CottageDTO>(new CottageDTO(cottage), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/cottages/getAllCottages")
    public ResponseEntity<List<CottageDTO>> getAllCottages() {
        List<CottageDTO> list = new ArrayList<CottageDTO>();
        for (Cottage c : cottageService.getAllCottages()) {
            list.add(new CottageDTO(c));
        }
        return new ResponseEntity<List<CottageDTO>>(list, HttpStatus.OK);
    }

    @GetMapping("/cottages/getAllAvailableCottages")
    public ResponseEntity<List<CottageDTO>> getAllAvailableCottages(@RequestParam("from") String from, @RequestParam("to") String to, @RequestParam("numOfGuests") int numOfGuests){
        List<CottageDTO> availableCottages = new ArrayList<CottageDTO>();

        Timestamp fromDateTs = new Timestamp(Long.parseLong(from));
        Timestamp toDateTs = new Timestamp(Long.parseLong(to));
        LocalDateTime fromDate = fromDateTs.toLocalDateTime();
        LocalDateTime toDate = toDateTs.toLocalDateTime();

        for(Cottage c : cottageService.getAllAvailableCottages(fromDate, toDate, numOfGuests)) {
            availableCottages.add(new CottageDTO(c));
        }
        return new ResponseEntity<List<CottageDTO>>(availableCottages, HttpStatus.OK);
    }

    @PutMapping("/cottages/removeCottageImg")
    public ResponseEntity<Void> removeCottageImg(@RequestBody Cottage cottage, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                if (cottageService.removeCottageImg(cottage)) {
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

    @PostMapping("/cottages/removeCottage")
    public ResponseEntity<Void> removeCottage(@RequestBody Long id, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                if (cottageService.removeCottage(id)) {
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

    @PostMapping("/cottages/removeCottageByAdministrator")
    public ResponseEntity<Boolean> removeCottageByAdministrator(@RequestBody Long id, HttpServletRequest request) {
        return new ResponseEntity<Boolean>(cottageService.removeCottageByAdministrator(id), HttpStatus.OK);
    }

    @PostMapping("/cottages/uploadImg")
    public ResponseEntity<Boolean> uploadImg(@RequestPart("file") MultipartFile file, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                if (cottageService.uploadImg(file)) {
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

    @PostMapping("/cottages/addCottage")
    public ResponseEntity<CottageDTO> addCottage(@RequestBody Cottage cottage, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                return new ResponseEntity<CottageDTO>(new CottageDTO(cottageService.addCottage(cottage)), HttpStatus.OK);
            } else {
                return new ResponseEntity<CottageDTO>(new CottageDTO(), HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<CottageDTO>(new CottageDTO(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/cottages/changeCottage")
    public ResponseEntity<Boolean> changeCottage(@RequestBody Cottage cottage, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                if (cottageService.changeCottage(cottage)) {
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

    @PostMapping("/cottages/checkIsReserved")
    public ResponseEntity<Boolean> checkIsReserved(@RequestBody Cottage cottage, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                if (cottageService.checkIsReserved(cottage)) {
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

    @PutMapping("/cottages/removeHotOffer")
    public ResponseEntity<Boolean> removeHotOffer(@RequestBody Cottage cottage, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                if (cottageService.removeHotOffer(cottage)) {
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

    @PutMapping("/cottages/deleteHotOffer")
    public ResponseEntity<Boolean> deleteHotOffer(@RequestBody Cottage cottage, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                if (cottageService.deleteHotOffer(cottage)) {
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

    @PutMapping("/cottages/addHotOfferToCottage")
    public ResponseEntity<Boolean> addHotOfferToCottage(@RequestBody Cottage cottage, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.cottageAdvertiser) {
                return new ResponseEntity<Boolean>(cottageService.addHotOfferToCottage(cottage), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/cottages/searchCottagesByName")
    public ResponseEntity<List<Cottage>> searchCottagesByName(@RequestParam("name") String name) {
        return new ResponseEntity<List<Cottage>>(cottageService.searchCottagesByName(name), HttpStatus.OK);
    }

    @GetMapping("/cottages/searchCottagesByAddress")
    public ResponseEntity<List<Cottage>> searchCottagesByAddress(@RequestParam("address") String address) {
        return new ResponseEntity<List<Cottage>>(cottageService.searchCottagesByAddress(address), HttpStatus.OK);
    }

    @GetMapping("/cottages/searchCottagesByCost")
    public ResponseEntity<List<Cottage>> searchCottagesByCost(@RequestParam("minCost") Float minCost, @RequestParam("maxCost") Float maxCost) {
        return new ResponseEntity<List<Cottage>>(cottageService.searchCottagesByCost(minCost, maxCost), HttpStatus.OK);
    }

    @PostMapping("/cottages/addSubscribedUserToCottage")
    public ResponseEntity<Boolean> addSubscribedUserToCottage(@RequestBody Cottage cottage, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(cottageService.addSubscribedUserToCottage(cottage), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/cottages/removeSubscribedUserFromCottage")
    public ResponseEntity<Boolean> removeSubscribedUserFromCottage(@RequestBody Cottage cottage, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(cottageService.removeSubscribedUserFromCottage(cottage), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/cottages/getUsersSubscribedCottages")
    public ResponseEntity<List<Cottage>> getUsersSubscribedCottages(@RequestParam("email") String email, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<List<Cottage>>(cottageService.getUsersSubscribedCottages(email), HttpStatus.OK);
            } else {
                return new ResponseEntity<List<Cottage>>((List<Cottage>) null, HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity<List<Cottage>>((List<Cottage>) null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/cottages/isUserSubscribedToCottage")
    public ResponseEntity<Boolean> isUserSubscribedToCottage(@RequestParam("email") String email, @RequestParam("cottageId") Long cottageId, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                return new ResponseEntity<Boolean>(cottageService.isUserSubscribedToCottage(email, cottageId), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }
}
