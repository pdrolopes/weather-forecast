import React, { useEffect, useState, useMemo } from 'react';
// import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import  RegionList  from './components/RegionList';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { loadRegions, selectRegions } from './features/region/regionSlice';
import { loadForecast, selectForecast } from './features/forecast/forecastSlice';
import { useDispatch } from 'react-redux';
import ForecastList from './components/ForecastList';

function App() {
  const dispatch = useDispatch();
  const regions = useAppSelector(selectRegions);
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

  // console.debug(id, activeForecast[0]?.latitude);


  return (
    <div>
      <RegionList regions={regions} onRegionClick={setId} />
      <ForecastList isLoading={false} forecasts={activeForecast} regionName={activeRegion?.name || ''}/>
    </div>
  );
}

export default App;
