package com.sunbeam.logsheet.service;

import java.util.List;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.entity.Premises;

public interface PremisesService {
    Premises addPremises(Premises premises);
    List<Premises> getAllPremises();
    Premises getPremisesById(Long id);
    ApiResponse<?> updatePremises(Long id, Premises updatedPremises);
    ApiResponse<?> deletePremises(Long id);

}
