package com.springrest.springrest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.springrest.springrest.dao.LoginDao;
import com.springrest.springrest.entities.Login;

@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private LoginDao loginDao;
	
	private final MongoTemplate mongoTemplate;
	
	public  LoginServiceImpl(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
	}
	
	@Override
	public List<Login> getUsers() {
		return loginDao.findAll()  ;
	}
	
	@Override
	public boolean getUser(String userName,String password) {
			try {
				Query query = new Query();
				query.addCriteria(Criteria.where("username").is("admin").andOperator(Criteria.where("password").is("admin")));
				Login usr = mongoTemplate.findOne(query,Login.class);
				if(usr == null) {
					Login usrTemp =new Login();
					usrTemp.setUsername("admin");
					usrTemp.setPassword("admin");
					loginDao.save(usrTemp);
					System.out.println("new admin created");
				}
				Query query1 = new Query();
				query1.addCriteria(Criteria.where("username").is(userName).andOperator(Criteria.where("password").is(password)));
				Login usr1 = mongoTemplate.findOne(query1,Login.class);
				if(usr1 == null) {
					return false;
				}
				else {
					System.out.println("user verified");
					return true;
				}
			}
			catch(Exception v) {
				System.out.println("Error occured while login");
				return false;
			}
	}

	@Override
	public Login addUser(Login login) {
		loginDao.save(login);
		return login;
	}


}