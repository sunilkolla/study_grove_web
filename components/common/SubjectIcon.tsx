import React from 'react';

export type SubjectIconType =
  | 'PHYSICS'
  | 'CHEMISTRY'
  | 'BIOLOGY'
  | 'MATHS'
  | 'COMPUTER_SCIENCE'
  | 'ENGLISH'
  | 'ENGLISH_LANGUAGE'
  | 'ENGLISH_LITERATURE'
  | 'GEOGRAPHY'
  | 'HISTORY'
  | 'COMBINED_SCIENCE';

interface SubjectIconProps {
  subject: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * 1. Physics: Optical crystal prism with refractive purple/pink beam & yellow sparkles
 */
export const PhysicsIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 48,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Soft Circular Backdrop */}
    <circle cx="32" cy="32" r="30" fill="#FFF4D6" stroke="#FDE68A" strokeWidth="2" />
    {/* Glow & Radiance */}
    <circle cx="32" cy="32" r="24" fill="#FEF3C7" opacity="0.6" />
    
    {/* Crystal Prism Base - Faceted Geometry */}
    <path
      d="M28 16L39 26L31 48L21 38L28 16Z"
      fill="#F3E8FF"
      stroke="#4C1D95"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Crystal facets */}
    <path
      d="M28 16L31 48M39 26L21 38"
      stroke="#6D28D9"
      strokeWidth="2"
      strokeLinejoin="round"
      opacity="0.8"
    />
    <path
      d="M28 16L24 28L31 48"
      fill="#E9D5FF"
      stroke="#7C3AED"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Radiant Light Beam Refraction */}
    <path
      d="M33 30L49 18M34 34L51 32M32 38L48 44"
      stroke="#F43F5E"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M33 30L49 20"
      stroke="#FB7185"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M34 34L52 35"
      stroke="#F59E0B"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Whimsical Energy Sparkles */}
    <path
      d="M45 13L46 16L49 17L46 18L45 21L44 18L41 17L44 16L45 13Z"
      fill="#FBBF24"
    />
    <path
      d="M17 22L18 24L20 25L18 26L17 28L16 26L14 25L16 24L17 22Z"
      fill="#C084FC"
    />
    <circle cx="48" cy="46" r="2" fill="#F43F5E" />
    <circle cx="16" cy="38" r="1.5" fill="#F59E0B" />
  </svg>
);

/**
 * 2. Chemistry: Round Erlenmeyer flask with turquoise elixir and soft vapor clouds
 */
export const ChemistryIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 48,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Soft Circular Backdrop */}
    <circle cx="32" cy="32" r="30" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="2" />

    {/* Bubbly Chemical Vapor Cloud rising from neck */}
    <path
      d="M26 18C24 16 25 12 28 11C29 9 33 8 35 10C37 8 41 9 41 12C43 14 41 17 38 18C39 20 37 22 34 21C31 22 28 21 26 18Z"
      fill="#CCFBF1"
      stroke="#14B8A6"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />

    {/* Glass Flask Body */}
    <path
      d="M28 20V25L18 42C16 46 19 50 24 50H40C45 50 48 46 46 42L36 25V20H28Z"
      fill="white"
      stroke="#0F766E"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Flask Lip */}
    <rect
      x="26"
      y="18"
      width="12"
      height="3.5"
      rx="1.5"
      fill="#E6FFFA"
      stroke="#0F766E"
      strokeWidth="2"
    />

    {/* Potion Liquid Fill (Turquoise/Teal) */}
    <path
      d="M20 40L23.5 34C25 35 27 34 30 35C33 36 36 34 39 35L44 40C45 42 44.5 48 40 48H24C19.5 48 19 42 20 40Z"
      fill="#2DD4BF"
    />
    <path
      d="M23 42C26 43 31 41 35 43C38 44 41 43 43 44"
      stroke="#14B8A6"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Liquid highlight & bubbles */}
    <circle cx="27" cy="43" r="2" fill="white" opacity="0.8" />
    <circle cx="35" cy="39" r="1.5" fill="white" opacity="0.8" />
    <circle cx="33" cy="45" r="1.2" fill="white" opacity="0.7" />
    <circle cx="31" cy="27" r="1.8" fill="#5EEAD4" />
  </svg>
);

/**
 * 3. Biology: Terracotta plant pot with two vibrant green leaves sprouting
 */
