import type { ComponentType, ReactElement, ReactNode, RefObject } from 'react';
import {
	forwardRef,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import type { View, ViewProps } from 'react-native';

import { Portal } from '../Portal';

import RelativeBindingFloatContainer from './BindingContainer/Relative';
import RootBindingFloatContainer from './BindingContainer/Root';
import type { Align, AlignTarget } from './shared';
import { randomId } from './utils';

export type Float = {
	visible: boolean;
	show: () => void;
	hide: () => void;
	toggle: () => void;
};

type FloatProps<T extends 'relative' | 'root'> = ViewProps & {
	id?: string;
	children: ReactNode;
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
	 *
	 * @default 'center'
	 */
	align: Align;
	/**
	 * Specify the target of the alignment.
	 * - `outer`: Align the content to the outer bounds of the binding (RootView or BindingView).
	 * - `inner`: Align the content to the inner bounds of the binding.
	 *
	 * @default 'outer' (for `relative` binding) or 'inner' (for `root` binding)
	 */
	alignTarget?: AlignTarget;
	/**
	 * The backdrop component to render when the float is visible.
	 *
	 * @default null
	 */
	backdrop?: ReactElement;
	/**
	 * The overlay component to render when the float is visible.
	 *
	 * @default null
	 */
	overlay?: ReactElement;
	/**
	 * The binding type to use for the float.
	 *
	 * - `relative`: The float is positioned relative to the binding element.
	 * - `root`: The float is positioned relative to the root view.
	 *
	 * @default 'root'
	 */
	readonly binding?: T;
	/**
	 * Required if the `binding` is `relative`.
	 * This is used to measure the position that the float should be anchored to.
	 */
	readonly bindingRef?: RefObject<View>;
};

export const Float = forwardRef<Float, FloatProps<'relative' | 'root'>>(
	function Float(
		{
			id = randomId(),
			children,
			binding = 'root',
			bindingRef,
			backdrop,
			overlay,
			alignTarget = binding === 'relative' ? 'outer' : 'inner',
			align = 'center',
			...props
		},
		ref,
	) {
		const [isVisible, setIsVisible] = useState(false);
		const portalRef = useRef<Portal>(null);

		useImperativeHandle(ref, () => ({
			visible: isVisible,
			show: () => setIsVisible(true),
			hide: () => setIsVisible(false),
			toggle: () => setIsVisible((prev) => !prev),
		}));

		const Container = useMemo(() => {
			if (binding === 'relative') return RelativeBindingFloatContainer;
			else if (binding === 'root') return RootBindingFloatContainer;
			throw new Error(
				`Invalid binding: ${binding}, must be 'relative' or 'root'`,
			);
		}, [binding]) as ComponentType<
			ViewProps & {
				align: Align;
				bindingRef: RefObject<View>;
				alignTarget: AlignTarget;
			}
		>;

		// If the modal is not visible, don't render it
		if (!isVisible) return null;

		return (
			<Portal ref={portalRef} key={id}>
				{backdrop}
				<Container
					bindingRef={bindingRef!}
					align={align}
					alignTarget={alignTarget}
					{...props}
				>
					{children}
				</Container>
				{overlay}
			</Portal>
		);
	},
);

export default Float;
