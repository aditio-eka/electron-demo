import * as React from 'react';
import { createRoot } from 'react-dom/client';

function Main() {
    const [opened, setOpened] = React.useState(false)

    async function open() {
        await window.electronAPI.open()
        setOpened(true)
    }

    async function close() {
        await window.electronAPI.close()
        setOpened(false)
    }

    return <button onClick={opened ? close : open}>{opened ? 'Close' : 'Open'}</button>
}

const root = createRoot(document.getElementById('app'));
root.render(<Main />);