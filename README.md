# Campus Lost & Found

> A smart, secure web application designed to help campus students report lost or found belongings, automatically detect matches using **Smart Match**, and safely recover items through **Claim Verification**.

Built for Amity Hackathon following the 60-minute MVP product requirements document and pixel-accurate design mockups.

---

## 🚀 Key Features

### 1. Home / Dashboard (Mockup 1)
- **Airy Glassmorphism Theme**: Soft blue gradient canvas, backdrop blur effects, subtle card hover elevations, and handwritten script notes (`Caveat` font).
- **Hero & Live Stats**: Quick counters for *Reported items*, *Potential Matches*, and *Recovered items*.
- **Quick Status Filters**: One-tap toggle between **All**, **Lost** (red indicator), and **Found** (green indicator).
- **Recent Listings Grid**: Shows the 8 newest campus items with product thumbnail, category, location, formatted date (`27 Sep 2026`), description, and action button.
- **Pulsing New Listings**: Newly reported items appear at the top and pulse gently for visual feedback.

### 2. Report an Item (Mockup 4)
- **7 Core Fields + Claim Protection**:
  1. **Item Type**: Two-part toggle (`Lost` or `Found`).
  2. **Item Name**: Free-text with icon (e.g. *Black Wallet*).
  3. **Category**: 6 canonical campus categories (*Electronics, Documents, Accessories, Books, Bags, Other*).
  4. **Location**: Auto-suggest datalist for popular campus spots (*Library, Block A, Canteen, Main Gate, Gym*, etc.).
  5. **Date**: Date picker locked to today or earlier.
  6. **Description**: 200-character description with live character counter.
  7. **Contact Information**: Phone number, email, or both comma-separated.
  8. **Verify It's Yours**: Security question and answer with suggested preset chips (*"What colour or brand is it?", "What's inside it?"*).
- **Sidebar & Quick Tips**: Helpful recovery advice and campus guidance notes.
- **Auto Smart Match Detection**: Automatically scans existing listings upon submission and presents matches in an overlay modal.

### 3. Search & Filters (Mockup 3)
- **Instant Search with Synonyms**: Split query matching with campus synonym expansion (*earphones ↔ airpods ↔ earbuds*, *phone ↔ mobile ↔ iphone*, *bag ↔ backpack*, *wallet ↔ purse*).
- **Comprehensive Filter Panel**:
  - **Status**: All / Lost / Found.
  - **Category**: Dropdown across the 6 categories.
  - **Priority**: Derived priority (*High*: Documents & Electronics; *Medium*: Accessories & Bags; *Low*: Books & Other).
  - **Location**: Dynamic list of all active campus spots.
  - **Date Range**: Any Date, Today, Last 7 days, Last 30 days.
  - **Sorting**: Newest First, Oldest First, Best Match.
- Searching `"wallet"` displays the 4 wallet listings (*Black Wallet, Brown Wallet, Ladies Wallet, Student ID Wallet*).

### 4. Item Details & Claim Verification (Mockup 2)
- **Image Gallery**: High-definition product views and interior angles (e.g., closed view, card slots view, and slim view for wallets).
- **Privacy-First Masking**: Phone (`+91 98••• ••210`) and email (`a•••@college.edu`) remain masked until verified.
- **Claim Verification Modal**:
  - Prompts the user with the poster's secret question.
  - Answers are trimmed, case-insensitive, and allow close matches.
  - Test answer for *Black Wallet*: `"rahul"`.
  - 3 attempts allowed per session to prevent brute forcing.
- **Contact Actions**: Unlocking reveals the full contact details, enables direct `tel:` dialing and `mailto:` email composition, and activates quick action buttons.
- **Quick Actions**:
  - **Mark as Found / Recovered**: Allowed for the person who reported or verified the item.
  - **Report Similar Item**: Prefills the category and location for fast reporting.
- **Smart Match Suggestions**: Displays matching items with animated circular percentage rings.

---

## 🧠 Creative Innovations

### Smart Match Algorithm
Matches Lost items with Found items (opposite types only) across 4 transparent scoring signals:
1. **Category Match**: `+30 points` for identical category.
2. **Tokenized Text Overlap**: Up to `+40 points` using the Overlap Coefficient `|A ∩ B| / min(|A|, |B|)` after synonym normalization and stop-word removal.
3. **Location Match**: `+15 points` for matching campus locations.
4. **Date Proximity**: `+15 points` if reported within 3 days of each other (`+8 points` within 7 days).
- Items with score $\ge 50\%$ are flagged as **Possible Matches** and trigger badge indicators and notification alerts in the header bell.

### Secure Claim Verification
- Contact information is masked until the finder or owner answers a secret question.
- Prevents spam, harassment, and unauthorized claims of valuable student belongings.
- Verified contacts are kept in-memory for the current session.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism Tokens
- **Icons**: Lucide React
- **Routing**: React Router v7 (`/`, `/report`, `/search`, `/item/:id`, `/my-reports`)
- **Typography**: Plus Jakarta Sans (UI) & Caveat (Handwritten script) via Google Fonts
- **Storage**: Offline-first client-side state + `localStorage` persistence, pre-seeded with all 12 mockup items
