'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::feedback.feedback', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('Debes iniciar sesión para enviar feedback');
    }

    const { data } = ctx.request.body;

    const feedbackData = {
      message: data?.message || '',
      user: user.id,
    };

    const entry = await strapi.entityService.create('api::feedback.feedback', {
      data: feedbackData,
      populate: ['user'],
    });

    // sanitizar y devolver
    const sanitized = await this.sanitizeOutput(entry, ctx);
    return this.transformResponse(sanitized);
  },
}));
