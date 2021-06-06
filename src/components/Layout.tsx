import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  sideMenu: ReactNode;
};

function Layout(props: Props) {
  const { children, sideMenu } = props;

  return (
    <Container>
      <Header>
        <Title>Weather Forecast</Title>
      </Header>
      <SideMenu>{sideMenu}</SideMenu>
      <Main>{children}</Main>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 16px);
  display: grid;
  background-color: #ecedf4;
  grid-template-columns: auto minmax(0, 9fr);
  grid-template-rows: 3rem minmax(0, 1fr);
  grid-template-areas:
    'header header'
    'sidebar main';

  padding-bottom: 16px;
  gap: 16px;
`;

const Header = styled.header`
  grid-area: header;
  background-color: #ffffff;
  height: (3rem - 16px);
  padding: 8px;
  box-shadow: 0 2px 8px -2px gray;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 32px;
  color: #0a1937;
  margin: 0;
`;

const Main = styled.div`
  grid-area: main;
  margin-right: 16px;
  display: flex;
`;

const SideMenu = styled.div`
  grid-area: sidebar;
  margin-left: 16px;
  display: flex;
`;

export default Layout;
