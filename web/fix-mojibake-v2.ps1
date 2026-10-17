# Pure-ASCII mojibake fixer. No unicode literals, no emoji.
# Every replacement target and value is built from [char] codes.

$files = @(
  "app\docs\project-proposal\part-2\page.tsx",
  "app\docs\layout.tsx",
  "app\docs\page.tsx"
)

# Build replacement map from char codes only.
# Pattern: [char]0x00E2 (a-circumflex) + [char]0x20AC (euro) = mojibake prefix
# Real em-dash = [char]0x2014
$emDash    = [string][char]0x2014
$enDash    = [string][char]0x2013
$leftQuote = [string][char]0x201C
$rightQuote= [string][char]0x201D
$apos      = [string][char]0x2019
$ellipsis  = [string][char]0x2026
$question  = "?"

# Mojibake prefixes (chars produced when UTF-8 bytes are read as 1252)
$e = [string][char]0x00E2  # a-circumflex
$C = [string][char]0x00C3  # A-circumflex
$dEuro    = [string][char]0x20AC  # euro sign
$dEndash  = [string][char]0x2013
$dEmdash  = [string][char]0x2014
$dLdquo   = [string][char]0x201C
$dRdquo   = [string][char]0x201D
$dTrade   = [string][char]0x2122
$dEllips  = [string][char]0x2026
$dBroken  = [string][char]0x00A6
$dNbsp    = [string][char]0x00A0
$dDia     = [string][char]0x00A8
$dCopy    = [string][char]0x00A9
$dCent    = [string][char]0x00A2

# Actual garbage sequences in these files
# "a-circ + euro + rdquo" = em-dash mojibake
# "a-circ + euro + quote-marks" = smart quote mojibake
# "A-circ + cent" = standalone a-circumflex mojibake (from CSS/TS being written wrong)

$map = [ordered]@{}
$map[($e + $dEuro + $dRdquo)]   = $emDash
$map[($e + $dEuro + $dLdquo)]   = $emDash
$map[($e + $dEuro + $dTrade)]   = $apos
$map[($e + $dEuro + $dEllips)]  = $ellipsis
$map[($e + $dEuro + $dEndash)]  = $enDash
$map[($e + $dEuro + $dEmdash)]  = $emDash
$map[($e + $dEuro + $dBroken)]  = "..."
$map[($e + $dEuro)]             = $emDash    # fallback
$map[($C + $dCent)]             = ""
$map[($C + $dCopy)]             = ""
$map[($C + $dDia)]              = ""
$map[($C + $dNbsp)]             = " "
$map[($C)]                      = ""

foreach ($f in $files) {
  $path = Join-Path $PWD $f
  if (-not (Test-Path $path)) {
    Write-Host ("  NOT FOUND: " + $f)
    continue
  }
  $raw  = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $orig = $raw
  foreach ($k in $map.Keys) {
    $raw = $raw.Replace($k, $map[$k])
  }
  # Strip U+FFFD literal replacement char
  $raw = $raw.Replace([string][char]0xFFFD, "?")

  if ($raw -ne $orig) {
    [System.IO.File]::WriteAllText($path, $raw, [System.Text.UTF8Encoding]::new($false))
    Write-Host ("  FIXED: " + $f)
  } else {
    Write-Host ("  NO CHANGE: " + $f)
  }
}

Write-Host ""
Write-Host "=== Re-scan ==="
$anyBad = $false
foreach ($f in $files) {
  $path = Join-Path $PWD $f
  $raw  = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $bad  = $raw.Contains($e + $dEuro) -or $raw.Contains($C + $dCent) -or $raw.Contains([string][char]0x00EF + [string][char]0x00BF)
  if ($bad) {
    Write-Host ("  STILL BAD: " + $f)
    $anyBad = $true
  } else {
    Write-Host ("  CLEAN: " + $f)
  }
}
if (-not $anyBad) { Write-Host ""; Write-Host "=== ALL CLEAN ===" }