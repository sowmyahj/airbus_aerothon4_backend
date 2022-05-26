
package com.springrest.springrest.dao;
import org.springframework.data.jpa.repository.JpaRepository;

import com.springrest.springrest.entities.Login;

public interface LoginDao extends JpaRepository<Login,String> {
}

