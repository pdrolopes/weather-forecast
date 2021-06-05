import React, { ReactNode } from 'react';
import styled from 'styled-components';


type Props = {
  children: ReactNode;
  sideMenu: ReactNode;
};


function Layout(props: Props) {
    const { children, sideMenu } = props;


    return (<Container>
            <Header><Title>Weather Forecast</Title></Header>
            <Main>{children}</Main>
            <SideMenu>{sideMenu}</SideMenu>
        </Container>)
}

const Container = styled.div`
height: 100vh;
display: grid;
  background-color: #ecedf4;
  padding: 8px;
  grid-template-columns: auto 9fr ;
  grid-template-rows: 3rem auto;
  grid-template-areas: "header header" 
                      "sidebar main";
  row-gap: 16px;
`;

const Header = styled.header`
  grid-area: header;
  background-color: #ffffff;
  height: calc(3rem - 16px);
  padding: 8px;
  margin: -8px -8px 0 -8px;
  box-shadow: 0 2px 8px -2px gray;
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
    font-weight: 400;
    font-size: 32px;
    color: #0a1937;
    margin: 0;
`

const Main = styled.div`
  grid-area: main;
`;

const SideMenu = styled.div`
  grid-area: sidebar;
`;


export default Layout;