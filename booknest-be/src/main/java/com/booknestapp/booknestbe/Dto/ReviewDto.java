package com.booknestapp.booknestbe.Dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties
public record ReviewDto(
        @JsonProperty("rating")
         int rating,

        @JsonProperty("status")
                String status,

        @JsonProperty("notes")
         String notes,

        @JsonProperty("id")
         Long id) {

}


