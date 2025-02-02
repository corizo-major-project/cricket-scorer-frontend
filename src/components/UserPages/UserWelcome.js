import React from 'react'
import { Helmet } from "react-helmet";
import TopNavbar from './components/Nav/TopNavbar';
import { Outlet } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import Footer from "./components/Pages/Footer";
import styled from 'styled-components';

const UserWelcome = () => {
    return (
        <PageWrapper>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
            </Helmet>
            <TopNavbar />
            <ContentWrapper>
                <SearchBar />
                <Outlet />
            </ContentWrapper>
            <Footer />
        </PageWrapper>
    )
}

export default UserWelcome

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
`;