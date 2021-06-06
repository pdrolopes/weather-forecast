import React, { ReactElement } from 'react';
import { ForecastType } from '../types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);


type Props = ForecastType;

function Forecast(props: Props): ReactElement {
    const { minTemperature, maxTemperature, chanceOfPrecipitation, date } = props;

    const formattedDate = dayjs(date).format('LL');

    return (
        <Container>
            <Header>{formattedDate}</Header>
            <Line>
                <span>Minimum temperature:</span>
                <Value>{minTemperature}ᵒC</Value>
            </Line>
            <Line>
                <span>Maximum temperature:</span>
                <Value>{maxTemperature}ᵒC</Value>
            </Line>
            <Line>
                <span>% Precipitation:</span>
                <Value>{chanceOfPrecipitation}%</Value>
            </Line>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    border-radius: 8px;
    border: 2px solid gray;
    background-color: white;
`;
const Header = styled.div`
    font-weight: 500;
    margin-bottom: 10px;
    background-color: #d8efff;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid gray;
    padding: 4px;
`;

const Line = styled.div`
    display: flex;
    padding-left: 8px;
    justify-content: space-between;
    margin-bottom: 4px;
`;

const Value = styled.span`
    flex-basis: 70px;
`;

export default Forecast;