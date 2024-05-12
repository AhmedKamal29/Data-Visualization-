import React, { useState } from 'react';
import { series } from '../../../mockData/BarChartData';
import { Box, Slider, Card, CardContent, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const CustomBarChart = (props) => {
  const [seriesNb, setSeriesNb] = useState(2);
  const [itemNb, setItemNb] = useState(5);

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setItemNb(newValue);
  };
  const handleSeriesNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setSeriesNb(newValue);
  };

  return (
    <>
      <Card
        sx={{
          height: 400,
          minWidth: 400,
          maxWidth: 400,
          margin: 2,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="p"
            className="text-xl text-[#04041B] font-bold text"
          >
            BarChart
          </Typography>
          <Box sx={{ width: '100%' }}>
            <BarChart
              height={200}
              series={series
                .slice(0, seriesNb)
                .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
            />

            <Typography id="input-item-number" gutterBottom>
              Number of items
            </Typography>
            <Slider
              value={itemNb}
              onChange={handleItemNbChange}
              valueLabelDisplay="auto"
              min={1}
              max={20}
              aria-labelledby="input-item-number"
            />
            <Typography id="input-series-number" gutterBottom>
              Number of series
            </Typography>
            <Slider
              value={seriesNb}
              onChange={handleSeriesNbChange}
              valueLabelDisplay="auto"
              min={1}
              max={3}
              aria-labelledby="input-series-number"
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomBarChart;
