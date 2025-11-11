import openai from "../configs/ai.js";
import Resume from "../models/Resume.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "User content is required" });
    }

    console.log("Enhancing professional summary...");
    
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
      temperature: 0.7,
    });

    const enhancedSummary = response.choices[0].message.content;
    console.log("Professional summary enhanced successfully");
    return res.status(200).json({ enhancedSummary });
  } catch (error) {
    console.error("Error enhancing professional summary:", error);
    console.error("Error details:", error.message);
    
    // Handle rate limit errors
    if (error.status === 429) {
      return res.status(429).json({ 
        message: "AI service rate limit reached. Please wait a moment and try again.",
        retryAfter: 60
      });
    }
    
    // Handle API errors
    if (error.status === 404) {
      return res.status(500).json({ 
        message: "AI service configuration error. Please check the model name.",
      });
    }
    
    return res.status(500).json({ 
      message: "Failed to enhance summary. Please try again.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "User content is required" });
    }

    console.log("Enhancing job description...");
    
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
      temperature: 0.7,
    });

    const enhancedJobDescription = response.choices[0].message.content;
    console.log("Job description enhanced successfully");
    return res.status(200).json({ enhancedJobDescription });
  } catch (error) {
    console.error("Error enhancing job description:", error);
    console.error("Error details:", error.message);
    
    // Handle rate limit errors
    if (error.status === 429) {
      return res.status(429).json({ 
        message: "AI service rate limit reached. Please wait a moment and try again.",
        retryAfter: 60
      });
    }
    
    // Handle API errors
    if (error.status === 404) {
      return res.status(500).json({ 
        message: "AI service configuration error. Please check the model name.",
      });
    }
    
    return res.status(500).json({ 
      message: "Failed to enhance job description. Please try again.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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

    console.log("Starting resume upload process...");
    console.log("Resume title:", title);
    console.log("Resume text length:", resumeText.length);

    const systemPrompt =
      "You are an expert AI Agent to extract data from resume. Always respond with valid JSON only.";

    const userPrompt = `Extract the following details from the resume text provided: ${resumeText}
    
    Provide the extracted data in the following JSON format with no additional text before or after:
    {
        "professional_summary": "",
        "skills": [],
        "personal_info": {
            "full_name": "",
            "email": "",
            "phone": "",
            "location": "",
            "linkedin": "",
            "website": "",
            "profession": "",
            "image": ""
        },
        "experience": [
            {
                "company": "",
                "position": "",
                "start_date": "",
                "end_date": "",
                "description": "",
                "is_current": false
            }
        ],
        "education": [
            {
                "institution": "",
                "degree": "",
                "field": "",
                "graduation_date": "",
                "gpa": ""
            }
        ],
        "project": [
            {
                "name": "",
                "type": "",
                "description": ""
            }
        ]
    }
    
    Important: Return ONLY valid JSON, no markdown formatting, no code blocks, no explanations.`;

    console.log("Calling AI API...");
    
    // Configuration for API call
    const apiConfig = {
      model: process.env.OPENAI_MODEL_NAME,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
    };
    
    // Only add response_format for OpenAI models, not for Gemini
    if (!process.env.OPENAI_MODEL_NAME?.includes('gemini')) {
      apiConfig.response_format = { type: "json_object" };
    }
    
    const response = await openai.chat.completions.create(apiConfig);

    console.log("AI API response received");
    const extractedData = response.choices[0].message.content;
    console.log("Extracted data:", extractedData);
    
    const parsedData = JSON.parse(extractedData);
    console.log("Parsed data successfully");
    
    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });
    
    console.log("Resume created successfully with ID:", newResume._id);
    
    return res.status(200).json({
      message: "Resume uploaded successfully",
      resumeId: newResume._id,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    
    // Handle rate limit errors
    if (error.status === 429) {
      return res.status(429).json({ 
        message: "AI service rate limit reached. Please wait a moment and try again.",
        retryAfter: 60
      });
    }
    
    // Handle API errors
    if (error.status === 404) {
      return res.status(500).json({ 
        message: "AI service configuration error. Please check the model name.",
      });
    }
    
    // More specific error messages
    if (error.message?.includes('API key')) {
      return res.status(500).json({ 
        message: "AI service configuration error. Please contact administrator." 
      });
    }
    
    if (error.name === 'SyntaxError') {
      return res.status(500).json({ 
        message: "Failed to parse AI response. Please try again." 
      });
    }
    
    return res.status(500).json({ 
      message: "Internal server error. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
