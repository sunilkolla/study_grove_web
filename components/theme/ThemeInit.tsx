/** Runs before paint to avoid light flash and keep class in sync with localStorage. */
export function ThemeInit() {
  const script = `(function(){try{var t=localStorage.getItem("study_grove_theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark");}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}