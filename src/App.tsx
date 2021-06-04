import React, { useEffect, useState, useMemo } from 'react';
// import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import  RegionList  from './components/RegionList';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { loadRegions, selectRegions } from './features/region/regionSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const regions = useAppSelector(selectRegions) //.map(r => ({id: r.globalIdLocal, name: r.local}));

  const mappedRegions = useMemo(() => regions.map(r => ({id: r.globalIdLocal, name: r.local})), [regions]);

  const [id, setId] = useState<number | undefined>(undefined);
  useEffect(() => { dispatch(loadRegions()) }, []);
  console.debug({ id });


  return (
    <div>
      <RegionList regions={mappedRegions} onRegionClick={setId} />
    </div>
  );
}

export default App;
