import React from 'react'

export default function Screen({ operation, data }) {
    return (
        <div>
            <div className="formulaScreen">{operation}</div>
            <div className="outputScreen" id="display">{data.length > 0 ? data : "0"}</div>
        </div>
    )
}
