import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import React, {useCallback, useState} from 'react';
import theme, {Height, width} from '../../Constants/theme';

const Loader = () => {
  return (
    <ContentLoader
      style={{
        marginVertical: theme.SIZES.large,
        marginHorizontal: theme.SIZES.small,
        width: width,
      }}
      speed={2}
      width={width}
      height={Height}
      viewBox={`0 0 ${width} ${Height}`}
      backgroundColor={'#f3f3f3'}
      foregroundColor="#ecebeb">
      <Circle x="4" y="1" cx="30" cy="30" r="30" />
      <Rect x="80" y="17" rx="3" ry="3" width="140" height="10" />
      <Rect x="80" y="40" rx="3" ry="3" width="85" height="9" />
      <Rect x="4" y="80" rx="3" ry="3" width={width * 0.93} height="130" />
      <Circle x="4" y="230" cx="30" cy="30" r="30" />
      <Rect x="80" y="247" rx="3" ry="3" width="140" height="10" />
      <Rect x="80" y="270" rx="3" ry="3" width="85" height="9" />
      <Rect x="4" y="310" rx="3" ry="3" width={width * 0.93} height="130" />
    </ContentLoader>
  );
};
export default Loader;
