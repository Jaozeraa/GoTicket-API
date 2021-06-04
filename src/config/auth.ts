export default {
  jwtAccessToken: {
    secret: process.env.ACCESS_SECRET || 'default',
    expiresIn: '1d',
  },
  jwtRefreshToken: {
    secret: process.env.REFRESH_SECRET || 'default',
    expiresIn: '30d',
  },
};
