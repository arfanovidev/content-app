export function pickVoice(lang: 'en' | 'bn'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined') return null;
  const voices = window.speechSynthesis.getVoices();
  const prefix = lang === 'bn' ? 'bn' : 'en';

  return (
    voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ||
    voices.find((v) => v.lang.toLowerCase().includes(prefix)) ||
    voices.find((v) => v.default) ||
    voices[0] ||
    null
  );
}

export function hasBanglaVoice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.speechSynthesis
    .getVoices()
    .some((v) => v.lang.toLowerCase().startsWith('bn'));
}

export function isSpeechSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

export function splitIntoWords(text: string): string[] {
  return text.split(/\s+/).filter((w) => w.length > 0);
}

export function msPerWord(lang: 'en' | 'bn'): number {
  return lang === 'bn' ? 420 : 320;
}