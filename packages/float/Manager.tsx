import { useCallback, useContext, useEffect, useRef } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { FloatManagerContext } from './context';

/**
 * Manage Float context with a shadow view that is used to measure the RootView container
 */
export const FloatManager = () => {
	const ref = useRef<View>(null);

	const { setRootLayout, setRootRef } = useContext(FloatManagerContext);

	const handleShadowLayout = useCallback((event: LayoutChangeEvent) => {
		setRootLayout(event.nativeEvent.layout);
	}, []);

	useEffect(() => setRootRef(ref), []);

	// This is a shadow View that is used to measure the RootView container
	return (
		<View
			ref={ref}
			style={StyleSheet.absoluteFill}
			onLayout={handleShadowLayout}
		/>
	);
};

export default FloatManager;
