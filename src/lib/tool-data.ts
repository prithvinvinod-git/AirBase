export interface AITool {
  id: string
  name: string
  maker: string
  category: string
  description: string
  tags: string[]
  mark: string
  color: string
  background: string
  access: "preview" | "planned"
}

export const tools: AITool[] = [
  { id: "chatgpt", name: "ChatGPT", maker: "OpenAI", category: "AI assistants", description: "A general-purpose assistant for writing, analysis, ideation, and everyday work.", tags: ["assistant", "writing", "multimodal"], mark: "◎", color: "#087f69", background: "#e8f6f3", access: "planned" },
  { id: "claude", name: "Claude", maker: "Anthropic", category: "AI assistants", description: "A conversational assistant designed for long-form reasoning, writing, and coding tasks.", tags: ["assistant", "reasoning", "writing"], mark: "✳", color: "#c25a36", background: "#fbefe8", access: "planned" },
  { id: "gemini", name: "Gemini", maker: "Google", category: "AI assistants", description: "A multimodal assistant for research, content, and work across text and media.", tags: ["assistant", "research", "multimodal"], mark: "✦", color: "#5064dc", background: "#eef1ff", access: "planned" },
  { id: "perplexity", name: "Perplexity", maker: "Perplexity AI", category: "Research", description: "An answer engine that combines conversational search with linked sources.", tags: ["search", "research", "citations"], mark: "P", color: "#167e79", background: "#e5f6f5", access: "planned" },
  { id: "cursor", name: "Cursor", maker: "Anysphere", category: "Coding", description: "An AI-first code editor for navigating, editing, and understanding software projects.", tags: ["coding", "editor", "agent"], mark: "C", color: "#25282c", background: "#eef0f2", access: "planned" },
  { id: "github-copilot", name: "GitHub Copilot", maker: "GitHub", category: "Coding", description: "An AI coding companion for completions, chat, and developer workflows.", tags: ["coding", "completion", "developer"], mark: "⌘", color: "#3b58a6", background: "#e9efff", access: "planned" },
  { id: "midjourney", name: "Midjourney", maker: "Midjourney", category: "Creative", description: "A creative image-generation product for visual exploration and art direction.", tags: ["image", "creative", "design"], mark: "M·", color: "#6655bd", background: "#f0edff", access: "planned" },
  { id: "runway", name: "Runway", maker: "Runway AI", category: "Creative", description: "A creative suite for generating and editing video and other visual media.", tags: ["video", "creative", "editing"], mark: "R", color: "#5147bd", background: "#f0efff", access: "planned" },
  { id: "elevenlabs", name: "ElevenLabs", maker: "ElevenLabs", category: "Audio", description: "Tools for generating, translating, and working with expressive speech and audio.", tags: ["audio", "speech", "voice"], mark: "11", color: "#563f31", background: "#f5f0ec", access: "planned" },
  { id: "replit", name: "Replit Agent", maker: "Replit", category: "Build", description: "An AI-assisted environment for turning app ideas into working software prototypes.", tags: ["coding", "agent", "app builder"], mark: "R", color: "#b34e23", background: "#fff0e7", access: "planned" },
  { id: "notebooklm", name: "NotebookLM", maker: "Google", category: "Research", description: "A source-grounded research workspace for exploring a collection of documents.", tags: ["research", "documents", "summaries"], mark: "N", color: "#475a87", background: "#edf2fc", access: "planned" },
  { id: "huggingface", name: "Hugging Face", maker: "Hugging Face", category: "Model platforms", description: "A community hub for discovering, sharing, and working with machine-learning assets.", tags: ["models", "datasets", "open source"], mark: "HF", color: "#a56c00", background: "#fff5d9", access: "planned" },
]
