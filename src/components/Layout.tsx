import React, { ReactNode } from 'react';
import styled from 'styled-components';


type Props = {
  children: ReactNode;
};

const Container = styled.div`
height: 100vh;
display: grid;
  background-color: #ecedf4;
  padding: 8px;
  grid-template-columns: 9fr auto;
  grid-template-rows: 3rem auto;
  grid-template-areas: "header header" 
                      "main sidebar";
  row-gap: 16px;
`;

const Header = styled.header`
  grid-area: header;
  background-color: #ffffff;
  border-radius: 8px 8px 0 0;
  height: calc(3rem - 16px);
  padding: 8px;
  box-shadow: 0 4px 8px -2px gray;
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
  background-color: red;
`;

function Layout(props: Props) {
    const { children } = props;


    return (<Container>
            <Header><Title>Weather Forecast</Title></Header>
            <Main>{children}</Main>
        </Container>)
}


export default Layout;