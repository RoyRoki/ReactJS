package com.camino.camino_v1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsDTO {
    private String mobileNo;
    private String gender;
    private String address1;
    private String address2;
    private int age;
    private String postalCode;
}
