import React from 'react'
import NavBar from '../../components/NavBar';
import GetStarted from '../../components/GetStarted';


function Home() {
  return (
    <div style={{boxSizing:'border-box',
    margin:'0px'}}>
        <NavBar />
      <GetStarted />
    </div>
  )
}

export default Home