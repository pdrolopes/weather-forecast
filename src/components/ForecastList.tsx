import React, { useEffect } from 'react';
import { RegionType } from '../types';
import ForecastItem from './Forecast';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { loadForecast, selectForecast, selectIsLoading } from '../features/forecast/forecastSlice';
import Card from './Card';
import Loading from './Loading';
import styled from 'styled-components';

type Props = {
  region?: RegionType;
};

function Forecast(props: Props) {
  const { region } = props;

  const dispatch = useAppDispatch();
  const forecasts = useAppSelector(selectForecast);
  const isLoadingForecasts = useAppSelector(selectIsLoading);

  useEffect(() => {
    region && dispatch(loadForecast(region.id));
  }, [region]);

  const hasSelectedRegion = region !== undefined;
  const showContent = hasSelectedRegion && !isLoadingForecasts;
  const regionLabel = region ? `${region.name} (${region.areaId})` : '';

  return (
    <Container>
      <Title>Forecast</Title>

      {isLoadingForecasts && (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
      {showContent && (
        <>
          <Subtitle>Region: {regionLabel}</Subtitle>
          <ListWrapper>
            {forecasts.map((forecast, index) => (
              <ForecastItem key={index} {...forecast} />
            ))}
          </ListWrapper>
        </>
      )}
    </Container>
  );
}

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 400px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 20px;
  color: #0a1937;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: auto;

  & > * {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const Subtitle = styled.h3`
  margin-top: 0;
  font-size: 16px;
  color: #0a1937;
`;

export default Forecast;
