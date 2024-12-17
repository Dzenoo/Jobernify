import { FilterCounts, FilterGroup } from '@/types';

/**
 * Utility function to inject counts into filter data.
 * @param filtersData - Array of filter groups with filter options.
 * @param filterCounts - Object containing counts for each filter type.
 * @param typeToCountMap - Mapping configuration for the count data.
 * @returns Updated filters with counts.
 */
export const injectCountsIntoFilters = (
  filtersData: FilterGroup[],
  filterCounts: FilterCounts,
  typeToCountMap: { [key: string]: string },
): FilterGroup[] => {
  const counts = filterCounts?.length > 0 ? filterCounts[0] : {};

  return filtersData.map((filterGroup) => {
    const updatedData = filterGroup.data.map((filterOption) => {
      const countKey = typeToCountMap[filterOption.type];
      let count = 0;

      if (counts[countKey]) {
        count =
          counts[countKey]?.find((item: any) => {
            if (countKey === 'salary') {
              const range = item._id;
              const [min, max] = filterOption.value.split('-').map(Number);
              return range.min === min && range.max === max;
            }
            return item._id === filterOption.value;
          })?.count || 0;
      }

      return { ...filterOption, count };
    });

    return { ...filterGroup, data: updatedData };
  });
};
