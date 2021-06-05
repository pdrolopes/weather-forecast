import React from 'react';
import { ForecastType } from '../types';

type Props = ForecastType;

function ForecastList (props: Props) {
    const { minTemperature, maxTemperature, chanceOfPrecipitation } = props;

    return (<div>
        <div>{minTemperature}</div>
        <div>{maxTemperature}</div>
        <div>{chanceOfPrecipitation}</div>
    </div>);
}

export default ForecastList;