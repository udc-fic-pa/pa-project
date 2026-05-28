package es.udc.paproject.backend.rest.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ChangePasswordParamsDto(@NotNull String oldPassword, @NotNull @Size(min=1, max=60) String newPassword) {}

