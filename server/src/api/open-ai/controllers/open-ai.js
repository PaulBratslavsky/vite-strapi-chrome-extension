'use strict';

module.exports = {
  async summarize(ctx) {
    try {
      const response = await strapi.services['api::open-ai.open-ai'].summarize(ctx.request.body);
      console.log(response)
      return { text: response.choices[0].text };
    } catch (err) {
      console.log(err.message);
      ctx.body = "Error: Something went wrong.";
    }
  }
};
