import type { AlignTarget, Position } from './shared';
import { Align } from './shared';

/**
 * Measure the position of the content based on the binding and content layouts.
 *
 * Note: some alignments do not depend on the layouts,
 * so the measurement should accept null value of layouts to measure the position.
 */
export const measurePosition = (
	binding: { width: number; height: number },
	content: { width: number; height: number },
	align: Align,
	alignTarget: AlignTarget,
) => {
	const position: Position = {};

	switch (align) {
		case Align.Center:
			position.top = binding.height / 2 - content.height / 2;
			position.left = binding.width / 2 - content.width / 2;
			break;
		case Align.TopLeft:
			position.top = 0;
			position.left = 0;
			if (alignTarget === 'outer') position.top -= content.height;
			break;
		case Align.TopRight:
			position.top = 0;
			position.right = 0;
			if (alignTarget === 'outer') position.top -= content.height;
			break;
		case Align.TopCenter:
			position.top = 0;
			position.left = binding.width / 2 - content.width / 2;
			if (alignTarget === 'outer') position.top -= content.height;
			break;
		case Align.TopStretch:
			position.top = 0;
			position.left = 0;
			position.right = 0;
			if (alignTarget === 'outer') position.top -= content.height;
			break;
		case Align.BottomLeft:
			position.bottom = 0;
			position.left = 0;
			if (alignTarget === 'outer') position.bottom -= content.height;
			break;
		case Align.BottomRight:
			position.bottom = 0;
			position.right = 0;
			if (alignTarget === 'outer') position.bottom -= content.height;
			break;
		case Align.BottomCenter:
			position.bottom = 0;
			position.left = binding.width / 2 - content.width / 2;
			if (alignTarget === 'outer') position.bottom -= content.height;
			break;
		case Align.BottomStretch:
			position.bottom = 0;
			position.left = 0;
			position.right = 0;
			if (alignTarget === 'outer') position.bottom -= content.height;
			break;
		case Align.LeftCenter:
			position.left = 0;
			position.top = binding.height / 2 - content.height / 2;
			if (alignTarget === 'outer') position.left -= content.width;
			break;
		case Align.LeftStretch:
			position.left = 0;
			position.top = 0;
			position.bottom = 0;
			if (alignTarget === 'outer') position.left -= content.width;
			break;
		case Align.RightCenter:
			position.top = binding.height / 2 - content.height / 2;
			position.right = 0;
			if (alignTarget === 'outer') position.right -= content.width;
			break;
		case Align.RightStretch:
			position.right = 0;
			position.top = 0;
			position.bottom = 0;
			if (alignTarget === 'outer') position.right -= content.width;
			break;
	}

	return position;
};
