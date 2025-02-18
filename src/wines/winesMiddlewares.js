const validateWineData = (req, res, next) => {
  const { name, winery, type, region, year, price, description } =
    req.body

  if (
    !name ||
    !winery ||
    !type ||
    !region ||
    !year ||
    !price ||
    !description
  ) {
    return res.status(400).json({ error: "Missing required wine fields" })
  }

  next()
}

module.exports = { validateWineData }
