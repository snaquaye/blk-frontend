export type CategoryType = "Books" | "Film + TV" | "Culture";

export const renderLink = (slug: string, category: string) => {
    switch (category) {
        case "Books":
            return `/books/${slug}`;
        case "Film + TV":
            return `/film-tv/${slug}`;
        case "Culture":
            return `/culture/${slug}`;
        default:
            return `/${slug}`;
    }
}

export const formatDate = (date: Date): string => {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(new Date(date));
}
