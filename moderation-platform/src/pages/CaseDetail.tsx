import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { mockComplaints } from '../data/mockData'
import type { EU261Outcome } from '../types'
import { format } from 'date-fns'
import './CaseDetail.css'

const outcomeLabels: Record<EU261Outcome, string> = {
  compensate_250: 'Compensate €250',
  compensate_400: 'Compensate €400',
  compensate_600: 'Compensate €600',
  assist_care: 'Care / assist',
  reject: 'Reject',
  partial: 'Partial',
}

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>()
  const complaint = mockComplaints.find((c) => c.id === id)
  const [accepted, setAccepted] = useState(false)
  const [overrideOutcome, setOverrideOutcome] = useState<EU261Outcome | null>(null)

  if (!complaint) {
    return (
      <div className="case-detail">
        <p>Case not found.</p>
        <Link to="/">Back to queue</Link>
      </div>
    )
  }

  const isHard = complaint.caseType === 'hard'
  const ai = complaint.aiSuggestion

  return (
    <div className="case-detail">
      <div className="case-detail-header">
        <Link to="/" className="back-link">← Back to queue</Link>
        <h1>Case {complaint.id}</h1>
        <div className="case-meta">
          <span className={`badge badge-${complaint.caseType}`}>
            {isHard ? 'Hard (human review)' : 'Simple'}
          </span>
          {complaint.sampledForVerify && <span className="badge sampled">Sampled</span>}
        </div>
      </div>

      <div className="case-grid">
        <section className="card complaint-card">
          <h2>Complaint</h2>
          <dl className="meta-list">
            <dt>Passenger</dt>
            <dd>{complaint.passengerName}</dd>
            <dt>Email</dt>
            <dd>{complaint.email}</dd>
            <dt>Flight</dt>
            <dd>{complaint.flightNumber} {complaint.departure} → {complaint.arrival}</dd>
            <dt>Scheduled departure</dt>
            <dd>{complaint.scheduledDeparture}</dd>
            <dt>Actual departure</dt>
            <dd>{complaint.actualDeparture}</dd>
            <dt>Delay</dt>
            <dd>{complaint.delayMinutes} min</dd>
            <dt>Submitted</dt>
            <dd>{format(new Date(complaint.submittedAt), 'yyyy-MM-dd HH:mm')}</dd>
          </dl>
          <div className="complaint-text">
            <strong>Passenger statement</strong>
            <p>{complaint.complaintText}</p>
          </div>
        </section>

        {ai && (
          <section className="card ai-card">
            <h2>Delay Slayer AI suggestion</h2>
            <div className="ai-outcome">
              <span className="outcome-label">Suggested outcome</span>
              <span className="outcome-value">{outcomeLabels[ai.outcome]}</span>
              {ai.compensationAmount != null && (
                <span className="comp-amount">{ai.compensationAmount} €</span>
              )}
            </div>
            <div className="ai-confidence">
              Confidence: <strong>{(ai.confidence * 100).toFixed(0)}%</strong>
            </div>
            <p className="ai-reasoning">{ai.reasoning}</p>
            <p className="eu261-ref">Reference: <code>{ai.eu261Article}</code></p>
            {ai.keyFacts.length > 0 && (
              <div className="key-facts">
                <strong>Key facts</strong>
                <ul>
                  {ai.keyFacts.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
            {ai.riskFlags.length > 0 && (
              <div className="risk-flags">
                <strong>Risk flags</strong>
                <ul>
                  {ai.riskFlags.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="suggested-reply">
              <strong>Suggested reply (editable before send)</strong>
              <textarea
                readOnly
                rows={5}
                value={ai.suggestedReply}
                className="reply-textarea"
              />
            </div>

            {isHard && complaint.status === 'human_review' && (
              <div className="human-actions">
                <p className="action-hint">Accept AI suggestion or override and submit.</p>
                <div className="action-buttons">
                  <button
                    className="btn btn-accept"
                    onClick={() => setAccepted(true)}
                    disabled={accepted}
                  >
                    {accepted ? 'AI suggestion accepted' : 'Accept AI suggestion'}
                  </button>
                  <div className="override-row">
                    <label>Or override outcome:</label>
                    <select
                      value={overrideOutcome ?? ''}
                      onChange={(e) => setOverrideOutcome(e.target.value ? (e.target.value as EU261Outcome) : null)}
                      className="filter-select"
                    >
                      <option value="">— Select —</option>
                      {Object.entries(outcomeLabels).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                    <button className="btn btn-secondary">Submit with this outcome</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
