package com.sunbeam.logsheet.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "batch_cycles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BatchCycle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private LocalDate startDate;
    private LocalDate endDate;
}
