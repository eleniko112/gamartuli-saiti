export enum ProgressionLevel {
  STABLE = 'stable',
  SUSPICIOUS = 'suspicious',
  UNSTABLE = 'unstable',
  DANGEROUS = 'dangerous',
  COLLAPSE = 'collapse'
}

export interface SiteState {
  interactions: number;
  level: ProgressionLevel;
  cvDownloads: number;
  navAttempts: number;
  lastActionTime: number;
  patchesApplied: number;
}
