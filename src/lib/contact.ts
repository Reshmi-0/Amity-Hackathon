export interface ParsedContact {
  phones: string[];
  emails: string[];
}

export function parseContact(raw: string): ParsedContact {
  if (!raw) return { phones: [], emails: [] };

  const parts = raw.split(/[,;\n]+/).map(p => p.trim()).filter(Boolean);
  const phones: string[] = [];
  const emails: string[] = [];

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneCleanRegex = /[^0-9+]/g;

  for (const part of parts) {
    if (emailRegex.test(part)) {
      const match = part.match(emailRegex);
      if (match) emails.push(match[0]);
    } else {
      const cleaned = part.replace(phoneCleanRegex, '');
      if (cleaned.length >= 7) {
        phones.push(part);
      }
    }
  }

  // If raw wasn't split by comma, check regex directly
  if (phones.length === 0 && emails.length === 0) {
    const emailMatch = raw.match(emailRegex);
    if (emailMatch) emails.push(emailMatch[0]);
    const phoneCandidates = raw.replace(emailRegex, '').trim();
    if (phoneCandidates.length >= 7) {
      phones.push(phoneCandidates);
    }
  }

  return { phones, emails };
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length < 6) return '+91 98••• •••••';
  const prefix = digits.slice(0, 4);
  const suffix = digits.slice(-3);
  return `+91 ${prefix.slice(-2)}••• ••${suffix}`;
}

export function maskEmail(email: string): string {
  const parts = email.split('@');
  if (parts.length !== 2) return 'c•••••@college.edu';
  const name = parts[0];
  const domain = parts[1];
  const firstLetter = name[0] || 'a';
  return `${firstLetter}•••@${domain}`;
}

export function telHref(phone: string): string {
  const cleaned = phone.replace(/[^0-9+]/g, '');
  return `tel:${cleaned}`;
}

export function mailHref(email: string, itemName: string): string {
  const subject = encodeURIComponent(`Campus Lost & Found: Regarding ${itemName}`);
  const body = encodeURIComponent(`Hi,\n\nI am contacting you regarding the listing for "${itemName}" on Campus Lost & Found.\n\nBest regards`);
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
