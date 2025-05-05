import type { ReactNode, RefObject } from 'react';
import { useCallback, useState } from 'react';
import type { LayoutRectangle, View } from 'react-native';

import { PortalHost } from '../Portal';

import { FloatManagerContext } from './context';
import FloatManager from './Manager';

type FloatProviderProps = {
	children: ReactNode;
};

export const FloatProvider = ({ children }: FloatProviderProps) => {
	const [forcedUpdate, setForcedUpdate] = useState(false);
	const [rootLayout, setRootLayout] = useState<LayoutRectangle | null>(null);
	const [rootRef, setRootRef] = useState<RefObject<View> | null>(null);

	const forceUpdate = useCallback(() => setForcedUpdate((prev) => !prev), []);

	return (
		<FloatManagerContext.Provider
			value={{
				forcedUpdate,
				forceUpdate,
				rootLayout,
				setRootLayout,
				rootRef,
				setRootRef,
			}}
		>
			<PortalHost>
				{/* The FloatManager must be placed before the app content to
				make sure the shadow view doesn't overlap with the app content */}
				<FloatManager />
				{children}
			</PortalHost>
		</FloatManagerContext.Provider>
	);
};

export default FloatProvider;
