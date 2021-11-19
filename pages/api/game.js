export default function handler(request, response) {
  const { method, body } = request;

  if (method === "GET") {
    return response.status(200).json({ hi: "Hello" });
  }

  if (method === "POST") {
    return response.status(200).json(body);
  }
}
