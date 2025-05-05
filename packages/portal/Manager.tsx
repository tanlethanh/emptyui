import type { ReactNode } from 'react';
import {
	forwardRef,
	Fragment,
	memo,
	useImperativeHandle,
	useState,
} from 'react';

export type PortalManager = {
	addPortal: (key: string, node: ReactNode) => void;
	updatePortal: (key: string, node: ReactNode) => void;
	removePortal: (key: string) => void;
};

export const PortalManager = memo(
	forwardRef<PortalManager>(function PortalManager(_, ref) {
		const [portals, setPortals] = useState<{ key: string; node: ReactNode }[]>(
			[],
		);

		useImperativeHandle(ref, () => ({
			addPortal: (key: string, node: ReactNode) => {
				setPortals((prev) => [...prev, { key, node }]);
			},
			updatePortal: (key: string, node: ReactNode) => {
				setPortals((prev) =>
					prev.map((p) => (p.key === key ? { key, node } : p)),
				);
			},
			removePortal: (key: string) => {
				setPortals((prev) => prev.filter((p) => p.key !== key));
			},
		}));

		return portals.map(({ key, node }) => (
			<Fragment key={key}>{node}</Fragment>
		));
	}),
);

export default PortalManager;
