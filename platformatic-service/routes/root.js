/// <reference path="../global.d.ts" />
"use strict";

/** @param {import('fastify').FastifyInstance} fastify */
module.exports = async function (fastify, opts) {
  fastify.get("/example", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.post("/test/vulnerabilities", async (request, reply) => {
    const packageName = request.query.packageName;
    const packageVersion = request.query.packageVersion;

    const snykApiToken = opts.snykApiToken;
    const url = `https://snyk.io/api/v1/test/npm/${packageName}/${packageVersion}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `token ${snykApiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { vulnerabilities: data.issues?.vulnerabilities };
  });
};
