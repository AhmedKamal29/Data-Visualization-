import React, { useState } from 'react';
import { series } from '../../../mockData/ScatterData';
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  TextField,
  Stack,
} from '@mui/material';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const POINTS_NUMBER = 10;

const CustomeScatter = () => {
  const [colorX, setColorX] = useState('piecewise');
  const [colorY, setColorY] = useState('None');
  const [colorZ, setColorZ] = useState('None');

  return (
    <>
      <Card
        sx={{
          height: 400,
          minWidth: 500,
          maxWidth: 500,
          margin: 2,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <div>
            <Typography
              variant="p"
              className="text-xl text-[#04041B] font-bold"
            >
              Scatter Plot
            </Typography>
          </div>
          <Stack
            direction="column"
            spacing={1}
            sx={{ width: '100%', maxWidth: 600, marginTop: 3 }}
          >
            <Stack direction="row" spacing={1}>
              <TextField
                select
                sx={{ minWidth: 150 }}
                label="x-axis colorMap"
                value={colorX}
                onChange={(event) => setColorX(event.target.value)}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="piecewise">piecewise</MenuItem>
                <MenuItem value="continuous">continuous</MenuItem>
              </TextField>
              <TextField
                select
                sx={{ minWidth: 150 }}
                label="y-axis colorMap"
                value={colorY}
                onChange={(event) => setColorY(event.target.value)}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="piecewise">piecewise</MenuItem>
                <MenuItem value="continuous">continuous</MenuItem>
              </TextField>
              <TextField
                select
                sx={{ minWidth: 150 }}
                label="z-axis colorMap"
                value={colorZ}
                onChange={(event) => setColorZ(event.target.value)}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="piecewise">piecewise</MenuItem>
                <MenuItem value="continuous">continuous</MenuItem>
                <MenuItem value="ordinal">ordinal</MenuItem>
              </TextField>
            </Stack>

            <ScatterChart
              height={200}
              grid={{ horizontal: true, vertical: true }}
              series={series}
              margin={{
                top: 10,
                bottom: 20,
              }}
              yAxis={[
                {
                  min: -3,
                  max: 3,
                  tickInterval: [-3, -1.5, 0, 1.5, 3],
                  colorMap:
                    (colorY === 'continuous' && {
                      type: 'continuous',
                      min: -2,
                      max: 2,
                      color: ['blue', 'red'],
                    }) ||
                    (colorY === 'piecewise' && {
                      type: 'piecewise',
                      thresholds: [-1.5, 0, 1.5],
                      colors: ['lightblue', 'blue', 'orange', 'red'],
                    }) ||
                    undefined,
                },
              ]}
              xAxis={[
                {
                  min: -3,
                  max: 3,
                  tickInterval: [-3, -1.5, 0, 1.5, 3],
                  colorMap:
                    (colorX === 'continuous' && {
                      type: 'continuous',
                      min: -2,
                      max: 2,
                      color: ['green', 'orange'],
                    }) ||
                    (colorX === 'piecewise' && {
                      type: 'piecewise',
                      thresholds: [-1.5, 0, 1.5],
                      colors: ['#d01c8b', '#f1b6da', '#b8e186', '#4dac26'],
                    }) ||
                    undefined,
                },
              ]}
              zAxis={[
                {
                  data:
                    colorZ === 'ordinal'
                      ? [
                          ...[...Array(POINTS_NUMBER)].map(() => 'A'),
                          ...[...Array(POINTS_NUMBER)].map(() => 'B'),
                          ...[...Array(POINTS_NUMBER)].map(() => 'C'),
                          ...[...Array(POINTS_NUMBER)].map(() => 'D'),
                        ]
                      : undefined,
                  colorMap:
                    (colorZ === 'continuous' && {
                      type: 'continuous',
                      min: -2,
                      max: 2,
                      color: ['green', 'orange'],
                    }) ||
                    (colorZ === 'piecewise' && {
                      type: 'piecewise',
                      thresholds: [-1.5, 0, 1.5],
                      colors: ['#d01c8b', '#f1b6da', '#b8e186', '#4dac26'],
                    }) ||
                    (colorZ === 'ordinal' && {
                      type: 'ordinal',
                      values: ['A', 'B', 'C', 'D'],
                      colors: ['#d01c8b', '#f1b6da', '#b8e186', '#4dac26'],
                    }) ||
                    undefined,
                },
              ]}
            />
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomeScatter;
