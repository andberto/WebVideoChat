import * as React from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import * as Constants from '../Constants';

state = {
   users: []
}

 queryComponentData() {
   axios.get(Constants.GET_ALL_USERS)
     .then(res => {
       this.setState({ res.data });
   })
 }

const SideList = () => {
  return (
    <List sx={{ width: '100%', height:'100%', bgcolor: 'background.paper' }}>
        {
          this.state.users.map(users =>
              <li key={users.username}>users.username</li>
            )
        }
    </List>
  );
};

export default SideList;
