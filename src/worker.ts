export default {
  async fetch(
    request: Request,
    env: { ASSETS: { fetch(request: Request): Promise<Response> } },
  ): Promise<Response> {
    try {
      const response = await env.ASSETS.fetch(request);

      if (response.status !== 404 || !shouldServeIndex(request)) {
        return response;
      }
    } catch {
      if (!shouldServeIndex(request)) {
        return new Response("Not found", { status: 404 });
      }
    }

    const url = new URL(request.url);
    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url.toString()));
  },
};

function shouldServeIndex(request: Request): boolean {
  return (
    request.method === "GET" &&
    request.headers.get("accept")?.includes("text/html") === true
  );
}
