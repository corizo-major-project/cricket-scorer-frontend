// CurrentPageContext.js
import React, { createContext, useContext, useState } from 'react';

const CurrentPageContext = createContext();

export const useCurrentPage = () => useContext(CurrentPageContext);

export const CurrentPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('player');

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
};
