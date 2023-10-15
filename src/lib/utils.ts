import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fuzzySearch = (data: any = [], search = '', key = 'title') => {
  return data.filter((item: any) => {
    const { snippet } = item;
    const searchText = snippet?.[key]?.toLowerCase();
    return searchText.indexOf(search) !== -1;
  });
};
