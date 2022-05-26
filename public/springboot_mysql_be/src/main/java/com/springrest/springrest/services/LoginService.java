package com.springrest.springrest.services;

import java.util.List;
import com.springrest.springrest.entities.Login;
public interface LoginService {
	public List<Login> getUsers();
	public boolean getUser(String userName,String password);
	public Login addUser(Login login);

}


