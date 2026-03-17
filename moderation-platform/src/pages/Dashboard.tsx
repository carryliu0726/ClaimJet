import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts'
import { mockDashboard } from '../data/mockData'
import './Dashboard.css'

export default function Dashboard() {
  const d = mockDashboard

  const kpiCards = useMemo(
    () => [
      {
        title: 'AI accuracy',
        value: `${d.aiAccuracy}%`,
        desc: 'Agreement with human coding (sampled cases)',
      },
      {
        title: 'Human coder consistency',
        value: `${d.humanCoderConsistency}%`,
        desc: 'Inter-coder agreement on sampled cases',
      },
      {
        title: 'AI processed volume',
        value: d.aiProcessedVolume.toLocaleString(),
        desc: 'Cases auto-processed by AI this period',
      },
      {
        title: 'Human review volume',
        value: d.humanReviewedVolume.toLocaleString(),
        desc: 'Hard cases + 20% sample for verify',
      },
      {
        title: 'Total cost (€)',
        value: d.totalCost.toLocaleString(),
        desc: `Cost per case €${d.costPerCase}`,
      },
      {
        title: 'Appeal rate',
        value: `${d.appealRate}%`,
        desc: 'Share of decisions appealed by passengers',
      },
      {
        title: 'Satisfaction',
        value: d.satisfactionScore.toFixed(1),
        desc: 'Out of 5, post-response survey',
      },
      {
        title: 'Appeal success rate',
        value: `${d.appealSuccessRate}%`,
        desc: 'Share of appeals that overturn decision',
      },
    ],
    [d]
  )

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Delay Slayer dashboard</h1>
        <p className="subtitle">AI accuracy, human consistency, volume, cost, and passenger metrics</p>
      </div>

      <div className="kpi-grid">
        {kpiCards.map((k) => (
          <div key={k.title} className="kpi-card">
            <div className="kpi-title">{k.title}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-desc">{k.desc}</div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Daily volume</h3>
          <div className="chart-inner">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={d.timeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                  }}
                  labelStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="volume" fill="var(--accent)" name="Volume" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Appeal rate vs AI accuracy (trend)</h3>
          <div className="chart-inner">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={d.timeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="appealRate"
                  stroke="var(--warning)"
                  name="Appeal rate %"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="accuracy"
                  stroke="var(--success)"
                  name="AI accuracy %"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="summary-card">
        <h3>Period summary</h3>
        <ul>
          <li>Simple cases (AI auto): <strong>{d.simpleCaseVolume}</strong></li>
          <li>Hard cases (human): <strong>{d.hardCaseVolume}</strong></li>
          <li>Sampled for verify (20% of simple): <strong>{d.sampledForVerifyCount}</strong></li>
        </ul>
      </div>
    </div>
  )
}
