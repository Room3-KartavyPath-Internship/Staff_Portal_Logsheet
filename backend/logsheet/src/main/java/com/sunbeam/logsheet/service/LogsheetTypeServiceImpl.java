package com.sunbeam.logsheet.service;

import com.sunbeam.logsheet.DTO.LogsheetTypeDTO;
import com.sunbeam.logsheet.entity.LogsheetType;
import com.sunbeam.logsheet.repository.LogsheetTypeRepository;
import com.sunbeam.logsheet.DTO.ApiResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LogsheetTypeServiceImpl implements LogsheetTypeService {
	

	@Autowired
    private LogsheetTypeRepository repository;
	@Autowired
    private ModelMapper mapper;

	
    @Override
    public ApiResponse<LogsheetTypeDTO> addLogsheetType(LogsheetTypeDTO dto) {
        LogsheetType entity = mapper.map(dto, LogsheetType.class);
        LogsheetType saved = repository.save(entity);
        return new ApiResponse<>("LogsheetType added successfully", true,
                mapper.map(saved, LogsheetTypeDTO.class));
    }

    @Override
    public ApiResponse<List<LogsheetTypeDTO>> getAllLogsheetTypes() {
        List<LogsheetTypeDTO> list = repository.findAll()
                .stream()
                .map(e -> mapper.map(e, LogsheetTypeDTO.class))
                .collect(Collectors.toList());
        return new ApiResponse<>("All logsheet types fetched", true, list);
    }

    @Override
    public ApiResponse<LogsheetTypeDTO> getLogsheetTypeById(Long id) {
        Optional<LogsheetType> entity = repository.findById(id);
        if (entity.isEmpty()) {
            return new ApiResponse<>("LogsheetType not found", false, null);
        }
        return new ApiResponse<>("LogsheetType found", true,
                mapper.map(entity.get(), LogsheetTypeDTO.class));
    }

    @Override
    public ApiResponse<LogsheetTypeDTO> updateLogsheetType(Long id, LogsheetTypeDTO dto) {
        Optional<LogsheetType> entityOpt = repository.findById(id);
        if (entityOpt.isEmpty()) {
            return new ApiResponse<>("LogsheetType not found", false, null);
        }
        LogsheetType entity = entityOpt.get();
        mapper.map(dto, entity); 
        LogsheetType updated = repository.save(entity);
        return new ApiResponse<>("LogsheetType updated successfully", true,
                mapper.map(updated, LogsheetTypeDTO.class));
    }

    
    @Override
    public ApiResponse<Boolean> deleteLogsheetType(Long id) {
        if (!repository.existsById(id)) {
            return new ApiResponse<>("LogsheetType not found", false);
        }
        repository.deleteById(id);
        return new ApiResponse<>("LogsheetType deleted successfully", true);
    }
}
