export const DEPARTMENT_ENDPOINTS = {
  list: '/management/departments',
  create: '/management/departments',
  update: (id: number) => `/management/departments/${id}`,
} as const;
