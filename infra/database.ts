import { ServiceError } from "./errors";

async function query(queryObject: any) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(`DB error: ${error}`);
    const serviceErrorObject = new ServiceError({
      message: "Erro na conexão com o Banco ou na query.",
      cause: error as Error,
    });
    throw serviceErrorObject;
  } finally {
    await client?.close();
  }
}

async function getNewClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not defined.");
  }
  const client = new Sequelize(databaseUrl, {
    dialectOptions: {
      ssl: getSSLValues(),
    },
  });
  await client.authenticate();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production" ? true : false;
}
