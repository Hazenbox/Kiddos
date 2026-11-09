import React from 'react';

interface ItemFallbackVisualProps {
  word: string;
  className?: string;
}

// Map common words to bespoke kid-friendly SVG icons
const getFallbackIcon = (word: string) => {
  const normalized = word.toLowerCase().trim();

  // Animals
  if (normalized.includes('apple')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <path d="M50 25 C55 10 65 12 70 8 C68 18 60 22 55 24" fill="#2E7D32" />
        <path d="M50 24 C48 12 50 5 52 3" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
        <path d="M50 32 C35 22 15 32 15 55 C15 78 35 95 50 95 C65 95 85 78 85 55 C85 32 65 22 50 32 Z" fill="#E53935" />
        <ellipse cx="35" cy="48" rx="6" ry="12" fill="#FF8A80" opacity="0.6" transform="rotate(-20 35 48)" />
      </svg>
    );
  }

  if (normalized.includes('ant')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <ellipse cx="25" cy="50" rx="12" ry="10" fill="#212121" />
        <ellipse cx="48" cy="50" rx="9" ry="8" fill="#37474F" />
        <ellipse cx="75" cy="50" rx="16" ry="12" fill="#263238" />
        <circle cx="20" cy="46" r="2.5" fill="#FFFFFF" />
        <path d="M22 42 Q15 28 8 26 M25 42 Q24 26 30 22" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M44 56 Q35 75 25 82 M50 56 Q50 78 52 85 M55 56 Q68 76 75 80" stroke="#212121" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  if (normalized.includes('airplane')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <path d="M10 50 Q40 42 75 42 Q90 42 95 50 Q90 58 75 58 Q40 58 10 50 Z" fill="#0288D1" />
        <path d="M45 42 L32 15 L48 15 L65 42 Z" fill="#01579B" />
        <path d="M45 58 L32 85 L48 85 L65 58 Z" fill="#01579B" />
        <path d="M12 50 L5 30 L16 30 L22 50 Z" fill="#0277BD" />
        <circle cx="80" cy="50" r="3" fill="#FFFFFF" />
        <circle cx="70" cy="50" r="2.5" fill="#E1F5FE" />
        <circle cx="60" cy="50" r="2.5" fill="#E1F5FE" />
      </svg>
    );
  }

  if (normalized.includes('astronaut')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <circle cx="50" cy="40" r="24" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />
        <ellipse cx="50" cy="38" rx="16" ry="12" fill="#29B6F6" />
        <ellipse cx="46" cy="35" rx="10" ry="6" fill="#B3E5FC" opacity="0.7" />
        <path d="M28 62 C28 55 72 55 72 62 L76 90 L24 90 Z" fill="#CFD8DC" />
        <circle cx="50" cy="72" r="5" fill="#FF5252" />
      </svg>
    );
  }

  if (normalized.includes('bear')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <circle cx="30" cy="30" r="14" fill="#795548" />
        <circle cx="70" cy="30" r="14" fill="#795548" />
        <circle cx="30" cy="30" r="8" fill="#D7CCC8" />
        <circle cx="70" cy="30" r="8" fill="#D7CCC8" />
        <circle cx="50" cy="55" r="32" fill="#8D6E63" />
        <ellipse cx="50" cy="63" rx="18" ry="14" fill="#D7CCC8" />
        <ellipse cx="50" cy="58" rx="8" ry="5" fill="#3E2723" />
        <circle cx="38" cy="46" r="3.5" fill="#212121" />
        <circle cx="62" cy="46" r="3.5" fill="#212121" />
      </svg>
    );
  }

  if (normalized.includes('ball')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <circle cx="50" cy="50" r="38" fill="#FF7043" />
        <path d="M12 50 A38 38 0 0 1 88 50" stroke="#FFFFFF" strokeWidth="4" fill="none" />
        <path d="M50 12 A38 38 0 0 1 50 88" stroke="#FFFFFF" strokeWidth="4" fill="none" />
        <path d="M23 23 Q50 50 77 77" stroke="#FFFFFF" strokeWidth="3" fill="none" />
      </svg>
    );
  }

  if (normalized.includes('butterfly')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <path d="M50 45 C35 15 5 25 15 55 C22 65 42 58 50 55" fill="#FF4081" opacity="0.9" />
        <path d="M50 45 C65 15 95 25 85 55 C78 65 58 58 50 55" fill="#FF4081" opacity="0.9" />
        <path d="M50 55 C35 55 18 68 25 82 C32 90 48 75 50 62" fill="#FFD54F" />
        <path d="M50 55 C65 55 82 68 75 82 C68 90 52 75 50 62" fill="#FFD54F" />
        <ellipse cx="50" cy="55" rx="4" ry="20" fill="#37474F" />
        <circle cx="50" cy="32" r="5" fill="#37474F" />
      </svg>
    );
  }

  if (normalized.includes('banana')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <path d="M25 80 C20 40 45 15 80 18 C72 32 50 50 45 82 C38 84 30 84 25 80 Z" fill="#FDD835" />
        <path d="M78 18 L84 14 C85 13 88 15 86 18 L80 20 Z" fill="#558B2F" />
        <path d="M25 80 L20 86 L25 88 Z" fill="#795548" />
      </svg>
    );
  }

  if (normalized.includes('cat')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <polygon points="25,38 18,12 42,26" fill="#FFA726" />
        <polygon points="75,38 82,12 58,26" fill="#FFA726" />
        <polygon points="26,34 22,18 38,27" fill="#FFCC80" />
        <polygon points="74,34 78,18 62,27" fill="#FFCC80" />
        <circle cx="50" cy="55" r="32" fill="#FB8C00" />
        <ellipse cx="38" cy="50" rx="4.5" ry="6" fill="#2E7D32" />
        <ellipse cx="62" cy="50" rx="4.5" ry="6" fill="#2E7D32" />
        <circle cx="38" cy="49" r="2" fill="#000000" />
        <circle cx="62" cy="49" r="2" fill="#000000" />
        <polygon points="50,62 46,58 54,58" fill="#E91E63" />
        <path d="M46 65 Q50 69 54 65" stroke="#424242" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  if (normalized.includes('car')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <path d="M12 55 L25 35 Q30 32 40 32 L68 32 Q76 32 82 42 L92 52 Q95 56 95 62 L95 70 Q95 74 90 74 L84 74 A12 12 0 0 1 60 74 L40 74 A12 12 0 0 1 16 74 L10 74 Q5 74 5 68 L5 62 Q5 55 12 55 Z" fill="#E53935" />
        <path d="M28 38 L48 38 L48 52 L20 52 Z" fill="#E1F5FE" />
        <path d="M54 38 L72 38 L78 52 L54 52 Z" fill="#E1F5FE" />
        <circle cx="28" cy="74" r="10" fill="#212121" />
        <circle cx="28" cy="74" r="4" fill="#B0BEC5" />
        <circle cx="72" cy="74" r="10" fill="#212121" />
        <circle cx="72" cy="74" r="4" fill="#B0BEC5" />
      </svg>
    );
  }

  if (normalized.includes('dog')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <ellipse cx="22" cy="48" rx="8" ry="20" fill="#8D6E63" transform="rotate(-15 22 48)" />
        <ellipse cx="78" cy="48" rx="8" ry="20" fill="#8D6E63" transform="rotate(15 78 48)" />
        <circle cx="50" cy="52" r="30" fill="#A1887F" />
        <ellipse cx="50" cy="63" rx="14" ry="10" fill="#D7CCC8" />
        <ellipse cx="50" cy="59" rx="6" ry="4" fill="#3E2723" />
        <circle cx="38" cy="46" r="3.5" fill="#212121" />
        <circle cx="62" cy="46" r="3.5" fill="#212121" />
        <path d="M48 68 C48 76 52 76 52 68" stroke="#D81B60" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes('fish')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <path d="M85 50 C65 25 30 30 15 50 C30 70 65 75 85 50 Z" fill="#FF9800" />
        <polygon points="18,50 5,30 5,70" fill="#F57C00" />
        <circle cx="70" cy="45" r="4" fill="#212121" />
        <circle cx="71" cy="44" r="1.5" fill="#FFFFFF" />
        <path d="M50 35 Q40 50 50 65" stroke="#FFFFFF" strokeWidth="3" fill="none" />
      </svg>
    );
  }

  if (normalized.includes('sun')) {
    return (
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 drop-shadow-md">
        <circle cx="50" cy="50" r="24" fill="#FDD835" />
        <g stroke="#FBC02D" strokeWidth="4" strokeLinecap="round">
          <line x1="50" y1="12" x2="50" y2="20" />
          <line x1="50" y1="80" x2="50" y2="88" />
          <line x1="12" y1="50" x2="20" y2="50" />
          <line x1="80" y1="50" x2="88" y2="50" />
          <line x1="23" y1="23" x2="29" y2="29" />
          <line x1="71" y1="71" x2="77" y2="77" />
          <line x1="23" y1="77" x2="29" y2="71" />
          <line x1="71" y1="29" x2="77" y2="23" />
        </g>
      </svg>
    );
  }

  // Generative high-vibrancy visual fallback for any word
  return (
    <div className="flex flex-col items-center justify-center text-center p-2">
      <span className="text-6xl sm:text-7xl md:text-8xl drop-shadow-md select-none">
        {getWordEmoji(word)}
      </span>
    </div>
  );
};

