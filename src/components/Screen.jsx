import React, { useEffect } from 'react'

export default function Screen({ operation, data }) {
    return (
        <div>
            <div className="formulaScreen">{operation}</div>
            <div className="outputScreen" id="display">{data}</div>
        </div>
    )
}
