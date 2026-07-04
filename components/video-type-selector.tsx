"use client"

import { Zap, Film } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VideoType } from "@/lib/generate-script"

interface VideoTypeSelectorProps {
  value: VideoType
  onChange: (value: VideoType) => void
}

const OPTIONS: {
  id: VideoType
  title: string
  duration: string
  desc: string
  icon: typeof Zap
}[] = [
  {
    id: "reels",
    title: "Video Pendek / Reels",
    duration: "< 90 detik",
    desc: "Naskah cepat, hook kuat, cocok untuk viral & jangkauan luas.",
    icon: Zap,
  },
  {
    id: "long",
    title: "Video Panjang",
    duration: "> 3 menit",
    desc: "Naskah mendalam dengan struktur cerita & retensi tinggi.",
    icon: Film,
  },
]

export function VideoTypeSelector({ value, onChange }: VideoTypeSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-foreground">Pilih Jenis Video</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((opt) => {
          const active = value === opt.id
          const Icon = opt.icon
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={active}
              className={cn(
                "flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition-colors",
                active
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{opt.title}</span>
                  <span className="text-xs font-medium text-primary">{opt.duration}</span>
                </span>
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground">{opt.desc}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
