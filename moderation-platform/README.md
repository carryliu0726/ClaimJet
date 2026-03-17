# Delay Slayer · AI Flight Claims Moderation (Demo)

Internal airline demo: EU261 delay-claim moderation. **Delay Slayer** AI pre-screens delay claims; simple cases are auto-decided (with 20% sampled for human verify), hard cases get AI suggestions and one-click accept by humans.

## Features

- **Moderation queue**: Filter by type (simple/hard), status; search; open case for review.
- **Case detail**: Complaint + flight info, **AI suggestion** (outcome, confidence, EU261 ref, key facts, risk flags, suggested reply). Hard cases: **Accept AI suggestion** or override and submit.
- **Dashboard**:  
  - **AI accuracy** (vs human coding on sampled cases)  
  - **Human coder consistency** (inter-coder agreement on sampled cases)  
  - **AI processed volume**, **human review volume**  
  - **Total cost**, **cost per case**  
  - **Appeal rate**, **satisfaction** (out of 5), **appeal success rate**  
  - Daily volume bar chart; appeal rate vs AI accuracy trend (line chart); period summary (simple/hard/sampled counts).

## Run the demo

```bash
cd moderation-platform
npm install
npm run dev
```

Open **http://localhost:5173**. Use **Moderation Queue** to open a case; **Dashboard** for metrics and charts. Data is mock in `src/data/mockData.ts`.

## Tech

React 18, TypeScript, Vite, React Router, Recharts, date-fns. Logo: `/public/delay-slayer-logo.png`.
