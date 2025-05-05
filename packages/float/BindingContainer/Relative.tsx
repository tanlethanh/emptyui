import type { RefObject } from 'react';
import { forwardRef, useCallback, useContext, useMemo, useState } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	ViewProps,
} from 'react-native';
import { StyleSheet, View } from 'react-native';

import { useMeasureRelativeLayout } from '../utils';
import { FloatContext, FloatManagerContext } from '../context';
import { measurePosition } from '../measure';
import type { Align, AlignTarget, Position } from '../shared';

type Props = ViewProps & {
	align: Align;
	alignTarget: AlignTarget;
	bindingRef: RefObject<View>;
};

export const RelativeBindingFloatContainer = forwardRef<View, Props>(
	function RootBindingFloatContainer(
		{ onLayout, style, align, alignTarget, bindingRef, ...props },
		ref,
	) {
		const { rootRef, forcedUpdate } = useContext(FloatManagerContext);
		const [layout, setLayout] = useState<LayoutRectangle | null>(null);
		const { rootLayout } = useContext(FloatManagerContext);

		const bindingLayout = useMeasureRelativeLayout(bindingRef, rootRef!, [
			rootLayout,
			forcedUpdate,
		]);

		/**
		 * Be careful with the calculation here.
		 * As it depends on the layout change, then the position may change the layout,
		 * which could cause circular layout update.
		 */
		const position = useMemo(() => {
			if (!layout || !bindingLayout) return null;

			const relativePosition = measurePosition(
				bindingLayout,
				layout,
				align,
				alignTarget,
			);

			const rootPosition: Position = { ...relativePosition };

			const isVerticalStretch =
				relativePosition.top === 0 && relativePosition.bottom === 0;
			if (!isVerticalStretch) {
				if (relativePosition.top !== undefined) {
					rootPosition.top = relativePosition.top + bindingLayout.y;
				}
				if (relativePosition.bottom !== undefined) {
					rootPosition.bottom =
						relativePosition.bottom +
						(rootLayout!.height - bindingLayout.y - bindingLayout.height);
				}
			}

			const isHorizontalStretch =
				relativePosition.left === 0 && relativePosition.right === 0;
			if (!isHorizontalStretch) {
				if (relativePosition.left !== undefined) {
					rootPosition.left = relativePosition.left + bindingLayout.x;
				}
				if (relativePosition.right !== undefined) {
					rootPosition.right = relativePosition.right + bindingLayout.x;
				}
			}

			return rootPosition;
		}, [layout, bindingLayout, align, alignTarget]);

		const handleLayout = useCallback((event: LayoutChangeEvent) => {
			onLayout?.(event);
			setLayout(event.nativeEvent.layout);
		}, []);

		return (
			<FloatContext.Provider
				value={{
					layout,
					rootLayout,
					bindingLayout,
					position: position ?? {},
				}}
			>
				<View
					ref={ref}
					style={[styles.container, style, position ? position : styles.hidden]}
					onLayout={handleLayout}
					{...props}
				/>
			</FloatContext.Provider>
		);
	},
);

export default RelativeBindingFloatContainer;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
	},
	hidden: {
		opacity: 0,
	},
});
