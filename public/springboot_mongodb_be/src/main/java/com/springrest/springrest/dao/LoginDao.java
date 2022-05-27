
package com.springrest.springrest.dao;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.springrest.springrest.entities.Login;


public interface LoginDao extends MongoRepository<Login,String> {
}

