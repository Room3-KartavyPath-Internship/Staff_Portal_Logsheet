package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.LogsheetTypeDTO;
import com.sunbeam.logsheet.DTO.ApiResponse;

import java.util.List;

public interface LogsheetTypeService {
    ApiResponse<LogsheetTypeDTO> addLogsheetType(LogsheetTypeDTO dto);
    ApiResponse<List<LogsheetTypeDTO>> getAllLogsheetTypes();
    ApiResponse<LogsheetTypeDTO> getLogsheetTypeById(Long id);
    ApiResponse<LogsheetTypeDTO> updateLogsheetType(Long id, LogsheetTypeDTO dto);
    ApiResponse<Boolean> deleteLogsheetType(Long id);
}
