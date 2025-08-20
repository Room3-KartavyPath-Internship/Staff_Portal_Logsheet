package com.sunbeam.logsheet.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="course_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CourseType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length=100)
    private String title;

    @Column(nullable = false)
    private String description;
}
