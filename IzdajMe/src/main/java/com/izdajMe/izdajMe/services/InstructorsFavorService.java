package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Cottage;
import com.izdajMe.izdajMe.model.FavorHotOffer;
import com.izdajMe.izdajMe.model.InstructorsFavor;
import com.izdajMe.izdajMe.model.Ship;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public interface InstructorsFavorService {

    public List<InstructorsFavor> getAllFavors();
    public List<InstructorsFavor> getAllAvailableFavors(LocalDateTime from, LocalDateTime to, int numOfGuests);
    public Boolean deleteFavor(long id);
    public InstructorsFavor getFavorById(long id);
    public Boolean checkIsReserved(InstructorsFavor favor);
    public Boolean changeFavor(InstructorsFavor favor);
    public boolean isReserved(Long id);
    public Boolean removeFavorImg(InstructorsFavor favor);
    public Boolean uploadImg( MultipartFile file);
    public Boolean addHotOfferToFavor(InstructorsFavor favor);
    public InstructorsFavor addFavor(InstructorsFavor favor);
    public List<InstructorsFavor> getAllFavorsOfInstructor(String email);
    public List<FavorHotOffer> checkFavorHotOffers(List<FavorHotOffer> favorHotOffers);
    public Boolean isFavorAvailable(Long id, LocalDateTime from, LocalDateTime to, int numOfGuests);
    public Boolean deleteFavorHotOffer(InstructorsFavor favor);
    public List<InstructorsFavor> searchInstructorsFavorsByName(String email, String name);
    public List<InstructorsFavor> searchInstructorsFavorsByAddress(String email, String address);
}