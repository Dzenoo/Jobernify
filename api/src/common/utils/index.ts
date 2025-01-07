export const getRedirectUrl = (role: 'seeker' | 'employer') => {
  const roledUrl = role === 'seeker' ? 'jobs' : 'seekers';
  const redirectUrl = `${process.env.FRONTEND_URL}/${roledUrl}`;
  return redirectUrl;
};
