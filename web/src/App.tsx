import type { ErrorInfo } from 'react';
import { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from "./components/ErrorFallback";
import Test from "./features/Test";

const App = () => {
  const [restarting, setRestarting] = useState(false);

  function handleError(error: Error, errorInfo: ErrorInfo) {
    setTimeout(() => {
      console.log(`
        There was was an error!\n
        Message: ${error}\n
        Stack: ${errorInfo.componentStack}
      `);

      setRestarting(true);
    }, 2500);
  }

  useEffect(() => {
    /* For now, we will just reload the page. */
    if (restarting)
      setTimeout(window.location.reload, 5_000);

  }, [restarting])

  return (
    <>
      {restarting ? (
          <div>
            Application Restarting!
          </div>
      ) : (
          <ErrorBoundary fallback={<ErrorFallback />} onError={handleError}>
            <Test />
          </ErrorBoundary>
      )}
    </>
  )
}
export default App;