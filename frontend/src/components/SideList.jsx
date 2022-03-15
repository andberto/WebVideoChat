import React, { useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import * as Constants from '../Constants';

let users = []
axios.get(Constants.GET_ALL_USERS).then(res => { users = res.data; })

const SideList = () => {
  return (
    <List sx={{ width: '100%', height:'100%', bgcolor: 'background.paper' }}>
        {
            //
        }
    </List>
  );
};

export default SideList;
