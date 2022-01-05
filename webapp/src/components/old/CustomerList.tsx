import CustomerItem from './CustomerItem'
import { Grid } from '@chakra-ui/react'
import { Customer } from '../interfaces'

type Props = {
  customers: Customer[]
}

const CustomerList = ({ customers } : Props) => {
  return (

    
    <Grid templateColumns='repeat(7, 1fr)' gap={6}>
      {customers &&
          customers.map((customer) => (
            <CustomerItem key={customer._id as any} customer={customer} />
          ))}
    </Grid>
  );
}

export default CustomerList
