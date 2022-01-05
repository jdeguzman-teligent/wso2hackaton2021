import {
  Box,
  Image,
  Container,
  Heading,
  Grid,
  Link,
  VStack,
  GridItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers";
import BillDetails from "./BillDetails";
import BillingList from "./BillingList";
import CustomerList from "./CustomerList";

function CustomerListNew() {
  const user = useSelector((state: RootState) => state.user);
  const customers =
    useSelector((state: RootState) => state.customer.payload) || [];
  const bills = useSelector((state: RootState) => state.bill.payload);
  const selectedBill = useSelector(
    (state: RootState) => state.bill.selectedBill
  );

  const [token, setToken] = useState(null);
  const [billObject, setSelectedBill] = useState(null);

  useEffect(() => {
    if (user) {
      setToken(user.token);
    }

    setSelectedBill({ ...selectedBill });
  }, [token]);

  return (
    // <Box mt={20} mb='40'>
    //   <Container maxWidth='container.xl'>
    //     <Box
    //       mb='7'
    //       display='flex'
    //       alignItems='flex-start'
    //       justifyContent='space-between'
    //     >
    //       <Box>
    //         <Heading
    //           fontWeight='semibold'
    //           color='teal.500'
    //           alignItems='center'
    //           as='h3'
    //           size='md'
    //         >
    //           Customers
    //         </Heading>
    //       </Box>
    //     </Box>
    //     <Grid templateColumns='repeat(5, 1fr)' gap={4}>
    //       {customers && <CustomerList customers={customers} />}
    //     </Grid>
    //     <Grid mt={10} templateColumns='repeat(3, 1fr)' gap={4}>
    //       {bills && <BillingList bills={bills} />}
    //     </Grid>
    //     <GridItem colSpan={2} p={5}>
    //       {billObject._id && <BillDetails bill={billObject} />}
    //     </GridItem>
    //   </Container>
    // </Box>

   
  );
}

export default CustomerListNew;
