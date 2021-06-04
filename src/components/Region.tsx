import React from 'react';
import { Region } from '../types';

type Props = Region & {
    onClick(): void;
};

function RegionComponent (props: Props) {
    const { id, name, onClick } = props;

    return (<div onClick={onClick}>{id} {name}</div>);
}


export default RegionComponent;