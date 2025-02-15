import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTags = ({ property }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{property.description + ' ' + property.locationName}</title>
        <meta name="description" content={property.description + ' ' + property.locationName} />
        <meta name="keywords" content={property.description} />
        <meta name="author" content="sipaz.in" />
        <meta property="og:title" content={property.description + ' ' + property.locationName} />
        <meta property="og:description" content={property.description + ' ' + property.locationName} />
      </Helmet>
    </div>
  );
};

export default MetaTags;
