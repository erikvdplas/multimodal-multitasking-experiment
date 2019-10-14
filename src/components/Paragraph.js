export default function Paragraph(text) {
  const paragraph = document.createElement(`p`);
  paragraph.innerText = text;

  return paragraph;
}
