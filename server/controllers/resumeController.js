import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import User from "../models/User.js";
import fs from "fs";

// Helper function to check if profile is complete
const checkProfileCompletion = (resumeData) => {
  const { personal_info, professional_summary, skills, experience, education } = resumeData;
  
  // Check if essential personal info is filled
  const hasPersonalInfo = personal_info.full_name && 
                          personal_info.email && 
                          personal_info.phone;
  
  // Check if at least one of these sections has content
  const hasSummary = professional_summary && professional_summary.length > 0;
  const hasSkills = skills && skills.length > 0;
  const hasExperience = experience && experience.length > 0 && experience[0].company;
  const hasEducation = education && education.length > 0 && education[0].institution;
  
  // Profile is complete if has personal info and at least 2 other sections
  return hasPersonalInfo && 
         [hasSummary, hasSkills, hasExperience, hasEducation].filter(Boolean).length >= 2;
};

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
        
        // Extract file extension from original filename
        const fileExtension = image.originalname.split('.').pop().toLowerCase();
        // Support all common image formats
        const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'];
        const finalExtension = supportedFormats.includes(fileExtension) ? fileExtension : 'jpg';

        const response = await imagekit.upload({
          file: imageBufferDate,
          fileName: `resume_${Date.now()}.${finalExtension}`,
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

    // Check if profile is now complete and award points if not already awarded
    const user = await User.findById(userId);
    if (user && !user.stats.profileCompleted) {
      const isProfileComplete = checkProfileCompletion(resume);
      
      if (isProfileComplete) {
        // Update user stats
        user.stats.profileCompleted = true;
        
        // Award points for profile completion
        const profilePoints = 100;
        await user.addPoints(profilePoints, 'PROFILE_COMPLETE');
        await user.save();
        
        // Create activity record
        const Activity = (await import("../models/Activity.js")).default;
        await Activity.create({
          user: userId,
          type: 'PROFILE_COMPLETE',
          points: profilePoints,
          description: 'Profile completed',
        });
      }
    }

    return res
      .status(200)
      .json({ message: "Resume saved successfully", resume });
  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const trackResumeDownload = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    // Verify the resume belongs to the user
    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Track the download in user stats and award points
    // This will be handled by the points system
    return res.status(200).json({ 
      success: true,
      message: "Download tracked successfully" 
    });
  } catch (error) {
    console.error("Error tracking resume download:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
