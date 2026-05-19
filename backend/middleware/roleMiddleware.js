// ======================================================
// 👥 ROLE-BASED ACCESS CONTROL MIDDLEWARE
// ======================================================

// Allow only specific roles (flexible version)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user comes from your authMiddleware (protect)
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Allowed roles: ${roles.join(", ")}`
      });
    }
    next();
  };
};

// Simple admin-only shortcut (optional)
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admins only"
    });
  }
  next();
};