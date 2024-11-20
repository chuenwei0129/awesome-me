import React from 'react';
import { useCountDown } from 'ahooks';

export default () => {
  const [countdown, formattedRes] = useCountDown({
    targetDate: `${new Date().getFullYear()}-12-31 23:59:59`,
  });
  const { days, hours, minutes, seconds, milliseconds } = formattedRes;

  return (
    <p>
      There are {days} days {hours} hours {minutes} minutes {seconds} seconds {milliseconds}{' '}
      milliseconds until {new Date().getFullYear()}-12-31 23:59:59
    </p>
  );
};
