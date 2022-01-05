import {
  Center,
  Image,
  Text,
  VStack,
  Avatar as ChakraAvatar,
  Box,
} from "@chakra-ui/react";

export const LoggingOut = () => (
  <>
    <VStack    >
      <Box position='absolute' left='0' top='0' right='0' m='auto'>
        <Center mt={10}>
          <Image src='/images/logoff.gif' shadow={3} />
          <Text>Electric Billing System is logging out...</Text>
          <ChakraAvatar ml={10} name='EBS' src='/images/dog-1.jpg' />
        </Center>
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
          src='/images/bg.svg'
        />
      </Box>
    </VStack>
  </>
);
