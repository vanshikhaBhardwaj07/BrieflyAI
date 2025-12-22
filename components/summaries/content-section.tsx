function parseEmojiPoint(point: string) {
  const emojiRegex = /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}])/u;
  const match = point.match(emojiRegex);

  return {
    emoji: match ? match[0] : null,
    text: point.replace(emojiRegex, "").trim(),
  };
}
function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^[-•#]/.test(point);
  const emojiRegex = /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}])/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}
export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);
        const { emoji, text } = parseEmojiPoint(point);

        if (isEmpty) return null;

        // 🔹 Emoji / main highlighted points
        if (hasEmoji || isMainPoint) {
          return (
            <div
              key={`highlight-${index}`}
              className="group relative bg-linear-to-br from-gray-200/8 to-gray-400/3 p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative flex items-start gap-3">
                {emoji && (
                  <span className="text-lg lg:text-xl shrink-0 pt-1">
                    {emoji}
                  </span>
                )}
                <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          );
        }

        // 🔹 Normal points
        return (
          <p
            key={`point-${index}`}
            className="text-muted-foreground leading-relaxed pl-1"
          >
            {point}
          </p>
        );
      })}
    </div>
  );
}
