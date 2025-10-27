import React from 'react'

export default function Title({title,description}) {
  return (
    <div className="text-center mt-12  px-4">
      <h1 className="text-3xl md:text-4xl text-slate-700 font-bold mb-2">{title}</h1>
      <p className="text-slate-500 text-sm md:text-md ">{description}</p>
    </div>
  )
}
