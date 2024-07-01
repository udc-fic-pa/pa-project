import * as actionTypes from './actionTypes';
import backend from '../../backend';

export const signUpCompleted = authenticatedUser => ({
    type: actionTypes.SIGN_UP_COMPLETED,
    authenticatedUser
});

export const loginCompleted = authenticatedUser => ({
    type: actionTypes.LOGIN_COMPLETED,
    authenticatedUser
});

export const logout = () => {

    backend.userService.logout();

    return {type: actionTypes.LOGOUT};

};

export const updateProfileCompleted = user => ({
    type: actionTypes.UPDATE_PROFILE_COMPLETED,
    user
})

export const updateProfile = (user, onSuccess, onErrors) => dispatch =>
    backend.userService.updateProfile(user, 
        user => {
            dispatch(updateProfileCompleted(user));
            onSuccess();
        },
        onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess, onErrors) => () =>
    backend.userService.changePassword(id, oldPassword, newPassword, onSuccess, onErrors);