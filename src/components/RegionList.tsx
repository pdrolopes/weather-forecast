import React,  { useState, useMemo, ChangeEventHandler, useEffect } from 'react';
import Region from './Region';
import Card from './Card';
import Loading from './Loading';
import { RegionType } from '../types';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { loadRegions, selectIsLoading, selectRegions } from '../features/region/regionSlice';

type Props = {
    onRegionSelect(id: RegionType): void;
};

function RegionList (props: Props) {
    const { onRegionSelect } = props;

    const dispatch = useAppDispatch();
    const regions = useAppSelector(selectRegions);
    const isLoading = useAppSelector(selectIsLoading);

    const [filter, setFilter] = useState("");
    const filteredList = useMemo(() => regions.filter(region => region.name.toLowerCase().includes(filter.toLowerCase()) || region.areaId.toLowerCase().includes(filter.toLowerCase())), [filter, regions]);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => setFilter(event.target.value);
    const isEmpty = filteredList.length === 0;
    const showEmptyMessage = isEmpty && !isLoading;

    useEffect(() => { dispatch(loadRegions()) }, []);

    return (
        <Container>
            <Title>Regions</Title>
            <Input onChange={handleInputChange} value={filter} placeholder="Filter region"/>
            <Divider/>

            <ListWrapper>{!isLoading &&

                filteredList.map(region => {
                const { id, name, areaId } = region;
                return (<Region 
                    key={id} 
                    id={id} 
                    name={name} 
                    areaId={areaId} 
                    onClick={() => onRegionSelect(region)}
                    />)
                })
            }</ListWrapper>

            {isLoading  && (<CenterWrapper><Loading/></CenterWrapper>) }
            {showEmptyMessage && (<CenterWrapper>No region found</CenterWrapper>)}
       </Container>
       
    );
}
const Container = styled(Card)`
    display: flex;
    flex-direction: column;
    min-width: 330px;
`;

const CenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
    color: #0a1937;
`;

const ListWrapper = styled.div`
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    width: 100%;

    & > * {
        border-bottom: 1px solid #e0e0e0;
    }

    // Hide scroll bar
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    &::-webkit-scrollbar { /* WebKit */
        width: 0;
        height: 0;
    }
`;

const Title = styled.h2`
    margin-top: 0;
    font-size: 20px;
    flex-shrink: 0;
    color: #0a1937;
`

const Divider = styled.div`
    height: 1px;
    margin-left: -8px;
    margin-right: -8px;
    background-color: #d3d3d3;
    width: calc(100% + 16px);
    flex-shrink: 0;
`

const Input = styled.input`
  width: calc(100% - 16px);
  height: 2rem;
  font-size: 16px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #d3d3d3;
  &:focus {
    outline: none;
  }
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  flex-shrink: 0;
`

export default RegionList;