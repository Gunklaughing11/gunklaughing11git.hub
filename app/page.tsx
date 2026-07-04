"use client"

import { useState } from "react"
import { Sparkles, ThumbsUp, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { VideoTypeSelector } from "@/components/video-type-selector"
import { ScriptResult } from "@/components/script-result"
import { generateScript, type GeneratedScript, type VideoType } from "@/lib/generate-script"

export default function Page() {
  const [videoType, setVideoType] = useState<VideoType>("reels")
  const [topic, setTopic] = useState("")
  const [script, setScript] = useState<GeneratedScript | null>(null)
  const [error, setError] = useState(false)

  const handleGenerate = () => {
    if (!topic.trim()) {
      setError(true)
      setScript(null)
      return
    }
    setError(false)
    setScript(generateScript(topic, videoType))
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          <ThumbsUp className="size-3.5" aria-hidden="true" />
          Dioptimalkan untuk Algoritma Facebook
        </div>
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          FB Script Generator
        </h1>
        <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Buat naskah video otomatis yang siap tayang dan dirancang untuk memaksimalkan jangkauan di Facebook.
        </p>
      </header>

      {/* Generator card */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <VideoTypeSelector value={videoType} onChange={setVideoType} />

        <div className="mt-5">
          <Label htmlFor="topic" className="mb-2 block text-sm font-semibold text-foreground">
            Topik Video
          </Label>
          <Textarea
            id="topic"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value)
              if (error) setError(false)
            }}
            placeholder="Contoh: Cara menabung untuk anak muda, resep ayam geprek, tips produktif kerja dari rumah..."
            rows={3}
            className="resize-none"
            aria-invalid={error}
          />
          {error && (
            <p className="mt-1.5 text-xs font-medium text-destructive">
              Silakan masukkan topik video terlebih dahulu.
            </p>
          )}
        </div>

        <Button
          onClick={handleGenerate}
          size="lg"
          className="mt-5 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Sparkles className="size-5" aria-hidden="true" />
          Buat Naskah Video
        </Button>

        {/* Yellow ad banner */}
        <a
          href="#"
          className="mt-4 flex items-center gap-3 rounded-xl border border-ad-yellow-border bg-ad-yellow px-4 py-3 text-ad-yellow-foreground transition-opacity hover:opacity-90"
        >
          <Megaphone className="size-5 shrink-0" aria-hidden="true" />
          <span className="text-sm font-semibold leading-snug">
            Rekomendasi Mic &amp; Ring Light Murah untuk Ngonten (Klik di Sini)
          </span>
        </a>
      </div>

      {/* Result */}
      {script && (
        <div className="mt-6">
          <ScriptResult script={script} />
        </div>
      )}

      {/* Google AdSense slot */}
      <div className="mt-8">
        <div className="flex min-h-28 w-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-transparent">
          <span className="text-sm font-medium text-muted-foreground">Slot Iklan Google AdSense</span>
        </div>
      </div>

      <footer className="mt-8 text-center text-xs text-muted-foreground">
        FB Script Generator &middot; Naskah dibuat otomatis, sesuaikan dengan gaya kontenmu.
      </footer>
    </main>
  )
}
