import {
  HStack,
  VStack,
  Text,
  Box,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Image } from "components/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/reducers";
import { requestBills } from "src/state/redux/ducks/bill";

import { genres } from "./genres-data";

export const GenresCarousel = () => {
  const imageSize =
    useBreakpointValue({ base: "80px", md: "96px", "2xl": "192px" }) ?? "192px";

    const customer = useSelector((state: RootState) => state.customer);
    const user = useSelector((state: RootState) => state.user);
    const {payload} = customer;
    const {token} = user;
    const dispatch = useDispatch();

    const getCustomerDetails = (customerid: string) => {
      dispatch(requestBills({customerid, token}));
    }
  

  return (
    <HStack
      width='full'
      spacing={12}
      overflowX='auto'
      rounded='lg'
      flexShrink={0}
    >
      {payload.map(({ user, customerid }, index) => (
        <LinkBox as='article' pb={3} role='group' key={`${index}-${user.name}`}>
          <VStack spacing={4}>
            <Box
              rounded='lg'
              overflow='hidden'
              width={imageSize}
              height={imageSize}
              onClick={() => getCustomerDetails(customerid)}
            >
              <LinkOverlay href='#' >
                <Image
                  transition='ease-out'
                  transitionProperty='all'
                  transitionDuration='normal'
                  _groupHover={{
                    transform: "scale(1.1, 1.1)",
                  }}
                  src='/images/customer-2.png'
                  width={imageSize}
                  height={imageSize}
                  objectFit='cover'
                  quality='100'
                />
              </LinkOverlay>
            </Box>
            <Text fontWeight='medium' color='blue.500' >{user.name}</Text>
          </VStack>
        </LinkBox>
      ))}
    </HStack>
  );
};
