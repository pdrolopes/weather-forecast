import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Loading = styled.div`
    border: 10px solid #d3d3d3;
    border-top: 10px solid #97d5fe;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    min-height: 48px;
    min-width: 48px;
    animation: ${spin} 1s linear infinite;
`;

  

export default Loading;