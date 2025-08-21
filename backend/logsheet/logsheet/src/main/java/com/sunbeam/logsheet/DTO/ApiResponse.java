package com.sunbeam.logsheet.DTO;


import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class ApiResponse {
    private boolean success;
    private String message;
    private LocalDateTime timeStamp;
    
    public ApiResponse(String message) {
		this.message = message;
		this.timeStamp = LocalDateTime.now();
		
	}
    
	public ApiResponse( String message,boolean success) {
	
		this.message = message;
		this.success = success;
		this.timeStamp = LocalDateTime.now();
	}
    
    
}
