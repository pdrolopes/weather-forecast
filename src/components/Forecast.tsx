import React, { ReactElement } from 'react';
import { ForecastType } from '../types';

type Props = ForecastType;

function ForecastList (props: Props): ReactElement {
    const { minTemperature, maxTemperature, chanceOfPrecipitation } = props;

    return (<div>
        <div>Minimum temperature: {minTemperature}</div>
        <div>Maximum temperature: {maxTemperature}</div>
        <div>% Precipitation: {chanceOfPrecipitation}</div>
    </div>);
}

export default ForecastList;