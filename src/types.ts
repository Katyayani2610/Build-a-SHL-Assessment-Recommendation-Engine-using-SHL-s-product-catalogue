export interface Assessment {
  id: string;
  name: string;
  url: string;
  test_type: string;
  duration: string;
  remote_testing: boolean;
  adaptive_support: boolean;
  embedding: number[];
}