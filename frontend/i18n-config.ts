export const i18n = {
    defaultLocale: 'es',
    locales: ['es'], // ::TODO:: Add support for other locales
} as const;

export type Locale = typeof i18n['locales'][number];
