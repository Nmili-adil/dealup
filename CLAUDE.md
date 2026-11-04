@AGENTS.md

## Caveman Context Management

Caveman MCP is available (`caveman` server, `/home/adil/.caveman/bin/caveman-mcp`).

Use Caveman automatically when:
- reading very large files
- processing long terminal output
- processing large API responses
- analyzing large dependency trees
- reviewing extensive logs
- context is becoming large
- information is useful but does not need to stay verbatim in the active context

Prefer `caveman_compress` before placing large outputs into the active context.

Use `caveman_retrieve` as a last resort when exact original bytes are required again —
one broad call per recovery handle, never a sequence of narrow per-row retrievals.

Use `caveman_toon_encode` for uniform/tabular JSON before quoting it into context, and
`caveman_toon_decode` to read it back.

Use `caveman_stats` periodically during long sessions to check compression efficiency.

Do not compress small or immediately relevant information unnecessarily — compression
fails closed and returns the input unchanged with `ratio: 0` when it cannot help.
