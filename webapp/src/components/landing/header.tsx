import { Flex, Heading, HStack, Link, Icon } from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import { sendAuthorizationRequest } from "src/actions/sign-in";

export const Header = () => {


  const onSignin = () => {
    sendAuthorizationRequest();
  }
  
  return (
    <Flex
      px="200px"
      py="20px"
      width="full"
      bg="blue.900"
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Flex alignItems="flex-end">
        <Heading
          color="whiteAlpha.900"
          mr="60px"
          fontSize={20}
          letterSpacing="1.5px"
        >
          Managed Service Team - tatak TSI
        </Heading>
        <HStack color="whiteAlpha.700" spacing="40px">
          <Link>Home</Link>
          <Link>Service</Link>
          <Link>About us</Link>
        </HStack>
      </Flex>
      <Link color="whiteAlpha.800" onClick={() => onSignin()}>
        Go to Electric Billing
        <Icon as={FiArrowUpRight} ml="10px" h={5} w={5} />
      </Link>
    </Flex>
  );
};
