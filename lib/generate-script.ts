export type VideoType = "reels" | "long"

export interface ScriptSection {
  label: string
  timecode: string
  lines: string[]
}

export interface GeneratedScript {
  title: string
  type: VideoType
  hooks: string[]
  caption: string
  sections: ScriptSection[]
  hashtags: string[]
  tips: string[]
}

function cleanTopic(topic: string): string {
  return topic.trim().replace(/\s+/g, " ")
}

function titleCase(topic: string): string {
  return topic
    .split(" ")
    .map((w) => (w.length > 2 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ")
}

function buildHashtags(topic: string, type: VideoType): string[] {
  const words = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, "")
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 4)
    .map((w) => "#" + w)

  const base =
    type === "reels"
      ? ["#reels", "#reelsfacebook", "#fyp", "#viral", "#konten"]
      : ["#videofacebook", "#edukasi", "#storytelling", "#fyp", "#kontenkreator"]

  return Array.from(new Set([...words, ...base])).slice(0, 8)
}

export function generateScript(rawTopic: string, type: VideoType): GeneratedScript {
  const topic = cleanTopic(rawTopic)
  const t = titleCase(topic)

  const hooks =
    type === "reels"
      ? [
          `STOP scroll! Ternyata ${topic} bisa berubah total dalam 30 detik.`,
          `Kebanyakan orang salah soal ${topic}. Ini faktanya...`,
          `Kamu masih ngelakuin ini soal ${topic}? Berhenti sekarang!`,
        ]
      : [
          `Kalau kamu penasaran soal ${topic}, video ini wajib kamu tonton sampai habis.`,
          `Ada 1 hal soal ${topic} yang jarang dibahas orang. Aku jelaskan pelan-pelan.`,
          `Setelah video ini, cara pandang kamu tentang ${topic} nggak akan sama lagi.`,
        ]

  const caption =
    type === "reels"
      ? `${t} yang wajib kamu tahu! 🔥 Simpan biar nggak lupa & tag temanmu. Menurut kamu gimana? Komen di bawah 👇`
      : `${t} — pembahasan lengkap dari awal sampai tuntas. 🎯 Tonton sampai habis, lalu ceritakan pengalamanmu di kolom komentar. Bagikan ke teman yang butuh! 👇`

  const sections: ScriptSection[] =
    type === "reels"
      ? [
          {
            label: "Hook (3 detik pertama)",
            timecode: "0:00 - 0:03",
            lines: [
              hooks[0],
              "(Tampilkan visual paling menarik / hasil akhir lebih dulu untuk menahan scroll.)",
            ],
          },
          {
            label: "Isi / Inti",
            timecode: "0:03 - 0:60",
            lines: [
              `Jelaskan 3 poin cepat tentang ${topic}:`,
              `1. Masalah umum yang sering dialami soal ${topic}.`,
              `2. Solusi atau cara praktis mengatasinya.`,
              `3. Hasil atau manfaat yang bisa didapat.`,
              "(Gunakan potongan cepat, teks di layar, dan musik trending.)",
            ],
          },
          {
            label: "CTA (Call to Action)",
            timecode: "0:60 - 0:90",
            lines: [
              `Jadi itu dia soal ${topic}!`,
              "Follow untuk tips lainnya, dan simpan video ini biar nggak lupa. Komen 'MAU' kalau kamu setuju! 👇",
            ],
          },
        ]
      : [
          {
            label: "Intro & Hook",
            timecode: "0:00 - 0:30",
            lines: [
              hooks[0],
              `Perkenalkan diri singkat dan sampaikan apa yang akan penonton dapat setelah menonton pembahasan ${topic} ini.`,
            ],
          },
          {
            label: "Konteks / Latar Masalah",
            timecode: "0:30 - 1:30",
            lines: [
              `Ceritakan kenapa ${topic} itu penting dan relevan untuk penonton sekarang.`,
              "Bangun rasa penasaran dengan pertanyaan atau data menarik.",
            ],
          },
          {
            label: "Pembahasan Inti",
            timecode: "1:30 - 3:30",
            lines: [
              `Bahas ${topic} secara terstruktur dalam beberapa bagian:`,
              `• Poin 1: Penjelasan dasar tentang ${topic}.`,
              "• Poin 2: Contoh nyata atau studi kasus.",
              "• Poin 3: Langkah praktis yang bisa langsung diterapkan.",
              "(Selipkan cerita pribadi agar penonton betah dan retensi naik.)",
            ],
          },
          {
            label: "Kesimpulan & CTA",
            timecode: "3:30 - selesai",
            lines: [
              `Rangkum inti dari ${topic} dalam 2-3 kalimat.`,
              "Ajak penonton like, komentar pengalaman mereka, share ke teman, dan follow untuk video berikutnya. 👇",
            ],
          },
        ]

  const tips =
    type === "reels"
      ? [
          "Rekam vertikal 9:16 dan pastikan 3 detik pertama langsung nendang.",
          "Tambahkan teks/caption di layar karena banyak orang menonton tanpa suara.",
          "Gunakan audio yang sedang trending untuk jangkauan lebih luas.",
          "Ajukan pertanyaan di akhir agar penonton berkomentar (algoritma suka interaksi).",
        ]
      : [
          "Retensi adalah kunci: jaga agar penonton bertahan minimal 1 menit pertama.",
          "Pecah video jadi segmen dengan 'pattern interrupt' (ganti angle/visual) tiap 20-30 detik.",
          "Balas komentar di 1 jam pertama untuk mendorong jangkauan.",
          "Tulis caption yang memancing diskusi dan sertakan pertanyaan terbuka.",
        ]

  return {
    title: t,
    type,
    hooks,
    caption,
    sections,
    hashtags: buildHashtags(topic, type),
    tips,
  }
}
