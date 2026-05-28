package es.udc.paproject.backend.rest.dtos;

public record AuthenticatedUserDto(
	String serviceToken,
	UserDto user) {}
