import { useState } from "react"
import Pop from "./Pop"
import "./PopUp.css"

export default function PopUp() {
  const [showModalPopup, setShowModalPopup] = useState(false)

  function handleToggleModalPopup() {
    setShowModalPopup(!showModalPopup)
  }

  function onClose() {
    setShowModalPopup(false)
  }

  return (
    <div>
      <button onClick={handleToggleModalPopup}>Open Modal Popup</button>
      {showModalPopup && (
        <Pop
          id={"custom-id"}
          header={<h1>Customized Header</h1>}
          footer={<h1>Customized Footer</h1>}
          onClose={onClose}
          body={<div>Customized body</div>}
        />
      )}
    </div>
  )
}
