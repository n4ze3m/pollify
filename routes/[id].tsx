import { PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import { Handlers } from "$fresh/server.ts";
import { castVote, getPoll } from "../services/db.ts";
import { getCookies } from "std/http/cookie.ts";
import { setCookie } from "std/http/cookie.ts";
import { Head } from "$fresh/runtime.ts";

import PollBody from "../islands/PollBody.tsx";

export const handler: Handlers = {
  GET: async (req, ctx) => {
    const { id } = ctx.params;
    const poll = await getPoll(id);
    const cookies = getCookies(req.headers);
    const isVoted = cookies[id] === "true";
    if (!poll) {
      return new Response("Poll not found", { status: 404 });
    }
    const totalVotes = Object.values(poll.votes).reduce((a, b) => a + b, 0);

    return ctx.render({
      ...poll,
      totalVotes,
      isAlreadyVoted: isVoted,
    });
  },

  POST: async (req, ctx) => {
    const body = await req.json();
    const option = body.option;
    const cookies = getCookies(req.headers);
    const isVoted = cookies[ctx.params.id] === "true";
    if (isVoted) {
      return new Response("Already voted", { status: 400 });
    }
    await castVote(ctx.params.id, option);
    const headers = new Headers();

    setCookie(headers, {
      name: ctx.params.id,
      value: "true",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });

    headers.set("location", "/");

    return Response.json({ success: true }, { headers });
  },
};

export default function Poll(props: PageProps) {
  return (
    <>
      <Head>
        <title>{props.data.question} / Pollify</title>

        <meta
          name="description"
          content={`See the results of ${props.data.question} on Pollify`}
        />
      </Head>

      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <PollBody {...props.data} />
        </div>
      </Layout>
    </>
  );
}
