import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Complete = (props) => {
  console.log(props.location.state.text);
  return (
    <div>
      <p>{`${props.location.state.text}できました`}</p>
      <Button
        // onClick={() => membersUpdate(items)}
        variant="contained"
        color="primary"
        // className={classes.button}
        to={{ pathname: '/' }}
        component={Link}
        // style={satoStyle}
      >
        ホームへ
      </Button>
    </div>
  );
};

export default Complete;
