export function getYoutubeId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace(/^\//, "") || null;
    }

    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}
