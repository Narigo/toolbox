import { getLocale } from "$lib/paraglide/runtime";

function defaultContent() {
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

export function getInitialContent() {
    const existingTexts = localStorage.getItem("tools.randomtexter.texts");
    if (existingTexts === null) {
        return defaultContent();
    }

    try {
        const js = JSON.parse(existingTexts);
        if (!Array.isArray(js)) {
            return defaultContent();
        }
        if (
            !js.every((element) =>
                Array.isArray(element) &&
                element.every((x) => typeof x === "string")
            )
        ) {
            return defaultContent();
        }
        return js;
    } catch {
        return defaultContent();
    }
}
