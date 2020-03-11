import React from 'react';
import { connect } from 'react-redux';
import { fetchVideo } from '../../actions';
import Button from '@material-ui/core/Button';

class VideoDetail extends React.Component {
  componentDidMount() {
    this.props.fetchVideo('道重さゆみ');
  }

  render() {
    const video = this.props.videos;

    const michisigeStyle = {
      background: 'lightpink',
      color: 'white'
    };
    const odaStyle = {
      background: 'violet',
      color: 'white'
    };
    const satoStyle = {
      background: '#00a968',
      color: 'white'
    };
    if (video.length === 0) {
      return <div>Loading...</div>;
    }
    const renderList = video.items.map(item => {
      const videoSrc = `https://www.youtube.com/embed/${item.id.videoId}`;
      return (
        <div>
          <div className="ui embed">
            <iframe title="video player" src={videoSrc} />
          </div>
          <div className="ui segment">
            <h4 className="ui header">{item.snippet.title}</h4>
            <p>{item.snippet.description}</p>
          </div>
        </div>
      );
    });

    console.log(renderList);
    return (
      <div>
        <Button
          onClick={() => this.props.fetchVideo('道重さゆみ')}
          style={michisigeStyle}
        >
          道重さゆみ
        </Button>
        <Button
          onClick={() => this.props.fetchVideo('小田さくら')}
          style={odaStyle}
        >
          小田さくら
        </Button>
        <Button
          onClick={() => this.props.fetchVideo('佐藤優樹')}
          style={satoStyle}
        >
          佐藤優樹
        </Button>
        {renderList}
      </div>
    );
  }
}

const mapStateTpProps = state => {
  return { videos: state.videos };
};

export default connect(
  mapStateTpProps,
  { fetchVideo }
)(VideoDetail);
