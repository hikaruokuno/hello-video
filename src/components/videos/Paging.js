import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { nextPage } from '../../actions';
import './Paging.css';

const Paging = props => {
  console.log(props);
  console.log(props.page.nextPageToken);
  return (
    // TODO: 現在表示中のtermをどっかから撮ってくる（state?）
    <div>
      <Button
        onClick={() => props.nextPage(props.selected, props.page.prevPageToken)}
        variant="contained"
        color="primary"
        className="button-width"
        // to={{ pathname: '/members/complete', state: { text: '更新' } }}
        // component={Link}
        // style={satoStyle}
      >
        前へ
      </Button>
      <Button
        onClick={() => props.nextPage(props.selected, props.page.nextPageToken)}
        variant="contained"
        color="primary"
        className="button-width"
        // to={{ pathname: '/members/complete', state: { text: '更新' } }}
        // component={Link}
        // style={satoStyle}
      >
        次へ
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return { selected: state.selectedMember };
};

export default connect(mapStateToProps, { nextPage })(Paging);
