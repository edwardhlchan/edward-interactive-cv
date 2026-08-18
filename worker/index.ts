export default {
  async fetch(): Promise<Response> {
    return new Response("Asset binding did not serve this request.", { status: 404 });
  },
};