// Rich emoji mapping for instant authentic fallback
const getWordEmoji = (word: string): string => {
  const map: Record<string, string> = {
    apple: '🍎',
    ant: '🐜',
    airplane: '✈️',
    astronaut: '👨‍🚀',
    bear: '🐻',
    ball: '⚽',
    butterfly: '🦋',
    banana: '🍌',
    cat: '🐱',
    car: '🚗',
    cake: '🎂',
    cloud: '☁️',
    dog: '🐶',
    duck: '🦆',
    dolphin: '🐬',
    drum: '🥁',
    elephant: '🐘',
    egg: '🥚',
    eagle: '🦅',
    earth: '🌍',
    fish: '🐟',
    frog: '🐸',
    flower: '🌸',
    fox: '🦊',
    giraffe: '🦒',
    grapes: '🍇',
    goat: '🐐',
    guitar: '🎸',
    horse: '🐴',
    house: '🏡',
    hat: '👒',
    hippo: '🦛',
    'ice cream': '🍦',
    icecream: '🍦',
    igloo: '🏔️',
    iguana: '🦎',
    island: '🏝️',
    jellyfish: '🪼',
    juice: '🧃',
    jump: '🦘',
    jaguar: '🐆',
    kangaroo: '🦘',
    kite: '🪁',
    koala: '🐨',
    king: '👑',
    lion: '🦁',
    lemon: '🍋',
    leaf: '🍃',
    lamp: '💡',
    monkey: '🐵',
    moon: '🌙',
    milk: '🥛',
    mouse: '🐭',
    nest: '🪺',
    notebook: '📓',
    nose: '👃',
    nurse: '👩‍⚕️',
    orange: '🍊',
    owl: '🦉',
    octopus: '🐙',
    ocean: '🌊',
    penguin: '🐧',
    panda: '🐼',
    piano: '🎹',
    pizza: '🍕',
    queen: '👸',
    quilt: '🧵',
    quokka: '🦘',
    quartz: '💎',
    rabbit: '🐰',
    rocket: '🚀',
    rainbow: '🌈',
    robot: '🤖',
    sun: '☀️',
    snake: '🐍',
    star: '⭐',
    ship: '🚢',
    tiger: '🐯',
    train: '🚂',
    tree: '🌳',
    turtle: '🐢',
    umbrella: '☂️',
    unicorn: '🦄',
    urchin: '🐡',
    utensils: '🍴',
    van: '🚐',
    violin: '🎻',
    vase: '🏺',
    volcano: '🌋',
    whale: '🐋',
    water: '💧',
    watch: '⌚',
    wolf: '🐺',
    xylophone: '🎼',
    'x-ray': '🩻',
    'x-mas': '🎄',
    xerus: '🐿️',
    yak: '🐂',
    yacht: '⛵',
    yellow: '💛',
    yogurt: '🥣',
    zebra: '🦓',
    zoo: '🦁',
    zipper: '🤐',
    zucchini: '🥒',
    peacock: '🦚',
    parrot: '🦜',
    flamingo: '🦩',
    toucan: '🦜',
    swan: '🦢',
    deer: '🦌',
    papaya: '🍈',
    pomegranate: '🍎',
    kiwi: '🥝',
    blueberry: '🫐',
    coconut: '🥥',
    pear: '🍐',
    okra: '🌱',
    eggplant: '🍆',
    cauliflower: '🥦',
    spinach: '🥬',
    coriander: '🌿',
    mint: '🌱',
    ginger: '🫚',
    garlic: '🧄',
    onion: '🧅',
    capsicum: '🫑',
    beetroot: '🥔',
    radish: '🥕',
  };

  const clean = word.toLowerCase().trim();
  return map[clean] || '🌟';
};

export const ItemFallbackVisual: React.FC<ItemFallbackVisualProps> = ({ word, className = '' }) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/90 via-sky-50/80 to-pink-50/90 ${className}`}>
      {getFallbackIcon(word)}
    </div>
  );
};

export default ItemFallbackVisual;
