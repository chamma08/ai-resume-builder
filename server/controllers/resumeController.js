import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({
      userId,
      title,
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOneAndDelete({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, public: true });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or is not public" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy;

    if (typeof resumeData === "string") {
      resumeDataCopy = JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    if (image) {
      try {
        const imageBufferDate = fs.readFileSync(image.path);

        const response = await imagekit.upload({
          file: imageBufferDate,
          fileName: `resume_${Date.now()}.png`,
          folder: "/user-resumes",
          transformation: {
            pre:
              "w-300,h-300,fo-face,z-0.75" +
              (removeBackground ? ",e-bgremove" : ""),
          },
        });

        resumeDataCopy.personal_info.image = response.url;
        
        // Clean up uploaded file
        fs.unlinkSync(image.path);
      } catch (uploadError) {
        // Clean up uploaded file even if upload fails
        if (fs.existsSync(image.path)) {
          fs.unlinkSync(image.path);
        }
        console.error("Image upload error:", uploadError);
        return res.status(500).json({ 
          message: "Failed to upload image", 
          error: uploadError.message 
        });
      }
    }

    const resume = await Resume.findOneAndUpdate(
      {
        userId,
        _id: resumeId,
      },
      resumeDataCopy,
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res
      .status(200)
      .json({ message: "Resume saved successfully", resume });
  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
