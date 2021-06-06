import React, { ReactElement, useState } from 'react';
import Region from './components/Region';
import Forecast from './components/Forecast';
import { RegionType } from './types';
import Layout from './components/Layout';

function App(): ReactElement {
  const [selectedRegion, setSelectedRegion] = useState<RegionType | undefined>(undefined);

  return (
    <Layout sideMenu={<Region onRegionSelect={setSelectedRegion} />}>
      <Forecast region={selectedRegion} />
    </Layout>
  );
}

export default App;
