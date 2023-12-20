const url = process.argv[2];

if (!url) {
  console.error("Missing url");
  process.exit(1);
}

const start = Date.now();
const count = parseInt(process.env.TEST_COUNT ?? "100");

const requests = Array.from({ length: count }).map(async (_, i) => {
  const reqstart = Date.now();
  const response = await fetch(url);
  await response.text();
  console.log("Response", i, response.status, `${Date.now() - reqstart}ms`);
});

Promise.all(requests)
  .then(() => {
    console.log(`Finished ${count} requests in ${Date.now() - start}ms`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

process.on("SIGTERM", () => process.exit(1));
