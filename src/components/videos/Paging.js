import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { nextPage } from '../../actions';
import './Paging.css';

const Paging = (props) => {
  return (
    <div>
      <Button
        onClick={() => props.nextPage(props.selected, props.page.prevPageToken)}
        variant="contained"
        color="primary"
        className="button-width"
      >
        前へ
      </Button>
      <Button
        onClick={() => props.nextPage(props.selected, props.page.nextPageToken)}
        variant="contained"
        color="primary"
        className="button-width"
      >
        次へ
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { selected: state.selectedMember };
};

export default connect(mapStateToProps, { nextPage })(Paging);
