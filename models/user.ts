import { ValidationError } from "@/infra/errors";
import database from "@/infra/database";

async function createUser(data: any) {
  const prisma = await database.getNewClient();
  const newUser = await prisma.user.create({
    data,
  });
  await prisma.$disconnect();
  return newUser;
}

async function getUserByEmail(email: string) {
  try {
    const prisma = await database.getNewClient();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    const serviceErrorObject = new ValidationError({
      message: "Erro ao buscar usuário.",
      cause: error as Error,
    });
    throw serviceErrorObject;
  }
}

const user = {
  create: createUser,
};

export default user;
