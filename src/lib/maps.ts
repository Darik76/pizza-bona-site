import { siteConfig } from "../config/site";

function destinationParam(): string {
  const { lat, lng } = siteConfig.coordinates;
  if (lat !== null && lng !== null) {
    return `${lat},${lng}`;
  }
  return siteConfig.address.full;
}

export function googleMapsDirectionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationParam())}`;
}

export function wazeUrl(): string {
  return `https://waze.com/ul?q=${encodeURIComponent(destinationParam())}&navigate=yes`;
}

export function googleMapsEmbedUrl(): string {
  const { lat, lng } = siteConfig.coordinates;
  const query = lat !== null && lng !== null ? `${lat},${lng}` : siteConfig.address.full;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function googleReviewsUrl(): string {
  const query = `${siteConfig.name}, ${siteConfig.address.full}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
