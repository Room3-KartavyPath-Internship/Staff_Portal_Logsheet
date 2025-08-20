package com.sunbeam.logsheet.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_cycle_id", nullable=false)
    private BatchCycle batchCycle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "premise_id", nullable=false)
    private Premises premise;

    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "course_type_id", nullable=false)
    private CourseType courseType;

    @Column(nullable=false)
    private String description;

    @Column(name="start_date", nullable=false)
    private LocalDate startDate;

    @Column(name="end_date", nullable=false)
    private LocalDate endDate;
}
