import { forwardRef, useCallback, useContext, useMemo, useState } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	ViewProps,
} from 'react-native';
import { StyleSheet, View } from 'react-native';

import { FloatContext, FloatManagerContext } from '../context';
import { measurePosition } from '../measure';
import type { Align, AlignTarget } from '../shared';

type Props = ViewProps & {
	align: Align;
	alignTarget: AlignTarget;
};

export const RootBindingFloatContainer = forwardRef<View, Props>(
	function RootBindingFloatContainer(
		{ onLayout, style, align, alignTarget, ...props },
		ref,
	) {
		const [layout, setLayout] = useState<LayoutRectangle | null>(null);
		const { rootLayout } = useContext(FloatManagerContext);

		const handleLayout = useCallback((event: LayoutChangeEvent) => {
			onLayout?.(event);
			setLayout(event.nativeEvent.layout);
		}, []);

		/**
		 * Be careful with the calculation here.
		 * As it depends on the layout change, then the position may change the layout,
		 * which could cause circular layout update.
		 */
		const position = useMemo(() => {
			if (!layout || !rootLayout) {
				console.warn(
					'Root or Container is not ready to measure float position',
				);
				return null;
			}

			return measurePosition(rootLayout, layout, align, alignTarget);
		}, [layout, rootLayout, align, alignTarget]);

		return (
			<FloatContext.Provider
				value={{
					layout,
					rootLayout,
					bindingLayout: null,
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

export default RootBindingFloatContainer;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
	},
	hidden: {
		opacity: 0,
	},
});
