'use strict';

module.exports = {
  async summarize(ctx) {
    try {
      const response = await strapi.services['api::open-ai.open-ai'].summarize(ctx.request.body);
      ctx.body = response.choices[0].text;
    } catch (err) {
      ctx.body = "Error: Something went wrong.";
    }
  }
};
