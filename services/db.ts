export function generateRandomHash(): string {
  const hash = crypto.getRandomValues(new Uint8Array(16));
  return [...hash].map((b) => b.toString(16).padStart(2, "0")).join("");
}
export const db = await Deno.openKv();

export type Poll = {
  question: string;
  options: string[];
};

type PollWithVotes = Poll & {
  votes: Record<string, number>;
};

export const createPoll = async (poll: Poll): Promise<string> => {
  const id = generateRandomHash();
  const data = {
    ...poll,
    votes: poll.options.reduce((acc, option) => {
      acc[option] = 0;
      return acc;
    }, {} as Record<string, number>),
  };
  await db.set(["polls", id], data);
  return id;
};

export const getPoll = async (id: string): Promise<PollWithVotes | null> => {
  const poll = await db.get(["polls", id]);
  return poll.value;
};

export const castVote = async (id: string, vote: string) => {
  const key = ["polls", id];
  const poll = await db.get(key);
  if (!poll) {
    return false;
  }
  poll.value.votes[vote] += 1;
  await db.atomic().check(poll).set(key, poll.value).commit();
};

export const getAllPolls = async () => {
  const iter = await db.list<string>({ prefix: ["polls"] });
  const polls = [];
  for await (const res of iter) polls.push(res);
  return polls.length
};
