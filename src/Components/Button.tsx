// import React from 'react'

interface MyProps {
    buttonText: string;
    buttonClass: string | undefined;
    buttonIcon: string | undefined;
    morePokemon: any | undefined  ;
}

const Button = ({buttonText,buttonClass,buttonIcon,morePokemon}:MyProps) => {
  return (
    <p onClick={morePokemon} className={`btn ${buttonClass}`}> <i className={buttonIcon}></i> {buttonText}</p>
  )
}

export default Button;