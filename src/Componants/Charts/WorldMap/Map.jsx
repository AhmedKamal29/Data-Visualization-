import { useRef, useState } from 'react';
import * as d3 from 'd3';
import Legend from './Legend';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const Map = ({ width, height, data }) => {
  const worldPopulation = data.worldPopulation;
  const topography = data.topography;

  // Map and projection
  const path = d3.geoPath();
  const projection = d3
    .geoMercator()
    .scale(85)
    .center([0, 30])
    .translate([width / 2, height / 2]);

  const pathGenerator = path.projection(projection);
  const chartRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    name: '',
    population: '',
    x: 0,
    y: 0,
  });

  // Color scale
  const colorScale = d3
    .scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeYlGnBu[7]);

  return (
    <>
      <Card
        sx={{
          height: 400,
          minWidth: 600,
          maxWidth: 600,
          margin: 2,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <div>
            <Typography
              variant="p"
              className="text-xl text-[#04041B] font-bold text"
            >
              World Map
            </Typography>
          </div>
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
              className="viz"
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
                    stroke="#FFFFFF"
                    strokeWidth={0.3}
                    onMouseEnter={() => {
                      setTooltipVisible(true);
                    }}
                    onMouseLeave={() => {
                      setTooltipVisible(false);
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

              {/* Legend */}
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
                        xAxis={[{ data: [1, 2, 30] }]}
                        series={[
                          {
                            data: [2, 5.5, 2],
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
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Map;
