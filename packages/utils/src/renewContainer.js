export default function renewContainer(lastContainer, forceCleanBody = true) {
  if (lastContainer) {
    document.body.removeChild(lastContainer);
  }
  if (forceCleanBody) {
    document.body.innerHTML = '';
  }
  const newContainer = document.createElement('div');
  document.body.appendChild(newContainer);
  return newContainer;
}
