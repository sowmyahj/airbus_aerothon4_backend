package com.springrest.springrest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springrest.springrest.dao.LoginDao;
import com.springrest.springrest.entities.Login;

@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private LoginDao loginDao;
	
	@Override
	public List<Login> getUsers() {
		return loginDao.findAll()  ;
	}
	
	@Override
	public boolean getUser(String userName,String password) {
		try {
			if(loginDao.findById(userName).get().getPassword().equals(password)) {
				return true;
			}
			return false;
		}
		catch(Exception e) {
			return false;
		}
	}

	@Override
	public Login addUser(Login login) {
		loginDao.save(login);
		return login;
	}


}