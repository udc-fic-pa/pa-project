import {appFetch2, setServiceToken, getServiceToken, removeServiceToken, setReauthenticationCallback} from './appFetch';

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

export const signUp = async (user, reauthenticationCallback) => {
    const response = await appFetch2('POST', '/users/signUp', user);
    if (response.ok) {
        setServiceToken(response.payload.serviceToken);
        setReauthenticationCallback(reauthenticationCallback);
    }
    return response;

}

export const logout = () => removeServiceToken();

export const updateProfile = async user =>
    await appFetch2('PUT', `/users/${user.id}`, user);

export const changePassword = async (id, oldPassword, newPassword) =>
    await appFetch2('POST', `/users/${id}/changePassword`, 
        {oldPassword, newPassword});