import React, { useState, useRef } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { Card, CardContent, Typography } from '@mui/material';
// import { AgCharts } from 'ag-charts-community';
import { getData } from '../../../mockData/LineData';
import deepClone from 'deep-clone';

function tooltipRenderer({ datum, xKey, yKey }) {
  return { content: `${datum[xKey]}: ${datum[yKey]}%` };
}
const WOMEN = {
  type: 'bar',
  xKey: 'year',
  yKey: 'women',
  yName: 'Women',
  grouped: true,
  tooltip: {
    renderer: tooltipRenderer,
  },
};
const MEN = {
  type: 'bar',
  xKey: 'year',
  yKey: 'men',
  yName: 'Men',
  grouped: true,
  tooltip: {
    renderer: tooltipRenderer,
  },
};
const PORTIONS = {
  type: 'line',
  xKey: 'year',
  yKey: 'portions',
  yName: 'Portions',
  tooltip: {
    renderer: tooltipRenderer,
  },
};
const BAR_AND_LINE = [
  { ...WOMEN, type: 'bar' },
  { ...MEN, type: 'bar' },
  { ...PORTIONS, type: 'line' },
];
const AREA_AND_BAR = [
  { ...PORTIONS, type: 'area' },
  { ...WOMEN, type: 'bar' },
  { ...MEN, type: 'bar' },
];

const CombinChart = () => {
  const chartRef = useRef(null);
  const [options, setOptions] = useState({
    data: getData(),
    title: {
      text: 'Fruit & Vegetable Consumption',
    },
    series: BAR_AND_LINE,
    axes: [
      {
        type: 'category',
        position: 'bottom',
      },
      {
        // primary y axis
        type: 'number',
        position: 'left',
        keys: ['women', 'men', 'children', 'adults'],
        title: {
          text: 'Adults Who Eat 5 A Day (%)',
        },
      },
      {
        // secondary y axis
        type: 'number',
        position: 'right',
        keys: ['portions'],
        title: {
          text: 'Portions Consumed (Per Day)',
        },
      },
    ],
  });

  const barLine = () => {
    const clone = deepClone(options);

    clone.series = BAR_AND_LINE;

    setOptions(clone);
  };

  const areaBar = () => {
    const clone = deepClone(options);

    clone.series = AREA_AND_BAR;

    setOptions(clone);
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
            Line & Bar
          </Typography>
          <div className="h-full flex flex-col overflow-hidden">
            <div className="text-center">
              <button onClick={areaBar}>Area &amp; Bar</button>
              <span className="inline-block min-w-5"></span>
              <button onClick={barLine}>Bar &amp; Line</button>
              <span className="inline-block min-w-5"></span>
            </div>
            <AgChartsReact ref={chartRef} options={options} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CombinChart;
