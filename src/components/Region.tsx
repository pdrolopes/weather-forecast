import React from 'react';
import { RegionType } from '../types';

type Props = RegionType & {
    onClick(): void;
};

function RegionComponent (props: Props) {
    const { id, name, onClick } = props;

    return (<div onClick={onClick}>{id} {name}</div>);
}


export default RegionComponent;