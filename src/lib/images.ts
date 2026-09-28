import { Item } from '../types';

// High-fidelity SVG item illustrations styled to match the mockups cleanly
const ITEM_SVGS: Record<string, string> = {
  'black-wallet': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bw-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%232c3038"/>
        <stop offset="60%" stop-color="%231a1d22"/>
        <stop offset="100%" stop-color="%23101216"/>
      </linearGradient>
      <linearGradient id="bw-sheen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="%23ffffff" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="%23000000" stop-opacity="0.4"/>
      </linearGradient>
      <filter id="bw-shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="%230F2A5C" flood-opacity="0.2"/>
      </filter>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g filter="url(%23bw-shadow)" transform="translate(30, 36)">
      <rect x="0" y="0" width="140" height="116" rx="14" fill="url(%23bw-grad)"/>
      <rect x="0" y="0" width="140" height="116" rx="14" fill="url(%23bw-sheen)"/>
      <rect x="3" y="3" width="134" height="110" rx="11" fill="none" stroke="%233a3f4a" stroke-width="1.5" stroke-dasharray="4,2"/>
      <path d="M 0 58 Q 70 60 140 58" stroke="%2314161a" stroke-width="2" fill="none"/>
      <!-- Brand badge / metal plate -->
      <rect x="96" y="74" width="28" height="18" rx="3" fill="%2322252b" stroke="%233f4450" stroke-width="1"/>
      <line x1="100" y1="83" x2="120" y2="83" stroke="%23555c6e" stroke-width="2"/>
    </g>
  </svg>`,

  'black-wallet-inside': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bw-in" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%2322262d"/>
        <stop offset="100%" stop-color="%23121418"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g transform="translate(25, 40)">
      <rect x="0" y="0" width="150" height="110" rx="10" fill="url(%23bw-in)" stroke="%23343a46" stroke-width="2"/>
      <line x1="75" y1="0" x2="75" y2="110" stroke="%230c0e11" stroke-width="3"/>
      <!-- Card slots left -->
      <rect x="10" y="20" width="55" height="16" rx="3" fill="%23383f4c"/>
      <rect x="10" y="44" width="55" height="16" rx="3" fill="%232f3540"/>
      <rect x="10" y="68" width="55" height="28" rx="3" fill="%23262b33" stroke="%2350596b" stroke-dasharray="2,2"/>
      <!-- Card slots right -->
      <rect x="85" y="20" width="55" height="16" rx="3" fill="%23e8ecf4"/>
      <rect x="85" y="44" width="55" height="16" rx="3" fill="%23383f4c"/>
      <rect x="85" y="68" width="55" height="28" rx="3" fill="%232f3540"/>
    </g>
  </svg>`,

  'black-wallet-slim': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bw-slim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="%231a1c22"/>
        <stop offset="50%" stop-color="%23323842"/>
        <stop offset="100%" stop-color="%2316181d"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g transform="translate(30, 75)">
      <rect x="0" y="0" width="140" height="50" rx="8" fill="url(%23bw-slim)" stroke="%23434b58" stroke-width="1.5"/>
      <line x1="0" y1="25" x2="140" y2="25" stroke="%23c5a059" stroke-width="2" stroke-dasharray="3,2"/>
      <circle cx="15" cy="25" r="4" fill="%23c5a059"/>
    </g>
  </svg>`,

  'brown-wallet': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="brw-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%236e4028"/>
        <stop offset="70%" stop-color="%23482512"/>
        <stop offset="100%" stop-color="%2332190c"/>
      </linearGradient>
      <filter id="brw-shadow">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="%2332190c" flood-opacity="0.3"/>
      </filter>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g filter="url(%23brw-shadow)" transform="translate(30, 36)">
      <rect x="0" y="0" width="140" height="116" rx="14" fill="url(%23brw-grad)"/>
      <rect x="4" y="4" width="132" height="108" rx="10" fill="none" stroke="%238a5335" stroke-width="1.5" stroke-dasharray="4,2"/>
      <path d="M 0 58 Q 70 60 140 58" stroke="%232b1408" stroke-width="2" fill="none"/>
      <rect x="96" y="74" width="28" height="18" rx="3" fill="%23452414" stroke="%238a5335" stroke-width="1"/>
      <line x1="102" y1="83" x2="118" y2="83" stroke="%23c58b66" stroke-width="2"/>
    </g>
  </svg>`,

  'ladies-wallet': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="lw-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%232b2e36"/>
        <stop offset="100%" stop-color="%23111317"/>
      </linearGradient>
      <filter id="lw-shadow">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="%230F2A5C" flood-opacity="0.2"/>
      </filter>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g filter="url(%23lw-shadow)" transform="translate(35, 35)">
      <rect x="0" y="0" width="130" height="120" rx="16" fill="url(%23lw-grad)"/>
      <!-- Zip pull -->
      <path d="M 12 0 L 12 25 L 24 25 L 24 0" fill="%23d4af37" stroke="%23b38f24" stroke-width="1"/>
      <circle cx="18" cy="30" r="5" fill="%23d4af37"/>
      <rect x="4" y="4" width="122" height="112" rx="12" fill="none" stroke="%23404552" stroke-width="1.5" stroke-dasharray="3,2"/>
    </g>
  </svg>`,

  'white-earphones': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="ep-case" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%23ffffff"/>
        <stop offset="70%" stop-color="%23f0f4fa"/>
        <stop offset="100%" stop-color="%23dce4f0"/>
      </linearGradient>
      <filter id="ep-shadow">
        <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="%235B7BFA" flood-opacity="0.18"/>
      </filter>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g filter="url(%23ep-shadow)" transform="translate(56, 30)">
      <!-- Left earbud -->
      <g transform="translate(14, 0)">
        <ellipse cx="14" cy="18" rx="10" ry="12" fill="%23ffffff" stroke="%23d2dbe8" stroke-width="1.5"/>
        <circle cx="16" cy="18" r="4.5" fill="%231a202c"/>
        <rect x="10" y="26" width="7" height="34" rx="3.5" fill="%23f8faff" stroke="%23d2dbe8" stroke-width="1"/>
      </g>
      <!-- Right earbud -->
      <g transform="translate(46, 0)">
        <ellipse cx="14" cy="18" rx="10" ry="12" fill="%23ffffff" stroke="%23d2dbe8" stroke-width="1.5"/>
        <circle cx="12" cy="18" r="4.5" fill="%231a202c"/>
        <rect x="11" y="26" width="7" height="34" rx="3.5" fill="%23f8faff" stroke="%23d2dbe8" stroke-width="1"/>
      </g>
      <!-- Case body -->
      <rect x="0" y="48" width="88" height="96" rx="28" fill="url(%23ep-case)" stroke="%23e2e8f0" stroke-width="1.5"/>
      <!-- Case status LED -->
      <circle cx="44" cy="65" r="2.5" fill="%2352c41a"/>
      <!-- Case seam -->
      <line x1="4" y1="52" x2="84" y2="52" stroke="%23d0d8e6" stroke-width="1"/>
    </g>
  </svg>`,

  'blue-backpack': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bp-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%23305494"/>
        <stop offset="100%" stop-color="%231c3360"/>
      </linearGradient>
      <filter id="bp-shadow">
        <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="%231c3360" flood-opacity="0.25"/>
      </filter>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g filter="url(%23bp-shadow)" transform="translate(42, 28)">
      <!-- Top handle -->
      <path d="M 40 20 A 18 18 0 0 1 76 20" fill="none" stroke="%23162648" stroke-width="5" stroke-linecap="round"/>
      <!-- Main body -->
      <path d="M 12 50 C 12 25, 104 25, 104 50 L 112 128 C 112 138, 102 144, 90 144 L 26 144 C 14 144, 4 138, 4 128 Z" fill="url(%23bp-grad)"/>
      <!-- Front pocket -->
      <rect x="18" y="76" width="80" height="56" rx="14" fill="%23244278" stroke="%23416cb8" stroke-width="1.5"/>
      <!-- Zipper lines -->
      <line x1="28" y1="92" x2="88" y2="92" stroke="%23caa15d" stroke-width="2.5"/>
      <!-- Badge -->
      <circle cx="58" cy="54" r="8" fill="%23d6a555"/>
      <path d="M 54 54 L 62 54" stroke="%231c3360" stroke-width="1.5"/>
    </g>
  </svg>`,

  'student-id': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="id-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%23ffffff"/>
        <stop offset="100%" stop-color="%23f2f6fc"/>
      </linearGradient>
      <filter id="id-shadow">
        <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="%235B7BFA" flood-opacity="0.16"/>
      </filter>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g filter="url(%23id-shadow)" transform="translate(34, 38) rotate(-4 65 65)">
      <!-- Lanyard strap -->
      <path d="M 66 -16 L 66 10" stroke="%231a284a" stroke-width="6"/>
      <rect x="58" y="6" width="16" height="8" rx="2" fill="%23a0aec0"/>
      <!-- Card -->
      <rect x="0" y="14" width="132" height="96" rx="8" fill="url(%23id-grad)" stroke="%23d6e2f0" stroke-width="1.5"/>
      <!-- Top banner -->
      <rect x="0" y="14" width="132" height="18" rx="8" fill="%232b4ea2"/>
      <rect x="0" y="24" width="132" height="8" fill="%232b4ea2"/>
      <circle cx="16" cy="23" r="5" fill="%23ffffff"/>
      <!-- Photo box -->
      <rect x="12" y="38" width="34" height="42" rx="4" fill="%233b82f6"/>
      <circle cx="29" cy="52" r="8" fill="%23fed7aa"/>
      <path d="M 17 78 C 17 68, 41 68, 41 78 Z" fill="%231e3a8a"/>
      <!-- Text lines -->
      <line x1="54" y1="44" x2="118" y2="44" stroke="%230f2a5c" stroke-width="3"/>
      <line x1="54" y1="54" x2="110" y2="54" stroke="%2364748b" stroke-width="2"/>
      <line x1="54" y1="64" x2="98" y2="64" stroke="%2394a3b8" stroke-width="2"/>
      <line x1="54" y1="74" x2="114" y2="74" stroke="%23cbd5e1" stroke-width="2"/>
    </g>
  </svg>`,

  'water-bottle': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="wb-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="%237cb1d4"/>
        <stop offset="35%" stop-color="%23b8def5"/>
        <stop offset="100%" stop-color="%236a9fc2"/>
      </linearGradient>
      <filter id="wb-shadow">
        <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="%236a9fc2" flood-opacity="0.25"/>
      </filter>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g filter="url(%23wb-shadow)" transform="translate(76, 26)">
      <!-- Loop handle -->
      <path d="M 12 18 A 12 12 0 0 1 36 18" fill="none" stroke="%23222d3d" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Black cap -->
      <rect x="10" y="18" width="28" height="14" rx="4" fill="%23222d3d"/>
      <!-- Neck -->
      <rect x="14" y="32" width="20" height="8" rx="2" fill="%2384b6d6"/>
      <!-- Bottle main -->
      <path d="M 6 48 C 6 40, 42 40, 42 48 L 44 142 C 44 147, 40 150, 36 150 L 12 150 C 8 150, 4 147, 4 142 Z" fill="url(%23wb-grad)"/>
      <!-- Subtle sticker accent -->
      <rect x="16" y="80" width="16" height="16" rx="4" fill="%23ffffff" opacity="0.8"/>
      <circle cx="24" cy="88" r="4" fill="%23222d3d"/>
    </g>
  </svg>`,

  'books': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bk-blue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%232a3d66"/>
        <stop offset="100%" stop-color="%2316223b"/>
      </linearGradient>
      <linearGradient id="bk-beige" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%23dfd4bc"/>
        <stop offset="100%" stop-color="%23c4b699"/>
      </linearGradient>
      <filter id="bk-shadow">
        <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="%230F2A5C" flood-opacity="0.2"/>
      </filter>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g filter="url(%23bk-shadow)" transform="translate(42, 34)">
      <!-- Bottom beige book -->
      <g transform="translate(0, 20) rotate(-6 50 50)">
        <rect x="0" y="0" width="86" height="106" rx="5" fill="url(%23bk-beige)" stroke="%23b0a283" stroke-width="1.5"/>
        <rect x="80" y="4" width="8" height="98" fill="%23faf8f2"/>
        <line x1="16" y1="0" x2="16" y2="106" stroke="%239c8f74" stroke-width="2"/>
      </g>
      <!-- Top dark blue textbook -->
      <g transform="translate(18, 0) rotate(4 50 50)">
        <rect x="0" y="0" width="86" height="106" rx="5" fill="url(%23bk-blue)" stroke="%23435b8f" stroke-width="1.5"/>
        <rect x="80" y="4" width="8" height="98" fill="%23faf8f2"/>
        <line x1="16" y1="0" x2="16" y2="106" stroke="%23131c30" stroke-width="2.5"/>
        <rect x="28" y="24" width="42" height="16" rx="2" fill="%23ffffff" opacity="0.15"/>
      </g>
    </g>
  </svg>`,

  'keys': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="key-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%23e2be6d"/>
        <stop offset="100%" stop-color="%23aa8334"/>
      </linearGradient>
      <linearGradient id="key-silver" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%23e2e8f0"/>
        <stop offset="100%" stop-color="%2394a3b8"/>
      </linearGradient>
      <filter id="key-shadow">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="%230F2A5C" flood-opacity="0.2"/>
      </filter>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g filter="url(%23key-shadow)" transform="translate(50, 36)">
      <!-- Keyring -->
      <circle cx="50" cy="30" r="24" fill="none" stroke="%23475569" stroke-width="5"/>
      <!-- Blue keychain tag -->
      <rect x="18" y="18" width="16" height="24" rx="4" fill="%233b82f6" transform="rotate(-20 26 30)"/>
      <!-- Key 1 -->
      <g transform="translate(30, 40) rotate(35 15 15)">
        <circle cx="15" cy="15" r="14" fill="url(%23key-silver)"/>
        <circle cx="15" cy="15" r="5" fill="%23334155"/>
        <rect x="12" y="27" width="7" height="42" fill="url(%23key-silver)"/>
        <rect x="19" y="52" width="6" height="5" fill="url(%23key-silver)"/>
        <rect x="19" y="62" width="5" height="5" fill="url(%23key-silver)"/>
      </g>
      <!-- Key 2 -->
      <g transform="translate(48, 38) rotate(60 15 15)">
        <circle cx="15" cy="15" r="14" fill="url(%23key-gold)"/>
        <circle cx="15" cy="15" r="5" fill="%23553c0a"/>
        <rect x="12" y="27" width="7" height="46" fill="url(%23key-gold)"/>
        <rect x="19" y="55" width="7" height="5" fill="url(%23key-gold)"/>
        <rect x="19" y="65" width="5" height="5" fill="url(%23key-gold)"/>
      </g>
    </g>
  </svg>`,

  'mobile-phone': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="ph-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="%233a3d45"/>
        <stop offset="100%" stop-color="%231e2025"/>
      </linearGradient>
      <filter id="ph-shadow">
        <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="%230F2A5C" flood-opacity="0.22"/>
      </filter>
    </defs>
    <rect width="200" height="200" fill="%23F3F7FD" rx="20"/>
    <g filter="url(%23ph-shadow)" transform="translate(60, 26)">
      <!-- Phone chassis -->
      <rect x="0" y="0" width="80" height="148" rx="18" fill="url(%23ph-body)" stroke="%235a606d" stroke-width="1.5"/>
      <!-- Camera bump -->
      <rect x="8" y="10" width="34" height="36" rx="10" fill="%232b2d33" stroke="%23434752" stroke-width="1"/>
      <circle cx="18" cy="20" r="5.5" fill="%23111317" stroke="%23505562" stroke-width="1"/>
      <circle cx="18" cy="35" r="5.5" fill="%23111317" stroke="%23505562" stroke-width="1"/>
      <circle cx="31" cy="27" r="5.5" fill="%23111317" stroke="%23505562" stroke-width="1"/>
      <circle cx="32" cy="16" r="2" fill="%23e2e8f0"/>
      <!-- Apple-like subtle logo silhouette -->
      <circle cx="40" cy="74" r="7" fill="%2325272c"/>
    </g>
  </svg>`
};

