package com.sunbeam.logsheet.entity;


import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "staff")
public class Staff {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


@Column(nullable = false)
private String firstName;


@Column(nullable = false)
private String lastName;


@Column(unique = true, nullable = false)
private String email;


@Column(nullable = false)
private String password;

@Column(name="mobile", length = 15, nullable = false)
private String mobile;  


@ManyToOne
@JoinColumn(name = "role_id", nullable = false)
private Role role;


@Enumerated(EnumType.STRING)
@Column(nullable = false)
private StaffType staffType;
}