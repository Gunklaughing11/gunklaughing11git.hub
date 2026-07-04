"use client"

import { useState } from "react"
import { Check, Copy, Clapperboard, Lightbulb, Hash, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { GeneratedScript } from "@/lib/generate-script"

function scriptToText(script: GeneratedScript): string {
  const lines: string[] = []
  lines.push(`NASKAH VIDEO: ${script.title}`)
  lines.push(
    script.type === "reels" ? "Format: Video Pendek / Reels (< 90 detik)" : "Format: Video Panjang (> 3 menit)",
  )
  lines.push("")
  lines.push("PILIHAN HOOK:")
  script.hooks.forEach((h, i) => lines.push(`${i + 1}. ${h}`))
  lines.push("")
  script.sections.forEach((s) => {
    lines.push(`[${s.timecode}] ${s.label}`)
    s.lines.forEach((l) => lines.push(l))
    lines.push("")
  })
  lines.push("CAPTION:")
  lines.push(script.caption)
  lines.push("")
  lines.push("HASHTAG:")
  lines.push(script.hashtags.join(" "))
  lines.push("")
  lines.push("TIPS ALGORITMA:")
  script.tips.forEach((t) => lines.push(`- ${t}`))
  return lines.join("\n")
}

export function ScriptResult({ script }: { script: GeneratedScript }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptToText(script))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <section aria-label="Hasil naskah video" className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Clapperboard className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-base font-bold text-foreground">Naskah: {script.title}</h2>
            <p className="text-xs text-muted-foreground">
              {script.type === "reels" ? "Video Pendek / Reels" : "Video Panjang"}
            </p>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={handleCopy} className="shrink-0 bg-transparent">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Tersalin" : "Salin"}
        </Button>
      </div>

      {/* Hooks */}
      <div className="mb-5">
        <h3 className="mb-2 text-sm font-semibold text-foreground">Pilihan Hook (3 detik pertama)</h3>
        <ul className="space-y-2">
          {script.hooks.map((h, i) => (
            <li key={i} className="rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground">
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Sections */}
      <div className="mb-5 space-y-4">
        {script.sections.map((s, i) => (
          <div key={i} className="rounded-lg border border-border p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
                {s.timecode}
              </span>
              <span className="text-sm font-semibold text-foreground">{s.label}</span>
            </div>
            <div className="space-y-1.5">
              {s.lines.map((l, j) => (
                <p key={j} className="text-sm leading-relaxed text-muted-foreground">
                  {l}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Caption */}
      <div className="mb-5">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <MessageSquare className="size-4 text-primary" aria-hidden="true" /> Caption
        </h3>
        <p className="rounded-lg bg-muted px-3 py-2 text-sm leading-relaxed text-foreground">{script.caption}</p>
      </div>

      {/* Hashtags */}
      <div className="mb-5">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <Hash className="size-4 text-primary" aria-hidden="true" /> Hashtag
        </h3>
        <div className="flex flex-wrap gap-2">
          {script.hashtags.map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div>
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <Lightbulb className="size-4 text-primary" aria-hidden="true" /> Tips Optimasi Algoritma Facebook
        </h3>
        <ul className="space-y-1.5">
          {script.tips.map((t, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
