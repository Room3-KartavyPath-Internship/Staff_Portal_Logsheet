package com.sunbeam.logsheet.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RoleMenuId implements Serializable {
    private Long roleId;
    private Long menuItemId;

   
}
