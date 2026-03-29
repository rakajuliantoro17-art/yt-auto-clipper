export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL wajib diisi" });
    }

    return res.status(200).json({
      status: "success",
      message: "API sudah jalan",
      clips: [
        { start: 10, end: 25, text: "Jangan takut gagal" },
        { start: 30, end: 45, text: "Kadang kita lelah" }
      ]
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
