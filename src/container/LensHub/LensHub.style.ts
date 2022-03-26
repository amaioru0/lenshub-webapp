import styled from 'styled-components';

export const HubWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const Top = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
borde-radius: 12px;
min-width: 65vh;
`;

export const Btm = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
borde-radius: 12px;
min-width: 65vh;
`

export const ResponsiveWidget = styled.div`
@media (max-width: 900px) {
    display: none;
}
`