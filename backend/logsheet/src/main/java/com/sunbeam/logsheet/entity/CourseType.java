package com.sunbeam.logsheet.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="CourseType")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CourseType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long CourseTypeId;
	
	
	@Column(nullable = false, length=100)
	private String title;
	

	@Column(nullable = false)
	private String description;


	public Long getId() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
