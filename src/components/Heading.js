export default function Heading(text, type = 1) {
  const heading = document.createElement(`h${type}`);
  heading.innerText = text;

  return heading;
}
