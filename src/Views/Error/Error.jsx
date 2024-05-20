import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';
import Grow from '@mui/material/Grow';
import errorImg from '../../assets/illustrations/404 Error.gif';

const Error = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const error = useRouteError();
  console.error(error);
  return (
    <div>
      <Box>
        <div className="flex justify-center flex-col h-screen items-center">
          <img alt="error" src={errorImg} width={300} height={300} />
          <Grow in={show}>
            <Typography variant="h1" className="text-white pb-4">
              Oops<span className="text-white">!</span>
            </Typography>
          </Grow>
          <Typography variant="p" className="pb-3 text-white">
            Sorry, an unexpected error has occurred.
          </Typography>
          <Typography
            variant="h6"
            className="text-gray font-extrabold text-white"
          >
            <i>
              {props.status} {props.msg}
            </i>
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default Error;
