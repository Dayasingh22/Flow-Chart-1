import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div>
        <strong style={{ fontSize: '22px' }}>{data.data}</strong> <br />
        <img src={data.source} style={{ width: 80, height: 80, borderRadius: '50%' }} /> <br />
        <textarea cols="20" rows="5" value={data.textarea}></textarea>
      </div>
      <Handle type="source" position="bottom" style={{ background: '#555' }} />
    </>
  );
});
