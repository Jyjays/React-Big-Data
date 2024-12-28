import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { BrowseCategoriesOptions } from './options';

class BrowseCategories extends PureComponent {
  render() {
    const { browseCategories } = this.props;

    // Process the data from props
    const processedData = browseCategories.map(item => {
      // Extract station name after the last '-'
      const parts = item.kkmc.split('-'); // Split the string by '-'
      const stationName = parts.pop(); // Take the last part

      return {
        category: stationName, // Extracted station name
        inflow: item.count, // Passenger vehicle count
      };
    }).reverse(); // Reverse the order of the data

    return (
      <div
        style={{
          width: '7rem',
          height: '6rem',
        }}
      >
        <Chart
          renderer="canvas"
          option={BrowseCategoriesOptions(processedData)}
        />
      </div>
    );
  }
}

export default BrowseCategories;
