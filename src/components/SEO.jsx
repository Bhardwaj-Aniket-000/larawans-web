import { Helmet } from 'react-helmet-async';

export const SEO = ({ 
  title = 'Larawans Digital - Transform Your Digital Presence',
  description = 'We are a digital marketing agency that helps businesses grow online with SEO, SEM, Social Media Marketing, and Web Development services.',
  keywords = 'digital marketing, SEO, web development, social media marketing, branding',
  image = '/og-image.jpg',
  url = 'https://larawansdigital.com'
}) => {
  const fullTitle = title.includes('Larawans') ? title : `${title} | Larawans Digital`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
