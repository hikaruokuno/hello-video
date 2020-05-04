import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Complete = (props) => {
  return (
    <div>
      <p>{`${props.location.state.text}できました`}</p>
      <Button
        variant="contained"
        color="primary"
        to={{ pathname: '/' }}
        component={Link}
      >
        ホームへ
      </Button>
    </div>
  );
};

export default Complete;
