import Fastify from "fastify";
import appRoutes from "./routes";

const fastify = Fastify({
  logger: true,
  requestTimeout: 30000,
});

const port = 3000;

fastify.register(appRoutes);

(async function startServer() {
  try {
    await fastify.listen({ port });

    fastify.log.info(`Listening to server on port: ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
