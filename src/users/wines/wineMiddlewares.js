const validateWineData = (req, res, next) => {
  const { name, wineryName, type, regionId, year, price, description } =
    req.body;

  if (
    !name ||
    !wineryName ||
    !type ||
    !regionId ||
    !year ||
    !price ||
    !description
  ) {
    return res.status(400).json({ error: "Missing required wine fields" });
  }

  next();
};

module.exports = { validateWineData };
