import React from 'react'

const PriceCal = ({ params }) => {
    return params.value < 50 ? <p>PKR {params.value}</p> : <p>USD {params.value}</p>
}


export default PriceCal