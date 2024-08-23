package com.react.back.controllers;

import com.react.back.dtos.UserDto;
import com.react.back.entities.request.LoginRequest;
import com.react.back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get/all")
    public ResponseEntity<List<UserDto>> getAll(){
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity getById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findById(id));
    }

    @PostMapping("/post")
    public void createUser(@RequestBody UserDto userDto) {
        userService.create(userDto);
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.update(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginRequest loginRequest) {
        try {
            UserDto userDto = userService.authenticate(loginRequest.getEmail(), loginRequest.getSenha());
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
