export const SankeyData = {
  nodes: [
    { id: 'USA', color: '#e0ac2b', country: 'USA' },
    { id: 'China', color: '#e85252', country: 'China' },
    { id: 'India', color: '#6689c6', country: 'India' },
    { id: 'Russia', color: '#a53253', country: 'Russia' },
    { id: 'Coal', color: '#e0ac2b' },
    { id: 'Gas', color: '#e85252' },
    { id: 'Nuclear', color: '#6689c6' },
    { id: 'Hydro', color: '#9a6fb0' },
    { id: 'Renewable', color: '#a53253' },
  ],
  links: [
    { source: 'Coal', target: 'USA', value: 500 },
    { source: 'Gas', target: 'USA', value: 800 },
    { source: 'Nuclear', target: 'USA', value: 300 },
    { source: 'Hydro', target: 'USA', value: 200 },
    { source: 'Renewable', target: 'USA', value: 400 },
    { source: 'Coal', target: 'China', value: 1000 },
    { source: 'Gas', target: 'China', value: 500 },
    { source: 'Nuclear', target: 'China', value: 200 },
    { source: 'Hydro', target: 'China', value: 300 },
    { source: 'Renewable', target: 'China', value: 600 },
    { source: 'Coal', target: 'India', value: 800 },
    { source: 'Gas', target: 'India', value: 400 },
    { source: 'Nuclear', target: 'India', value: 100 },
    { source: 'Hydro', target: 'India', value: 200 },
    { source: 'Renewable', target: 'India', value: 300 },
    { source: 'Coal', target: 'Russia', value: 200 },
    { source: 'Gas', target: 'Russia', value: 400 },
    { source: 'Nuclear', target: 'Russia', value: 200 },
    { source: 'Hydro', target: 'Russia', value: 100 },
    { source: 'Renewable', target: 'Russia', value: 100 },
  ],
};
