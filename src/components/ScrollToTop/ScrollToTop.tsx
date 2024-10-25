import { FC, useEffect } from 'react';

import {useLocation} from 'react-router-dom';

const ScrollToTop: FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [pathname]);

    return null;
};

export {
    ScrollToTop
};
