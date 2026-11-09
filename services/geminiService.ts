
/**
 * Audio Service
 * Replaced Gemini AI TTS with the native Web Speech API.
 */

export const speak = async (text: string) => {
  if (!('speechSynthesis' in window)) {
    console.error("Speech synthesis not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set properties for a child-friendly, clear voice
  utterance.pitch = 1.2; // Slightly higher pitch for a friendlier tone
  utterance.rate = 0.9;  // Slightly slower for better clarity
  utterance.volume = 1;

  // Try to find a high-quality "Natural" or child-like voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => 
    v.name.includes('Google') || 
    v.name.includes('Natural') || 
    v.name.includes('Samantha')
  );

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  window.speechSynthesis.speak(utterance);
};
