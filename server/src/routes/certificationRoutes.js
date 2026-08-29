const express = require("express");

const {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification
} = require("../controllers/certificationController");

const router = express.Router();


// =====================================================
// GET ALL CERTIFICATIONS
// =====================================================

router.get("/", getCertifications);


// =====================================================
// GET CERTIFICATION BY ID
// =====================================================

router.get("/:id", getCertificationById);


// =====================================================
// CREATE CERTIFICATION
// =====================================================

router.post("/", createCertification);


// =====================================================
// UPDATE CERTIFICATION
// =====================================================

router.put("/:id", updateCertification);


// =====================================================
// DELETE CERTIFICATION
// =====================================================

router.delete("/:id", deleteCertification);


module.exports = router;