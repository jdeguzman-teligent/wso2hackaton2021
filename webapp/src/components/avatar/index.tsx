import { HStack, Text, Avatar as ChakraAvatar } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { decodeIdToken } from 'src/actions/session';
import { RootState } from 'src/state/reducers';

export const Avatar = () => {

  const user = useSelector((state: RootState) => state.user) ;  
  const _user: any = decodeIdToken(user.ISToken?.id_token);
  
  return (
    <HStack>
      <Text mr={3} color="gray.light">{_user.sub}</Text>
      <ChakraAvatar name='Jimmy De Guzman' src='/images/dog-2.jpg' />
    </HStack>
  )
}