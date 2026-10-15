'use client';

interface HighlightedContentProps {
  text: string;
  activeIndex: number;
}

export function HighlightedContent({
  text,
  activeIndex,
}: HighlightedContentProps) {
  const words = text.split(/(\s+)/);

  let wordCounter = -1;

  return (
    <p className="text-lg leading-relaxed sm:text-xl">
      {words.map((chunk, i) => {
        const isWord = chunk.trim().length > 0;
        if (isWord) wordCounter += 1;

        const isActive = isWord && wordCounter === activeIndex;

        return (
          <span
            key={i}
            className={
              isActive
                ? 'rounded bg-yellow-300 px-0.5 text-black transition-colors duration-150'
                : 'transition-colors duration-150'
            }
          >
            {chunk}
          </span>
        );
      })}
    </p>
  );
}