export const BiologyIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 48,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Soft Circular Backdrop */}
    <circle cx="32" cy="32" r="30" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="2" />

    {/* Left Sprout Leaf */}
    <path
      d="M32 34C27 32 19 28 20 19C28 17 32 26 32 34Z"
      fill="#4ADE80"
      stroke="#15803D"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M21 21C26 25 30 31 31 33"
      stroke="#166534"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Right Sprout Leaf (Bigger) */}
    <path
      d="M32 34C36 30 45 23 43 14C33 13 30 24 32 34Z"
      fill="#22C55E"
      stroke="#15803D"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M42 16C38 22 34 28 32 33"
      stroke="#166534"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Center Tiny Leaf Sprout */}
    <path
      d="M32 26C31 22 32 18 34 17C35 20 34 24 32 26Z"
      fill="#86EFAC"
      stroke="#15803D"
      strokeWidth="1.2"
    />

    {/* Soil Mound */}
    <ellipse cx="32" cy="36" rx="14" ry="4" fill="#78350F" />

    {/* Terracotta Plant Pot */}
    {/* Rim */}
    <rect
      x="17"
      y="34"
      width="30"
      height="6"
      rx="3"
      fill="#FDBA74"
      stroke="#C2410C"
      strokeWidth="2.2"
    />
    {/* Base */}
    <path
      d="M20 40L23 52C23.5 54 25 55 27 55H37C39 55 40.5 54 41 52L44 40H20Z"
      fill="#FB923C"
      stroke="#C2410C"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Pot Shadow Highlight */}
    <path
      d="M23 42L25 51C25.5 53 26 53.5 28 53.5"
      stroke="#FED7AA"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 4. Maths: Wooden abacus soroban with coral/pink counting beads on rods
 */
export const MathsIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 48,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Soft Circular Backdrop */}
    <circle cx="32" cy="32" r="30" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="2" />

    {/* Abacus Wooden Frame */}
    <rect
      x="16"
      y="18"
      width="32"
      height="30"
      rx="4"
      fill="#FED7AA"
      stroke="#9A3412"
      strokeWidth="2.5"
    />
    {/* Inner Divider Bar */}
    <line x1="16" y1="28" x2="48" y2="28" stroke="#9A3412" strokeWidth="2.2" />

    {/* Vertical Counting Rods */}
    <line x1="22" y1="19" x2="22" y2="47" stroke="#78350F" strokeWidth="1.6" />
    <line x1="28" y1="19" x2="28" y2="47" stroke="#78350F" strokeWidth="1.6" />
    <line x1="35" y1="19" x2="35" y2="47" stroke="#78350F" strokeWidth="1.6" />
    <line x1="42" y1="19" x2="42" y2="47" stroke="#78350F" strokeWidth="1.6" />

    {/* Top Row Coral Beads */}
    <ellipse cx="22" cy="23" rx="3.5" ry="2.2" fill="#FB7185" stroke="#BE123C" strokeWidth="1.2" />
    <ellipse cx="28" cy="25" rx="3.5" ry="2.2" fill="#FB7185" stroke="#BE123C" strokeWidth="1.2" />
    <ellipse cx="35" cy="23" rx="3.5" ry="2.2" fill="#FB7185" stroke="#BE123C" strokeWidth="1.2" />
    <ellipse cx="42" cy="25" rx="3.5" ry="2.2" fill="#FB7185" stroke="#BE123C" strokeWidth="1.2" />

    {/* Bottom Rows Counting Beads (Warm Coral/Pink) */}
    {/* Col 1 */}
    <ellipse cx="22" cy="33" rx="3.5" ry="2.2" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.2" />
    <ellipse cx="22" cy="38" rx="3.5" ry="2.2" fill="#FDA4AF" stroke="#BE123C" strokeWidth="1.2" />
    <ellipse cx="22" cy="43" rx="3.5" ry="2.2" fill="#FB7185" stroke="#BE123C" strokeWidth="1.2" />

    {/* Col 2 */}
    <ellipse cx="28" cy="35" rx="3.5" ry="2.2" fill="#FDA4AF" stroke="#BE123C" strokeWidth="1.2" />
    <ellipse cx="28" cy="40" rx="3.5" ry="2.2" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.2" />

    {/* Col 3 */}
    <ellipse cx="35" cy="32" rx="3.5" ry="2.2" fill="#FB7185" stroke="#BE123C" strokeWidth="1.2" />
    <ellipse cx="35" cy="37" rx="3.5" ry="2.2" fill="#FDA4AF" stroke="#BE123C" strokeWidth="1.2" />
    <ellipse cx="35" cy="42" rx="3.5" ry="2.2" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.2" />

    {/* Col 4 */}
    <ellipse cx="42" cy="36" rx="3.5" ry="2.2" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.2" />
    <ellipse cx="42" cy="41" rx="3.5" ry="2.2" fill="#FDA4AF" stroke="#BE123C" strokeWidth="1.2" />
  </svg>
);

