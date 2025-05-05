import type { RefObject } from 'react';
import { useLayoutEffect, useMemo, useState } from 'react';
import type { View } from 'react-native';
import { Platform } from 'react-native';

export const randomId = (length: number = 8) => {
	return crypto.getRandomValues(new Uint32Array(length)).toString();
};

type MeasuredView = {
	x: number;
	y: number;
	width: number;
	height: number;
};

/**
 * Performance-optimized layout measurement hooks in the window.
 *
 * Core Optimization:
 * - Web: Direct getBoundingClientRect() instead of callback-based measureInWindow
 * - Native: Falls back to measureInWindow
 */
export const useMeasureLayoutInWindow = (
	ref: RefObject<View>,
	deps: unknown[],
): MeasuredView | null => {
	const [layout, setLayout] = useState<MeasuredView | null>(null);

	useLayoutEffect(() => {
		if (ref.current) {
			if (Platform.OS === 'web') {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const rect = (ref.current as any).getBoundingClientRect();
				setLayout({
					x: rect.x,
					y: rect.y,
					width: rect.width,
					height: rect.height,
				});
			} else {
				return ref.current.measureInWindow((x, y, width, height) => {
					setLayout({ x, y, width, height });
				});
			}
		}
	}, deps);

	return layout;
};

/**
 * Measures a view's layout relative to another view.
 * Uses useMeasureLayoutInWindow internally for optimized measurements.
 */
export const useMeasureRelativeLayout = (
	innerRef: RefObject<View>,
	outerRef: RefObject<View>,
	deps: unknown[],
) => {
	const innerLayout = useMeasureLayoutInWindow(innerRef, deps);
	const outerLayout = useMeasureLayoutInWindow(outerRef, deps);

	return useMemo(() => {
		if (!innerLayout || !outerLayout) return null;

		return {
			x: innerLayout.x - outerLayout.x,
			y: innerLayout.y - outerLayout.y,
			width: innerLayout.width,
			height: innerLayout.height,
		};
	}, [innerLayout, outerLayout]);
};
