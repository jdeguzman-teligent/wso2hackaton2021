import {
  VStack,
  Input,
  IconButton,
  useToast,
  Heading,
  SimpleGrid,
  Text,
  Badge,
} from "@chakra-ui/react";
import { ComponentProps, useEffect, useState } from "react";

import { topProducers } from "./producers-data";
import { Producer } from "./producer";
import { HStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/reducers";
import formatDate from "src/utils/formatDate";
import { FaArrowAltCircleDown } from "react-icons/fa";
import bill, { requestUpdateBillDetails } from "src/state/redux/ducks/bill";

export const TopProducers = (props: ComponentProps<typeof VStack>) => {
  const user = useSelector((state: RootState) => state.user);
  const bills = useSelector((state: RootState) => state.bill);
  const { selectedBill } = bills;
  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const toast = useToast();
  const [formData, setFormData] = useState({
    reading: "",
  });
  const { reading } = formData;

  useEffect(() => {
    setFormData({ ...formData, reading: selectedBill?.reading || "" });
  }, [selectedBill]);

  const dispatch = useDispatch();

  const onUpdate = async () => {
    if (!reading) {
      toast({
        title: "Reading value is required",
        status: "error",
        duration: 1800,
        isClosable: true,
      });
      return;
    }
    const value = {
      reading,
      duedate: selectedBill?.duedate,
      id: selectedBill?._id,
    };

    dispatch(requestUpdateBillDetails({ data: value, token: user.token }));
    toast({
      title: "Record successfully updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack
      {...props}
      align='flex-start'
      spacing={{ base: 6, "2xl": 8 }}
      height='full'
      pb={6}
    >
      <Heading size='md' color='gray.light'>
        Billing Detail
      </Heading>
      {/* <SimpleGrid columns={3} gap={{ base: 4, "2xl": 8 }}>
        {topProducers.map((producer, index) => (
          <Producer key={producer.name} {...producer} badge={index === 0} />
        ))}
      </SimpleGrid> */}

      <VStack flex={1} spacing={4} alignItems='flex-start' width='full'>
        <Heading
          color='gray.light'
          fontWeight='normal'
          textTransform='uppercase'
          letterSpacing={3}
          fontSize='sm'
        >
          {selectedBill?._id}
        </Heading>

        <HStack
          width='full'
          flex={1}
          bg='gray.dark'
          alignItems='center'
          justifyContent='flex-start'
        >
          <Input
            w='60%'
            ml={2}
            name='reading'
            placeholder='0.00'
            value={reading}
            onChange={(e) => onChange(e)}
            variant='filled'
            type='number'
          />
          <IconButton
            aria-label='settings'
            icon={<FaArrowAltCircleDown />}
            isRound={true}
            size='md'
            onClick={() => onUpdate()}
          />
        </HStack>

        <HStack
          width='full'
          flex={1}
          bg='gray.dark'
          alignItems='center'
          justifyContent='flex-start'
        >
          <Text ml={2}>PREVIOUS:</Text>
          <Badge variant='solid' colorScheme='blue' px={2}>
            {selectedBill?.previous}
          </Badge>
        </HStack>
        <HStack
          width='full'
          flex={1}
          bg='gray.dark'
          alignItems='center'
          justifyContent='flex-start'
        >
          <Text  ml={2}>USAGE kWH:</Text>
          <Badge variant='solid' colorScheme='blue' px={2}>
            {selectedBill?.consumedkw}
          </Badge>
        </HStack>
        <HStack
          width='full'
          flex={1}
          bg='gray.dark'
          alignItems='center'
          justifyContent='flex-start'
        >
          <Text  ml={2}>AMOUNT DUE:</Text>
          <Badge variant='solid' colorScheme='blue' px={2}>
            {selectedBill?.amountdue}
          </Badge>
        </HStack>
        <HStack
          width='full'
          flex={1}
          bg='gray.dark'
          alignItems='center'
          justifyContent='flex-start'
        >
          <Text  ml={2}>DUE DATE:</Text>
          <Badge variant='solid' colorScheme='blue' px={2}>
            {selectedBill?.duedate}
          </Badge>
        </HStack>
      </VStack>
    </VStack>
  );
};
