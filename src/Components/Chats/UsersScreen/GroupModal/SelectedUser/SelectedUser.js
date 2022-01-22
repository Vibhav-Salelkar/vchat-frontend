import { CloseIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react';
import UsersScreen from '../../UsersScreen';

const SelectedUser = ({user,handleComponentClick}) => {
  return <Box
    borderRadius={'10px'}
    fontSize={'0.75rem'}
    ml={2}
    display={'inline-block'}
    backgroundColor={'green.200'}
    mb={1}
    px={2}
    py={1}
    cursor={'pointer'}
    onClick={handleComponentClick}
  >
      {user.name}
      <SmallCloseIcon color={'red.600'} m="0 1px 1px 2px"></SmallCloseIcon>
  </Box>
};

export default SelectedUser;
