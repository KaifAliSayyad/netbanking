package com.ourbank.dev.models;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;            //Account Number

    private String name;

    private String email;

    private String password;

    private Double balance;

    public User() {
        this.balance = 0.0;
        this.transactions = new HashSet<Transaction>();
    }

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Transaction> transactions;
    
}
