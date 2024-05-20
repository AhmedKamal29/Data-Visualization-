import React from 'react';
import { useNavigate } from 'react-router-dom';
import programer from '../../assets/illustrations/Programming.gif';
import { Button, IconButton, Typography } from '@mui/material';
import AK from '../../assets/Logos/AK.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Landing = () => {
  const navigate = useNavigate();

  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = `./Ahmed Mohamed Kamal - Frontend Developer.pdf`; // Path to your PDF file in the public folder
    link.download = 'Ahmed Mohamed Kamal - Frontend Developer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex flex-col justify-evenly">
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
        <div className="flex flex-row justify-evenly items-center">
          <img
            alt="programer"
            src={programer}
            width={600}
            height={600}
            className="mt-9"
          />
          <div className="flex flex-col justify-around items-center">
            <Typography variant="h2" className="text-white">
              {' '}
              Ahmed Mohamed Kamal
            </Typography>
            <Typography variant="p" className="text-gray-500 font-bold">
              {' '}
              Software Engineer
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
