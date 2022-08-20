const AGE_VS_GROUP = [{ range: [0, 40], id: 0 }, { range: [41, 50], id: 1 }, { range: [51, 100], id: 2 }];

const DEPENDENTS_GROUPS = [{ label: '2 to 3', id: 0, rate: 1 / 3 }, { label: '4 to 6', id: 1, rate: 1 / 4 }, { label: 'Exceed 6 ', id: 2, rate: 1 / 5 }];

const MULTIPLIER_AGE_GROUPS = [{ range: [0, 25], id: 0, multiplier: 18 }, { range: [26, 30], id: 1, multiplier: 17 }, { range: [31, 35], id: 2, multiplier: 16 }, { range: [36, 40], id: 3, multiplier: 15 }, { range: [41, 45], id: 4, multiplier: 14 }, { range: [46, 50], id: 5, multiplier: 13 }, { range: [51, 55], id: 6, multiplier: 11 }, { range: [56, 60], id: 7, multiplier: 9 }, { range: [61, 65], id: 8, multiplier: 7 }, { range: [66, 100], id: 9, multiplier: 5 }];

const SALARY_TYPE_VS_AGE_GROUP_PERCENTAGE = {
    'self-employeed': [40, 25, 10],
    'regular': [50, 30, 15]
};


export { AGE_VS_GROUP, DEPENDENTS_GROUPS, MULTIPLIER_AGE_GROUPS, SALARY_TYPE_VS_AGE_GROUP_PERCENTAGE }