import React from 'react';
import { List, Avatar, Rate, Card } from 'antd';

// eslint-disable-next-line no-mixed-operators
const getRate = (popularity) => popularity * 5 / 100;

const Track = ({
  name,
  artists,
  album: {
    images,
  },
  popularity,
  preview_url: previewUrl,
}) => {
  const artistNames = artists.map(({ name: artistName }) => artistName);

  return (
    <Card size="small">
      <List.Item
        actions={[<Rate style={{ fontSize: 20, marginBottom: '9px' }} defaultValue={getRate(popularity)} disabled allowHalf />]}
      >
        <List.Item.Meta
          avatar={<Avatar shape="square" size={48} src={images[0].url} />}
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
};

export default Track;
