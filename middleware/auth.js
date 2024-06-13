const jwtSecret = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send('Invalid token');
    }
  };
  