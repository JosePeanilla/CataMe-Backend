const validateRegionData = (req, res, next) => {
    const { country, name } =
      req.body
  
    if (
      !country || !name
    ) {
      return res.status(400).json({ error: "Missing required region fields" })
    }
  
    next()
  }
  
  /*************************************************** Module export ****************************************************/
  module.exports = { validateRegionData }