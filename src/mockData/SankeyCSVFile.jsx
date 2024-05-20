import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const SankeyCSVFile = () => {
  const [countrySet, setCountrySet] = useState(new Set());
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    fetchCSV();
  }, []);

  const fetchCSV = async () => {
    const response = await fetch('/owid-energy-data.csv');
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    const result = await reader.read();
    const csv = decoder.decode(result.value);
    parseCSV(csv);
  };

  const parseCSV = (csv) => {
    Papa.parse(csv, {
      complete: (result) => {
        const filteredData = cleanData(result.data);
        const extractedHeaders = extractHeaders(filteredData);
        const extractedCountries = extractCountries(filteredData);
        const generatedSankeyData = SankeyData(
          extractedHeaders,
          extractedCountries
        );
        console.log(generatedSankeyData);
      },
      header: true,
    });
  };

  const extractHeaders = (data) => {
    const excludedHeaders = [
      'country',
      'year',
      'population',
      'iso_code',
      'gdp',
    ];

    // Extract the headers from the first object in the array
    const allHeaders = Object?.keys(data[0]);

    // Filter the headers based on the excludedHeaders array
    const filteredHeaders = allHeaders.filter(
      (header) => !excludedHeaders.includes(header)
    );

    // Set the headers state
    setHeaders(filteredHeaders);
    console.log('Headers:', filteredHeaders);

    return filteredHeaders; // Return filtered headers as an array
  };

  const extractCountries = (data) => {
    const countries = new Set();
    data.forEach((row) => {
      if (row.country) {
        countries.add(row.country);
      }
    });
    console.log('Countries:', Array.from(countries));

    return Array.from(countries); // Convert the Set to an array before returning
  };

  const cleanData = (data) => {
    // Filter rows where the 'year' value is 2022
    let cleanedData = data.filter((row) => row.year === '2022');

    // Filter columns with non-zero or non-empty values
    cleanedData = cleanedData.map((row) => {
      const cleanedRow = {};
      Object.keys(row).forEach((key) => {
        if (row[key] !== '' && parseFloat(row[key]) !== 0) {
          cleanedRow[key] = row[key];
        }
      });
      return cleanedRow;
    });

    return cleanedData;
  };

  const SankeyData = (headers, countries) => {
    // Create nodes from headers and countries
    const nodes = [...headers, ...countries].map((id) => ({ id }));

    // Create links from each country to each header with an arbitrary value (e.g., 1)
    const links = countries.flatMap((country) =>
      headers.map((header) => ({
        source: country,
        target: header,
        value: 1, // Replace with actual value if available
      }))
    );

    return {
      nodes,
      links,
    };
  };

  return <div></div>;
};

export default SankeyCSVFile;
