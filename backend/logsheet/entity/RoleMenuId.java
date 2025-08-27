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

    // Lombok @Data supplies equals/hashCode, but keep this if you prefer explicit:
    // @Override public boolean equals(Object o) { ... } etc.
}
