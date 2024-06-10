import { customTagBgColorProps } from "../types";

export const customTagBgColor = (certificates: customTagBgColorProps) => {

    const { english, scrum, cyberSecurity } = certificates;
    const EnglishColor = english
        ? 'default'
        : 'volcano';
    const ScrumColor = scrum ? 'cyan' : 'volcano';
    const CyberSecurityColor = cyberSecurity
        ? 'green'
        : 'volcano';
    return { EnglishColor, ScrumColor, CyberSecurityColor }
}

export const currentDate = (date: Date): string => {
    const day = date.getDate();
    const ordinal = (n: number): string => ["th", "st", "nd", "rd"][(n % 100 >> 3 ^ 1 && n % 10) || 0] || "th";
    return `${date.toLocaleString('en-US', { month: 'long' })} ${day}${ordinal(day)}, ${date.getFullYear()}`;
}