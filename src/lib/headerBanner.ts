export const headerBannerText =
  import.meta.env.VITE_HEADER_BANNER_TEXT === undefined
    ? 'Porch pickup only'
    : import.meta.env.VITE_HEADER_BANNER_TEXT.trim()
