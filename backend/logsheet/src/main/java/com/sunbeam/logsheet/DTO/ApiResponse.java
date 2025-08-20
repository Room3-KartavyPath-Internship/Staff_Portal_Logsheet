<<<<<<< HEAD
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
=======



package com.sunbeam.logsheet.DTO;


import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;
>>>>>>> 1fa5b1c17e818556e1b9769b665cab1d4521cc2f

@Data
@NoArgsConstructor


public class ApiResponse {
    private boolean success;
    private String message;
    private LocalDateTime timeStamp;
<<<<<<< HEAD
    
=======

    private Object data;

>>>>>>> 1fa5b1c17e818556e1b9769b665cab1d4521cc2f
    // Convenience constructors
    public ApiResponse(String message) {
        this.message = message;
        this.success = false; // default failure
        this.timeStamp = LocalDateTime.now();
<<<<<<< HEAD
       
=======
        this.data = null;
>>>>>>> 1fa5b1c17e818556e1b9769b665cab1d4521cc2f
    }

    public ApiResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
        this.timeStamp = LocalDateTime.now();
<<<<<<< HEAD
       
    }

    
}

=======
        this.data = null;
    }

    public ApiResponse(String message, boolean success, Object data) {
        this.message = message;
        this.success = success;
        this.timeStamp = LocalDateTime.now();
        this.data = data;
    }
}


>>>>>>> 1fa5b1c17e818556e1b9769b665cab1d4521cc2f
