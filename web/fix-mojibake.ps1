$files = @(
  "app\docs\project-proposal\part-2\page.tsx",
  "app\docs\layout.tsx",
  "app\docs\page.tsx"
)

# Patterns to strip/fix. Anything matching these gets replaced with
# a proper character via .NET char codes — no literal Unicode needed.
$map = @{
  ([char]0x00E2 + [char]0x20AC + [char]0x201D) = '-'   # a-euro-rdquo
  ([char]0x00E2 + [char]0x20AC + [char]0x201C) = '-'   # a-euro-ldquo
  ([char]0x00E2 + [char]0x20AC + [char]0x2122) = "'"   # a-euro-trade
  ([char]0x00E2 + [char]0x20AC + [char]0x00A6) = '...' # a-euro-brokenbar
  ([char]0x00C3 + [char]0x00A2)                = 'a'   # A-circumflex
  ([char]0x00C3 + [char]0x00A9)                = 'e'   # A-copyright
  ([char]0x00C3 + [char]0x00A8)                = 'e'   # A-diaeresis
  ([char]0x00C3 + [char]0x00A0)                = ' '   # A-nbsp
  ([char]0x00EF + [char]0x00BF + [char]0x00BD) = '?'   # replacement
}

foreach ($f in $files) {
  $path = Join-Path $PWD $f
  if (-not (Test-Path $path)) { Write-Host "  ❌ not found: $f"; continue }
  $raw  = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $orig = $raw
  foreach ($k in $map.Keys) {
    $raw = $raw.Replace($k, $map[$k])
  }
  # Also strip the literal U+FFFD replacement char
  $raw = $raw.Replace([string][char]0xFFFD, '?')

  if ($raw -ne $orig) {
    [System.IO.File]::WriteAllText($path, $raw, [System.Text.UTF8Encoding]::new($false))
    Write-Host "  ✅ fixed: $f"
  } else {
    Write-Host "  ℹ️  no change: $f"
  }
}