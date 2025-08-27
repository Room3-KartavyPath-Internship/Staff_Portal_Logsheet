package com.sunbeam.logsheet.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

@Entity
@Table(name = "role_menu_permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RoleMenuPermission {

    @EmbeddedId
    private RoleMenuId id;

    @ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    @JsonBackReference
    private Role role;

    @ManyToOne
    @MapsId("menuItemId")
    @JoinColumn(name = "menu_item_id")
    private MenuItem menuItem;

    // map to DB column is_allowed
    @Column(name = "is_allowed", nullable = false)
    private boolean allowed;
}
