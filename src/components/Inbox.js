import React, { Component, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { fetchVideo, selectedMember } from '../actions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const Inbox = props => {
  const memberList = props.members.map(member => {
    return member.name;
  });
  const renderList = memberList.map(member => {
    const onClick = member => {
      props.fetchVideo(member);
      props.selectedMember(member);
    };
    return (
      <ListItem
        button
        to={{ pathname: '/videos/show', state: { member: member } }}
        component={Link}
        className={props.nested}
      >
        <ListItemIcon>
          <FavoriteBorderIcon />
        </ListItemIcon>
        <Button
          onClick={() => onClick(member)}
          // style={satoStyle}
        >
          {member}
        </Button>
      </ListItem>
    );
  });
  return <div>{renderList}</div>;
};

const mapStateToProps = state => {
  console.log(state);
  return {
    videos: state.videos,
    members: state.members
  };
};

export default connect(mapStateToProps, { fetchVideo, selectedMember })(Inbox);
