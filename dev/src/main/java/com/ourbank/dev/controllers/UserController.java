package com.ourbank.dev.controllers;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.ourbank.dev.models.Transaction;
import com.ourbank.dev.models.User;
import com.ourbank.dev.services.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@CrossOrigin("http://localhost:5173")
public class UserController {
    
    @Autowired
    private UserService service;

    @GetMapping("/users")
    public List<User> getUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUser(@PathVariable UUID id) {
        return service.getUserById(id);
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        return service.addUser(user);
    }

    @PutMapping("/users/update")
    public User updateUser(@RequestBody User user) {
        return service.updateUser(user);
    }


    @DeleteMapping("/users/delete/{id}")
    public String deleteUser(@PathVariable UUID id) {
        User alreadyPresent = service.getUserById(id).get();
        if(alreadyPresent == null) {
            System.out.println("User does not exists!!");
            return "User does not exists!!";
        }else{
            System.out.println("User "+ alreadyPresent.getName()+" is deleted...");
            service.deleteUser(id);
            return "User "+ alreadyPresent.getName()+" is deleted...";
        }
    }


    @GetMapping("/users/login/{id}?password={password}")
    public User loginUser(@PathVariable UUID id, @RequestParam String password) {
        return service.loginUser(id, password);
    }
        
    @PostMapping("/users/transfer")
    public String makeTransaction(@RequestBody Transaction t) {
        return service.addTransaction(t);
    }

    @PatchMapping("/users/deposit/{id}/{amount}")
    public String depositMoney(@PathVariable UUID id, @PathVariable String amount) {
        return service.deposit(id, Double.valueOf(amount));
    }

    @PatchMapping("/users/withdraw/{id}/{amount}")
    public String withdrawMoney(@PathVariable UUID id, @PathVariable String amount) {
        return service.withdraw(id, Double.valueOf(amount));
    }

    @GetMapping("/users/{id}/balance")
    public Double getBalance(@PathVariable UUID id) {
        return service.getBalance(id);
    }

    @GetMapping("/users/{id}/transactions")
    public Set<Transaction> getTransactions(@PathVariable UUID id) {
        return service.getTransactions(id);
    }
    
}
