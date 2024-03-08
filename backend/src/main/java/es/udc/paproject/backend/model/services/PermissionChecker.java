package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.entities.User;

public interface PermissionChecker {
	
	User checkUser(Long userId) throws InstanceNotFoundException;
	
}
