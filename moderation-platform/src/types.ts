/** Case routing: simple = AI auto-decides, hard = human review with AI suggestion */
export type CaseType = 'simple' | 'hard';

/** Lifecycle status of the complaint */
export type CaseStatus = 'pending' | 'ai_approved' | 'ai_rejected' | 'human_review' | 'human_approved' | 'human_rejected' | 'sampled_for_verify';

/** EU261 compensation outcome */
export type EU261Outcome = 'compensate_250' | 'compensate_400' | 'compensate_600' | 'assist_care' | 'reject' | 'partial';

export interface Complaint {
  id: string;
  passengerName: string;
  email: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  scheduledDeparture: string;
  actualDeparture: string;
  delayMinutes: number;
  complaintText: string;
  submittedAt: string;
  caseType: CaseType;
  status: CaseStatus;
  aiSuggestion?: AISuggestion;
  humanDecision?: HumanDecision;
  sampledForVerify?: boolean;
  appealCount?: number;
  appealSuccess?: boolean;
}

export interface AISuggestion {
  outcome: EU261Outcome;
  confidence: number;
  reasoning: string;
  eu261Article: string;
  compensationAmount?: number;
  suggestedReply: string;
  keyFacts: string[];
  riskFlags: string[];
}

export interface HumanDecision {
  outcome: EU261Outcome;
  reviewerId: string;
  reviewedAt: string;
  notes?: string;
  acceptedAISuggestion: boolean;
}

export interface DashboardMetrics {
  aiAccuracy: number;
  humanCoderConsistency: number;
  aiProcessedVolume: number;
  humanReviewedVolume: number;
  totalCost: number;
  costPerCase: number;
  appealRate: number;
  satisfactionScore: number;
  appealSuccessRate: number;
  simpleCaseVolume: number;
  hardCaseVolume: number;
  sampledForVerifyCount: number;
  timeSeries: TimeSeriesPoint[];
}

export interface TimeSeriesPoint {
  date: string;
  volume: number;
  appealRate: number;
  accuracy?: number;
}
