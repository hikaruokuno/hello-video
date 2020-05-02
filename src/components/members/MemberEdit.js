import React, { useState, useEffect } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
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
import { fetchMember } from '../../actions';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import './MemberEdit.css';

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

const MemberEdit = (props) => {
  const [items, setItems] = useState([]);
  const { auth } = props;
  const authenticated = !auth.isEmpty;
  useEffect(() => {
    if (authenticated && auth.isLoaded) {
      // setItems(props.member);
      getMember();
      props.fetchMember(auth.uid);
    }
  }, [auth]);

  const getMember = async () => {
    const db = firebase.firestore();
    const lists = [];
    console.log(lists);
    await db
      .collection('users')
      .doc(auth.uid)
      .collection('members')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          lists.push(doc.data());
        });
      });
    // 昇順に並べ替える
    lists.sort(function (a, b) {
      return a.sort - b.sort;
    });
    console.log(lists);
    setItems(lists);
    return lists;
  };

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

  const membersUpdate = async (members) => {
    console.log(members);
    const db = firebase.firestore();
    // すべてのループが完了するまで待つ
    await Promise.all(
      members.map(async (member, sort = 0) => {
        console.log(member, sort);
        await db
          .collection('users')
          .doc(auth.uid)
          .collection('members')
          .doc(member.name)
          .update({
            sort: sort,
          })
          .then(function () {
            console.log('Document successfully updated!');
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error);
          });
      })
    );
    props.fetchMember(auth.uid);
  };

  const membersDelete = async (members) => {
    console.log(members);
    const db = firebase.firestore();
    await Promise.all(
      members.map(async (member) => {
        console.log(member[0].name);
        await db
          .collection('users')
          .doc(auth.uid)
          .collection('members')
          .doc(member[0].name)
          .delete()
          .then(function () {
            console.log('Document successfully deleted!');
          })
          .catch(function (error) {
            console.error('Error removing document: ', error);
          });
      })
    );
    props.fetchMember(auth.uid);
  };

  const selectMembers = checked.map((check) => {
    console.log('check', check);
    console.log('props.member', props.member);
    // props.memberオブジェクトの中の、idがcheckと同じプロパティを抜き出し
    // 抜き出したプロパティを返却
    return props.member.filter((obj) => obj.id === check);
  });

  const DragHandle = SortableHandle(() => (
    <ListItemIcon>
      <DragHandleIcon />
    </ListItemIcon>
  ));

  const SortableItem = SortableElement(({ name, id }) => (
    <ListItem
      ContainerComponent="div"
      key={id}
      role={undefined}
      dense
      button
      onClick={handleToggle(id)}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked.indexOf(id) !== -1}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `checkbox-list-label-${name}` }}
        />
      </ListItemIcon>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <DragHandle />
      </ListItemSecondaryAction>
    </ListItem>
  ));

  const SortableListContainer = SortableContainer(({ items }) => (
    <List component="div">
      {items.map(({ id, name }, index) => (
        <SortableItem key={id} index={index} name={name} id={id} />
      ))}
    </List>
  ));

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div>
      {(() => {
        if (!authenticated && auth.isLoaded) {
          return <span>ログインしてください</span>;
        } else if (!authenticated && !auth.isLoaded) {
          return <span>よみこみ中...</span>;
        } else if (props.member.length === 0) {
          return <div>推し追で、推しを追加してください。</div>;
        } else {
          return (
            <div>
              <SortableListContainer
                items={items}
                onSortEnd={onSortEnd}
                useDragHandle={true}
                lockAxis="y"
              />
              <Button
                onClick={() => membersUpdate(items)}
                variant="contained"
                color="primary"
                className="edit-button-width"
                to={{ pathname: '/members/complete', state: { text: '更新' } }}
                component={Link}
                // style={satoStyle}
              >
                更新
              </Button>
              <Button
                onClick={() => membersDelete(selectMembers)}
                variant="contained"
                color="secondary"
                className="edit-button-width"
                to={{ pathname: '/members/complete', state: { text: '削除' } }}
                component={Link}
                // style={satoStyle}
              >
                削除
              </Button>
            </div>
          );
        }
      })()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { member: state.members };
};

export default connect(mapStateToProps, { fetchMember })(MemberEdit);
