# Box-drawing character mojibake fixer. Pure ASCII - no emoji, no unicode literals.
# Uses only [char] codes for all string building.

$files = @(
  "app\docs\project-proposal\part-2\page.tsx",
  "app\docs\project-proposal\page.tsx",
  "app\docs\architecture\page.tsx",
  "app\docs\srs\page.tsx",
  "app\docs\test-plan\page.tsx",
  "app\docs\user-manual\page.tsx",
  "app\docs\deployment\page.tsx",
  "app\docs\page.tsx",
  "app\docs\layout.tsx"
)

# Helper: build a string from a list of hex char codes
function CharSeq {
  param([int[]]$codes)
  $s = ""
  foreach ($c in $codes) { $s += [string][char]$c }
  return $s
}

# The mojibake prefix for any U+2500-257F (Box Drawing) char
# In UTF-8, "┌" = E2 94 8C. Read as Windows-1252: â (E2) ” (94) Œ (8C)
# So any box char mojibake starts with: E2 94 (â + ”/rdquo)
# The 3rd byte varies per char, so we match the prefix and let the map handle the rest.

# Common 3-byte sequences for the box chars we use
$pairs = @{
  # Mojibake prefix E2 94 (â”)
  (CharSeq @(0x00E2, 0x201D)) = "BOX"   # marker - replaced below per-char
}

# Full per-character map: [char]0xHHHH = correct char
# Mojibake = 3 chars: (a-circ) (rdquo-or-ldquo-or-tilde-or-...) (varied)
# For simplicity, replace the most common ones directly

# We'll do a two-pass approach:
# Pass 1: replace each specific full sequence with the correct box char
# Pass 2: strip leftover mojibake prefixes

$specificMap = [ordered]@{}

# Helper to build a mojibake key from hex UTF-8 bytes
# UTF-8 bytes of a U+25xx char are: 0xE2, 0xXX, 0xYY
# Read as CP1252: each byte maps to a char (with some 0x80-0x9F mappings)
function Utf8Mojibake {
  param([int]$u)
  # Encode char as UTF-8 bytes
  $bytes = [System.Text.Encoding]::UTF8.GetBytes([string][char]$u)
  # Decode those bytes as Windows-1252
  $cp1252 = [System.Text.Encoding]::GetEncoding(1252)
  return $cp1252.GetString($bytes)
}

# Box-drawing characters to fix (U+2500 - U+257F)
# Only the ones actually used in our diagrams
$boxChars = @(
  0x2500, # ─ horizontal
  0x2502, # │ vertical
  0x250C, # ┌ top-left
  0x2510, # ┐ top-right
  0x2514, # └ bottom-left
  0x2518, # ┘ bottom-right
  0x251C, # ├ left tee
  0x2524, # ┤ right tee
  0x252C, # ┬ top tee
  0x2534, # ┴ bottom tee
  0x253C, # ┼ cross
  0x25BA, # ► play arrow
  0x25BC, # ▼ down arrow
  0x2192  # → right arrow
)

foreach ($u in $boxChars) {
  $mojibake = Utf8Mojibake $u
  $correct  = [string][char]$u
  $specificMap[$mojibake] = $correct
}

# Em-dash, quotes, ellipsis (from before)
$specificMap[(Utf8Mojibake 0x2014)] = [string][char]0x2014   # em-dash
$specificMap[(Utf8Mojibake 0x2013)] = [string][char]0x2013   # en-dash
$specificMap[(Utf8Mojibake 0x201C)] = [string][char]0x201C   # left quote
$specificMap[(Utf8Mojibake 0x201D)] = [string][char]0x201D   # right quote
$specificMap[(Utf8Mojibake 0x2019)] = [string][char]0x2019   # apostrophe
$specificMap[(Utf8Mojibake 0x2026)] = [string][char]0x2026   # ellipsis

# Sort by length descending so 3-char mojibake gets replaced before 2-char fallback
$sortedKeys = $specificMap.Keys | Sort-Object { $_.Length } -Descending

Write-Host "=== Fixing box-drawing + typography mojibake ==="
foreach ($f in $files) {
  $path = Join-Path $PWD $f
  if (-not (Test-Path $path)) {
    Write-Host ("  NOT FOUND: " + $f)
    continue
  }
  $raw  = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $orig = $raw

  foreach ($k in $sortedKeys) {
    $raw = $raw.Replace($k, $specificMap[$k])
  }

  if ($raw -ne $orig) {
    [System.IO.File]::WriteAllText($path, $raw, [System.Text.UTF8Encoding]::new($false))
    Write-Host ("  FIXED: " + $f)
  } else {
    Write-Host ("  NO CHANGE: " + $f)
  }
}

Write-Host ""
Write-Host "=== Re-scan for box-drawing mojibake ==="
$prefix1 = [string][char]0x00E2 + [string][char]0x201D
$prefix2 = [string][char]0x00E2 + [string][char]0x201C
$anyBad = $false
foreach ($f in $files) {
  $path = Join-Path $PWD $f
  if (-not (Test-Path $path)) { continue }
  $raw = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  if ($raw.Contains($prefix1) -or $raw.Contains($prefix2)) {
    Write-Host ("  STILL BAD: " + $f)
    $anyBad = $true
  }
}
if (-not $anyBad) { Write-Host "=== ALL CLEAN ===" }