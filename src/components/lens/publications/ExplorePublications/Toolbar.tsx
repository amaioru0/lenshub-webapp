import React from 'react';
import Wrapper, { Container, LeftSide, RightSide } from './Toolbar.style';

export default function Toolbar({ left, right, children }: { left:any, right:any, className:any, children:any }) {
  const addAllClasses = ['toolbar'];

  return (
    <Wrapper className={addAllClasses.join(' ')}>
      <Container>
        {left && <LeftSide className="toolbar_left__side">{left}</LeftSide>}
        {right && (
          <RightSide className="toolbar_right__side">{right}</RightSide>
        )}
        {children && children}
      </Container>
    </Wrapper>
  );
}