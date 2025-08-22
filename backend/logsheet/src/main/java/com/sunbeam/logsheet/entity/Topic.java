package com.sunbeam.logsheet.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "topics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Each topic belongs to ONE section
    @ManyToOne
    @JoinColumn(name = "section_id", nullable = false)
    private Section section;
}
