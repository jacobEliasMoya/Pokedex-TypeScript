// import React from 'react'

interface MyProps {
    buttonText: string;
    buttonLink: string;
    buttonClass: string | undefined;
}

const Button = ({buttonText,buttonLink,buttonClass}:MyProps) => {
  return (
    <a href={buttonLink} className={`btn ${buttonClass}`}>{buttonText}</a>
  )
}

export default Button;