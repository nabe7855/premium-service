export interface Schedule {
  id: number;
  date: string;
  rawText: string;
  isFullyBooked: boolean | null;
  cast: {
    id: number;
    name: string;
    customID: string;
  };
}