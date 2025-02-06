import axios from "axios";
import API from "../hooks/Api";
import { Navigate } from "react-router-dom";
// import { useEffect } from "react";


const url = "http://localhost:4000";

export const signupUser = (signupDetails) => {
    try {
        const signupUrl = url + "/signup";
        const response = axios.post(signupUrl, signupDetails);
        if(response.status === 200) {

        }
    }
    catch(err) {
        console.log(err);
    }
}

export const emailOtpSender = async (email, eventType) => {
    try {
        const emailOtpUrl = url + `/v1/api/auth/sendOtpEmail/${email}/${eventType}`;
        const response = await axios.get(emailOtpUrl);
        if(response.status === 409) {
            return { ...response.data, emailExists: true };
        }
        return { ...response.data, emailExists: false };
    }
    catch(err) {
        return { success: false, message: "An error occurred.", emailExists: false };
    }
}

export const checkEmailValidated = async (email) => {
    try {
        const checkEmailValidateURL = url + `/v1/api/auth/checkValidatedEmail/${email}`;
        const response = await axios.get(checkEmailValidateURL);
        return response;
    }
    catch(err) {
        return err;
    }
}

export const validateOTP = async (email, otp, otpType) => {
    try {
        const validateurl = url + `/v1/api/auth/validateOtp/${email}/${otp}/${otpType}`;
        const response = await axios.get(validateurl);
        return response;
    }
    catch(err) {
        return err;
    }
}

export const userSignup = async (userdetails) => {
    try {
        const signupurl = url + `/v1/api/auth/signup`;
        const response = await axios.post(signupurl, userdetails);
        return response;
    }
    catch(err) {
        return err;
    }
}

export const userSignin = async (usersigin) => {
    try {
        const signinurl = url + `/v1/api/auth/signin`;
        const response = await axios.post(signinurl, usersigin);
        return response;
    }
    catch(err) {
        return err;
    }
}

export const changePassword = async (changepassword) => {
    try {
        const changepasswordurl = url + `/v1/api/auth/changePassword`;
        const response = await axios.patch(changepasswordurl, changepassword);
        return response;
    }
    catch(err) {
        return err;
    }
}

// PLAYER API's
export const getAllPlayers = async (pageNo, pageSize) => {
    try {
        const getAllplayersurl = url + `/v1/api/player/getAllPlayers?page_size=${pageNo}&page_no=${pageSize}`;
        const response = await API.get(getAllplayersurl);
        return response;
    }
    catch(err) {
        return err;
    }
}

export const getPlayerDetails = async (playerId) => {
    try {
        const getPlayerDetailsurl = url + `/v1/api/player/getPlayerDetails?player_id=${playerId}`;
        const response = await API.get(getPlayerDetailsurl);
        return response;
    }
    catch(err) {
        return err;
    }
}

export const getPlayerDetailsUserName = async () => {
    try {
        const getPlayerDetailsurl = url + `/v1/api/player/getPlayerDetailsUserName`;
        const response = await API.get(getPlayerDetailsurl);
        if(response.status === 404) {
            Navigate("/user/create-profile")
        }
        return response;
    }
    catch(err) {
        return err;
    }
}

export const getPlayerSearch = async (searchQuery) => {
    try {
        const getPlayerSearchurl = url + `/v1/api/player/searchPlayers?search_query=${searchQuery}`;
        const response = await API.get(getPlayerSearchurl);
        return response;
    }
    catch(err) {
        return err;
    }
}

export const createPlayer = async (playerPayload) => {
    try {
        const createPlayerurl = url + `/v1/api/player/addPlayer`;
        const response = await API.post(createPlayerurl, playerPayload);
        return response;
    }
    catch(err) {
        return err;
    }
}


// Team API's
export const createTeam = async (teamData) => {
    try {
        const createTeamurl = url + `/v1/api/team/createTeam`;
        const response = await API.post(createTeamurl, teamData);
        return response;
    }
    catch(err) {
        return err;
    }
}

export const getAllTeams = async (pageSize, pageNo) => {
    try {
        const getAllTeamsurl = url + `/v1/api/team/getAllTeams?page_no=${pageNo}&page_size=${pageSize}`;
        const response = await API.get(getAllTeamsurl);
        return response;
    }
    catch(err) {
        return err;
    }
}

export const getTeam = async (teamName) => {
    try {
        const getTeamurl = url + `/v1/api/team/getTeam?team_name=${teamName}`;
        const response = await API.get(getTeamurl);
        return response;
    }
    catch(err) {
        return err;
    }
}

export const updateTeam = async (oldTeamName, teamData) => {
    try {
        const updateTeamurl = url + `/v1/api/team/updateTeam/${oldTeamName}`;
        const response = await API.put(updateTeamurl, teamData);
        return response;
    }
    catch(err) {
        return err;
    }
}