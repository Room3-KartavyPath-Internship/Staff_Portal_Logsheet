package com.sunbeam.logsheet.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_cycle_id", nullable=true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private BatchCycle batchCycle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "premise_id", nullable=true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Premises premise;

    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "course_type_id", nullable=true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private CourseType courseType;

    @Column(nullable=false)
    private String description;

    @Column(name="start_date", nullable=false)
    private LocalDate startDate;

    @Column(name="end_date", nullable=false)
    private LocalDate endDate;
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupMaster> groups = new ArrayList<>();

    
    public void addGroup(GroupMaster group) {
        groups.add(group);
        group.setCourse(this);
    }

   
    public void removeGroup(GroupMaster group) {
        groups.remove(group);
        group.setCourse(null);
    }
}

