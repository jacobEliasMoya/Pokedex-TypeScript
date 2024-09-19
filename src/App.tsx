import { useState } from 'react'

function App() {

  const [message, setMessage] = useState<boolean>(false);

  const newMessage = () => message ? setMessage(false) : setMessage(true) ;

  return (
    <>
      <h1 className='invert' >{message ? 'Clicked On' : 'Clicked Off'}</h1>
      <button className="btn" onClick={newMessage}> {!message ? 'Not Clicked' : 'Clicked'} </button>
    </>
  )
}

export default App
