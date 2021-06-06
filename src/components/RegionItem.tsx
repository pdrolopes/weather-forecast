import React, { ReactElement } from 'react';
import { RegionType } from '../types';
import styled from 'styled-components';
import { ReactComponent as RightChevron } from '../icons/right_chevron.svg';

type Props = RegionType & {
  onClick(): void;
};

function RegionComponent(props: Props): ReactElement {
  const { name, areaId, onClick } = props;

  return (
    <Container onClick={onClick}>
      <AreaCode>{areaId}</AreaCode>
      <Title>{name}</Title>
      <RightChevron />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  &:active {
    filter: brightness(95%);
  }
  &:hover {
    background-color: #d8efff;
  }
  cursor: pointer;
  transition: all 100ms;
`;

const AreaCode = styled.span`
  font-weight: 500;
  width: 40px;
`;
const Title = styled.span`
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  text-align: left;
  flex: 1;
`;

export default RegionComponent;
