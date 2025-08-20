package com.sunbeam.logsheet.service;

import java.util.List;

import com.sunbeam.logsheet.entity.BatchCycle;

public interface IBatchCycleService {
	 BatchCycle addBatchCycle(BatchCycle batchCycle);
	    List<BatchCycle> getAllBatchCycles();
	    BatchCycle getBatchCycleById(Long id);
	    BatchCycle updateBatchCycle(Long id, BatchCycle updatedCycle);
	    void deleteBatchCycle(Long id);
}
