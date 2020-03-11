import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 300,
//     backgroundColor: theme.palette.background.paper
//   },
//   nested: {
//     paddingLeft: theme.spacing(4)
//   },
//   button: {
//     margin: theme.spacing(0)
//   }
// }));

// const classes = useStyles();

const Complete = props => {
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
