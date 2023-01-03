import React from 'react'

export default function Screen({ id, operation, data }) {
    return (
        <div>
            <div className="formulaScreen">{operation}</div>
            <div className="outputScreen" id={id}>{data}</div>
        </div>
    )
}