/**
 * 5. Computer Science: Modern silver isometric open laptop with screen & trackpad
 */
export const ComputerScienceIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 48,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Soft Circular Backdrop */}
    <circle cx="32" cy="32" r="30" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />

    {/* Laptop Screen Lid (Open Angle) */}
    <path
      d="M20 20L44 18V36L20 38V20Z"
      fill="#E2E8F0"
      stroke="#334155"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Screen Display Glass */}
    <path
      d="M22 22L42 20.5V34L22 35.5V22Z"
      fill="#0F172A"
      stroke="#334155"
      strokeWidth="1"
    />
    {/* Screen Code Lines */}
    <line x1="24" y1="25" x2="34" y2="24" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="24" y1="28" x2="38" y2="27" stroke="#34D399" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="24" y1="31" x2="30" y2="30.2" stroke="#F472B6" strokeWidth="1.4" strokeLinecap="round" />

    {/* Laptop Base & Keyboard Deck */}
    <path
      d="M16 38L20 38L44 36L48 36L52 46C52.5 48 50 49 46 49H18C14 49 13.5 47 16 46L16 38Z"
      fill="#CBD5E1"
      stroke="#334155"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Trackpad */}
    <rect
      x="28"
      y="43"
      width="8"
      height="4"
      rx="1"
      fill="#94A3B8"
      stroke="#475569"
      strokeWidth="1"
    />
    {/* Keyboard subtle grid */}
    <path
      d="M20 39.5L44 37.5L46 42.5L18 44.5L20 39.5Z"
      fill="#475569"
      opacity="0.3"
    />
  </svg>
);

/**
 * 6. English: Folded manuscript parchment with quill pen and wax ribbon seal
 */
export const EnglishIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 48,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Soft Circular Backdrop */}
    <circle cx="32" cy="32" r="30" fill="#FFFBEB" stroke="#FEF3C7" strokeWidth="2" />

    {/* Parchment Scroll Sheet (Angled) */}
    <path
      d="M20 18L42 16C45 16 47 18 46 21L42 48C41.5 50.5 39 52 36 51.5L16 48C13.5 47.5 12 45 13 42L17 21C17.5 19 18.5 18 20 18Z"
      fill="#FEF9C3"
      stroke="#854D0E"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Dog-eared bottom-right fold */}
    <path
      d="M36 51.5L42 48L38 45L36 51.5Z"
      fill="#FDE047"
      stroke="#854D0E"
      strokeWidth="1.5"
    />

    {/* Written text lines on manuscript */}
    <line x1="20" y1="24" x2="38" y2="22.5" stroke="#A16207" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="19" y1="29" x2="35" y2="27.5" stroke="#A16207" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="18" y1="34" x2="33" y2="32.5" stroke="#A16207" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="17" y1="39" x2="28" y2="38" stroke="#A16207" strokeWidth="1.8" strokeLinecap="round" />

    {/* Blue Wax Ribbon Seal */}
    <circle cx="36" cy="40" r="4.5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.8" />
    <path d="M34 43L31 49L35 48L37 44" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1.2" />
    <path d="M37 43L40 48L37 47L35 44" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.2" />

    {/* Feather Quill Pen dipping ink */}
    <path
      d="M48 12C48 12 45 20 37 26L31 31L32 33L38 31C44 26 49 19 50 14L48 12Z"
      fill="#F8FAFC"
      stroke="#475569"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Quill spine */}
    <path d="M49 13L32 32" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
    {/* Ink tip */}
    <path d="M31 31L29 34L32 33Z" fill="#1E293B" />
  </svg>
);

/**
 * 7. Geography: Desktop globe on brass meridian stand with blue oceans & green continents
 */
