import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const CustomLineGraph = () => {
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
            Line Graph
          </Typography>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={300}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CustomLineGraph;
