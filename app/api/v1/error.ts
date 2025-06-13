// app/api/example/error.ts
export default function Error({ error }: { error: Error }) {
  console.error("API Route Error:", error.message);

  // Se quiser, você pode customizar de acordo com o erro:
  if (error.message.includes("Method")) {
    return new Response(
      JSON.stringify({ error: "Método HTTP não permitido. Personalizado!" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify({ error: "Erro interno na API." }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}
