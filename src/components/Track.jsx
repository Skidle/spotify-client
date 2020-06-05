import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { List, Avatar, Rate, Card } from 'antd';
import { getTrack } from '../selectors';

// eslint-disable-next-line no-mixed-operators
const getRate = popularity => popularity * 5 / 100;

const Track = ({
  track: {
    name,
    artistNames,
    imageUrl,
    popularity,
    previewUrl,
  },
}) => (
  <Card size="small">
    <List.Item
      actions={[<Rate style={{ fontSize: 20, marginBottom: '9px' }} defaultValue={getRate(popularity)} disabled allowHalf />]}
    >
      <List.Item.Meta
        avatar={<Avatar shape="square" size={48} src={imageUrl} />}
        title={name}
        description={artistNames.join(', ')}
      />
      {previewUrl
        ? (
          <audio
            controls
            src={previewUrl}
          >
            <track kind="captions" />
          </audio>
        )
        : <span>Audio preview is not available</span>}
    </List.Item>
  </Card>
);

const mapStateToProps = createStructuredSelector({
  track: getTrack,
});

export default connect(
  mapStateToProps,
)(Track);
