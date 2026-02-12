import { getLocale } from "$lib/paraglide/runtime";

export function getInitialContent() {
    const initialDe = [
        ["Mit Liebe", "Unter hohem Druck"],
        [
            "für das beste Publikum",
            "für die Menschheit",
            "ohne zu zweifeln",
            "",
        ],
        ["von einer Horde Affen", "von jemandem, dem es wichtig ist,"],
        ["erschaffen", "gebaut"],
    ];
    const initialEn = [
        ["Created", "Made"],
        ["with love", "under pressure"],
        ["for the best audience", "for humanity", "without hesitation", ""],
        ["by a horde of apes", "by someone who cares"],
    ];
    const initial = getLocale() === "de" ? initialDe : initialEn;

    return initial;
}
