export type VideoPlayState = "playing" | "paused";

export type BetOption = {
  label: string;
  points: number;
  guess: ServiceOutcome;
};

export enum BetStatus {
  Noop      = 'noop',
  Closed    = 'closed',
  Open      = 'open',
  Submitted = 'submitted',
  Executed  = 'executed',
  //Settled
}

export enum ServiceOutcome {
  ServerWon   = "server_won",
  ReceiverWon = "receiver_won",
  DoubleFault = "double_fault",
  Ace         = "ace",
}

export type BetTransitions = { 
  status: BetStatus,
  outcome?: ServiceOutcome,
};

export type Coordinates = [ number, number, number, number ];
