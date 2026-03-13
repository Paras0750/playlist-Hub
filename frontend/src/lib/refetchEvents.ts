export type RefetchEventDetail =
  | { type: "myPlaylists" }
  | { type: "savedPlaylists" }
  | { type: "playlistById"; playlistId: string };

const REFETCH_EVENT_NAME = "playlisthub:refetch";

export const emitRefetchEvent = (detail: RefetchEventDetail) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<RefetchEventDetail>(REFETCH_EVENT_NAME, { detail }),
  );
};

export const subscribeToRefetchEvents = (
  handler: (detail: RefetchEventDetail) => void,
) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<RefetchEventDetail>;
    handler(customEvent.detail);
  };

  window.addEventListener(REFETCH_EVENT_NAME, listener);

  return () => {
    window.removeEventListener(REFETCH_EVENT_NAME, listener);
  };
};
