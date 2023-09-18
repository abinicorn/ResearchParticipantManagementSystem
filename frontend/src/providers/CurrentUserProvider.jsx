import React, { useState, useEffect } from "react";
import { createContext } from 'react';
import axios from "axios";
import {LoadingIndicator} from "../components/Common/LoadingIndicator";

import { tokenService, TokenType } from "../services/tokenService";


export const CurrentUserContext = createContext({
    user: null,
    getCurrentUser: async () => {},
});

export function CurrentUserContextProvider ({ children })  {

    const [currentUser, setCurrentUser] = useState(null);

    const getCurrentUser = async (userId) => {

        const userInfo = await fetchUserInfo(userId);
        setCurrentUser(userInfo);
    };

    useEffect(() => {
        (async () => {
            await getCurrentUser(tokenService.getToken(TokenType.ACCESS_TOKEN));
        })();
    }, []);


    const fetchUserInfo = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3001/researcher/info/${userId}`);
            const firstName = response.data.result.firstName;
            const lastName = response.data.result.lastName;
            const email = response.data.result.email;
            const studyList = response.data.result.studyList;


            const userInfo = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                studyList: studyList,
                userId: userId
            };
            return userInfo;
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    return (
        <CurrentUserContext.Provider
            value={{
                user: currentUser,
                getCurrentUser,
            }}
        >
            {currentUser ? children : <LoadingIndicator />}
        </CurrentUserContext.Provider>
    );
};