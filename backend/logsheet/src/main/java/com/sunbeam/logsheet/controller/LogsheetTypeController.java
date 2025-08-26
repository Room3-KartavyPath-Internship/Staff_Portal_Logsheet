package com.sunbeam.logsheet.controller;

import com.sunbeam.logsheet.DTO.LogsheetTypeDTO;
import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.service.LogsheetTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logsheet-types")
public class LogsheetTypeController {

    private final LogsheetTypeService logsheetTypeService;

    public LogsheetTypeController(LogsheetTypeService logsheetTypeService) {
        this.logsheetTypeService = logsheetTypeService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LogsheetTypeDTO>> addLogsheetType(@RequestBody LogsheetTypeDTO dto) {
        LogsheetTypeDTO created = logsheetTypeService.addLogsheetType(dto).getData();
        return ResponseEntity.ok(new ApiResponse<>("Logsheet Type Added Successfully", true, created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LogsheetTypeDTO>> updateLogsheetType(
            @PathVariable Long id,
            @RequestBody LogsheetTypeDTO dto) {
        LogsheetTypeDTO updated = logsheetTypeService.updateLogsheetType(id, dto).getData();
        return ResponseEntity.ok(new ApiResponse<>("Logsheet Type Updated Successfully", true, updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLogsheetType(@PathVariable Long id) {
        logsheetTypeService.deleteLogsheetType(id);
        return ResponseEntity.ok(new ApiResponse<>("Logsheet Type Deleted Successfully", true, null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<LogsheetTypeDTO>>> getAllLogsheetTypes() {
        List<LogsheetTypeDTO> list = logsheetTypeService.getAllLogsheetTypes().getData();
        return ResponseEntity.ok(new ApiResponse<>("All Logsheet Types", true, list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LogsheetTypeDTO>> getLogsheetTypeById(@PathVariable Long id) {
        LogsheetTypeDTO dto = logsheetTypeService.getLogsheetTypeById(id).getData();
        return ResponseEntity.ok(new ApiResponse<>("Logsheet Type Found", true, dto));
    }
}
