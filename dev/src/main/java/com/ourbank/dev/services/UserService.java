package com.ourbank.dev.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ourbank.dev.models.Transaction;
import com.ourbank.dev.models.User;
import com.ourbank.dev.repos.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo repo;

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public Optional<User> getUserById(UUID id) {
        return repo.findById(id);
    }

    public User addUser(User user) {
        return repo.save(user);
    }

    public User updateUser(User user) {
        return repo.save(user);
    }

    public void deleteUser(UUID id) {
        repo.deleteById(id);
    }

    public User loginUser(UUID id, String password) {
        User user = repo.findById(id).get();
        if(user != null) {
            if(user.getPassword().equals(password)) {
                System.out.println("User "+user.getName()+" logged in..");
                return user;
            }
            else{
                System.out.println("Invalid user credentials. {ERROR : Password does not match}");
                return null;
            }
        }
        else{
            System.out.println("Invalid user credentials. {ERROR : User does not exists}");
            return null;
        }
    }

    public String addTransaction(Transaction t) {
        User user1 = repo.findById(t.getFromAccount()).get();
        User user2 = repo.findById(t.getToAccount()).get();
        if(user1.getBalance() < t.getAmount()) {
            System.out.println("Illegal transaction attempt from "+user1.getName()+" {ERROR : Insufficient balance}");
            return "Insufficient balance";
        }
        user1.setBalance(user1.getBalance()-t.getAmount());
        user2.setBalance(user2.getBalance()+t.getAmount());
        user1.getTransactions().add(t);
        user2.getTransactions().add(t);
        repo.save(user1);
        repo.save(user2);
        return "Transaction successful";
    }

    public String deposit(UUID id, double amount) {
        User user = repo.findById(id).get();
        if(user != null){
            user.setBalance(user.getBalance()+amount);
            repo.save(user);
            return "Deposit successful";
        }else {
            return "User does not exists";
        }
    }

    public String withdraw(UUID id, double amount) {
        User user = repo.findById(id).get();
        if(user != null){
            if(user.getBalance() < amount) {
                System.out.println("Illegal transaction attempt from "+user.getName()+" {ERROR : Insufficient balance}");
                return "Insufficient balance";
            }
            user.setBalance(user.getBalance()-amount);
            repo.save(user);
            return "Withdrawal successful";
        }else {
            return "User does not exists";
        }
    }

    public Double getBalance(UUID id) {
        User user = repo.findById(id).get();
        if(user != null){
            return user.getBalance();
        }else {
            System.out.println("User does not exists");
            return null;
        }
    }

    public Set<Transaction> getTransactions(UUID id) {
        User user = repo.findById(id).get();
        if(user != null){
            Set<Transaction> transactions = user.getTransactions().stream().limit(5).collect(Collectors.toSet());
            System.out.println("Transactions : "+transactions);
            return transactions;
        }else {
            System.out.println("User does not exists");
            return null;
        }
    }
}
