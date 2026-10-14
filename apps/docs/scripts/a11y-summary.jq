.numTotalTests as $total
| [.testResults[].assertionResults[] | .meta.storyId as $s
    | (.meta.reports // [])[] | select(.type == "a11y")
    | (.result.violations // [])[] | {s: $s, id, impact, n: (.nodes | length)}] as $v
| "## Accessibility (non-blocking)\n",
  "\($v | map(.s) | unique | length) of \($total) stories have axe violations.\n",
  if ($v | length) == 0 then "No axe violations found."
  else
    "| Rule | Impact | Stories | Nodes |", "|---|---|---|---|",
    ($v | group_by(.id) | sort_by(-length, .[0].id)[]
      | "| `\(.[0].id)` | \(.[0].impact // "n/a") | \(length) | \(map(.n) | add) |")
  end
