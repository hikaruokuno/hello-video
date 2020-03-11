import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { fetchMember } from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  button: {
    margin: theme.spacing(0)
  }
}));

const MemberEdit = props => {
  console.log(props.member);
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(true);
  const [setDrawer] = useState(false);
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClose = () => {
    setDrawer(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const membersDelete = members => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const userUId = user.uid;
        const db = firebase.firestore();
        const userInfo = db.collection('users').doc(userUId);
        await Promise.all(
          members.map(async member => {
            await db
              .collection('users')
              .doc(userUId)
              .collection('members')
              .doc(member.name)
              .delete()
              .then(function() {
                console.log('Document successfully deleted!');
              })
              .catch(function(error) {
                console.error('Error removing document: ', error);
              });
          })
        );
        props.fetchMember(user);
      }
    });
  };

  // const morningMusume = {
  //   groupName: 'モーニング娘。',
  //   member: [
  //     { id: 0, name: '譜久村聖', color: 'hotpink', isDone: false },
  //     { id: 1, name: '生田衣梨奈', color: 'greenyellow', isDone: false },
  //     { id: 2, name: '石田亜佑美', color: 'royalblue', isDone: false },
  //     { id: 3, name: '佐藤優樹', color: '#00a968', isDone: false },
  //     { id: 4, name: '小田さくら', color: 'violet', isDone: false },
  //     { id: 5, name: '野中美希', color: 'purple', isDone: false },
  //     { id: 6, name: '牧野真莉愛', color: 'lightpink', isDone: false },
  //     { id: 7, name: '羽賀朱音', color: 'orange', isDone: false },
  //     { id: 8, name: '加賀楓', color: 'red', isDone: false },
  //     { id: 9, name: '横山玲奈', color: 'gold', isDone: false },
  //     { id: 10, name: '森戸知沙希', color: 'white', isDone: false }
  //   ]
  // };

  const selectMembers = checked.map(check => {
    return props.member[check];
  });

  const renderList = props.member.map(memb => {
    const labelId = `checkbox-list-label-${memb.id}`;
    return (
      <ListItem
        key={memb.id}
        role={undefined}
        dense
        button
        onClick={handleToggle(memb.id)}
        className={classes.nested}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(memb.id) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={memb.name} />
      </ListItem>
      // TODO: グループごとにする
      // <div>{memb.name}</div>
      // <Link to={{ pathname: '/videos/show', state: { member: memb.name } }}>
      //   <Button>{memb.name}</Button>
      // </Link>
    );
  });

  return (
    <div>
      {renderList}
      <Button
        onClick={() => membersDelete(selectMembers)}
        variant="contained"
        color="secondary"
        className={classes.button}
        to={{ pathname: '/members/complete', state: { text: '削除' } }}
        component={Link}
        // style={satoStyle}
      >
        削除
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return { member: state.members };
};

export default connect(
  mapStateToProps,
  { fetchMember }
)(MemberEdit);

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import config from '../../config/firebase-config';

// firebase.initializeApp(config);
// // firebase.firestore().settings({ timestampsInSnapshots: true });
// const db = firebase.firestore();

// if (firebase.auth !== null) {
//   // const userId = firebase.auth.currentUser.uid;
//   const userId = firebase.auth;

//   console.log(userId);
// }

// const classes = useStyles();

// const handleToggle = value => () => {
//   const currentIndex = checked.indexOf(value);
//   const newChecked = [...checked];

//   if (currentIndex === -1) {
//     newChecked.push(value);
//   } else {
//     newChecked.splice(currentIndex, 1);
//   }

//   setChecked(newChecked);
// };

// import React from 'react';

// const MemberEdit = () => {
//   return <div>MemberEdit</div>;
// };

// export default MemberEdit;
