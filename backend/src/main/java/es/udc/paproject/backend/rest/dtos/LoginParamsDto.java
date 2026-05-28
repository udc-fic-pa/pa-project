package es.udc.paproject.backend.rest.dtos;

import jakarta.validation.constraints.NotNull;
public record LoginParamsDto(@NotNull String userName, @NotNull String password) {

	public LoginParamsDto {
		userName = userName != null ? userName.trim() : null;
	}

}
