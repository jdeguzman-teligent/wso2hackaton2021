import { Box } from "@chakra-ui/react";
import { Commitments } from "./commitments";
import { Footer } from "./footer";
import { Header } from "./header";
import { HowWeWork } from "./howWeWork";
import { Intro } from "./intro";
import { Services } from "./services";
import { Testimonials } from "./testimonials";


export const Landing = () => (
<>
  <Header/>
  <Box>
    <Intro />
    <Services />
    <Commitments />
    <HowWeWork />
    <Testimonials />
  </Box>
  <Footer/>
</>
);
