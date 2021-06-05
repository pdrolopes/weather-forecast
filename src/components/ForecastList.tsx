import React from 'react';
import { ForecastType } from '../types';
import Forecast from './Forecast';

type Props = {
    regionName: string;
    forecasts: Array<ForecastType>;
    isLoading: boolean;
};

function ForecastList (props: Props) {
    const { forecasts, regionName } = props;

    return (<div>
        {regionName}
        { forecasts.map((forecast, index) => (<Forecast key={index} {...forecast}/>)) }
        </div>);
}

export default ForecastList;