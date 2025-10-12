package com.hdsr.hr.user.model;

public class AddUserRequestDTO {
    private String name;
    private String email;

    // Getters & Setters
    public String getName() { 
    	return name; 
    }
    public void setName(String name) { 
    	this.name = name; 
    }
    public String getEmail() { 
    	return email; 
    }
    public void setEmail(String email) { 
    	this.email = email;
    }
}
