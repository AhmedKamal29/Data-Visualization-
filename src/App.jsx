import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Typography } from '@mui/material';
import Map from './Componants/Charts/WorldMap/Map';
import CustomPieChart from './Componants/Charts/Pie/Pie';
import CustomBarChart from './Componants/Charts/Bar/BarChart';
import CustomeScatter from './Componants/Charts/Scatter/Scatter';
import CustomLineGraph from './Componants/Charts/Line/LineGraph';
import CustomAreaGraph from './Componants/Charts/Area/CustomAreaGraph';

function App() {
  const [worldPopulation, setWorldPopulation] = useState(null);
  const [topography, setTopography] = useState(null);
  const [loading, setLoading] = useState(true);

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
      });

      setLoading(false);
    };

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Typography variant="h2" className="text-white text-center ">
        {' '}
        Data Visualization Showcase
      </Typography>
      <div className="flex flex-col justify-evenly">
        <div className="flex flex-row justify-evenly">
          <CustomeScatter />
          <CustomBarChart />
          <CustomPieChart />
        </div>
        <div className="flex flex-row justify-evenly">
          <CustomLineGraph />
          <Map
            width={600}
            height={300}
            data={{ worldPopulation, topography }}
          />
          <CustomAreaGraph />
        </div>
      </div>
    </>
  );
}

export default App;
