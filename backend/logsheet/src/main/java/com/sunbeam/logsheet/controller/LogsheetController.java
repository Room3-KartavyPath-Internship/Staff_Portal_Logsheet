package com.sunbeam.logsheet.controller;

import com.sunbeam.logsheet.DTO.LogsheetDTO;
import com.sunbeam.logsheet.DTO.LogsheetUpdateDTO;
import com.sunbeam.logsheet.DTO.VerifyLogRequest;
import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.DTO.ApproveLogRequest;
import com.sunbeam.logsheet.DTO.LogsheetCreateDTO;
import com.sunbeam.logsheet.service.LogsheetService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logsheets")
public class LogsheetController {

    private final LogsheetService logsheetService;

    public LogsheetController(LogsheetService logsheetService) {
        this.logsheetService = logsheetService;
    }

 
    @PostMapping
    public ResponseEntity<ApiResponse<LogsheetDTO>> addLogsheet(@RequestBody LogsheetCreateDTO dto) {
        LogsheetDTO created = logsheetService.addLogsheet(dto).getData();
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>("Logsheet Added Successfully", true, created));
    }


    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LogsheetDTO>> updateLogsheet(@PathVariable Long id, @RequestBody LogsheetUpdateDTO dto) {
        LogsheetDTO updated = logsheetService.updateLogsheet(id, dto).getData();
        return ResponseEntity.ok(new ApiResponse<>("Logsheet Updated Successfully", true, updated));
    }

 
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLogsheet(@PathVariable Long id) {
        logsheetService.deleteLogsheet(id);
        return ResponseEntity.ok(new ApiResponse<>("Logsheet Deleted Successfully", true, null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<LogsheetDTO>>> getAllLogsheets() {
        List<LogsheetDTO> list = logsheetService.getAllLogsheets().getData();
        return ResponseEntity.ok(new ApiResponse<>("All Logsheets", true, list));
    }

  
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LogsheetDTO>> getLogsheetById(@PathVariable Long id) {
        LogsheetDTO dto = logsheetService.getLogsheetById(id).getData();
        return ResponseEntity.ok(new ApiResponse<>("Logsheet Found", true, dto));
    }


    @PutMapping("/{id}/verify")
    public ResponseEntity<ApiResponse<LogsheetDTO>> verifyLogsheet(@PathVariable Long id,@RequestBody VerifyLogRequest request) {
        ApiResponse<LogsheetDTO> response = logsheetService.verifyLog(id, request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<LogsheetDTO>> approveLogsheet(@PathVariable Long id,@RequestBody ApproveLogRequest request) {
        ApiResponse<LogsheetDTO> response = logsheetService.approveLog(id, request);
        return ResponseEntity.ok(response);
    }
}
