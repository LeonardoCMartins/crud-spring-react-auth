package com.react.back.dtos;

import com.react.back.entities.User;

public record UserDto(
         Long id,
         String name,
         String email,
         String senha
        ) {

    public UserDto(User user) {
        this(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getSenha()
        );
    }

}
