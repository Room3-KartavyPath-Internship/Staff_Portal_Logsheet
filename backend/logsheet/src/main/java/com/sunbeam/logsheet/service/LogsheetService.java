package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.*;
import com.sunbeam.logsheet.DTO.ApiResponse;

import java.util.List;

public interface LogsheetService {
    ApiResponse<LogsheetDTO> addLogsheet(LogsheetDTO dto);
    ApiResponse<List<LogsheetDTO>> getAllLogsheets();
    ApiResponse<LogsheetDTO> getLogsheetById(Long id);
    ApiResponse<LogsheetDTO> updateLogsheet(Long id, LogsheetDTO dto);
    ApiResponse<Boolean> deleteLogsheet(Long id);

    ApiResponse<LogsheetDTO> verifyLog(Long id, VerifyLogRequest request);
    ApiResponse<LogsheetDTO> approveLog(Long id, ApproveLogRequest request);
}
