import axios from "axios";
// import API from "../hooks/Api";
// import { useNavigate } from "react-router-dom";
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