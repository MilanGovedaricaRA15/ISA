package com.izdajMe.izdajMe.controller;

import com.izdajMe.izdajMe.dto.CottageDTO;
import com.izdajMe.izdajMe.dto.InstructorsFavorDTO;
import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.FavorHotOffer;
import com.izdajMe.izdajMe.model.InstructorsFavor;
import com.izdajMe.izdajMe.model.Ship;
import com.izdajMe.izdajMe.model.User;
import com.izdajMe.izdajMe.services.InstructorsFavorService;
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

public class InstructorsFavorController {
    @Autowired
    private InstructorsFavorService instructorsFavorService;

    @GetMapping("/favors/getAllFavors")
    public ResponseEntity<List<InstructorsFavor>> getAllFavors(){
        List<InstructorsFavor> allFavors = new ArrayList<>();
        for(InstructorsFavor instructorsFavor : instructorsFavorService.getAllFavors()) {
            allFavors.add(instructorsFavor);
        }

        return new ResponseEntity<List<InstructorsFavor>>(allFavors, HttpStatus.OK);
    }

    @GetMapping("/favors/getAllAvailableFavors")
    public ResponseEntity<List<InstructorsFavorDTO>> getAllAvailableCottages(@RequestParam("from") String from, @RequestParam("to") String to, @RequestParam("numOfGuests") int numOfGuests){
        List<InstructorsFavorDTO> availableFavors = new ArrayList<InstructorsFavorDTO>();

        Timestamp fromDateTs = new Timestamp(Long.parseLong(from));
        Timestamp toDateTs = new Timestamp(Long.parseLong(to));
        LocalDateTime fromDate = fromDateTs.toLocalDateTime();
        LocalDateTime toDate = toDateTs.toLocalDateTime();

        for(InstructorsFavor c : instructorsFavorService.getAllAvailableFavors(fromDate, toDate, numOfGuests)) {
            availableFavors.add(new InstructorsFavorDTO(c));
        }
        return new ResponseEntity<List<InstructorsFavorDTO>>(availableFavors, HttpStatus.OK);
    }

    @PostMapping("/favors/deleteFavor")
    public ResponseEntity<Boolean> deleteFavor(@RequestBody Long id){
        return new ResponseEntity<Boolean>(instructorsFavorService.deleteFavor(id), HttpStatus.OK);
    }

    @GetMapping("/favors/getFavorById")
    public ResponseEntity<InstructorsFavorDTO> getFavorById(@RequestParam("favor") Long id) {
        InstructorsFavor favor = instructorsFavorService.getFavorById(id);
        if (favor != null) {
            return new ResponseEntity<InstructorsFavorDTO>(new InstructorsFavorDTO(favor), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<InstructorsFavorDTO>(new InstructorsFavorDTO(favor), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/favors/changeFavor")
    public ResponseEntity<Boolean> changeFavor(@RequestBody InstructorsFavor favor, HttpServletRequest request){
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.instructor) {
                if (instructorsFavorService.changeFavor(favor)) {
                    return new ResponseEntity<Boolean>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/favors/checkIsReserved")
    public ResponseEntity<Boolean> checkIsReserved(@RequestBody InstructorsFavor favor, HttpServletRequest request){
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.instructor) {
                if (instructorsFavorService.checkIsReserved(favor)) {
                    return new ResponseEntity<Boolean>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<Boolean>(false, HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/favors/removeFavorImg")
    public ResponseEntity<Void> removeCottageImg(@RequestBody InstructorsFavor instructorsFavor, HttpServletRequest request){
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.instructor) {
                if (instructorsFavorService.removeFavorImg(instructorsFavor)) {
                    return ResponseEntity.ok(null);
                } else {
                    return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/favors/uploadImg")
    public ResponseEntity<Boolean> uploadImg(@RequestPart("file") MultipartFile file, HttpServletRequest request){
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.instructor) {
                if (instructorsFavorService.uploadImg(file)) {
                    return new ResponseEntity<Boolean>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
                }
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/favors/addHotOfferToFavor")
    public ResponseEntity<Boolean> addHotOfferToFavor(@RequestBody InstructorsFavor favor, HttpServletRequest request){
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.instructor) {
                return new ResponseEntity<Boolean>(instructorsFavorService.addHotOfferToFavor(favor), HttpStatus.OK);
            } else {
                return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<Boolean>(false, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/favors/getAllFavorsOfInstructor")
    public ResponseEntity<List<InstructorsFavor>> getAllFavorsOfInstructor(@RequestParam("email") String email, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.instructor) {
                return new ResponseEntity<List<InstructorsFavor>>(instructorsFavorService.getAllFavorsOfInstructor(email), HttpStatus.OK);
            } else {
                return new ResponseEntity<List<InstructorsFavor>>(new ArrayList<InstructorsFavor>(), HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<List<InstructorsFavor>>(new ArrayList<InstructorsFavor>(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/favors/getAllFavorsByInstructorsEmail")
    public ResponseEntity<List<InstructorsFavor>> getAllFavorsByInstructorsEmail(@RequestParam("email") String email, HttpServletRequest request) {
        return new ResponseEntity<List<InstructorsFavor>>(instructorsFavorService.getAllFavorsOfInstructor(email), HttpStatus.OK);
    }

    @PostMapping("/favors/addFavor")
    public ResponseEntity<InstructorsFavorDTO> addFavor(@RequestBody InstructorsFavor favor, HttpServletRequest request){
        if (request.getSession(false).getAttribute("role")!=null) {
            if (request.getSession(false).getAttribute("role") == User.Role.instructor) {
                return new ResponseEntity<InstructorsFavorDTO>(new InstructorsFavorDTO(instructorsFavorService.addFavor(favor)), HttpStatus.OK);
            } else {
                return new ResponseEntity<InstructorsFavorDTO>(new InstructorsFavorDTO(), HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            return new ResponseEntity<InstructorsFavorDTO>(new InstructorsFavorDTO(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/favors/deleteFavorHotOffer")
    public ResponseEntity<Boolean> deleteFavorHotOffer(@RequestBody InstructorsFavor favor, HttpServletRequest request) {
        if (request.getSession(false).getAttribute("role") != null) {
            if (request.getSession(false).getAttribute("role") == User.Role.client) {
                if (instructorsFavorService.deleteFavorHotOffer(favor)) {
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

    @GetMapping("/favors/searchInstructorsFavorsByName")
    public ResponseEntity<List<InstructorsFavor>> searchInstructorsFavorsByName(@RequestParam("email") String email, @RequestParam("name") String name) {
        return new ResponseEntity<List<InstructorsFavor>>(instructorsFavorService.searchInstructorsFavorsByName(email, name), HttpStatus.OK);
    }

    @GetMapping("/favors/searchInstructorsFavorsByAddress")
    public ResponseEntity<List<InstructorsFavor>> searchInstructorsFavorsByAddress(@RequestParam("email") String email, @RequestParam("address") String address) {
        return new ResponseEntity<List<InstructorsFavor>>(instructorsFavorService.searchInstructorsFavorsByAddress(email, address), HttpStatus.OK);
    }
}
