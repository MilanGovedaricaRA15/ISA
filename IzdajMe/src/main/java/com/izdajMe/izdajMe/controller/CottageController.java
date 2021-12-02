package com.izdajMe.izdajMe.controller;

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

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class CottageController {
    @Autowired
    private CottageService cottageService ;

    @GetMapping("/cottages/getAllCottagesOfOwner")
    public ResponseEntity<List<Cottage>> getAllCottagesOfOwner(@RequestParam("email") String email) {
        return new ResponseEntity<List<Cottage>>(cottageService.getAllCottagesOfOwner(email), HttpStatus.OK);
    }

    @GetMapping("/cottages/getCottageById")
    public ResponseEntity<Cottage> getCottageById(@RequestParam("cottage") Long id) {
        Cottage cottage = cottageService.getCottageById(id);
        if (cottage != null) {
            return new ResponseEntity<Cottage>(cottage, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Cottage>(cottage, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/cottages/getAllCottages")
    public ResponseEntity<List<Cottage>> getAllCottages(){
        return new ResponseEntity<List<Cottage>>(cottageService.getAllCottages(),HttpStatus.OK);
    }
    @PutMapping("/cottages/removeCottageImg")
    public ResponseEntity<Void> removeCottageImg(@RequestBody Cottage cottage){
       if(cottageService.removeCottageImg(cottage)){
           return ResponseEntity.ok(null);
        }
        else{
           return new ResponseEntity<>(null,HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @PostMapping("/cottages/removeCottage")
    public ResponseEntity<Void> removeCottage(@RequestBody Long id){
        if(cottageService.removeCottage(id)){
           return ResponseEntity.ok(null);
        }
        else{
           return new ResponseEntity<>(null,HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @PostMapping("/cottages/uploadImg")
    public ResponseEntity<Boolean> uploadImg(@RequestPart("file") MultipartFile file){
        if(cottageService.uploadImg(file)){
           return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }
        else{
           return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/cottages/addCottage")
    public ResponseEntity<Cottage> addCottage(@RequestBody Cottage cottage){
        return new ResponseEntity<Cottage>(cottageService.addCottage(cottage),HttpStatus.OK);
    }

    @PutMapping("/cottages/changeCottage")
    public ResponseEntity<Void> changeCottage(@RequestBody Cottage cottage){
       if(cottageService.changeCottage(cottage)){
          return ResponseEntity.ok(null);
       }
       else{
          return new ResponseEntity<>(null,HttpStatus.NOT_ACCEPTABLE);
       }
    }

    @PutMapping("/cottages/addHotOfferToCottage")
    public ResponseEntity<Boolean> addHotOfferToCottage(@RequestBody Cottage cottage){
        return new ResponseEntity<Boolean>(cottageService.addHotOfferToCottage(cottage),HttpStatus.OK);
    }
}
