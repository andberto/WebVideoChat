import React, {useContext } from 'react';
import { SocketContext } from '../Contexts/SocketContext';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import * as Constants from '../Constants';

let users = []
axios.get(Constants.GET_ALL_USERS).then(res => { users = res.data; })

const SideList = () => {
  const { selectReceiver } = useContext(SocketContext);

  return (
    <List>
        {
            users.map(function(item, i){
              return(
                  <ListItem onClick={() => selectReceiver(item.username)}>
                    <ListItemAvatar>
                      <Avatar>{ item.username.toUpperCase().charAt(0) }</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary = { item.username }
                    />
                  </ListItem>
              );
            })
        }
    </List>
  );
};

export default SideList;
