package com.sunbeam.logsheet.DTO;



import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
   
    
    public ApiResponse(String message) {
		this.message = message;
		
		
	}
    
	public ApiResponse( String message,boolean success) {
	
		this.message = message;
		this.success = success;
		
	}

	public ApiResponse( String message,boolean success, T data) {
		
		this.message = message;
		this.success = success;
		this.data = data;
	}
	
	
    
    
}
