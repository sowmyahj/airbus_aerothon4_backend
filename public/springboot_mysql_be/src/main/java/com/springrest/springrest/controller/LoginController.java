package com.springrest.springrest.controller;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springrest.springrest.entities.Login;

import com.springrest.springrest.services.LoginService;


@CrossOrigin("*")
@RestController
public class LoginController {
	@Autowired
	private LoginService loginService;
	
	@PostMapping("/api/login")
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
	@GetMapping("/api/notes")
	public ResponseEntity<Object> getNotes(){
		HashMap<String, ArrayList<Integer>> map = new HashMap<>();
		map.put("notes", new ArrayList());
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
	@PostMapping("/api/notes/add")
	public ResponseEntity<Object> addNotes(@RequestBody Object object){
		HashMap<String, Object> map = new HashMap<>();
		map.put("done",false);
		map.put("note", "NOT SUPPORTED");
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
}

