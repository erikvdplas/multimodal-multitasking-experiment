export default function Heading(url, text) {
  const anchor = document.createElement('a');
  anchor.innerText = text || url;
  anchor.setAttribute('href', url);

  return anchor;
}
