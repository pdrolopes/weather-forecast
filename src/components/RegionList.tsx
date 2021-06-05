import React,  { useState, useMemo, ChangeEventHandler, HtmlHTMLAttributes } from 'react';
import Region from './Region';
import { RegionType } from '../types';
import styled from 'styled-components';

type Props = {
    onRegionClick(id: number): void;
    regions: Array<RegionType>;
};

function RegionList (props: Props) {
    const { regions, onRegionClick } = props;

    const [filter, setFilter] = useState("");
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => setFilter(event.target.value);
    const filteredList = useMemo(() => regions.filter(region => region.name.toLowerCase().includes(filter.toLowerCase())), [filter, regions]);

    return (
        <Container>
            <Title>Regions</Title>
            <Input onChange={handleInputChange} value={filter} placeholder="Filter region"/>

            {filteredList.map(region => {
                const { id, name } = region;
                return (<Region key={id} id={id} name={name} onClick={() => onRegionClick(id)} />)
            })}

        </Container>
    );
}

const Container = styled.div`
  padding: 8px;
`

const Title = styled.h2`
    margin-top: 0;
    font-size: 20px;
`

const Input = styled.input`
  width: 100%;
  height: 2rem;
  font-size: 16px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid black;
  &:focus {
    outline: none;
  }
  margin-bottom: 8px;
`

export default RegionList;