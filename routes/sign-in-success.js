import * as Data from '~/common/data';

export default async (req, res, app) => {
  const { viewer } = await Data.getViewer(req);

  return app.render(req, res, '/sign-in-success', { viewer });
};
