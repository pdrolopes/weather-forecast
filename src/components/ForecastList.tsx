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
        (
            <>
            <Subtitle>Daily forcast for {regionName}.</Subtitle>
        { forecasts.map((forecast, index) => (<Forecast key={index} {...forecast}/>)) }
        </>
        )}
        </Container>);
}

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
`


const Title = styled.h2`
    margin-top: 0;
    font-size: 20px;
    color: #0a1937;
`

const Subtitle = styled.h3`
    margin-top: 0;
    font-size: 16px;
    color: #0a1937;
`

export default ForecastList;