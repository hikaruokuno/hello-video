import React, { useState, useEffect } from 'react';
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
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(0),
  },
}));

const MemberAdd = (props) => {
  console.log(props.member);
  const { auth } = props;
  const authenticated = !auth.isEmpty;
  console.log('authenticated', authenticated);
  console.log('isLoaded', auth.isLoaded);

  useEffect(() => {
    if (authenticated && auth.isLoaded) {
      // setItems(props.member);
      console.log('ログイン中');
    }
  }, [auth]);

  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(true);
  const [setDrawer] = useState(false);
  const handleToggle = (value) => () => {
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
    // setDrawer(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const membersAdd = async (members) => {
    const db = firebase.firestore();

    // すべてのループが完了するまで待つ
    await Promise.all(
      members.map(async (member, id = 0) => {
        console.log(member, id);
        await db
          .collection('users')
          .doc(auth.uid)
          .collection('members')
          .doc(member.name)
          .set({
            id: member.id,
            name: member.name,
            color: member.color,
            sort: 99,
          })
          .then(function () {
            console.log('Document written');
          })
          .catch(function (error) {
            console.error('Error adding document: ', error);
          });
      })
    );
    props.fetchMember(auth.uid);
  };

  const memberList = {
    member: [
      {
        id: 11,
        name: '竹内朱莉',
        group: 'アンジュルム',
        color: 'bule',
        isDone: false,
      },
      {
        id: 12,
        name: '室田瑞希',
        group: 'アンジュルム',
        color: '#007ec7',
        isDone: false,
      },
      {
        id: 13,
        name: '佐々木莉佳子',
        group: 'アンジュルム',
        color: 'gold',
        isDone: false,
      },
      {
        id: 14,
        name: '上國料萌衣',
        group: 'アンジュルム',
        color: 'Aquamarine',
        isDone: false,
      },
      {
        id: 15,
        name: '笠原桃奈',
        group: 'アンジュルム',
        color: '#E5007F',
        isDone: false,
      },
      {
        id: 16,
        name: '船木結',
        group: 'アンジュルム',
        color: '#acdd4d',
        isDone: false,
      },
      {
        id: 17,
        name: '川村文乃',
        group: 'アンジュルム',
        color: 'plum',
        isDone: false,
      },
      {
        id: 18,
        name: '太田遥香',
        group: 'アンジュルム',
        color: '#00b379',
        isDone: false,
      },
      {
        id: 19,
        name: '伊勢鈴蘭',
        group: 'アンジュルム',
        color: '#f5b48c',
        isDone: false,
      },
      {
        id: 20,
        name: '橋迫鈴',
        group: 'アンジュルム',
        color: '#f00',
        isDone: false,
      },
    ],
  };

  const selectMembers = checked.map((check) => {
    return memberList.member[check];
  });

  const renderList = memberList.member.map((memb) => {
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
    );
  });

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="アンジュルム" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div onClick={handleClose}>
          <List component="div" disablePadding>
            {renderList}
          </List>
        </div>
      </Collapse>
      <Button
        onClick={() => membersAdd(selectMembers)}
        variant="contained"
        color="primary"
        className={classes.button}
        to={{ pathname: '/members/complete', state: { text: '追加' } }}
        component={Link}
        // style={satoStyle}
      >
        追加
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { member: state.members };
};

export default connect(mapStateToProps, { fetchMember })(MemberAdd);
