import bcrypt from "bcrypt";

async function hash(password: string) {
  const rounds = getNumberOfRounds();
  return await bcrypt.hash(getPasswordWithPepper(password), rounds);

  function getNumberOfRounds() {
    return process.env.NODE_ENV === "production" ? 14 : 1;
  }
}

async function compare(providedPassword: string, storedPassword: string) {
  const isMatch = await bcrypt.compare(
    getPasswordWithPepper(providedPassword),
    storedPassword,
  );
  return isMatch;
}

const password = {
  hash,
  compare,
};

export default password;

function getPasswordWithPepper(password: string): string {
  return `${password}${process.env.PASSWORD_PEPPER}`;
}
