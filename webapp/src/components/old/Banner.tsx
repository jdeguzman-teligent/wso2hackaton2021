import {
  Box,
  Image,
  Button,
  Container,
  Heading,
  Grid,
  Badge,
  FormControl,
  Input,
  Text,
  Spacer,
  useColorMode,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { initAuthenticatedSession } from "../actions/session";
import { sendAuthorizationRequest } from "../actions/sign-in";
import { dispatchLogout } from "../actions/sign-out";
import { CONFIG } from "../../config";
import { RootState } from "../state/reducers";
import { getCustomers } from "../state/redux/ducks/customer";
import { logout, getISToken, login } from "../state/redux/ducks/user";

function Banner() {
  
  const { isOpen, onToggle } = useDisclosure();
  const onSignin = () => {
    sendAuthorizationRequest();
  };

  const onSignout = () => {
    dispatch(logout());
    dispatchLogout(user.ISToken.id_token);
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const sp = new URL(window.location.href).searchParams.get("sp");

    if (sp === CONFIG.SERVICE_PROVIDER) {
      router.push("/");
      return;
    }

    if (code && user.ISToken === null) {
      dispatch(getISToken(code));
    }

    if (user.token !== null) {
      initAuthenticatedSession(user.ISToken);
      dispatch(getCustomers(user.token));
      router.push("/");
      return;
    }

    if (user.ISToken !== null) {
      dispatch(login({}));
    }
  }, [user]);


  const mainPunchText = () => {
    return (
      <Box>
        {/* main punch text */}
        <Container maxW='container.xl'>
          <Box d='flex' alignItems='center' py='20'>
            <Box mr='6'>
              <Heading as='h1' size='2xl'>
                <Box fontWeight='black'>
                  Power up! There are so many things to automate
                </Box>
              </Heading>
              <Box mt='6' fontWeight='medium'>
                A form of energy resulting from the existence of charged
                particles (such as electrons or protons), either statically as
                an accumulation of charge or dynamically as a current.
              </Box>
            </Box>
            <Box w='100%'>
              <Image
                w='100%'
                src='/assets/illustration.jpg'
                alt='illustration'
              />
            </Box>
          </Box>
        </Container>
        {/* three boxes */}
        <Container maxW='container.xl' mt={2}>
          <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            <Box>
              <Image
                w='100%'
                borderRadius='lg'
                src='/assets/unsplash/pic2.jpg'
                alt='image three'
              />
              <Button colorScheme='teal' variant='link' mt='5'>
                Make new connection
                <Image
                  ml='2'
                  h={8}
                  w={10}
                  src='/assets/right-arrow.png'
                  alt='right arrow'
                />
              </Button>
            </Box>
            <Box>
              <Image
                w='100%'
                borderRadius='lg'
                src='/assets/unsplash/pic3.jpg'
                alt='image three'
              />
              <Button colorScheme='teal' variant='link' mt='5'>
                Explore the networks
                <Image
                  ml='2'
                  h={8}
                  w={10}
                  src='/assets/right-arrow.png'
                  alt='right arrow'
                />
              </Button>
            </Box>
            <Box>
              <Image
                w='100%'
                borderRadius='lg'
                src='/assets/unsplash/pic1.jpg'
                alt='image three'
              />
              <Button colorScheme='teal' variant='link' mt='5'>
                Connect over tech
                <Image
                  ml='2'
                  h={8}
                  w={10}
                  src='/assets/right-arrow.png'
                  alt='right arrow'
                />
              </Button>
            </Box>
          </Grid>
        </Container>
        {/* pills */}
        <Container maxW='container.xl'>
          <Box
            direction='row'
            display='flex'
            flexWrap='wrap'
            justifyContent='space-between'
            my='10'
          >
            <Badge
              borderRadius='3xl'
              px={4}
              py={2}
              mr='4'
              mb='4'
              color='#ffffff'
              bg='blue.100'
            >
              Boost your devices
            </Badge>
            <Badge
              borderRadius='3xl'
              px={4}
              py={2}
              mr='4'
              mb='4'
              color='#ffffff'
              bg='blue.100'
            >
              Find your zen
            </Badge>
            <Badge
              borderRadius='3xl'
              px={4}
              py={2}
              mr='4'
              mb='4'
              color='#ffffff'
              bg='blue.100'
            >
              Get moving
            </Badge>
            <Badge
              borderRadius='3xl'
              px={4}
              py={2}
              mr='4'
              mb='4'
              color='#ffffff'
              bg='blue.100'
            >
              Share launguage + culture
            </Badge>
            <Badge
              borderRadius='3xl'
              px={4}
              py={2}
              mr='4'
              mb='4'
              color='#ffffff'
              bg='blue.100'
            >
              Read with friends
            </Badge>
            <Badge
              borderRadius='3xl'
              px={4}
              py={2}
              mr='4'
              mb='4'
              color='#ffffff'
              bg='blue.100'
            >
              Write together
            </Badge>
            <Badge
              borderRadius='3xl'
              px={4}
              py={2}
              mr='4'
              mb='4'
              color='#ffffff'
              bg='blue.100'
            >
              Hone your craft
            </Badge>
          </Box>
        </Container>
        {/* last header section */}
        <Container maxW='container.xl' mt={20}>
          <Grid templateColumns='repeat(2, 1fr)' gap={6}>
            <Box>
              <Heading as='h3' size='lg' mb='7'>
                What do you want to do?
              </Heading>
              <Box d='flex' alignItems='center'>
                <Box flexBasis={"50%"} mr='2'>
                  <FormControl id='email'>
                    <Box pos='relative'>
                      <Input
                        pl={"8"}
                        placeholder="Search for 'electricute'"
                        type='text'
                      />
                      <Box pos='absolute' top='3' left='2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='18'
                          height='18'
                          viewBox='0 0 20 20'
                          fill='#d9d9d9'
                        >
                          <path
                            fillRule='evenodd'
                            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </Box>
                    </Box>
                  </FormControl>
                </Box>
                <Box flexBasis='50%' ml='2'>
                  <FormControl id='email'>
                    <Box pos='relative'>
                      <Input
                        pl={"8"}
                        placeholder="Search for 'charging area'"
                        type='text'
                      />
                      <Box pos='absolute' top='3' left='2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='18'
                          height='18'
                          viewBox='0 0 20 20'
                          fill='#d9d9d9'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </Box>
                    </Box>
                  </FormControl>
                </Box>
              </Box>
              <Button
                _hover={{ opacity: "0.8" }}
                mt='5'
                pt='6'
                pb='6'
                w='100%'
                color='#ffffff'
                bg='red.200'
                fontSize='lg'
              >
                <Box fontWeight='black'>Search</Box>
              </Button>
            </Box>
            <Box>
              <Heading as='h3' size='lg' mb='7'>
                See what’s happening
              </Heading>
              <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
                <Badge
                  borderRadius='3xl'
                  px={5}
                  py={2}
                  mr='4'
                  mb='4'
                  color='#ffffff'
                  bg='blue.100'
                >
                  Starting soon
                </Badge>
                <Badge
                  borderRadius='3xl'
                  px={5}
                  py={2}
                  mr='4'
                  mb='4'
                  color='#ffffff'
                  bg='blue.100'
                >
                  Today
                </Badge>
                <Badge
                  borderRadius='3xl'
                  px={5}
                  py={2}
                  mr='4'
                  mb='4'
                  color='#ffffff'
                  bg='blue.100'
                >
                  Tomorrow
                </Badge>
                <Badge
                  borderRadius='3xl'
                  px={5}
                  py={2}
                  mr='4'
                  mb='4'
                  color='#ffffff'
                  bg='blue.100'
                >
                  This Week
                </Badge>
                <Badge
                  borderRadius='3xl'
                  px={5}
                  py={2}
                  mr='4'
                  mb='4'
                  color='#ffffff'
                  bg='blue.100'
                >
                  Online
                </Badge>
                <Badge
                  borderRadius='3xl'
                  px={5}
                  py={2}
                  mr='4'
                  mb='4'
                  color='#ffffff'
                  bg='blue.100'
                >
                  In person
                </Badge>
                <Badge
                  borderRadius='3xl'
                  px={5}
                  py={2}
                  mr='4'
                  mb='4'
                  color='#ffffff'
                  bg='blue.100'
                >
                  Trending near you
                </Badge>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
    );
  };

  return (
    <>
      <header>
        <Box
          d='flex'
          alignItems='center'
          justifyContent='space-between'
          ml={6}
          mr={6}
        >
          <Box>
            <Image src='/assets/ElectricBillingSystem.jpg' alt='brand' />
            <Text fontSize='sm' color='blue.300'>
              powered by: Teligent Systems
            </Text>
          </Box>
          <Spacer />
          {user.token === null && (
            <Button
              fontSize={"lg"}
              fontWeight={400}
              variant={"link"}
              color={"white"}
              bg={"pink.400"}
              w={120}
              onClick={() => onSignin()}
            >
              Sign In
            </Button>
          )}
          {user.token !== null && (
            <Button
              fontSize={"lg"}
              fontWeight={400}
              variant={"link"}
              color={"white"}
              bg={"teal.400"}
              w={120}
              onClick={() => onSignout()}
            >
              Logout
            </Button>
          )}
          <IconButton
            aria-label='settings'
            icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
            isRound={true}
            size='md'
            alignSelf='center'
            onClick={toggleColorMode}
          />
        </Box>
      </header>
      {user.token === null && mainPunchText()}
    </>
  );
}

export default Banner;
