import styled from 'styled-components';

export const ContainerWrapper = styled.main`
min-height: 100vh;
width: 100%;
background: #AAFFA9;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #11FFBD, #AAFFA9);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #11FFBD, #AAFFA9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
box-shadow: 0 0 0 1px rgba(15,15,15,0.03), 0 3px 6px 0 rgba(75,81,88,0.10), 0 12px 24px 0 rgba(75,81,88,0.20);
padding: 40px;
border-radius: 12px;
`;

