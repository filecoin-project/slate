export default async (req, res) => {
  return res
    .status(200)
    .json({ decorator: "SERVER_HEALTH_CHECK", data: { slate: true } });
};
