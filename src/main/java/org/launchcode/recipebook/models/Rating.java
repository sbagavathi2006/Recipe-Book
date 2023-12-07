package org.launchcode.recipebook.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class Rating extends AbstractEntity{

    @ManyToOne
    private User user;

    private Recipe recipe;

    private double averageRating;
    private int totalVotes;
}
