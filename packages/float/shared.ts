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

/**
 * Specify the alignment position for floating elements.
 *
 * - `center`: Align to the center of the screen.
 * - `top-left`: Align to the top left corner of the screen.
 * - `top-right`: Align to the top right corner of the screen.
 * - `top-center`: Align to the top center of the screen.
 * - `top-stretch`: Align to the top of the screen, stretching the width to fill the screen.
 * - `bottom-left`: Align to the bottom left corner of the screen.
 * - `bottom-right`: Align to the bottom right corner of the screen.
 * - `bottom-center`: Align to the bottom center of the screen.
 * - `bottom-stretch`: Align to the bottom of the screen, stretching the width to fill the screen.
 * - `left-center`: Align to the left center of the screen.
 * - `left-stretch`: Align to the left of the screen, stretching the height to fill the screen.
 * - `right-center`: Align to the right center of the screen.
 * - `right-stretch`: Align to the right of the screen, stretching the height to fill the screen.
 */
export type Align =
	| 'center'
	| 'top-left'
	| 'top-right'
	| 'top-center'
	| 'top-stretch'
	| 'bottom-left'
	| 'bottom-right'
	| 'bottom-center'
	| 'bottom-stretch'
	| 'left-center'
	| 'left-stretch'
	| 'right-center'
	| 'right-stretch';

export const FloatBindingRefRequired = () => {
	return new Error('bindingRef is required for relative binding');
};
