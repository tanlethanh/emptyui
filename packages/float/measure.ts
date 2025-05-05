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
		case 'center':
			position.top = binding.height / 2 - content.height / 2;
			position.left = binding.width / 2 - content.width / 2;
			break;
		case 'top-left':
			position.top = 0;
			position.left = 0;
			if (alignTarget === 'outer') position.top -= content.height;
			break;
		case 'top-right':
			position.top = 0;
			position.right = 0;
			if (alignTarget === 'outer') position.top -= content.height;
			break;
		case 'top-center':
			position.top = 0;
			position.left = binding.width / 2 - content.width / 2;
			if (alignTarget === 'outer') position.top -= content.height;
			break;
		case 'top-stretch':
			position.top = 0;
			position.left = 0;
			position.right = 0;
			if (alignTarget === 'outer') position.top -= content.height;
			break;
		case 'bottom-left':
			position.bottom = 0;
			position.left = 0;
			if (alignTarget === 'outer') position.bottom -= content.height;
			break;
		case 'bottom-right':
			position.bottom = 0;
			position.right = 0;
			if (alignTarget === 'outer') position.bottom -= content.height;
			break;
		case 'bottom-center':
			position.bottom = 0;
			position.left = binding.width / 2 - content.width / 2;
			if (alignTarget === 'outer') position.bottom -= content.height;
			break;
		case 'bottom-stretch':
			position.bottom = 0;
			position.left = 0;
			position.right = 0;
			if (alignTarget === 'outer') position.bottom -= content.height;
			break;
		case 'left-center':
			position.left = 0;
			position.top = binding.height / 2 - content.height / 2;
			if (alignTarget === 'outer') position.left -= content.width;
			break;
		case 'left-stretch':
			position.left = 0;
			position.top = 0;
			position.bottom = 0;
			if (alignTarget === 'outer') position.left -= content.width;
			break;
		case 'right-center':
			position.top = binding.height / 2 - content.height / 2;
			position.right = 0;
			if (alignTarget === 'outer') position.right -= content.width;
			break;
		case 'right-stretch':
			position.right = 0;
			position.top = 0;
			position.bottom = 0;
			if (alignTarget === 'outer') position.right -= content.width;
			break;
	}

	return position;
};
