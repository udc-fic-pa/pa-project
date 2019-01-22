const getModuleState = state => state.users;

export const getUser = state => 
    getModuleState(state).user;

