import React, {  } from 'react';
import { Bill } from '../interfaces';

import { Spacer, Box, HStack, Badge, Text, IconButton, Stack } from '@chakra-ui/react';
import {  FaSearchengin } from 'react-icons/fa';
import formatDate from '../utils/formatDate';
import { useDispatch } from 'react-redux';
import { setSelectedBill } from '../state/redux/ducks/bill';

type Props = {
  bill: Bill
}

const BillingItem = ({ bill }: Props) => { 

  const dispatch = useDispatch();  
  const onDetail = async (e) => {
    e.preventDefault();
    dispatch(setSelectedBill(bill));
  };

  
 return (
   <Box w='200px' rounded='20px' overflow='hidden' boxShadow='sm' bg='blue.100'>
     <HStack p={2}>
       <Text fontSize='sm'>Billing details for</Text>
       <Spacer/>
     <IconButton
       aria-label='settings'
       icon={<FaSearchengin />}
       isRound={true}
       alignSelf='flex-end'       
       onClick={(e) => onDetail(e)}
       alt='get bill details'
     />
     </HStack>
     <Box p={3}>
       <Stack isInline align='baseline'>
         <Badge variant='solid' colorScheme='teal' rounded='full' px={2}>
           Meter Id:
         </Badge>
         <Badge variant='solid' colorScheme='teal' rounded='full' px={2}>
           {bill.meterid}
         </Badge>
         
       </Stack>
       <Text as='h2' fontWeight='semibold' fontSize='sm' my={2}>
         kWH: {bill.reading}
       </Text>
       <Text as='h2' fontWeight='semibold' fontSize='sm' my={2}>
         Amount Due: {bill.amountdue}
       </Text>
       <Text as='h2' fontWeight='semibold' fontSize='sm' my={2}>
         Due date: {formatDate(bill.duedate)}
       </Text>
     </Box>
   </Box>
 );

};



export default BillingItem
