export interface BenchmarkResult {
  name: string;
  score: number;
  date: Date;
}

export interface Pricing {
  input: number;
  output: number;
  unit: "per_token" | "per_request" | "per_second";
  currency: "USD";
}

export interface ModelStats {
  totalRuns: number;
  avgRating: number;
  reviewCount: number;
  uptimePercent: number;
}

export interface AIModel {
  id: string;
  name: string;
  slug: string;
  author: string;
  description: string;
  category: string;
  tags: string[];
  pricing: Pricing;
  demand: number;
  avgLatencyMs: number;
  contextWindow: number;
  maxOutputTokens: number;
  thumbnailUrl: string;
  bannerUrl: string;
  providerId: string;
  stats: ModelStats;
  benchmarks: BenchmarkResult[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  modelCount: number;
  order: number;
}

export interface ScanProgress {
  phase: string;
  percent: number;
}

export interface ScanResults {
  webcoreIndex: number;
  webcoreGrade: string;
  scores: Record<string, number>;
  findings: Finding[];
  executiveSummary: string;
}

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
}

export interface Scan {
  id: string;
  userId: string;
  url: string;
  status: "queued" | "scanning" | "complete" | "failed";
  progress: ScanProgress;
  results?: ScanResults;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  credits: number;
  savedModels: string[];
  createdAt: Date;
}
