import React from "react";
import "./Buttons.css";

/**
 * FancyButton
 * Props:
 * - children: label text
 * - onClick: click handler
 * - className: optional extra className
 * - variant: 'chevron' (default) or 'simple' (compact pill used for toggles)
 * - selected: boolean (for simple variant to indicate active state)
 */
export default function FancyButton({
	children = "Button",
	onClick,
	className = "",
	variant = "chevron",
	selected = false,
	ariaLabel,
}) {
	const baseClass = `fancy-button ${variant === "simple" ? "simple" : "chevron"} ${selected ? "selected" : ""} ${className}`.trim();

	if (variant === "simple") {
		return (
			<button
				type="button"
				className={baseClass}
				onClick={onClick}
				aria-pressed={selected}
				aria-label={ariaLabel || (typeof children === "string" ? children : "Option")}
			>
				<span className="fancy-label">{children}</span>
			</button>
		);
	}

	return (
		<button
			className={baseClass}
			onClick={onClick}
			type="button"
			aria-label={ariaLabel || (typeof children === "string" ? children : "Action button")}
		>
			<span className="fancy-label">{children}</span>
			<span className="inner-pill" aria-hidden="true">
				<svg className="chevrons" width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path d="M3 8L8 2.5L8.9 3.4L4.2 8L8.9 12.6L8 13.5L3 8Z" fill="currentColor" transform="translate(0,0) scale(0.8)"/>
					<path d="M11 8L16 2.5L16.9 3.4L12.2 8L16.9 12.6L16 13.5L11 8Z" fill="currentColor" transform="translate(0,0) scale(0.8)"/>
					<path d="M19 8L24 2.5L24.9 3.4L20.2 8L24.9 12.6L24 13.5L19 8Z" fill="currentColor" transform="translate(0,0) scale(0.8)"/>
				</svg>
			</span>
		</button>
	);
}

