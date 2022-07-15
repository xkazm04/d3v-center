import React, { Component } from 'react'
import styled from 'styled-components';

const Kontejner = styled.div`
    margin-bottom: 1%;
    
`
const Input = styled.input`

  background: ${props => props.theme.colors.search};
  border: none;
  padding-left: 5%;
  margin-left: 20px;
  font-family: 'Helvetica';
  font-size: 1.1em;
  color: ${props => props.theme.colors.text_primary};
  z-index: 95;
  border-left: 0.1px dotted ${props => props.theme.colors.red};
  min-width: 200px;
  box-shadow: 0px 1px 4px ${props => props.theme.colors.red};
  cursor: pointer;
  outline: none;
  transition: 0.1s;
  &:hover{
      background: ${props => props.theme.colors.red};
  }
  &:focus{
    box-shadow: 0px 1px 4px white;
  }
  @media (max-width: 700px) {
      margin: 0;
    }
  
`

class SearchBox extends Component {
  timerId = null

  state = {
    value: this.props.currentRefinement,
  }

  onChangeDebounced = (event) => {
    const { refine, delay } = this.props
    const value = event.currentTarget.value

    clearTimeout(this.timerId)
    this.timerId = setTimeout(() => refine(value), delay)

    this.setState(() => ({
      value,
    }))
  }

  render() {
    const { value } = this.state

    return (
        <Kontejner>
      <Input
        value={value}
        onChange={this.onChangeDebounced}
        placeholder="Search here..."
      />
      </Kontejner>
    )
  }
}

export default SearchBox