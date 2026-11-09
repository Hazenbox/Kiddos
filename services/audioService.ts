
/**
 * Audio Service
 * Plays pre-generated clips from /audio (works on TV browsers that have no
 * speech engine) and falls back to the Web Speech API when a clip is missing.
 */

// Must match slug() in scripts/generate-audio.mjs
const slug = (t: string) => t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

let currentClip: HTMLAudioElement | null = null;

export const speak = (text: string) => {
  if (currentClip) {
    currentClip.pause();
    currentClip = null;
  }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();

  const clip = new Audio(`/audio/${slug(text)}.mp3`);
  currentClip = clip;
  clip.play().catch(() => {
    if (currentClip === clip) speakWithSynthesis(text);
  });
};

const speakWithSynthesis = (text: string) => {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported.");
    return;
  }

  // Cancel ongoing speech for immediate reaction to new input
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Kid-friendly settings:
  // - Higher pitch (1.3) sounds younger, happier, and less robotic.
  // - Slower rate (0.85) ensures clearer pronunciation for learning.
  utterance.pitch = 1.3; 
  utterance.rate = 0.85;  
  utterance.volume = 1;

  // Voice selection logic
  const voices = window.speechSynthesis.getVoices();
  
  // Prioritize natural and friendly English voices
  // 1. Google US English (Chrome) - usually very high quality
  // 2. Samantha (macOS) - friendly female voice
  // 3. Microsoft Zira (Windows) - friendly female voice
  // 4. Any English 'Female' voice - generally perceived as friendlier than default robotic male voices
  const preferredVoice = voices.find(v => 
    (v.lang === 'en-US' && v.name.includes('Google')) || 
    (v.name === 'Samantha') ||
    (v.name.includes('Zira'))
  );

  const fallbackVoice = voices.find(v => 
    v.lang.startsWith('en') && 
    (v.name.includes('Female') || v.name.includes('Woman'))
  );

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  } else if (fallbackVoice) {
    utterance.voice = fallbackVoice;
  }

  window.speechSynthesis.speak(utterance);
};

// Initial call to getVoices to help some browsers load the list early
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
}
