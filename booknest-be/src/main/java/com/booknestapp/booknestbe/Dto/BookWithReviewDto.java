package com.booknestapp.booknestbe.Dto;


public record BookWithReviewDto(
     String id,
     String title,
     String author,
     String categories,
     String imageLinks,
     String description,
     ReviewDto review
     ) {
    }

