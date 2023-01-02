import React from 'react'

export default function Button({clsName, id, content, style, action}) {
  return (
    <button className={clsName} id={id} value={content} style={style} onClick={(e)=>action(e)}>{content}</button>
  )
}
