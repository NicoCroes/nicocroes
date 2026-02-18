export function removeInitialLoader() {
  const loader = document.getElementById("initial-loader");
  if (!loader) return;

  loader.classList.add("fade-out");

  setTimeout(() => {
    loader.remove();
  }, 500);
}
