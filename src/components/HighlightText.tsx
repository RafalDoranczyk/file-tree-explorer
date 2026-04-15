import { memo } from "react";

type HighlightTextProps = {
	text: string;
	query: string;
};

export const HighlightText = memo(function HighlightText({
	text,
	query,
}: HighlightTextProps) {
	if (!query) return <span>{text}</span>;

	const parts = text.split(new RegExp(`(${query})`, "gi"));

	return (
		<span>
			{parts.map((part, i) => {
				const isMatch = part.toLowerCase() === query.toLowerCase();

				return (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: Stable index for string fragments
						key={`highlight-${i}`}
						className={
							isMatch
								? "bg-blue-100 text-blue-700 font-bold rounded-sm px-0.5"
								: ""
						}
					>
						{isMatch ? (
							<mark className="bg-transparent text-inherit font-inherit">
								{part}
							</mark>
						) : (
							part
						)}
					</span>
				);
			})}
		</span>
	);
});
