package com.sunbeam.logsheet.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.sunbeam.logsheet.DTO.ApiResponse;
import com.sunbeam.logsheet.custom_exceptions.IOException;
import com.sunbeam.logsheet.custom_exceptions.ResourceNotFoundException;



@RestControllerAdvice 
public class GlobalExceptionHandler {
	


	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ApiResponse handleResourceNotFoundException(ResourceNotFoundException e) {
		//System.out.println("in res not found " + e);
		return new ApiResponse(e.getMessage());
	}

	@ExceptionHandler(IOException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ApiResponse handleIOException(IOException e) {
		return new ApiResponse(e.getMessage());
	}

	@ExceptionHandler(RuntimeException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ApiResponse handleAnyException(RuntimeException e) {

		return new ApiResponse(e.getMessage());
	}

	
}
