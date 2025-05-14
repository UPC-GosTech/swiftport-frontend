export interface LocationResponse {
  id: number;
  zoneId: number;
  name: string;
  description: string;
  ubication: {
    latitude: number;
    longitude: number;
  };
} 