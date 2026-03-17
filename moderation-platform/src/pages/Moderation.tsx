import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { mockComplaints } from '../data/mockData'
import type { CaseType, CaseStatus } from '../types'
import { format } from 'date-fns'
import './Moderation.css'

const statusLabels: Record<CaseStatus, string> = {
  pending: 'Pending',
  ai_approved: 'AI Approved',
  ai_rejected: 'AI Rejected',
  human_review: 'Human Review',
  human_approved: 'Human Approved',
  human_rejected: 'Human Rejected',
  sampled_for_verify: 'Sampled for verify',
}

const typeLabels: Record<CaseType, string> = {
  simple: 'Simple',
  hard: 'Hard',
}

export default function Moderation() {
  const [filterType, setFilterType] = useState<CaseType | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<CaseStatus | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return mockComplaints.filter((c) => {
      if (filterType !== 'all' && c.caseType !== filterType) return false
      if (filterStatus !== 'all' && c.status !== filterStatus) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          c.id.toLowerCase().includes(q) ||
          c.passengerName.toLowerCase().includes(q) ||
          c.flightNumber.toLowerCase().includes(q) ||
          c.complaintText.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [filterType, filterStatus, search])

  return (
    <div className="moderation">
      <div className="moderation-header">
        <h1>Moderation Queue</h1>
        <p className="subtitle">Delay Slayer has pre-screened delay claims under EU261. Handle cases that need human review or sampling.</p>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="Search by case ID, passenger, flight, or content…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as CaseType | 'all')}
          className="filter-select"
        >
          <option value="all">All types</option>
          <option value="simple">Simple</option>
          <option value="hard">Hard</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as CaseStatus | 'all')}
          className="filter-select"
        >
          <option value="all">All statuses</option>
          {Object.entries(statusLabels).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Passenger</th>
              <th>Flight</th>
              <th>Delay</th>
              <th>Type</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td><code>{c.id}</code></td>
                <td>{c.passengerName}</td>
                <td>{c.flightNumber} {c.departure}→{c.arrival}</td>
                <td>{c.delayMinutes} min</td>
                <td>
                  <span className={`badge badge-${c.caseType}`}>{typeLabels[c.caseType]}</span>
                </td>
                <td>
                  <span className={`badge status-${c.status}`}>{statusLabels[c.status]}</span>
                  {c.sampledForVerify && <span className="badge sampled">Sampled</span>}
                </td>
                <td>{format(new Date(c.submittedAt), 'yyyy-MM-dd HH:mm')}</td>
                <td>
                  <Link to={`/case/${c.id}`} className="btn btn-sm btn-primary">Review</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="empty">No matching cases.</p>
      )}
    </div>
  )
}
