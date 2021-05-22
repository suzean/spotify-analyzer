import React from 'react';
import { Bar } from 'react-chartjs-2';



  const NewChart = ({ audio }) => {



    const data = {
        labels: ['Danceability', 'Valence', 'Tempo', 'Acousticness', 'Energy', 'Liveness'],
        datasets: [
          {
            label: "",
            data: [audio.danceability*100, audio.valence*100, audio.tempo, audio.acousticness*100, audio.energy*100, audio.liveness*100],
            backgroundColor: [
            '#d10808',
            '#08d1d1',
            '#6dd108',
            '#d6c400',
            '#d6008f',
            '#4700d6'
            ],
            
          },
        ],
      };
    
      const options = {
        elements: {
          line: {
              borderWidth: 1,
          }
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
          tooltip: {
            padding: 12,
            bodySpacing: 5,
        }
        },
      };



      return (
          <div className="chart">
              <Bar 
              data={data} 
              options={options}
               />
          </div>
      )
  }
  
  export default NewChart;