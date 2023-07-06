package com.booknestapp.booknestbe.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import lombok.Data;

@Entity
@Data
@Table
public class Book {
    @Id
    private String id;

    private String title;

    private String author;

    private String categories;

    private String imageLinks;

    @OneToOne(mappedBy = "book")
    @JsonIgnore
    private Review review;
}

