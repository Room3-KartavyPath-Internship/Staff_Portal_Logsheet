package com.sunbeam.logsheet.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "modules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private int theoryHours;
    private int practicalHours;

    private Long moduleRouterId; // staff id reference
//
//    // Simplified Many-to-Many (JPA auto-manages module_subjects table)
//    @ManyToMany(fetch = FetchType.EAGER)
//    private Set<Subject> subjects;
    
    @ManyToMany
    @JoinTable(
        name = "module_subjects",
        joinColumns = @JoinColumn(name = "module_id"),
        inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private Set<Subject> subjects;

}
