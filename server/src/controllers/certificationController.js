const Certification = require("../models/Certification");

// =====================================================
// GET ALL CERTIFICATIONS
// =====================================================

const getCertifications = async (req, res, next) => {
  try {
    const certifications =
      await Certification.getAllCertifications();

    res.status(200).json({
      success: true,
      data: certifications
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// GET CERTIFICATION BY ID
// =====================================================

const getCertificationById = async (req, res, next) => {
  try {
    const certification =
      await Certification.getCertificationById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found"
      });
    }

    res.status(200).json({
      success: true,
      data: certification
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// CREATE CERTIFICATION
// =====================================================

const createCertification = async (req, res, next) => {
  try {
    const {
      title,
      organization,
      issue_date,
      description,
      credential_url
    } = req.body;

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Certification title is required"
      });
    }

    if (!organization || !organization.trim()) {
      return res.status(400).json({
        success: false,
        message: "Organization is required"
      });
    }

    if (!issue_date) {
      return res.status(400).json({
        success: false,
        message: "Issue date is required"
      });
    }

    const certificationId =
      await Certification.createCertification({
        title: title.trim(),
        organization: organization.trim(),
        issue_date,
        description: description
          ? description.trim()
          : null,
        credential_url: credential_url
          ? credential_url.trim()
          : null
      });

    const certification =
      await Certification.getCertificationById(
        certificationId
      );

    res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: certification
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// UPDATE CERTIFICATION
// =====================================================

const updateCertification = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      title,
      organization,
      issue_date,
      description,
      credential_url
    } = req.body;

    // Check certification exists
    const existingCertification =
      await Certification.getCertificationById(id);

    if (!existingCertification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found"
      });
    }

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Certification title is required"
      });
    }

    if (!organization || !organization.trim()) {
      return res.status(400).json({
        success: false,
        message: "Organization is required"
      });
    }

    if (!issue_date) {
      return res.status(400).json({
        success: false,
        message: "Issue date is required"
      });
    }

    await Certification.updateCertification(id, {
      title: title.trim(),
      organization: organization.trim(),
      issue_date,
      description: description
        ? description.trim()
        : null,
      credential_url: credential_url
        ? credential_url.trim()
        : null
    });

    const updatedCertification =
      await Certification.getCertificationById(id);

    res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: updatedCertification
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// DELETE CERTIFICATION
// =====================================================

const deleteCertification = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingCertification =
      await Certification.getCertificationById(id);

    if (!existingCertification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found"
      });
    }

    await Certification.deleteCertification(id);

    res.status(200).json({
      success: true,
      message: "Certification deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification
};