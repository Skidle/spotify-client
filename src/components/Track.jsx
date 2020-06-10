import React from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Card, Statistic } from 'antd';
import { getTrack } from '../selectors';

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
      actions={[<Statistic title="Popularity" value={popularity} suffix="%" style={{ cursor: 'initial' }} />]}
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

const mapStateToProps = (state, props) => ({
  track: getTrack(state, props),
});

export default connect(
  mapStateToProps,
)(Track);
