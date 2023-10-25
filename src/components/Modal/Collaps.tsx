import React, {FC, ReactNode} from 'react';

export type TCollaps = {
    isOpen: boolean
    children: ReactNode | string
}

const Collaps: FC<TCollaps> = ({isOpen, children}) => {
    if (!isOpen) return null;
    return (
        <div className={'relative px-4 py-6 transition'}>
            {children}
        </div>
    );
};

export default Collaps;