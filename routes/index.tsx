import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import PollCreator from "../islands/PollCreator.tsx";
import { createPoll, getAllPolls } from "../services/db.ts";

export const handler: Handlers = {
  GET: async (req, ctx) => {
    const count = await getAllPolls();
    return ctx.render({
      count,
    });
  },
  POST: async (req, ctx) => {
    const body = await req.json();
    const id = await createPoll(body);
    return Response.json({ id });
  },
};

export default function Home(props: PageProps) {
  return (
    <>
      <Head>
        <title>
          Create a Poll / Pollify
        </title>
      </Head>
      <Layout>
        <div class={"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"}>
          <PollCreator />

          <div class={"mt-10"}>
            <p class={"text-center text-sm font-medium text-gray-500"}>
              {props.data.count} polls created so far
            </p>
            </div>

        </div>
      </Layout>
    </>
  );
}
