import React, { useEffect, useState } from 'react'
import { PDFDocument } from 'pdf-lib'

export default function Test () {
  const [pdfInfo, setPdfInfo] = useState([])
  const getForm = async () => {
    const formUrl = 'http://localhost:3000/aadhaar.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(formPdfBytes)
    const form = pdfDoc.getForm()
    const fields = form.getFields()
    form.getTextField('Text-ODjXylvMS3').setText('kamal')
    fields.forEach(field => {
      const type = field.constructor.name
      const name = field.getName()
      console.log(`${type}: ${name}`)
    })
    form.flatten()
    const pdfBytes = await pdfDoc.save()
    const bytes = new Uint8Array(pdfBytes)
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const docUrl = URL.createObjectURL(blob)
    setPdfInfo(docUrl)
    console.log('form+++', pdfBytes)
  }

  return (
    <>
      <div onClick={getForm}>test</div>
      <a href={pdfInfo}>download</a>
    </>
  )
}