export const GeographyIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 48,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Soft Circular Backdrop */}
    <circle cx="32" cy="32" r="30" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="2" />

    {/* Globe Ocean Circle */}
    <circle cx="32" cy="28" r="16" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.2" />
    {/* Continents (Emerald green) */}
    <path
      d="M22 25C23 21 27 20 30 22C32 23 31 27 28 28C26 29 23 28 22 25Z"
      fill="#4ADE80"
    />
    <path
      d="M33 21C36 19 40 21 42 24C41 27 37 28 35 26C33 24 32 22 33 21Z"
      fill="#4ADE80"
    />
    <path
      d="M26 34C28 32 33 33 34 37C32 40 28 41 26 38C25 36 25 35 26 34Z"
      fill="#22C55E"
    />
    <path
      d="M38 30C41 31 43 33 42 37C39 37 37 34 38 30Z"
      fill="#22C55E"
    />

    {/* Meridian Latitude / Longitude arc */}
    <ellipse cx="32" cy="28" rx="8" ry="15" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />

    {/* Arched Stand & Axis */}
    <path
      d="M18 28C18 36 24 43 32 43C37 43 41 40 44 36"
      stroke="#D97706"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <line x1="32" y1="10" x2="32" y2="13" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="43" x2="32" y2="47" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />

    {/* Brass Pedestal Base */}
    <path
      d="M24 53C24 50 28 47 32 47C36 47 40 50 40 53H24Z"
      fill="#F59E0B"
      stroke="#B45309"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 8. History: Ancient castle / hourglass
 */
export const HistoryIcon: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 48,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <circle cx="32" cy="32" r="30" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="2" />
    {/* Hourglass top & bottom wood plates */}
    <rect x="20" y="16" width="24" height="4" rx="2" fill="#92400E" stroke="#78350F" strokeWidth="1.8" />
    <rect x="20" y="44" width="24" height="4" rx="2" fill="#92400E" stroke="#78350F" strokeWidth="1.8" />
    {/* Glass bulb chambers */}
    <path
      d="M24 20L32 32L40 20H24Z"
      fill="#FEF08A"
      stroke="#78350F"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M24 44L32 32L40 44H24Z"
      fill="#FEF08A"
      stroke="#78350F"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Golden Sand */}
    <polygon points="26,22 38,22 32,30" fill="#F59E0B" />
    <polygon points="27,43 37,43 32,35" fill="#F59E0B" />
    <line x1="32" y1="30" x2="32" y2="35" stroke="#D97706" strokeWidth="1.5" strokeDasharray="1 1" />
  </svg>
);

/**
 * 9. Playful Scuba Monster Avatar (From Screenshot)
 */
export const ScubaMonsterAvatar: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 72,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Outer Clean Circular Ocean Bubble */}
    <circle cx="40" cy="40" r="38" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="2" />
    <circle cx="40" cy="40" r="32" fill="#BFDBFE" opacity="0.6" />

    {/* Monster Body: Cute turquoise smiling creature */}
    <ellipse cx="42" cy="42" rx="19" ry="17" fill="#2DD4BF" stroke="#0F766E" strokeWidth="2" />
    
    {/* Monster Tentacles/Fins at bottom */}
    <path
      d="M30 52C28 57 26 62 29 64C32 64 33 59 35 55"
      stroke="#0F766E"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="#2DD4BF"
    />
    <path
      d="M40 54C40 59 41 65 44 65C47 64 46 58 45 54"
      stroke="#0F766E"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="#2DD4BF"
    />
    <path
      d="M50 51C53 56 57 61 60 60C62 58 59 53 55 49"
      stroke="#0F766E"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="#2DD4BF"
    />

    {/* Monster Antenna / Stalk Eyes on Top */}
    <path d="M38 28V22" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M46 28V20" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="38" cy="20" r="4" fill="#A7F3D0" stroke="#0F766E" strokeWidth="2" />
    <circle cx="46" cy="19" r="4.5" fill="#A7F3D0" stroke="#0F766E" strokeWidth="2" />
    <circle cx="38" cy="20" r="1.5" fill="#0F766E" />
    <circle cx="46" cy="19" r="1.8" fill="#0F766E" />

    {/* Big Green/Yellow Diving Mask & Goggles */}
    <rect
      x="27"
      y="32"
      width="30"
      height="14"
      rx="7"
      fill="#BEF264"
      stroke="#4D7C0F"
      strokeWidth="2.5"
    />
    {/* Goggle Lens (Translucent Sky Blue) */}
    <rect
      x="30"
      y="34"
      width="24"
      height="10"
      rx="5"
      fill="#E0F2FE"
      stroke="#0369A1"
      strokeWidth="1.5"
    />
    {/* Big cartoon eyes behind lens */}
    <ellipse cx="37" cy="39" rx="3" ry="4" fill="#0F172A" />
    <ellipse cx="47" cy="39" rx="3" ry="4" fill="#0F172A" />
    <circle cx="36" cy="37.5" r="1.2" fill="white" />
    <circle cx="46" cy="37.5" r="1.2" fill="white" />

    {/* Mask Strap around back */}
    <path d="M27 39C24 39 23 40 23 40" stroke="#4D7C0F" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M57 39C60 39 61 40 61 40" stroke="#4D7C0F" strokeWidth="2.5" strokeLinecap="round" />

    {/* Scuba Snorkel Breathing Tube */}
    <path
      d="M33 46C31 48 25 48 24 44L23 24C23 20 26 17 30 18"
      stroke="#64748B"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M33 46C31 48 25 48 24 44L23 24C23 20 26 17 30 18"
      stroke="#F8FAFC"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="30" cy="18" r="2.2" fill="#EF4444" />

    {/* Water bubbles */}
    <circle cx="21" cy="28" r="2" fill="white" opacity="0.8" />
    <circle cx="19" cy="22" r="1.5" fill="white" opacity="0.8" />
    <circle cx="25" cy="14" r="2.2" fill="white" opacity="0.8" />
  </svg>
);

