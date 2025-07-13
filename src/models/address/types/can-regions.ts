export enum CANProvinces {
  AB = 'Alberta',
  BC = 'British Columbia',
  MB = 'Manitoba',
  NB = 'New Brunswick',
  NL = 'Newfoundland and Labrador',
  NS = 'Nova Scotia',
  ON = 'Ontario',
  PE = 'Prince Edward Island',
  QC = 'Quebec',
  SK = 'Saskatchewan',
}

export enum CANTerritories {
  NT = 'Northwest Territories',
  NU = 'Nunavut',
  YT = 'Yukon',
}

export type CANRegion = CANProvinces | CANTerritories;
