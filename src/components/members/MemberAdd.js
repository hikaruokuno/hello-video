import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { fetchMember, selectedGroup } from '../../actions';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './MemberAdd.css';
import { groupNameAndColor } from '../../reducers/groupsReducer';

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
  const { auth } = props;
  const authenticated = !auth.isEmpty;

  useEffect(() => {
    if (authenticated && auth.isLoaded) {
      console.log('ログイン中');
    }
  }, [auth]);

  const classes = useStyles();
  const [checked, setChecked] = useState([]);
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

  const membersAdd = async (members) => {
    const db = firebase.firestore();

    // すべてのループが完了するまで待つ
    await Promise.all(
      members.map(async (member, id = 0) => {
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

  const memberList = props.group;
  const nonAddMember = memberList.member.filter((memb) => {
    // 推したちに追加されていないメンバーを抽出する
    return !props.member.some((member) => member.name === memb.name);
  });

  const selectMembers = checked.map((check) => {
    return props.helloMember[check];
  });

  const renderList = nonAddMember.map((memb) => {
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

  const groupList = groupNameAndColor.map((group) => {
    return (
      <Button
        onClick={() => props.selectedGroup(group.id)}
        style={{ backgroundColor: group.color }}
      >
        {group.name}
      </Button>
    );
  });

  return (
    <div>
      {(() => {
        if (!authenticated && auth.isLoaded) {
          return <div>ログインすると、推しを追加できます。</div>;
        } else if (!authenticated && !auth.isLoaded) {
          return <div>よみこみ中...</div>;
        } else {
          return (
            <div>
              <div style={{ textAlign: 'center' }}>
                <ButtonGroup
                  size="midium"
                  variant="contained"
                  color="primary"
                  aria-label="contained primary button group"
                  style={{ marginTop: '5px', textAlign: 'center' }}
                >
                  {groupList}
                </ButtonGroup>
              </div>
              <List component="div" disablePadding>
                {renderList}
              </List>
              <Button
                onClick={() => membersAdd(selectMembers)}
                variant="contained"
                color="primary"
                className="add-button-width"
                to={{ pathname: '/members/complete', state: { text: '追加' } }}
                component={Link}
              >
                追加
              </Button>
            </div>
          );
        }
      })()}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.groups);
  return {
    member: state.members,
    group: state.selectedGroup,
    helloMember: state.groups,
  };
};

export default connect(mapStateToProps, { fetchMember, selectedGroup })(
  MemberAdd
);
