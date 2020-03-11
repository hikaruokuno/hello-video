import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ video }) => {
  let items = new Array();
  for (let i = 1; i < video.items.length; i++) {
    items.push(video.items[i]);
  }

  const renderdList = items.map(v => {
    return (
      <VideoItem
        key={v.id.videoId}
        // onVideoSelect={onVideoSelect}
        video={v}
      />
    );
  });

  return <div className="ui relaxed divided list">{renderdList}</div>;
};

export default VideoList;

// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { FixedSizeList } from 'react-window';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     height: 400,
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper
//   }
// }));

// // props.videoをここに渡して使いたい
// // videoは渡せるが、エラーとなってしまう
// function renderRow(props) {
//   const { index, style, video } = props;
//   console.log(props);
//   return (
//     <ListItem button style={style} key={index}>
//       <ListItemText primary={`Video ${index + 1}`} />
//     </ListItem>
//   );
// }

// renderRow.propTypes = {
//   index: PropTypes.number.isRequired,
//   style: PropTypes.object.isRequired
// };

// export default function VideoList(props) {
//   console.log(props.video.items[0].snippet.title);
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <FixedSizeList height={400} width={300} itemSize={46} itemCount={10}>
//         {/* {renderRow(props)} */}
//         {renderRow}
//       </FixedSizeList>
//     </div>
//   );
// }
