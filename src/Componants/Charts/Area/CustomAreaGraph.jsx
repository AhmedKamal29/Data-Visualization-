import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';

const CustomAreaGraph = () => {
  const uData = [4000, 3000, 2000, 2780, 1890];
  const pData = [2400, 1398, 9800, 3908, 4800];
  const amtData = [2400, 2210, 0, 2000, 2181];
  const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E'];
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
            Area Graph
          </Typography>
          <LineChart
            width={400}
            height={300}
            series={[
              {
                data: uData,
                label: 'uv',
                area: true,
                stack: 'total',
                showMark: false,
              },
              {
                data: pData,
                label: 'pv',
                area: true,
                stack: 'total',
                showMark: false,
              },
              {
                data: amtData,
                label: 'amt',
                area: true,
                stack: 'total',
                showMark: false,
              },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            sx={{
              [`& .${lineElementClasses.root}`]: {
                display: 'none',
              },
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CustomAreaGraph;
