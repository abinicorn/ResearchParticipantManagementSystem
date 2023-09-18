import axios from "axios";

import { tokenService, TokenType } from "./tokenService";

export const authService = {
    singIn: async (username, password): Promise => {
        const rawData = await fetchLogin(username, password);

        if (!rawData || rawData?.status !== 200) {
            throw new Error(rawData.data.message);
        }

        const accessToken = await rawData.data.result._id;

        tokenService.setToken(TokenType.ACCESS_TOKEN, accessToken);
        tokenService.setToken(TokenType.REFRESH_TOKEN, accessToken);

    },
    signOut: async (): Promise => {
        const refreshToken = tokenService.getToken(TokenType.REFRESH_TOKEN);
        const accessToken = tokenService.getToken(TokenType.ACCESS_TOKEN);

        if (!refreshToken || !accessToken) {
            tokenService.clearAllTokens();
            return;
        }

        try{
            const rawData = await fetchLogOut();
        } catch (_){

        }

        tokenService.clearAllTokens();

    },
    resetPassword: async (currentPassword, newPassword, id): Promise<void> => {
        const rawData = fetchResetPassword(currentPassword, newPassword, id)

        if (rawData.status !== 201) {
            throw new Error("Failed to reset password");
        }
    }
}

const fetchLogin = async (username, password) => {

    const response = await axios.post('http://localhost:3001/researcher/login', {
        username,
        password,
    });

    return response;

}

const fetchLogOut = async () => {

    const response = await axios.get('http://localhost:3001/researcher/logout');

    return response;
}

const fetchResetPassword = async (currentPassword, newPassword, id) => {

    const response = await axios.put('http://localhost:3001/researcher/resetPwd', {
        currentPassword,
        newPassword,
        id
    })
}