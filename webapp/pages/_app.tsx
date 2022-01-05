import { AppProps } from "next/app";
import { wrapper } from "../src/state/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

import '../styles.css'
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { loadUser } from "src/state/redux/ducks/user";

const App = ({ Component, pageProps }: AppProps) => {

  const dispatch = useDispatch();  
  
  useEffect(() => {
		dispatch(loadUser());
	}, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default wrapper.withRedux(App);