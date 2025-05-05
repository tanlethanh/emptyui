import type { RefObject } from 'react';
import { createContext, useContext } from 'react';
import type { LayoutRectangle, View } from 'react-native';

import type { Position } from './shared';

type FloatManagerContext = {
	/**
	 * Whether the float layouts are forced to update.
	 * Just depends on the state change triggering, not its value.
	 */
	forcedUpdate: boolean;
	/**
	 * Manually refresh the float layout update.
	 * This might introduce some performance issue, so use it with caution.
	 *
	 * It might be useful to force layout update.
	 * E.g. when the orientation changes, or responsive layout change via breakpoints and responsive hooks.
	 */
	forceUpdate: () => void;
	rootLayout: LayoutRectangle | null;
	setRootLayout: (layout: LayoutRectangle) => void;
	rootRef: RefObject<View> | null;
	setRootRef: (ref: RefObject<View>) => void;
};

export const FloatManagerContext = createContext<FloatManagerContext>({
	forcedUpdate: false,
	forceUpdate: () => {},
	rootLayout: null,
	setRootLayout: () => {},
	rootRef: null,
	setRootRef: () => {},
});

export const useFloatManager = () => {
	return useContext(FloatManagerContext);
};

type FloatContext = {
	layout: LayoutRectangle | null;
	rootLayout: LayoutRectangle | null;
	bindingLayout: LayoutRectangle | null;
	position: Position;
};

export const FloatContext = createContext<FloatContext>({
	layout: null,
	rootLayout: null,
	bindingLayout: null,
	position: {},
});

export const useFloat = () => {
	return useContext(FloatContext);
};
