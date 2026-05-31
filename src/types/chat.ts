export type MessageRole = 'user' | 'assistant'

export interface SourceItem {
  title: string
  url: string
  domain?: string
}

export interface SourceSupport {
  text: string
  source_indices: number[]
  confidence: number[]
}

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: number
  sources?: SourceItem[]
  supports?: SourceSupport[]
}

export interface ToolCallEvent {
  id: string
  name: string
  args: Record<string, unknown>
}

export interface WarningEvent {
  level: 'high' | 'medium' | 'low'
  text: string
}

export type SSEEvent =
  | { type: 'text_delta'; content: string }
  | { type: 'tool_call'; id: string; name: string; args: Record<string, unknown> }
  | { type: 'sources'; items: SourceItem[] }
  | { type: 'supports'; items: SourceSupport[] }
  | { type: 'warning'; level: 'high' | 'medium' | 'low'; text: string }
  | { type: 'error'; message: string }
  | { type: 'done' }

// Gen UI block — latest of each tool name replaces previous
export interface GenUIBlock {
  id: string
  name: string
  args: Record<string, unknown>
  updatedAt: number
}
