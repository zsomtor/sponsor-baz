export interface Goal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PackageFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  reach?: number;
  included: boolean;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: PackageFeature[];
  totalReach: number;
  recommended?: boolean;
}

export interface SponsorshipGoal {
  brandAwareness: boolean;
  leadGeneration: boolean;
  b2bCredibility: boolean;
  productLaunch: boolean;
  longTerm: boolean;
}
