import React from 'react';
import { useRef, useState } from 'react';
import * as d3 from 'd3';
import Legend from '../../Charts/WorldMap/Legend';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { SankeyData } from '../../../mockData/SankeyData';
import CancelIcon from '@mui/icons-material/Cancel';
import SankeyChart from '../Sanky/SankeyChart';
import { populationTrends } from '../../../mockData/populationTrend';

const InteractiveComboMap = ({ width, height, data }) => {
  const worldPopulation = data.worldPopulation;
  const topography = data.topography;

  // Map and projection
  const path = d3.geoPath();
  const projection = d3
    .geoMercator()
    .scale(150)
    .center([0, 30])
    .translate([width / 2, height / 2]);

  const pathGenerator = path.projection(projection);
  const chartRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoveredCountryId, setHoveredCountryId] = useState(null);
  const [countryName, setCountryName] = useState(null);

  const [tooltipData, setTooltipData] = useState({
    name: '',
    population: '',
    x: 0,
    y: 0,
  });
  const [dataCard, setDataCard] = useState({
    name: '',
    population: '',
  });

  // Color scale
  const colorScale = d3
    .scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeYlGnBu[7]);

  const getTrendData = (countryId) => {
    const countryTrend = populationTrends[countryId];
    if (!countryTrend) return { years: [], values: [] };

    const trendYears = Object.keys(countryTrend);
    const trendValues = Object.values(countryTrend);

    return { years: trendYears, values: trendValues };
  };

  return (
    <div>
      <div className="relative">
        <g className="legend" transform="translate(5,0)">
          <Legend
            color={colorScale}
            width={height / 1}
            tickFormat={d3.format('~s')}
          />
        </g>
        <svg
          ref={chartRef}
          className="viz mt-7"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <g className="topography">
            {topography.features.map((d) => (
              <path
                key={d.id}
                d={pathGenerator(d)}
                fill={colorScale(worldPopulation[d.id] || 0)}
                stroke={hoveredCountryId === d.id ? 'red' : 'white'}
                strokeWidth={hoveredCountryId === d.id ? 1.5 : 0.6}
                onClick={(event) => {
                  setIsClicked(true);
                  setHoveredCountryId(d.id);

                  const population = (
                    worldPopulation[d.id] || 'N/A'
                  ).toLocaleString();
                  setDataCard({
                    name: d.properties.name,
                    population,
                  });
                  setCountryName(d.properties.name);
                }}
                onMouseEnter={() => {
                  setTooltipVisible(true);
                  setHoveredCountryId(d.id);
                }}
                onMouseLeave={() => {
                  setTooltipVisible(false);
                  setHoveredCountryId(null);
                }}
                onMouseMove={(event) => {
                  const population = (
                    worldPopulation[d.id] || 'N/A'
                  ).toLocaleString();

                  // get x and y position relative to the chart
                  const [x, y] = d3.pointer(event, chartRef.current);

                  setTooltipData({
                    name: d.properties.name,
                    population,
                    left: x + 20,
                    top: y - 90,
                  });
                }}
              />
            ))}
          </g>
        </svg>

        {/* Tooltip */}
        {tooltipData && (
          <div
            className={` absolute bg-[#171717]  text-white rounded-md shadow-md shadow-slate-700 p-5 ${
              tooltipVisible ? 'visible' : 'hidden'
            }`}
            style={{
              left: tooltipData.left,
              top: tooltipData.top,
              zIndex: 9999,
            }}
          >
            {tooltipData.name}
            <br />
            {tooltipData.population}
            <br />
            <div>
              <Card
                sx={{
                  height: 150,
                  minWidth: 150,
                  maxWidth: 150,
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <LineChart
                    xAxis={[{ data: getTrendData(hoveredCountryId).years }]}
                    series={[
                      {
                        data: getTrendData(hoveredCountryId).values,
                      },
                    ]}
                    height={100}
                    margin={{ left: 20, right: 0, top: 30, bottom: 30 }}
                    grid={{ vertical: true, horizontal: true }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        {isClicked && (
          <div
            className={`${
              isClicked ? 'visible' : 'hidden'
            } flex flex-row justify-center`}
          >
            <Card
              sx={{
                height: 500,
                minWidth: 1000,
                maxWidth: 1000,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <div className="flex flex-row justify-between">
                  <div>
                    <Typography
                      variant="p"
                      className="text-red-800 font-extrabold"
                    >
                      {dataCard.name}
                    </Typography>
                    <br />
                    <Typography
                      variant="p"
                      className="text-red-800 font-extrabold"
                    >
                      {dataCard.population}
                    </Typography>
                  </div>
                  <IconButton
                    onClick={() => {
                      setIsClicked(!isClicked);
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                </div>

                <div className="flex flex-row justify-center">
                  <SankeyChart
                    data={SankeyData}
                    width={800}
                    height={400}
                    country={countryName}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveComboMap;
