package es.udc.paproject.backend.rest.common;

import java.util.List;
public record ErrorsDto(String globalError, List<FieldErrorDto> fieldErrors) {

	public static ErrorsDto ofGlobalError(String globalError) {
		return new ErrorsDto(globalError, null);
	}

	public static ErrorsDto ofFieldErrors(List<FieldErrorDto> fieldErrors) {
		return new ErrorsDto(null, fieldErrors);
	}

}