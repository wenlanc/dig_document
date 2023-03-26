import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
	const { pathname } = useLocation();
	const interval = useRef(0);

	useEffect(() => {
		interval.current = setInterval(() => {
			window.scrollTo(0, 0);
			clearInterval(interval.current);
		}, 300);
	}, [pathname]);

	return null;
}
