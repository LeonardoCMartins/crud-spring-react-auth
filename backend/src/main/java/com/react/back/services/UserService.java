package com.react.back.services;

import com.react.back.dtos.UserDto;
import com.react.back.entities.User;
import com.react.back.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserDto> findAll(){
        List<User> users = userRepository.findAll();
        return users.stream().map(UserDto::new).toList();
    }

    public UserDto findById(Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
        return new UserDto(user);
    }

    public void create(UserDto userDto) {
        if (userDto.name() == null || userDto.email() == null || userDto.senha() == null) {
            throw new IllegalArgumentException("XXX");
        }
        User user = new User(userDto);
        userRepository.save(user);
    }


    public UserDto update(Long id, UserDto userDto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        existingUser.setName(userDto.name());
        existingUser.setEmail(userDto.email());
        existingUser.setSenha(userDto.senha());

        User updatedUser = userRepository.save(existingUser);
        return new UserDto(updatedUser);
    }

    public void delete(Long id){
        User user = userRepository.findById(id).get();
        userRepository.delete(user);
    }

    public UserDto authenticate(String email, String senha) {
        User user = (User) userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        if (!user.getSenha().equals(senha)) {
            throw new IllegalArgumentException("Invalid password");
        }
        return new UserDto(user);
    }

}
