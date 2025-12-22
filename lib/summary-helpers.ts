export type Section = {
  title: string;
  points: string[];
};

/* ------------------ PARSER ------------------ */
export const parseSummary = (summary: string): Section[] => {
  const normalized = summary.replace(/\\n/g, '\n');

  return normalized
    .split('\n#')
    .map(s => s.trim())
    .filter(Boolean)
    .map((section) => {
      const lines = section.split('\n');
      const title = lines[0].replace(/^#+/, '').trim();

      const points: string[] = [];
      let current = '';

      lines.slice(1).forEach((line) => {
        const t = line.trim();

        if (t.startsWith('*') || t.startsWith('•')) {
          if (current) points.push(current.trim());
          current = t.replace(/^(\*|•)\s*/, '');
        } else if (!t) {
          if (current) {
            points.push(current.trim());
            current = '';
          }
        } else {
          current += ' ' + t;
        }
      });

      if (current) points.push(current.trim());

      return { title, points };
    });
};
 export function parseEmojiPoint(point: string) {
  const emojiRegex = /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}])/u;
  const match = point.match(emojiRegex);

  return {
    emoji: match ? match[0] : null,
    text: point.replace(emojiRegex, "").trim(),
  };
}
 export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^[-•#]/.test(point);
  const emojiRegex = /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}])/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}