export function getItemImage(item: Item): string {
  if (item.images && item.images.length > 0) {
    return item.images[0];
  }

  const name = item.name.toLowerCase();

  if (name.includes('earphone') || name.includes('airpod') || name.includes('earbud')) {
    return ITEM_SVGS['white-earphones'];
  }
  if (name.includes('backpack') || name.includes('bag')) {
    return ITEM_SVGS['blue-backpack'];
  }
  if (name.includes('student id card') || (name.includes('id') && !name.includes('wallet'))) {
    return ITEM_SVGS['student-id'];
  }
  if (name.includes('water bottle') || name.includes('bottle') || name.includes('flask')) {
    return ITEM_SVGS['water-bottle'];
  }
  if (name.includes('book') || name.includes('textbook') || name.includes('notebook')) {
    return ITEM_SVGS['books'];
  }
  if (name.includes('key')) {
    return ITEM_SVGS['keys'];
  }
  if (name.includes('phone') || name.includes('iphone') || name.includes('mobile')) {
    return ITEM_SVGS['mobile-phone'];
  }
  if (name.includes('brown wallet')) {
    return ITEM_SVGS['brown-wallet'];
  }
  if (name.includes('ladies wallet')) {
    return ITEM_SVGS['ladies-wallet'];
  }
  if (name.includes('student id wallet')) {
    return ITEM_SVGS['black-wallet'];
  }
  if (name.includes('wallet') || name.includes('purse')) {
    return ITEM_SVGS['black-wallet'];
  }

  // Fallback by category
  if (item.category === 'Electronics') return ITEM_SVGS['white-earphones'];
  if (item.category === 'Bags') return ITEM_SVGS['blue-backpack'];
  if (item.category === 'Documents') return ITEM_SVGS['student-id'];
  if (item.category === 'Books') return ITEM_SVGS['books'];
  if (item.category === 'Accessories') return ITEM_SVGS['black-wallet'];

  return ITEM_SVGS['water-bottle'];
}

export function getItemGallery(item: Item): string[] {
  const primary = getItemImage(item);
  const name = item.name.toLowerCase();

  if (name.includes('black wallet')) {
    return [
      ITEM_SVGS['black-wallet'],
      ITEM_SVGS['black-wallet-inside'],
      ITEM_SVGS['black-wallet-slim']
    ];
  }

  return [primary];
}
