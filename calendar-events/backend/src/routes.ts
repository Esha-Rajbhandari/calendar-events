async function routes(fastify, options) {
  fastify.get("/", (req, reply) => {
    return "Hello World";
  });
}

export default routes;
