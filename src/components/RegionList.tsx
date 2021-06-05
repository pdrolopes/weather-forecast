import React,  { useState, useMemo, ChangeEventHandler, HtmlHTMLAttributes } from 'react';
import Region from './Region';
import Card from './Card';
import { RegionType } from '../types';
import styled from 'styled-components';

type Props = {
    onRegionClick(id: number): void;
    regions: Array<RegionType>;
    isLoading?: boolean;
};

function RegionList (props: Props) {
    const { regions, onRegionClick, isLoading = false } = props;

    const [filter, setFilter] = useState("");
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => setFilter(event.target.value);
    const filteredList = useMemo(() => regions.filter(region => region.name.toLowerCase().includes(filter.toLowerCase())), [filter, regions]);
    const isEmpty = filteredList.length === 0;
    const showEmptyMessage = isEmpty && !isLoading;

    console.debug({isLoading});
    return (
        <Card>
            <Container>
            <Title>Regions</Title>
            <Input onChange={handleInputChange} value={filter} placeholder="Filter region"/>
            <Divider/>

            {isLoading  && (<div>loading</div>) }
            {!isLoading &&
                filteredList.map(region => {
                const { id, name, areaId } = region;
                return (<Region 
                    key={id} 
                    id={id} 
                    name={name} 
                    areaId={areaId} 
                    onClick={() => onRegionClick(id)}
                    />)
                })
            }

            {showEmptyMessage && (<div>No region found.</div>)}
       </Container>
       </Card>
    );
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    margin-top: 0;
    font-size: 20px;
`

const Divider = styled.div`
    height: 1px;
    margin-left: -8px;
    margin-right: -8px;
    background-color: #d3d3d3;
    width: calc(100% + 16px);
`

const Input = styled.input`
  width: calc(100% - 16px);
  height: 2rem;
  font-size: 16px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid black;
  &:focus {
    outline: none;
  }
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
`

export default RegionList;