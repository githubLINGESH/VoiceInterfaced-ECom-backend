    import React, { useState } from 'react';

    function useCopyToClipboard() {
    const [isCopied, setIsCopied] = useState(false);

    const copy = (text) => {
        if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => {
            setIsCopied(false);
            }, 2000);
        });
        }
    };

    return [isCopied, copy];
    }

    function CopyToClipboard({ text, copyIcon }) {
    const [isCopied, copy] = useCopyToClipboard();

    return (
        <div>
        <img
            className="absolute top-[45px] left-[1122px] w-[54.74px] h-[58.01px] overflow-hidden"
            src={copyIcon}
            alt=""
            onClick={() => copy(text)}
            style={{ cursor: 'pointer' }}
        />
        {isCopied && <div>Copied!</div>}
        </div>
    );
    }

    export default CopyToClipboard;
