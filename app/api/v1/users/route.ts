import user from "@/models/user";

export async function POST(request: Request) {
  const userData = await request.json();
  const newUser = await user.create(userData);

  return Response.json(newUser, {
    status: 201,
  });
}
