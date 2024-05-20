import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import programer from '../../assets/illustrations/Programming.gif';
import { Button, IconButton, Typography } from '@mui/material';
import AK from '../../assets/Logos/AK.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Slide from '@mui/material/Slide';

const Landing = () => {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);

  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = `./Ahmed Mohamed Kamal - Frontend Developer.pdf`; // Path to your PDF file in the public folder
    link.download = 'Ahmed Mohamed Kamal - Frontend Developer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleArrowClick = () => {
    setShowAbout(!showAbout);
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
          <div className="flex flex-col justify-center">
            {showAbout ? (
              <div className="flex flex-col justify-around items-center">
                <Typography variant="h2" className="text-white">
                  {' '}
                  Ahmed Mohamed Kamal
                </Typography>
                <Typography variant="p" className="text-gray-500 font-bold">
                  {' '}
                  Software Engineer
                </Typography>
                <FontAwesomeIcon
                  icon={faAngleDown}
                  style={{
                    color: 'white',
                    marginRight: 15,
                    width: 30,
                    height: 30,
                    marginTop: 20,
                    cursor: 'pointer',
                  }}
                  className="animate-bounce infinite"
                  onClick={handleArrowClick}
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center mt-5 align-middle items-center">
                <Typography variant="h2" className="text-white">
                  About Me
                </Typography>
                <Typography variant="p" className="text-white w-[651px] h-[72]">
                  I am a skilled frontend developer with a passion for crafting
                  intuitive and visually appealing web applications. I bring
                  designs to life with clean, efficient code using my expertise
                  in modern frameworks like React and strong foundation in HTML,
                  CSS, and JavaScript. My attention to detail and commitment to
                  user experience drive me to constantly learn and implement the
                  latest industry trends and technologies, ensuring that every
                  project exceeds the client's expectations.
                </Typography>
                <FontAwesomeIcon
                  icon={faAngleDown}
                  style={{
                    color: 'white',
                    marginRight: 15,
                    width: 30,
                    height: 30,
                    marginTop: 20,
                    cursor: 'pointer',
                  }}
                  className="animate-bounce infinite"
                  onClick={handleArrowClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
