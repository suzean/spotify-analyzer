import React, {useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';



  const NewChart = ({ audio }) => {



    const data = {
        labels: ['Danceability', 'Valence', 'Tempo', 'Acousticness', 'Energy', 'Liveness'],
        datasets: [
          {
            label: "",
            data: [audio.danceability*100, audio.valence*100, audio.tempo, audio.acousticness*100, audio.energy*100, audio.liveness*100],
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)',
            ],
          },
        ],
      };
    
      const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Audio Features',
          },
        },
      };



      return (
          <div>
              <Bar 
              data={data} 
              options={options}
              width={100}
              height={400}
               />
          </div>
      )
  }
  
  export default NewChart;