import React, { useState } from 'react';
import RegionList from './components/RegionList';
import ForecastList from './components/ForecastList';
import { RegionType } from './types';
import Layout from './components/Layout';

function App() {
  const [selectedRegion, setSelectedRegion] = useState<RegionType | undefined>(undefined);

  return (
    <Layout sideMenu={<RegionList onRegionSelect={setSelectedRegion} />}>
      <ForecastList region={selectedRegion} />
    </Layout>
  );
}

export default App;
