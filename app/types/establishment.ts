export interface Establishment {
  id?: number;
  name: string;
  email: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
  google_oauth_key?: string;
  stripeCustomerId?: string;
  stripeAccountId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EstablishmentResponse extends Establishment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
} 