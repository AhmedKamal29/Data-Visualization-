import React, { useState, useEffect } from 'react';
import { sankey, sankeyCenter, sankeyLinkHorizontal } from 'd3-sankey';
import * as d3 from 'd3';

const SankeyChart = ({ width, height, data, country }) => {
  const MARGIN_Y = 25;
  const MARGIN_X = 5;
  const TEXT_PADDING_X = 10; // Horizontal padding for the text
  const TEXT_PADDING_Y = 10; // Vertical padding for the text
  const [nodeWidths, setNodeWidths] = useState({});

  useEffect(() => {
    // Create a canvas for measuring text width
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '10px sans-serif'; // Set the font used for measuring

    // Measure text width for each node
    const widths = {};
    data.nodes.forEach((node) => {
      const text = node.id;
      const textWidth = context.measureText(text).width;
      widths[node.id] = textWidth + 2 * TEXT_PADDING_X;
    });

    setNodeWidths(widths);
  }, [data]);

  // Deep copy function
  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  // Filter nodes and links by the specified country
  const filterDataByCountry = (data, country) => {
    // Find the links that target the specified country
    const countryLinks = data.links.filter((link) => link.target === country);
    if (countryLinks.length === 0) {
      console.warn(`No links found for country: ${country}`);
      return { nodes: [], links: [] };
    }

    // Extract source nodes from these links
    const sourceNodeIds = new Set(countryLinks.map((link) => link.source));
    // Add the target country node ID to the set
    sourceNodeIds.add(country);

    // Filter nodes to include only those in sourceNodeIds
    const filteredNodes = data.nodes.filter((node) =>
      sourceNodeIds.has(node.id)
    );
    // Filter links to include only those related to the specified country
    const filteredLinks = data.links.filter(
      (link) => sourceNodeIds.has(link.source) && sourceNodeIds.has(link.target)
    );

    if (filteredNodes.length === 0 || filteredLinks.length === 0) {
      console.warn(`Filtered data is empty for country: ${country}`);
    }

    return {
      nodes: filteredNodes,
      links: filteredLinks,
    };
  };

  const filteredData = filterDataByCountry(data, country);

  // Ensure deep copy of the filtered data
  const copiedData = deepCopy(filteredData);

  // Calculate maximum node width for adjusting the sankey extent
  const maxNodeWidth = Math.max(...Object.values(nodeWidths)) || 26;

  // Set the sankey diagram properties
  const sankeyGenerator = sankey()
    .nodeWidth(maxNodeWidth) // This will be overridden by dynamic widths
    .nodePadding(29)
    .extent([
      [MARGIN_X, MARGIN_Y],
      [width - MARGIN_X - maxNodeWidth, height - MARGIN_Y],
    ])
    .nodeId((node) => node.id) // Accessor function: how to retrieve the id that defines each node. This id is then used for the source and target props of links
    .nodeAlign(sankeyCenter); // Algorithm used to decide node position

  // Compute nodes and links positions
  let sankeyData = { nodes: [], links: [] };
  if (copiedData.nodes.length > 0 && copiedData.links.length > 0) {
    sankeyData = sankeyGenerator(copiedData);
  }

  const { nodes, links } = sankeyData;

  // Update node positions based on dynamic widths
  nodes.forEach((node) => {
    const dynamicWidth = nodeWidths[node.id] || maxNodeWidth;
    node.x1 = node.x0 + dynamicWidth;
  });

  // Draw the nodes
  const allNodes = nodes.map((node) => {
    const nodeHeight = node.y1 - node.y0;
    const nodeWidth = node.x1 - node.x0; // Dynamic width
    const textX = node.x0 + nodeWidth / 2; // Center text horizontally
    const textY = node.y0 + nodeHeight / 2; // Center text vertically

    return (
      <g key={node.index}>
        <rect
          height={nodeHeight}
          width={nodeWidth}
          x={node.x0}
          y={node.y0}
          stroke="gray"
          fill={node.color || '#a53253'}
          fillOpacity={0.8}
          rx={0.9}
        />
        <text
          x={textX}
          y={textY}
          dy=".35em"
          textAnchor="middle" // Center the text horizontally
          alignmentBaseline="middle" // Center the text vertically
          fill="black"
          fontSize="12px"
          className="font-extrabold"
        >
          {node.id}
        </text>
      </g>
    );
  });

  const allLinks = links.map((link, i) => {
    const linkGenerator = sankeyLinkHorizontal();
    const path = linkGenerator(link);

    // Calculate text position
    const textX = (link.source.x1 + link.target.x0) / 2;
    const textY = link.y0 + (link.y1 - link.y0) / 2;

    return (
      <g key={i}>
        <path
          d={path}
          stroke="gray"
          fill="none"
          strokeOpacity={0.3}
          strokeWidth={link.width}
        />
        <text
          x={textX}
          y={textY}
          dy=".35em"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="black"
          fontSize="10px"
        >
          {link.value * 0.1}%
        </text>
      </g>
    );
  });

  return (
    <div key={Math.random().toString()}>
      <svg width={width} height={height}>
        {allNodes}
        {allLinks}
      </svg>
    </div>
  );
};

export default SankeyChart;
