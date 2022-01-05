import React, { useEffect, useState } from "react";
import Meta from "./Meta";

import { Image, Box } from "@chakra-ui/react";
import FooterBottom from "./FooterBottom";
import Stories from "./Stories";
import Banner from "./Banner";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers";
const Layout = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (user) {
      setToken(user.token);
    }
  }, [token]);
  return (
    <div className='App'>
      <Meta />
      <Box position='absolute' left='0' top='0' right='0'>
        <Banner />
        {children}
        {user.token === null && (
          <>
            <Stories />
            <FooterBottom />
          </>
        )}
      </Box>

      <Box
        position='relative'
        top='0'
        bottom='0'
        right='0'
        left='0'
        height='100vh'
        zIndex={-1}
      >
        <Image
          w='80%'
          m='auto'
          objectFit='cover'
          sizes='300'
          src='/assets/bg.svg'
        />
      </Box>
    </div>
  );
};

export default Layout;
