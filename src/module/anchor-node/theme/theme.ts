
export const getCSSVar = (variable: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};