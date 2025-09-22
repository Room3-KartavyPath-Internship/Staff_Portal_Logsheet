package com.sunbeam.logsheet.DTO;


import java.util.List;

import com.sunbeam.logsheet.entity.MenuItem;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
private Long id;
private String fullName;
private String role;
private List<MenuItem> menus;
}