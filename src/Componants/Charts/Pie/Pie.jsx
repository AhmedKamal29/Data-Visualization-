import React, { useState } from 'react';
import { Box, Slider, Card, CardContent, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { data1, data2 } from '../../../mockData/PieChartData';

const CustomPieChart = (props) => {
  const [radius, setRadius] = useState(50);
  const [itemNb, setItemNb] = useState(5);

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setItemNb(newValue);
  };
  const handleRadius = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setRadius(newValue);
  };

  return (
    <>
      <Card
        sx={{
          height: 400,
          minWidth: 500,
          maxWidth: 500,
          margin: 2,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="p"
            className="text-xl text-[#04041B] font-bold text"
          >
            PieChart
          </Typography>
          <Box sx={{ width: '100%' }}>
            <PieChart
              height={200}
              series={[
                { data: data1, outerRadius: radius },
                {
                  data: data2.slice(0, itemNb),
                  innerRadius: radius,
                  arcLabel: (params) => params.label ?? '',
                },
              ]}
            />

            <Typography id="input-item-number" gutterBottom>
              Number of items
            </Typography>
            <Slider
              value={itemNb}
              onChange={handleItemNbChange}
              valueLabelDisplay="auto"
              min={1}
              max={8}
              aria-labelledby="input-item-number"
            />
            <Typography id="input-radius" gutterBottom>
              Radius
            </Typography>
            <Slider
              value={radius}
              onChange={handleRadius}
              valueLabelDisplay="auto"
              min={15}
              max={100}
              aria-labelledby="input-radius"
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomPieChart;
