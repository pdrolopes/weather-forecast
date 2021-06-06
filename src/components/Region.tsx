import React, { useState, useMemo, ChangeEventHandler, useEffect, ReactElement } from 'react';
import RegionItem from './RegionItem';
import Card from './Card';
import Button from './Button';
import Transition from './Transition';
import Loading from './Loading';
import { RegionType } from '../types';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { loadRegions, selectIsError, selectIsLoading, selectRegions } from '../store/region';

type Props = {
  onRegionSelect(id: RegionType): void;
};

function RegionList(props: Props): ReactElement {
  const { onRegionSelect } = props;

  const dispatch = useAppDispatch();
  const regions = useAppSelector(selectRegions);
  const isLoading = useAppSelector(selectIsLoading);
  const isError = useAppSelector(selectIsError);

  const [filter, setFilter] = useState('');
  const filteredList = useMemo(
    () =>
      regions.filter(
        (region) =>
          region.name.toLowerCase().includes(filter.toLowerCase()) ||
          region.areaId.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, regions]
  );

  useEffect(() => {
    dispatch(loadRegions());
  }, [dispatch]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setFilter(event.target.value);
  const isEmpty = filteredList.length === 0;
  const showEmptyMessage = isEmpty && !isLoading && !isError && !!filter;
  const handleRetryClick = () => dispatch(loadRegions());
  const transitionState = `${isLoading}-${isEmpty}-${isError}-${showEmptyMessage}`;

  return (
    <Container>
      <Title>Regions</Title>
      <Input onChange={handleInputChange} value={filter} placeholder="Filter region" />

      <Divider />

      <StyledTransition state={transitionState}>
        <>
          <ListWrapper>
            {filteredList.map((region) => {
              const { id, name, areaId } = region;
              return (
                <RegionItem
                  key={id}
                  id={id}
                  name={name}
                  areaId={areaId}
                  onClick={() => onRegionSelect(region)}
                />
              );
            })}
          </ListWrapper>

          {isLoading && (
            <CenterWrapper>
              <Loading />
            </CenterWrapper>
          )}
          {showEmptyMessage && <CenterWrapper>No region found</CenterWrapper>}
          {isError && (
            <CenterWrapper>
              There was a problem
              <RetryButton onClick={handleRetryClick}>Retry</RetryButton>
            </CenterWrapper>
          )}
        </>
      </StyledTransition>
    </Container>
  );
}

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  min-width: 330px;
`;

const StyledTransition = styled(Transition)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  color: #0a1937;
`;

const RetryButton = styled(Button)`
  min-width: 150px;
  margin-top: 16px;
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
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 20px;
  flex-shrink: 0;
  color: #0a1937;
`;

const Divider = styled.div`
  height: 1px;
  margin-left: -8px;
  margin-right: -8px;
  background-color: #d3d3d3;
  width: calc(100% + 16px);
  flex-shrink: 0;
`;

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
`;

export default RegionList;
