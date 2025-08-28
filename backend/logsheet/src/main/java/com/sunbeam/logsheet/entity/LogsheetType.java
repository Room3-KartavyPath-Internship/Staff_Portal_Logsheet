package com.sunbeam.logsheet.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "logsheet_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LogsheetType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "theory_percent", nullable = false)
    private Double theoryPercent;

    @Column(name = "practical_percent", nullable = false)
    private Double practicalPercent;

   
    @Column(name = "is_topic_required", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean topicRequired;

   
    @Column(name = "is_group_required", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean groupRequired;
}
