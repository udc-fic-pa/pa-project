import NetworkError from './NetworkError';

const SERVICE_TOKEN_NAME = 'serviceToken';

let networkErrorCallback;
let reauthenticationCallback;

export const init = callback => networkErrorCallback = callback;

export const setReauthenticationCallback = callback => reauthenticationCallback = callback;

export const setServiceToken = serviceToken => 
    sessionStorage.setItem(SERVICE_TOKEN_NAME, serviceToken);

export const getServiceToken = () => sessionStorage.getItem(SERVICE_TOKEN_NAME);

export const removeServiceToken = () => 
    sessionStorage.removeItem(SERVICE_TOKEN_NAME);

const isJson = response => {

    const contentType = response.headers.get("content-type");

    return contentType && contentType.indexOf("application/json") !== -1;

}

const getOptions = (method, body) => {

    const options = {};

    options.method = method;

    if (body) {
        if (body instanceof FormData) {
            options.body = body;
        } else  {
            options.headers = {'Content-Type': 'application/json'};
            options.body = JSON.stringify(body);
        }
    }

    let serviceToken = getServiceToken();

    if (serviceToken) {

        if (options.headers) {
            config.headers['Authorization'] = `Bearer ${serviceToken}`;
        } else {
            options.headers = {'Authorization': `Bearer ${serviceToken}`};
        }

    }

    return options;

}

export const appFetch2 = async (method, path, body) => {

    try {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${path}`, getOptions(method, body));
        const appFetchResponse = {ok: response.ok, payload: null};

        if (response.status === 401 && reauthenticationCallback){
            reauthenticationCallback();
            return appFetchResponse;
        }

        if (isJson(response)) {
            appFetchResponse.payload = await response.json();
        }

       return appFetchResponse;

    } catch (error) {
        networkErrorCallback();
    }

}

// FIXME: remove when appFetch2 replaces appFetch.
const handleOkResponse = (response, onSuccess) => {

    if (!response.ok) {
        return false;
    }

    if (!onSuccess) {
        return true;
    }

    if (response.status === 204) {
        onSuccess();
        return true;
    }

    if (isJson(response)) {
        response.json().then(payload => onSuccess(payload));
    }

    return true;

}

// FIXME: remove when appFetch2 replaces appFetch.
const handle4xxResponse = (response, onErrors) => {

    if (response.status < 400 || response.status >= 500) {
        return false;
    }

    if (response.status === 401 && reauthenticationCallback){
        reauthenticationCallback();
        return true;
    }

    if (!isJson(response)) {
        throw new NetworkError();
    }

    if (onErrors) {

        response.json().then(payload => {
            if (payload.globalError || payload.fieldErrors) {
                onErrors(payload);
            }
        });

    }

    return true;

}

// FIXME: remove when appFetch2 replaces appFetch.
const handleResponse = (response, onSuccess, onErrors) => {

    if (handleOkResponse(response, onSuccess)) {
        return;
    }

    if (handle4xxResponse(response, onErrors)) {
        return;
    }

    throw new NetworkError();
    
}

// FIXME: remove when appFetch2 replaces appFetch.
export const config = (method, body) => {

    const config = {};

    config.method = method;

    if (body) {
        if (body instanceof FormData) {
            config.body = body;
        } else  {
            config.headers = {'Content-Type': 'application/json'};
            config.body = JSON.stringify(body);
        }
    }

    let serviceToken = getServiceToken();

    if (serviceToken) {

        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${serviceToken}`;
        } else {
            config.headers = {'Authorization': `Bearer ${serviceToken}`};
        }

    }

    return config;

}

// FIXME: remove when appFetch2 replaces appFetch.
export const appFetch = (path, options, onSuccess, onErrors) =>
    fetch(`${import.meta.env.VITE_BACKEND_URL}${path}`, options)
        .then(response => handleResponse(response, onSuccess, onErrors))
        .catch(networkErrorCallback);
