
export default function Container(children, parent) {
  const div = document.createElement('div');

  children.forEach(child => {
    div.appendChild(child);
  });

  if (parent) {
    parent.appendChild(div);
  }

  return div;
}
