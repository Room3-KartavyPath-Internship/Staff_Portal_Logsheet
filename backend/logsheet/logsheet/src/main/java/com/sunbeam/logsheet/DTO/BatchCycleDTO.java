package com.sunbeam.logsheet.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BatchCycleDTO {
	private Long id;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
}

