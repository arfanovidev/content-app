export interface VoteRecord {
  id: string;
  contentId: string;
  userKey: string;
  value: 1 | -1;
  votedAt: string;
}
