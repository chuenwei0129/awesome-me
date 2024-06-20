import React, { type FC } from 'react';

const Bar: FC<{ title: string }> = (props) => (
  <div className="text-gray-400">{props.title}</div>
);

export default Bar;
