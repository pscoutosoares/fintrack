import database from "infra/database";

export async function GET() {
  const updatedAt = new Date().toISOString();
  const maxConnections = (await database.query("SHOW max_connections;")) as {
    max_connections: string;
  }[];
  const currentConnections = (await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1`,
    values: [process.env.POSTGRES_DB],
  })) as { count: number }[];
  const pgCurrentVersion = (await database.query("SHOW server_version")) as {
    server_version: string;
  }[];
  return Response.json(
    {
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: pgCurrentVersion[0].server_version,
          max_connections: maxConnections[0].max_connections,
          opened_connections: currentConnections[0].count,
        },
      },
    },
    {
      status: 200,
    },
  );
}
