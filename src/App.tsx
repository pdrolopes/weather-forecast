import React, { useEffect, useState, useMemo } from 'react';
import  RegionList  from './components/RegionList';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { loadRegions, selectIsLoading, selectRegions } from './features/region/regionSlice';
import { loadForecast, selectForecast } from './features/forecast/forecastSlice';
import { useDispatch } from 'react-redux';
import ForecastList from './components/ForecastList';
import Layout from './components/Layout';

function App() {
  const dispatch = useDispatch();
  const regions = useAppSelector(selectRegions);
  const isLoadingRegions = useAppSelector(selectIsLoading);
  const activeForecast = useAppSelector(selectForecast);

  const [id, setId] = useState<number | undefined>(undefined);
  const activeRegion = useMemo(() => regions.find(r => r.id === id), [regions, id]);
  useEffect(() => { dispatch(loadRegions()) }, []);

  useEffect(() => {
    if (id === undefined) {
        return;
    }
    
    dispatch(loadForecast(id))
  }, [id]);



  return (
    <Layout sideMenu={(<RegionList regions={regions} isLoading={isLoadingRegions} onRegionClick={setId} />)}>
      <ForecastList isLoading={false} forecasts={activeForecast} regionName={activeRegion?.name || ''}/>
    </Layout>
  );
}

export default App;
