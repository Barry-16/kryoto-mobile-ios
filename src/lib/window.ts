import { API, openExternal as open } from '@/mobile/auth'

/**
 * Kryoto Mobile's answer to Kryoto Desktop's lib/window.ts, for the shared
 * screens: the phone has no Store window, so a page of the site opens in the
 * phone's browser. A game's page (a game mention, a link to it in text) opens
 * the app's own game page instead, when the app is there to show it.
 */
export const openExternal = (url: string) => open(url)

/** Asks the app to show a catalog game's page; App.tsx takes it (cancels the event) and shows it. */
export const OPEN_GAME_PAGE_EVENT = 'mobile-open-game'

const GAME_PAGE = /^\/game\/([a-z0-9-]{1,120})\/?(?:[?#]|$)/

export function openStorePage(path: string) {
  const game = GAME_PAGE.exec(path)
  if (game && !window.dispatchEvent(new CustomEvent<string>(OPEN_GAME_PAGE_EVENT, { detail: game[1]!, cancelable: true }))) return
  void open(`${API}${path}`)
}
