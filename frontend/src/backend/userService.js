import {config, appFetch, appFetch2, setServiceToken, getServiceToken, removeServiceToken, setReauthenticationCallback} from './appFetch';
// FIXME: when update to appFetch2 is completed, remove config and appFetch from import.

export const login = async (userName, password, reauthenticationCallback) => {
    const response = await appFetch2('POST', '/users/login', {userName, password});
    if (response.ok) {
        setServiceToken(response.payload.serviceToken);
        setReauthenticationCallback(reauthenticationCallback);
    }
    return response;
}

export const tryLoginFromServiceToken = async reauthenticationCallback => {

    const serviceToken = getServiceToken();

    if (!serviceToken) {
        return {ok: false, payload: null};
    }

    setReauthenticationCallback(reauthenticationCallback);

    const response = await appFetch2('POST', '/users/loginFromServiceToken');

    if (response.ok) {
        return response;
    } else {
        removeServiceToken();
        return {ok: false, payload: null};
    }

}

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => {

    appFetch('/users/signUp', config('POST', user), 
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        }, 
        onErrors);

}

export const logout = () => removeServiceToken();

export const updateProfile = (user, onSuccess, onErrors) =>
    appFetch(`/users/${user.id}`, config('PUT', user),
        onSuccess, onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess,
    onErrors) =>
    appFetch(`/users/${id}/changePassword`, 
        config('POST', {oldPassword, newPassword}),
        onSuccess, onErrors);