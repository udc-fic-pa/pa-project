package es.udc.paproject.backend.rest.dtos;

import java.util.List;

public record BlockDto<T>(List<T> items, boolean existMoreItems) {}

