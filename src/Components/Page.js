import React from 'react';

import '../Styles/Page.css';

export default function Page(props) {
    return <section className="page">{props.children}</section>
}