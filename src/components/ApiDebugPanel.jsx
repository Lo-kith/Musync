import { useState } from 'react'

function ApiDebugPanel({ requestUrl, rawResponse }) {
  const [showResponse, setShowResponse] = useState(false)

  if (!requestUrl) return null

  return (
    <>
      <div className="request-bar">
        <span className="method-badge">GET</span>
        <code className="request-url">{requestUrl}</code>
        <button
          className="response-toggle"
          onClick={() => setShowResponse(!showResponse)}
        >
          {showResponse ? 'Hide' : 'View'} Raw Response
        </button>
      </div>

      {showResponse && rawResponse && (
        <div className="response-panel">
          <div className="response-header">
            <span>📦 API Response</span>
            <span className="response-status">200 OK</span>
          </div>
          <pre className="response-json">
            {JSON.stringify(rawResponse, null, 2)}
          </pre>
        </div>
      )}
    </>
  )
}
export default ApiDebugPanel