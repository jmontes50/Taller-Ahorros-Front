import React from 'react'
import Zero from "../assets/Zero.png"

function ZeroTransactions() {
  return (
    <div className="text-center">
      <h5 className="font-weight-bold">Aún no tienes movimientos</h5>
      <img src={Zero} alt="plan" style={{width:'75%'}}/>
    </div>
  )
}

export default ZeroTransactions
