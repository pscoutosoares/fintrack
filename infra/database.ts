import { withAccelerate } from "@prisma/extension-accelerate";
import { ServiceError } from "./errors";
import { PrismaClient, Prisma } from "@prisma/client";

type QueryObject = {
  text: string;
  values?: any[];
};
type QueryType = QueryObject | string;

async function getNewClient() {
  return await new PrismaClient().$extends(withAccelerate());
}
async function query(queryObject: QueryType) {
  let client;
  let query: TemplateStringsArray | Prisma.Sql;
  try {
    client = await getNewClient();
    if (typeof queryObject === "object") {
      const result = await client.$queryRawUnsafe(
        `${queryObject.text}`,
        ...(queryObject.values ?? []),
      );
      return result;
    }
    query = Prisma.raw(`${queryObject}`);
    const result = await client.$queryRaw(query);
    return result;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Erro na conexão com o Banco ou na query.",
      cause: error as Error,
    });
    throw serviceErrorObject;
  } finally {
    await client?.$disconnect();
  }
}

const database = {
  getNewClient,
  query,
};

export default database;
