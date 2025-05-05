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
	align: Align;
	/**
	 * Specify the target of the alignment.
	 * Default to `outer` for `relative` binding, and `inner` for `root` binding.
	 */
	alignTarget?: AlignTarget;
	backdrop?: ReactElement;
	overlay?: ReactElement;
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
