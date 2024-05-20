import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import InteractiveComboMap from '../../Componants/Interactive/Map/InteractiveComboMap';
import SankeyCSVFile from '../../mockData/SankeyCSVFile';
import { Button, IconButton, Typography } from '@mui/material';
import AK from '../../assets/Logos/AK.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Interactive = () => {
  const [worldPopulation, setWorldPopulation] = useState(null);
  const [topography, setTopography] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const getData = async () => {
      setLoading(true);

      let populationData = {};
      await Promise.all([
        d3.json(
          'https://res.cloudinary.com/tropicolx/raw/upload/v1/Building%20Interactive%20Data%20Visualizations%20with%20D3.js%20and%20React/world.geojson'
        ),
        d3.csv(
          'https://res.cloudinary.com/tropicolx/raw/upload/v1/Building%20Interactive%20Data%20Visualizations%20with%20D3.js%20and%20React/world_population.csv',
          (d) => {
            populationData = {
              ...populationData,
              [d.code]: +d.population,
            };
          }
        ),
      ]).then((fetchedData) => {
        const topographyData = fetchedData[0];
        setWorldPopulation(populationData);
        setTopography(topographyData);
        console.log(populationData);
      });

      setLoading(false);
    };

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
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
      <div className="flex flex-col justify-center items-center mt-3 ">
        <InteractiveComboMap
          width={1500}
          height={600}
          data={{ worldPopulation, topography }}
        />
        {/* <SankeyCSVFile /> */}
      </div>
    </div>
  );
};

export default Interactive;
