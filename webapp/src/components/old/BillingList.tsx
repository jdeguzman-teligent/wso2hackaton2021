import BillingItem from './BillingItem'
import { Bill } from '../interfaces';
import customerStyles from '../styles/Customer.module.css'
import { Flex, Text, HStack, Box, Spacer, Grid } from '@chakra-ui/react';


type Props = {
  bills: Bill[]
}

const BillingList = ({ bills } : Props) => {
  return (
    <Box>
      {/* <Text>Billing List</Text> */}
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
      {bills &&
            bills.map((bill) => (
              <BillingItem key={bill._id as any} bill={bill} />
            ))}
      </Grid>

    </Box>
  );
}

export default BillingList
