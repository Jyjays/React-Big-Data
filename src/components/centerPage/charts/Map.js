import React, { PureComponent } from 'react';
import * as echarts from 'echarts';
import xuzhouGeoJSON from '../xuzhou.json'; // Ensure the correct path to the GeoJSON file

class XuzhouMap extends PureComponent {
  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate() {
    this.initMap();
  }

  initMap() {
    const { kkmc } = this.props; // Array of locations with lat/lng

    // Register the Xuzhou map
    echarts.registerMap('xuzhou', xuzhouGeoJSON);

    const chart = echarts.init(this.mapContainer);

    // Map configuration
    const options = {
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (params.data && params.data.name) {
            return `${params.data.name}`; // Show station name on hover
          }
          return '';
        },
      },
      geo: {
        map: 'xuzhou',
        label: {
          show: false,
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: 'rgba(255, 255, 255, 0.5)', // White with 50% transparency
            borderColor: '#111', // Black border
          },
          emphasis: {
            areaColor: 'rgba(255, 255, 255, 0.7)', // Slightly brighter on hover
          },
        },
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: kkmc.map((item) => ({
            name: item.name, // Entrance station name
            value: [item.lng, item.lat],
          })),
          symbolSize: 12,
          itemStyle: {
            color: 'yellow', // Bright yellow for highlighted points
          },
          emphasis: {
            itemStyle: {
              color: 'gold', // Gold for hover effect
            },
          },
        },
      ],
    };

    chart.setOption(options);
  }

  render() {
    return (
      <div
        ref={(el) => (this.mapContainer = el)}
        style={{
          width: '100%',
          height: '500px',
        }}
      ></div>
    );
  }
}

export default XuzhouMap;
