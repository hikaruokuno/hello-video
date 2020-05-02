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
                  <Button
                    onClick={() => props.selectedGroup('musume')}
                    style={{ backgroundColor: '#E5457D' }}
                    // to={{ pathname: '/members/complete', state: { text: '追加' } }}
                    // component={Link}
                    // style={satoStyle}
                  >
                    娘。
                  </Button>
                  <Button
                    onClick={() => props.selectedGroup('angerme')}
                    style={{ backgroundColor: '#FF85AD' }}
                    // to={{ pathname: '/members/complete', state: { text: '追加' } }}
                    // component={Link}
                    // style={satoStyle}
                  >
                    アン
                  </Button>
                  <Button
                    onClick={() => props.selectedGroup('juice')}
                    style={{ backgroundColor: '#F90' }}
                    // to={{ pathname: '/members/complete', state: { text: '追加' } }}
                    // component={Link}
                    // style={satoStyle}
                  >
                    JJ
                  </Button>
                  <Button
                    onClick={() => props.selectedGroup('kobushi')}
                    style={{ backgroundColor: '#F72F1F' }}
                    // to={{ pathname: '/members/complete', state: { text: '追加' } }}
                    // component={Link}
                    // style={satoStyle}
                  >
                    こぶ
                  </Button>
                  <Button
                    onClick={() => props.selectedGroup('tsubaki')}
                    style={{ backgroundColor: '#787FDC' }}
                    // to={{ pathname: '/members/complete', state: { text: '追加' } }}
                    // component={Link}
                    // style={satoStyle}
                  >
                    つば
                  </Button>
                  <Button
                    onClick={() => props.selectedGroup('beyo')}
                    style={{ backgroundColor: '#ba3cb8' }}
                    // to={{ pathname: '/members/complete', state: { text: '追加' } }}
                    // component={Link}
                    // style={satoStyle}
                  >
                    ビヨ
                  </Button>
                </ButtonGroup>
              </div>
              {/* <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="モーニング娘" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div onClick={handleClose}> */}
              <List component="div" disablePadding>
                {renderList}
              </List>
              {/* </div>
      </Collapse> */}
              <Button
                onClick={() => membersAdd(selectMembers)}
                variant="contained"
                color="primary"
                className="add-button-width"
                to={{ pathname: '/members/complete', state: { text: '追加' } }}
                component={Link}
                // style={satoStyle}
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
