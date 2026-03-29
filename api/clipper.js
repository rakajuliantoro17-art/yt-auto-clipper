import { YoutubeTranscript } from "youtube-transcript";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let body = {};

  try {
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

  try {
    // 🔥 Ambil transcript
    const transcript = await YoutubeTranscript.fetchTranscript(url);

    // 🔥 Gabungkan jadi text
    const fullText = transcript.map(t => t.text).join(" ");

    // 🔥 Bagi jadi clip 15 detik (simulasi)
    const clips = [];
    for (let i = 0; i < transcript.length; i += 5) {
      const chunk = transcript.slice(i, i + 5);
      clips.push({
        start: chunk[0]?.offset,
        end: chunk[chunk.length - 1]?.offset,
        text: chunk.map(c => c.text).join(" ")
      });
    }

    return res.status(200).json({
      status: "success",
      total_clips: clips.length,
      clips: clips.slice(0, 10) // ambil 10 dulu
    });

  } catch (error) {
    return res.status(500).json({
      error: "Gagal ambil transcript",
      detail: error.message
    });
  }
}
