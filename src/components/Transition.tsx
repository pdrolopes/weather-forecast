import React, { ReactElement, ReactNode } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

type Props = { state: string; children: ReactNode };
const transitionName = `fade`;
function CustomTransition(props: Props): ReactElement {
  const { state, children } = props;

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={state}
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        timeout={100}
        classNames={transitionName}
        unmountOnExit
      >
        <Container>{children}</Container>
      </CSSTransition>
    </SwitchTransition>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  &.${transitionName}-enter {
    opacity: 0;
  }
  &.${transitionName}-exit {
    opacity: 1;
  }
  &.${transitionName}-enter-active {
    opacity: 1;
    transition: opacity 100ms;
  }
  &.${transitionName}-exit-active {
    opacity: 0;
    transition: opacity 100ms;
  }
`;

export default CustomTransition;
