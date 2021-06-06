import React from 'react';
import { ForecastType } from '../types';
import Forecast from './Forecast';
import Card from './Card';
import Loading from './Loading';
import styled from 'styled-components';

type Props = {
    regionName: string;
    forecasts: Array<ForecastType>;
    isLoading?: boolean;
};

function ForecastList (props: Props) {
    const { forecasts, regionName, isLoading = false } = props;

    const showContent = forecasts.length > 0 && !isLoading;

    return (<Container>
        <Title>Forecast</Title>

        {isLoading && <Loading />}
        {showContent && 
        (<>
           <Subtitle>Region: {regionName}</Subtitle>
           <ListWrapper>
               {forecasts.map((forecast, index) => (<Forecast key={index} {...forecast}/>)) }
            </ListWrapper>
         </>
        )}
        </Container>);
}

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  min-width: 400px;
`;

const Title = styled.h2`
    margin-top: 0;
    font-size: 20px;
    color: #0a1937;
`;
const ListWrapper  = styled.div`
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

export default ForecastList;