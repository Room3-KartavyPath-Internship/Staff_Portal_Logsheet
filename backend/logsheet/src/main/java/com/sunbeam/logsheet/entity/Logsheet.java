package com.sunbeam.logsheet.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "logsheets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Logsheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id", nullable = true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Staff staff;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Module module;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id" ,nullable=true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Topic topic; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "logsheet_type_id", nullable = true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private LogsheetType logsheetType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private GroupMaster group;

    @Enumerated(EnumType.STRING)
    @Column(name = "entry_type", nullable = false)
    private EntryType entryType;

    @Column(name = "log_date", nullable = false)
    private LocalDateTime logDate;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.New;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "verified_by")
    private Staff verifiedBy;

    private LocalDateTime verifiedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false)
    private VerificationStatus verificationStatus = VerificationStatus.Pending;

 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by")
    private Staff approvedBy;

    private LocalDateTime approvedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status", nullable = false)
    private ApprovalStatus approvalStatus = ApprovalStatus.Pending;

 
    public enum EntryType { Theory, Lab }
    public enum Status { New, Verified, Approved, Rejected }
    public enum VerificationStatus { Verified, Rejected, Pending }
    public enum ApprovalStatus { Approved, Rejected, Pending }
}
