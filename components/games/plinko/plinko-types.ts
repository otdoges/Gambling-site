export interface AutoPlayConfig {
  enabled: boolean;
  ballCount: number;
  ballsRemaining: number;
  interval: number | null;
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface GameState {
  amount: string;
  risk: RiskLevel;
  rows: number;
  ballsDropped: number;
  totalWinnings: number;
  currentMultiplier: number | null;
  lastWinAmount: number;
}