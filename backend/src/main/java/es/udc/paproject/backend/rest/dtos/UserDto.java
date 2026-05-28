package es.udc.paproject.backend.rest.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
public record UserDto(
	Long id,
	@NotNull(groups={AllValidations.class}) @Size(min=1, max=60, groups={AllValidations.class}) String userName,
	@NotNull(groups={AllValidations.class}) @Size(min=1, max=60, groups={AllValidations.class}) String password,
	@NotNull(groups={AllValidations.class, UpdateValidations.class}) @Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class}) String firstName,
	@NotNull(groups={AllValidations.class, UpdateValidations.class}) @Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class}) String lastName,
	@NotNull(groups={AllValidations.class, UpdateValidations.class}) @Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class}) @Email(groups={AllValidations.class, UpdateValidations.class}) String email,
	String role) {

	public interface AllValidations {}

	public interface UpdateValidations {}

	public UserDto {
		userName = userName != null ? userName.trim() : null;
		firstName = firstName != null ? firstName.trim() : null;
		lastName = lastName != null ? lastName.trim() : null;
		email = email != null ? email.trim() : null;
	}

	public static UserDto of(Long id, String userName, String firstName, String lastName, String email,
			String role) {
		return new UserDto(id, userName, null, firstName, lastName, email, role);
	}

}