import React, { useEffect, useState } from "react";
import { Bill } from "../interfaces";
import {
  Badge,
  Input,
  IconButton,
  VStack,
  Text,
  HStack,
  useToast,
  Box,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { requestUpdateBillDetails } from "../state/redux/ducks/bill";
import formatDate from "../utils/formatDate";
import { RootState } from "../state/reducers";

type Props = {
  bill: Bill;
};

const BillDetails = ({ bill }: Props) => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    reading: "",
  });
  const { reading } = formData;

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setFormData({ ...formData, reading: bill.reading });
  }, [bill]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();

  const onUpdate = async (e) => {
    e.preventDefault();
    if (!reading) {
      toast({
        title: "Reading value is required",
        status: "error",
        duration: 1800,
        isClosable: true,
      });
      return;
    }

    const value = { reading, duedate: bill.duedate, id: bill._id };

    dispatch(requestUpdateBillDetails({ data: value, token: user.token }));
    toast({
      title: "Record successfully updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box w='100%' bg='gray.300' p={4}>
      <Stack isInline align='baseline' mb={5}>
        <Text color='blue.900' mr={5}>
          BILL ID:
        </Text>
        <Badge variant='solid' colorScheme='gray' px={2}>
          {bill._id}
        </Badge>
      </Stack>
      <Stack isInline align='baseline' mb={5}>
        <Text color='blue.900'>CURRENT:</Text>
        <Input
          w='60%'
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
          alignSelf='flex-end'
          onClick={(e) => onUpdate(e)}
        />
      </Stack>
      <Stack isInline align='baseline' mb={5}>
        <Text color='blue.900'>PREVIOUS:</Text>
        <Badge variant='solid' colorScheme='blue' px={2}>
          {bill.previous}
        </Badge>
        <Text color='blue.900'>USAGE kWH:</Text>
        <Badge variant='solid' colorScheme='blue' px={2}>
          {bill.consumedkw}
        </Badge>
      </Stack>
      <Stack isInline align='baseline' mb={5}>
        <Text color='blue.900'>AMOUNT DUE:</Text>
        <Badge variant='solid' colorScheme='blue' px={2}>
          {bill.amountdue}
        </Badge>
      </Stack>
      <Stack isInline align='baseline' mb={5}>
        <Text color='blue.900'>DUE DATE: </Text>
        <Badge variant='solid' colorScheme='blue' px={2}>
          {formatDate(bill.duedate)}
        </Badge>
      </Stack>
    </Box>
  );
};

export default BillDetails;
