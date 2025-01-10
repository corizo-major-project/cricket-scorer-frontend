import axios from "axios";
import API from "../hooks/Api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


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