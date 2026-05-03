export const DIARY_AGGREGATION_TAB_IDS = ['week', 'month'] as const
export type DiaryAggregationTabId = (typeof DIARY_AGGREGATION_TAB_IDS)[number]
