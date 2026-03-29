export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let body = {};

  try {
    // Ambil raw body manual (fix paling aman di Vercel)
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    body = JSON.parse(data || "{}");

  } catch (error) {
    return res.status(400).json({ error: "Body tidak valid" });
  }

  const { url } = body;

  if (!url) {
    return res.status(400).json({ error: "URL wajib diisi" });
  }

  return res.status(200).json({
    status: "success",
    message: "API sudah jalan",
    url_received: url,
    clips: [
      { start: 0, end: 15, text: "Clip 1" },
      { start: 15, end: 30, text: "Clip 2" }
    ]
  });
}
