import { useState } from 'react';

import Feature from '../../components/Feature'

export default function Test() {
  const [isShown, setIsShown] = useState(true);
  const [currentText, setCurrentText] = useState("Default Text");

  function handleEvent(data: { show?: boolean, text?: string }) {
    if (typeof data.text == "string")
      setCurrentText(data.text);
  }

  return (
      <Feature id="test" onShow={setIsShown} onEvent={handleEvent}>
        {isShown ? (
            <pre>{currentText}</pre>
        ) : null}
      </Feature>
  )
}