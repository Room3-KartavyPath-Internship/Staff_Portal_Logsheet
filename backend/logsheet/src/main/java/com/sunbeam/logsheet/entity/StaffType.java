package com.sunbeam.logsheet.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

//public enum StaffType {
//    InHouse,
//   Visiting;
//
//
//
//
//
//	
//}


public enum StaffType {
    InHouse,
    Visiting;

    @JsonCreator
    public static StaffType fromString(String value) {
        if (value == null) return null;
        switch (value.toUpperCase().replace("_","")) {
            case "INHOUSE": return InHouse;
            case "VISITING": return Visiting;
            default: throw new IllegalArgumentException("Invalid staff type: " + value);
        }
    }
}

