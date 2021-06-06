import React, { ReactElement, ReactNode } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

type Props = { className?: string; state: string; children: ReactNode };
const transitionName = 'fade';
const transitionTime = 100;
function CustomTransition(props: Props): ReactElement {
  const { state, children, className } = props;

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={state}
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        timeout={transitionTime}
        classNames={transitionName}
        unmountOnExit
      >
        <Container className={className}>{children}</Container>
      </CSSTransition>
    </SwitchTransition>
  );
}

const Container = styled.div`
  &.${transitionName}-enter {
    opacity: 0;
  }
  &.${transitionName}-exit {
    opacity: 1;
  }
  &.${transitionName}-enter-active {
    opacity: 1;
    transition: opacity ${transitionTime}ms;
  }
  &.${transitionName}-exit-active {
    opacity: 0;
    transition: opacity ${transitionTime}ms;
  }
`;

export default CustomTransition;
