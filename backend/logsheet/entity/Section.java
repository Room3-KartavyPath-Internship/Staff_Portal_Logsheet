package com.sunbeam.logsheet.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sections")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Each section belongs to ONE subject
    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;
}
