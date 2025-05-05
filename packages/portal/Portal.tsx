import type { ReactNode } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { usePortal } from './Host';

type Props = {
	key: string;
	children: ReactNode;
};

export type Portal = {
	// Something
};

export const Portal = forwardRef<Portal, Props>(function Portal(
	{ key, children },
	ref,
) {
	const portalKey = useRef<string>(key);
	const portalAddedRef = useRef<boolean>(false);
	const { addPortal, removePortal, updatePortal } = usePortal();

	useImperativeHandle(ref, () => ({}));

	useEffect(() => {
		if (!portalAddedRef.current) {
			addPortal(portalKey.current, children);
			portalAddedRef.current = true;
		} else {
			updatePortal(portalKey.current, children);
		}
	}, [children]);

	useEffect(() => {
		return () => removePortal(portalKey.current);
	}, []);

	return null;
});
