import React, { useEffect, ReactElement } from 'react';
import Button from './Button';
import Card from './Card';
import ForecastItem from './ForecastItem';
import Loading from './Loading';
import styled from 'styled-components';
import { RegionType } from '../types';
import { loadForecast, selectForecast, selectIsError, selectIsLoading } from '../store/forecast';
import { useAppSelector, useAppDispatch } from '../store/hooks';

type Props = {
  region?: RegionType;
};

function Forecast(props: Props): ReactElement {
  const { region } = props;

  const dispatch = useAppDispatch();
  const forecasts = useAppSelector(selectForecast);
  const isLoading = useAppSelector(selectIsLoading);
  const isError = useAppSelector(selectIsError);

  useEffect(() => {
    region && dispatch(loadForecast(region.id));
  }, [region, dispatch]);

  const hasSelectedRegion = region !== undefined;
  const showContent = hasSelectedRegion && !isLoading && !isError;
  const regionLabel = region ? `${region.name} (${region.areaId})` : '';
  const handleRetryClick = () => region && dispatch(loadForecast(region.id));

  return (
    <Container>
      <Title>Forecast</Title>
      {hasSelectedRegion && <Subtitle>Region: {regionLabel}</Subtitle>}

      {isLoading && (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
      {showContent && (
        <ListWrapper>
          {forecasts.map((forecast, index) => (
            <ForecastItem key={index} {...forecast} />
          ))}
        </ListWrapper>
      )}
      {isError && (
        <LoadingWrapper>
          There was a problem
          <RetryButton onClick={handleRetryClick}>Retry</RetryButton>
        </LoadingWrapper>
      )}
    </Container>
  );
}

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  overflow: auto;
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

const RetryButton = styled(Button)`
  min-width: 150px;
  margin-top: 16px;
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
