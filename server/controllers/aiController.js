import openai from "../configs/ai.js";
import Resume from "../models/Resume.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "User content is required" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL_NAME,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Your task is to enhance the given professional summary to make it more impactful and concise. The summary should be 1-2 sentences also highlighting key skills, experience, and achievements relevant to a professional resume. Make it compelling and ATS-friendly. and only returen text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedSummary = response.choices[0].message.content;
    return res.status(200).json({ enhancedSummary });
  } catch (error) {
    console.error("Error enhancing professional summary:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "User content is required" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL_NAME,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Your task is to enhance the given job description to make it more detailed and impactful. The enhanced job description should be 1-2 sentences and clearly outline key responsibilities, achievements, and skills required for the role. Make it compelling and ATS-friendly. and only returen text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedJobDescription = response.choices[0].message.content;
    return res.status(200).json({ enhancedJobDescription });
  } catch (error) {
    console.error("Error enhancing job description:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Uploading resume to the database
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || !title) {
      return res
        .status(400)
        .json({ message: "Resume text and title are required" });
    }

    const systemPrompt =
      "You are an expert AI Agent to extract data from resume.";

    const userPrompt = `Extract the following details from the resume text provided: ${resumeText}
    
    Provide the extracted data in the following JSON format with no additional text before or after:
        {
            professional_summary: { type: String, default: "" },
            skills: [{ type: String }],
            personal_info: {
                full_name: { type: String, default: "" },
                email: { type: String, default: "" },
                phone: { type: String, default: "" },
                location: { type: String, default: "" },
                linkedin: { type: String, default: "" },
                website: { type: String, default: "" },
                proffession: { type: String, default: "" },
                image: { type: String, default: "" },
            },
            experience: [
                {
                    company: { type: String, default: "" },
                    position: { type: String, default: "" },
                    start_date: { type: String, default: "" },
                    end_date: { type: String, default: "" },
                    description: { type: String, default: "" },
                    is_current: { type: Boolean, default: false },
                },
            ],
            education: [
                {
                    institution: { type: String, default: "" },
                    degree: { type: String, default: "" },
                    field: { type: String, default: "" },
                    graduation_date: { type: String, default: "" },
                    gpa: { type: String, default: "" },
                },
            ],
            project: [
                {
                    name: { type: String, default: "" },
                    type: { type: String, default: "" },
                    description: { type: String, default: "" },
                },
            ],
        }
    `;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL_NAME,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],

      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });
    return res.status(200).json({
      message: "Resume uploaded successfully",
      resumeId: newResume._id,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
