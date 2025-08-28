package com.sunbeam.logsheet.service;

import java.util.List;

import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.entity.BatchCycle;

public interface IBatchCycleService {
	 BatchCycle addBatchCycle(BatchCycle batchCycle);
	    List<BatchCycle> getAllBatchCycles();
	    BatchCycle getBatchCycleById(Long id);
	    ApiResponse<?> updateBatchCycle(Long id, BatchCycle updatedCycle);

	    ApiResponse<?> deleteBatchCycle(Long id);
}
