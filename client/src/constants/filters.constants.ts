export const JobsFiltersData = [
  {
    id: '1',
    title: 'Job type',
    description: 'Filter jobs based on the type of employment.',
    data: [
      { id: '1', title: 'Internship', value: 'Internship', type: 'type' },
      { id: '2', title: 'Full-Time', value: 'Full-Time', type: 'type' },
      { id: '3', title: 'Part-Time', value: 'Part-Time', type: 'type' },
      { id: '4', title: 'Freelance', value: 'Freelance', type: 'type' },
    ],
  },
  {
    id: '2',
    title: 'Job level',
    description: 'Filter jobs based on experience or seniority level.',
    data: [
      { id: '1', title: 'Junior', value: 'Junior', type: 'level' },
      { id: '2', title: 'Medior', value: 'Medior', type: 'level' },
      { id: '3', title: 'Senior', value: 'Senior', type: 'level' },
      { id: '4', title: 'Lead', value: 'Lead', type: 'level' },
    ],
  },
  {
    id: '3',
    title: 'Salary range',
    description: 'Filter jobs based on the offered salary range.',
    data: [
      { id: '1', title: '0$ - 50 000$', value: '0-50000', type: 'salary' },
      {
        id: '2',
        title: '50 000$ - 100 000$',
        value: '50000-100000',
        type: 'salary',
      },
      {
        id: '3',
        title: '100 000$ - 150 000$',
        value: '100000-150000',
        type: 'salary',
      },
      {
        id: '4',
        title: '150 000$ - 200 000$',
        value: '150000-200000',
        type: 'salary',
      },
      {
        id: '5',
        title: '200 000$ - 500 000$',
        value: '200000-500000',
        type: 'salary',
      },
    ],
  },
  {
    id: '4',
    title: 'Job position',
    description: 'Filter jobs based on the working arrangement or location.',
    data: [
      { id: '1', title: 'Hybrid', value: 'Hybrid', type: 'position' },
      { id: '2', title: 'On-Site', value: 'On-Site', type: 'position' },
      { id: '3', title: 'Remote', value: 'Remote', type: 'position' },
    ],
  },
];
