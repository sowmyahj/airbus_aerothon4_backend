package com.springrest.springrest.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springrest.springrest.entities.Login;

import com.springrest.springrest.services.LoginService;


@CrossOrigin
@RestController
public class LoginController {
	@Autowired
	private LoginService loginService;
	
	@GetMapping("/login")
	public ResponseEntity<Object> getUser(@RequestBody Login login)
	{	
		Map<String, String> map = new HashMap<>();
		
		if(this.loginService.getUser(login.getUsername(),login.getPassword())) {
			map.put("response", "success");
			return new ResponseEntity<>(map,HttpStatus.OK);
		}
		else {
			map.put("response", "failure");
			return new ResponseEntity<>(map,HttpStatus.BAD_REQUEST);
			
		}
	}
}

