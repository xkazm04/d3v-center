import styled from "styled-components"
import {collectionSteps} from '../data/pathSteps'


const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 24px;
  margin: 2%;
  width: 15rem;
  height: 15rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid #808080;
  box-sizing: border-box;
  border-radius: 15px;
  font-family: 'Spectral', serif;
cursor: pointer;
&:hover{
    transition: all 0.2s ease-in-out;
    text-decoration:none;
    box-shadow: 2px 8px 8px rgba(0, 0, 0, 0.04), 0px 8px 26px rgba(0, 0, 0, 0.03);
}
`


function Recipe({cat}) {

    


    return (
        <CardBox>
            {cat !== null ? <>
              <div>  1. {collectionSteps.step1}</div>
              <div>  2. {collectionSteps.step1}</div>
            </> : null}
        </CardBox>
    );
}

export default Recipe;


