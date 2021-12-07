package com.izdajMe.izdajMe.services;

import com.izdajMe.izdajMe.model.Administrator;
import com.izdajMe.izdajMe.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministratorServiceImpl implements AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepository;

    public Boolean loginAdministrator(Administrator administrator) {
        Administrator foundAdministrator = administratorRepository.findById(administrator.getId());
        if(foundAdministrator != null)
            return true;
        else
            return false;
    }
}
