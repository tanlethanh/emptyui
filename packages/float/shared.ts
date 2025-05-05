export type Position = {
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
};

/**
 * Specify the target of the alignment.
 * - `outer`: Align the content to the outer bounds of the binding (RootView or BindingView).
 * - `inner`: Align the content to the inner bounds of the binding.
 *
 * The target is only applied for corner or edge alignments, not for `Center` alignment.
 *
 * E.g. for TopLeft alignment:
 * - `outer`: Content will be positioned at the top left corner of the binding's outer edge.
 * - `inner`: Content will be positioned at the top left corner of the binding's inner edge.
 *
 * This is useful for different positioning needs:
 * - `outer` is good for positioning content outside the BindingView (like tooltips or dropdowns)
 * - `inner` is good for positioning content inside the RootView (like Toast, Dialog, Modal, etc.)
 */
export type AlignTarget = 'outer' | 'inner';

export enum Align {
	/** Align to the center of the screen, self-width */
	Center = 'Center',
	/** Align to the top left corner, self-width */
	TopLeft = 'TopLeft',
	/** Align to the top right corner, self-width */
	TopRight = 'TopRight',
	/** Align to the top center, self-width */
	TopCenter = 'TopCenter',
	/** Align to the top of the screen, stretching the width to fill the screen */
	TopStretch = 'TopStretch',
	/** Align to the bottom left corner, self-width */
	BottomLeft = 'BottomLeft',
	/** Align to the bottom right corner, self-width */
	BottomRight = 'BottomRight',
	/** Align to the bottom center, self-width */
	BottomCenter = 'BottomCenter',
	/** Align to the bottom of the screen, stretching the width to fill the screen */
	BottomStretch = 'BottomStretch',
	/** Align to the left center, self-height */
	LeftCenter = 'LeftCenter',
	/** Align to the left of the screen, stretching the height to fill the screen */
	LeftStretch = 'LeftStretch',
	/** Align to the right center, self-height */
	RightCenter = 'RightCenter',
	/** Align to the right of the screen, stretching the height to fill the screen */
	RightStretch = 'RightStretch',
}

export const FloatBindingRefRequired = () => {
	return new Error('bindingRef is required for relative binding');
};
