package com.sunbeam.logsheet.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ForgotPasswordRequest {
	private String email;
    private String newPassword;
}
