import React, {useContext } from 'react';
import { SocketContext } from '../Contexts/SocketContext';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import * as Constants from '../Constants';
import makeStyles from "@material-ui/styles/makeStyles";

let users = []
let onlineUsers = []

axios.get(Constants.GET_ALL_USERS).then(res => { users = res.data; })
axios.get(Constants.GET_ONLINE_USERS).then(res => { onlineUsers = res.data; })

let offlineUsers = users.filter(x => !onlineUsers.includes(x));
let orderedUsers = onlineUsers + offlineUsers;

const useStyles = makeStyles({
  root: {
    "&$selected": {
      backgroundColor: "#3b3251",
      color: "#fff",
  }
  },
  selected: {}
});

const SideList = () => {
  const { selectReceiver } = useContext(SocketContext);
  const [selected, setSelected] = React.useState('');
  const styles = useStyles();
  let separatorIndex = onlineUsers.length-1;

  return (
    <List className={styles.root}>
        {
            users.map(function(item, i){
              return(
                  <ListItem
                    classes={{
                      root: styles.root,
                      selected: styles.selected
                    }}
                    selected={selected === item}
                    onClick = {() => { setSelected(item); selectReceiver(item.username);}}>
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
