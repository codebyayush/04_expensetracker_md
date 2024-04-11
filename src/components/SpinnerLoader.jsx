import React from 'react';
import loader from '../assets/spinner/loader.gif'

const SpinnerLoader = () => {
  return (
    <div className='flex justify-center'>
        <img src={loader} alt="loading..." />
    </div>
  )
}

export default SpinnerLoader;