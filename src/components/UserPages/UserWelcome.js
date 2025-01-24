import React from 'react'
import { Helmet } from "react-helmet";
import TopNavbar from './components/Nav/TopNavbar';
import { Outlet } from 'react-router-dom';

const UserWelcome = () => {
    return (
        <div>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
            </Helmet>
            <TopNavbar/>
            <Outlet/>
        </div>
    )
}

export default UserWelcome