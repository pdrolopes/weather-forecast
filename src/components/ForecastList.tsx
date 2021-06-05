import React from 'react';
import { ForecastType } from '../types';
import Forecast from './Forecast';
import Card from './Card';
import styled from 'styled-components';

type Props = {
    regionName: string;
    forecasts: Array<ForecastType>;
    isLoading: boolean;
};

function ForecastList (props: Props) {
    const { forecasts, regionName } = props;

    return (<Card>
        <Title>Forecast</Title>

        {regionName}
        { forecasts.map((forecast, index) => (<Forecast key={index} {...forecast}/>)) }
        </Card>);
}


const Title = styled.h2`
    margin-top: 0;
    font-size: 20px;
`

export default ForecastList;