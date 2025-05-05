import type { PropsWithChildren, ReactNode } from 'react';
import { createContext, memo, useCallback, useContext, useRef } from 'react';

import { PortalManager } from './Manager';

export type PortalContext = {
	addPortal: (key: string, node: ReactNode) => void;
	updatePortal: (key: string, node: ReactNode) => void;
	removePortal: (key: string) => void;
};

export const PortalContext = createContext<PortalContext>({
	addPortal: () => {},
	removePortal: () => {},
	updatePortal: () => {},
});

export const usePortal = () => {
	return useContext(PortalContext);
};

export const PortalHost = memo(function PortalHost({
	children,
}: PropsWithChildren) {
	const ref = useRef<PortalManager>(null);

	const addPortal = useCallback((key: string, node: ReactNode) => {
		if (ref.current) ref.current.addPortal(key, node);
	}, []);

	const updatePortal = useCallback((key: string, node: ReactNode) => {
		if (ref.current) ref.current.updatePortal(key, node);
	}, []);

	const removePortal = useCallback((key: string) => {
		if (ref.current) ref.current.removePortal(key);
	}, []);

	return (
		<PortalContext.Provider value={{ addPortal, removePortal, updatePortal }}>
			{children}
			<PortalManager ref={ref} />
		</PortalContext.Provider>
	);
});
