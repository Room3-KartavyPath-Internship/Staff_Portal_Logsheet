//package com.sunbeam.logsheet.DTO;
//
//
//import java.time.LocalDateTime;
//
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@NoArgsConstructor
//
//public class ApiResponse {
//    private boolean success;
//    private String message;
//    private LocalDateTime timeStamp;
//    private Object data; 
//    
//    public ApiResponse(String message, boolean success, Object data) {
//        this.message = message;
//        this.success = success;
//        this.timeStamp = LocalDateTime.now();
//        this.data = data;
//    }
//    
//	public ApiResponse( String message,boolean success) {
//	
//		this.message = message;
//		this.success = success;
//		this.timeStamp = LocalDateTime.now();
//	}
//    
//    
//}

package com.sunbeam.logsheet.DTO;

import java.time.LocalDateTime;
import lombok.*;

@Data
@NoArgsConstructor


public class ApiResponse {
    private boolean success;
    private String message;
    private LocalDateTime timeStamp;
    
    // Convenience constructors
    public ApiResponse(String message) {
        this.message = message;
        this.success = false; // default failure
        this.timeStamp = LocalDateTime.now();
       
    }

    public ApiResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
        this.timeStamp = LocalDateTime.now();
       
    }

    
}

