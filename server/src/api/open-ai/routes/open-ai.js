module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/open-ai/summarize',
      handler: 'open-ai.summarize',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
