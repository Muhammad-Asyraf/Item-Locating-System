
// payload = {user,header}
export const loginSuccess = (state, { payload }) => ({
    ...state,
    isLoading: false,
    isAuthenticated: true,
    user: payload.user,
    status: 'Login: Success!',
    authHeader: payload.header,
});

// payload = {error}
export const loginError = (state, { payload }) => ({
    ...state,
    isLoading: false,
    isAuthenticated: false,
    status: 'Login: Error!',
    message: payload.message,

})