/**
 * 10. Cute Smiling Streak Flame Mascot (From Screenshot)
 */
export const StreakFlameMascot: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 48,
  className = '',
}) => (
  <svg
    width={sizePx}
    height={sizePx}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Flame Outer Contour */}
    <path
      d="M32 10C35 18 42 22 45 28C49 35 48 44 42 50C37 54 27 54 22 50C16 44 15 35 19 28C22 23 26 21 27 15C29 18 31 15 32 10Z"
      fill="url(#flame_grad)"
      stroke="#EA580C"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Inner Core */}
    <path
      d="M32 24C34 28 39 31 40 36C42 41 39 46 35 48C31 50 25 49 22 46C20 42 21 37 24 33C26 30 28 29 29 26C30 27 31 26 32 24Z"
      fill="#FEF08A"
    />

    {/* Cute Mascot Facial Features */}
    {/* Big smiling cartoon eyes */}
    <ellipse cx="28" cy="38" rx="2.5" ry="3.5" fill="#431407" />
    <ellipse cx="36" cy="38" rx="2.5" ry="3.5" fill="#431407" />
    <circle cx="27" cy="37" r="1.2" fill="white" />
    <circle cx="35" cy="37" r="1.2" fill="white" />

    {/* Rosy blush cheeks */}
    <circle cx="24" cy="41" r="2" fill="#FB7185" opacity="0.8" />
    <circle cx="40" cy="41" r="2" fill="#FB7185" opacity="0.8" />

    {/* Happy mouth */}
    <path
      d="M30 42C31.5 44 32.5 44 34 42"
      stroke="#431407"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    <defs>
      <linearGradient id="flame_grad" x1="32" y1="10" x2="32" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="0.6" stopColor="#F97316" />
        <stop offset="1" stopColor="#EF4444" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Universal Subject Icon Component
 * Maps any subject code or name to the handcrafted illustrated icon
 */
export const SubjectIcon: React.FC<SubjectIconProps> = ({
  subject,
  className = '',
  size = 'md',
}) => {
  const sizeMap: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
    sm: 32,
    md: 44,
    lg: 52,
    xl: 64,
  };
  const sizePx = sizeMap[size];

  const norm = (subject || '').toUpperCase().trim();

  if (norm.includes('PHYS') || norm === 'PHYSICS') {
    return <PhysicsIcon sizePx={sizePx} className={className} />;
  }
  if (norm.includes('CHEM') || norm === 'CHEMISTRY') {
    return <ChemistryIcon sizePx={sizePx} className={className} />;
  }
  if (norm.includes('BIO') || norm === 'BIOLOGY') {
    return <BiologyIcon sizePx={sizePx} className={className} />;
  }
  if (norm.includes('MATH') || norm === 'MATHS' || norm === 'MATHEMATICS') {
    return <MathsIcon sizePx={sizePx} className={className} />;
  }
  if (norm.includes('COMP') || norm.includes('CS') || norm === 'COMPUTER_SCIENCE') {
    return <ComputerScienceIcon sizePx={sizePx} className={className} />;
  }
  if (norm.includes('ENG') || norm.includes('LIT') || norm === 'ENGLISH') {
    return <EnglishIcon sizePx={sizePx} className={className} />;
  }
  if (norm.includes('GEO') || norm === 'GEOGRAPHY') {
    return <GeographyIcon sizePx={sizePx} className={className} />;
  }
  if (norm.includes('HIST') || norm === 'HISTORY') {
    return <HistoryIcon sizePx={sizePx} className={className} />;
  }

  // Fallback to Biology/Plant (StudyGrove default)
  return <BiologyIcon sizePx={sizePx} className={className} />;
};
