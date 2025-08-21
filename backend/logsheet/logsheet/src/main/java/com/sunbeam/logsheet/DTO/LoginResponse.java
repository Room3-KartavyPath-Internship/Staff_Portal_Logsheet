package com.sunbeam.logsheet.DTO;


import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
private Long id;
private String fullName;
private String role;
}