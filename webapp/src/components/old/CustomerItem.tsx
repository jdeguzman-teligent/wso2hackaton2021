import { useDispatch, useSelector } from 'react-redux';
import { Customer } from '../interfaces';
import { requestBills } from '../state/redux/ducks/bill';

import { Box, Badge, Text, IconButton, Stack, HStack, Spacer } from '@chakra-ui/react';
import {  FaPhoenixSquadron } from 'react-icons/fa';
import { RootState } from '../state/reducers';
import { login } from '../state/redux/ducks/user';

type Props = {
  customer: Customer
}

const CustomerItem = ({ customer } : Props) => {
  
  const user = useSelector((state: RootState) => state.user) ;

  const dispatch = useDispatch();  

  const onSubmit = async (e,_customerId) => {
    e.preventDefault();
    //dispatch(login({}));
    dispatch(requestBills({customerid: _customerId, token: user.token}));
  };

 
  return (
    <Box
      w='250px'
      rounded='20px'
      overflow='hidden'
      boxShadow='sm'
      bg='pink.100'
      p={3}
    >
      <HStack>
        <Text as='h2' fontWeight='semibold' fontSize='md' my={2}>
          {customer.user.name}
        </Text>
        <Spacer/>
        <IconButton
          aria-label='settings'
          icon={<FaPhoenixSquadron />}
          isRound={true}
          alt='get bills'
          onClick={(e) => onSubmit(e, customer.customerid)}
        />
      </HStack>
      <Box >
        <Text fontSize='sm' mb={2}>Meter ID(s):</Text>
        <Stack isInline align='baseline'>
          {customer.meterids.map((meterid) => (
            <Badge
              key={meterid}
              variant='solid'
              colorScheme='teal'
              rounded='full'
              px={2}
            >
              {meterid}
            </Badge>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default CustomerItem


// <Link href={`/`}>
//       <a onClick={e => onSubmit(e, customer.customerid) } className={customerStyles.card}>
//         <h2>{customer.user.name}</h2>

//         <div  >
//           {customer.meterids.map((meterid) => (
//             <p key={meterid}>{meterid}</p>
//           ))}
//         </div>
//       </a>
//     </Link>