import React, {useContext, useEffect, useState } from 'react';
import { SocketContext } from '../Contexts/SocketContext';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import * as Constants from '../Constants';
import makeStyles from "@material-ui/styles/makeStyles";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const useStyles = makeStyles({
  root: {
      color: '#c9c9cb',
    "&$selected": {
      backgroundColor: "#3c3e44",
  }
  } ,
  selected: {}
});

const StyledBadge = styled(Badge)(({theme, col: color }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: color,
    color: color,
    boxShadow: `0 0 0 2px #333439`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SideList = () => {
    const { selectReceiver, selectedUser } = useContext(SocketContext);
    const styles = useStyles();
    const [ users, setUsers ] = useState([]);
    const [ onlineUsers, setOnlineUsers] = useState([]);
    const [ offlineUsers, setOfflineUsers] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(Constants.GET_ALL_USERS).then(res => { setUsers(res.data); })
            axios.get(Constants.GET_ONLINE_USERS).then(res => { setOnlineUsers(res.data); })

            var difference =  users.filter(object1 => {
                return !onlineUsers.some(object2 => {
                  return object1.username === object2.username;
                });
            });

            setOfflineUsers(difference);

        }, 1000);
        return () => clearInterval(interval);
    }, [setUsers, setOnlineUsers, setOfflineUsers, onlineUsers, users]);

  return (
    <div style = {{marginTop:'10%'}}>
    <List className={styles.root}>
    <ListItem style={{color: "#999a9d"}}>Online users</ListItem>
        {
            onlineUsers.map(function(item, i){
              return(
                  <ListItem
                    classes={{
                      root: styles.root,
                      selected: styles.selected,
                    }}
                    selected={selectedUser === item.sockid}
                    onClick = {() => { selectReceiver(item.username);}}>
                    <ListItemAvatar>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        col = 'green'
                      >
                      <Avatar style={{
                          backgroundColor: "#5865f2",
                          color: "white"
                      }}>{ item.username.toUpperCase().charAt(0) }
                      </Avatar>
                      </StyledBadge>
                    </ListItemAvatar>
                    <ListItemText
                      primary = { item.username }
                    />
                  </ListItem>
              );
            })
        }
    </List>

    <List className={styles.root}>
    <ListItem style={{color: "#999a9d"}}>Offline users</ListItem>
        {
            offlineUsers.map(function(item, i){
              return(
                  <ListItem
                    classes={{
                      root: styles.root,
                      selected: styles.selected
                    }}>
                    <ListItemAvatar>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        col = 'red'
                      >
                      <Avatar style={{
                          backgroundColor: "#5865f2",
                          color: "white"
                      }}>{ item.username.toUpperCase().charAt(0) }
                      </Avatar>
                      </StyledBadge>
                    </ListItemAvatar>
                    <ListItemText
                      primary = { item.username }
                    />
                  </ListItem>
              );
            })
        }
    </List>
    </div>
  );
};

export default SideList;
