package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.User;

public class UserConversor {
	
	private UserConversor() {}
	
	public final static UserDto toUserDto(User user) {
		return UserDto.of(user.getId(), user.getUserName(), user.getFirstName(), user.getLastName(), user.getEmail(),
			user.getRole().toString());
	}
	
	public final static User toUser(UserDto userDto) {
		
		return new User(userDto.userName(), userDto.password(), userDto.firstName(), userDto.lastName(),
			userDto.email());
	}
	
	public final static AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {
		
		return new AuthenticatedUserDto(serviceToken, toUserDto(user));
		
	}

}
