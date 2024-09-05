import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTags = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>My React App</title>
                <meta name="description" content="This is an example description" />
                <meta name="keywords" content="React, Meta Tags, SEO" />
                <meta name="author" content="Your Name" />
                <meta property="og:title" content="Sipaz site" />
                <meta property="og:description" content="This is an example description for Open Graph" />
                <meta property="og:image" content="https://example.com/image.jpg" />
            </Helmet>
            <h1>Hello, world!</h1>
        </div>
    );
};

export default MetaTags;
