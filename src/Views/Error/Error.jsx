import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useRouteError } from 'react-router-dom';
import Grow from '@mui/material/Grow';
import errorImg from '../../assets/illustrations/404 Error.gif';
import { useNavigate } from 'react-router-dom';
import AK from '../../assets/Logos/AK.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Error = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = `./Ahmed Mohamed Kamal - Frontend Developer.pdf`; // Path to your PDF file in the public folder
    link.download = 'Ahmed Mohamed Kamal - Frontend Developer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <div className="flex flex-row justify-between shadow-md shadow-slate-900">
        <div className="flex flex-row justify-start items-center">
          <IconButton
            onClick={() => {
              navigate('/');
            }}
          >
            {' '}
            <img
              alt="Brand"
              src={AK}
              width={150}
              height={150}
              className="fill-white "
            />
          </IconButton>
          <div className="mx-8">
            <Typography
              variant="p"
              className="text-white cursor-pointer font-bold"
              onClick={() => {
                navigate('/Basic');
              }}
            >
              Basic Charts
            </Typography>
          </div>
          <div>
            <Typography
              variant="p"
              className="text-white cursor-pointer font-bold"
              onClick={() => {
                navigate('/Interactive');
              }}
            >
              Interactive World Map
            </Typography>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center mr-8">
          <FontAwesomeIcon
            icon={faLinkedin}
            style={{
              color: 'white',
              marginRight: 15,
              width: 30,
              height: 30,
              cursor: 'pointer',
            }}
            onClick={() => {
              window.location.href =
                'https://www.linkedin.com/in/ahmed-kamal-59815013b/';
            }}
          />
          <FontAwesomeIcon
            icon={faGithub}
            style={{
              color: 'white',
              marginRight: 15,
              width: 30,
              height: 30,
              cursor: 'pointer',
            }}
            onClick={() => {
              window.location.href = 'https://github.com/AhmedKamal29';
            }}
          />

          <Button
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              padding: 1,
            }}
            onClick={() => {
              handleDownloadPdf();
            }}
          >
            Resume
          </Button>
        </div>
      </div>
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
