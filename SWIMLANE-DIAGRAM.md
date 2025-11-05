# AI Resume Builder - Swimlane Diagram

This document provides a comprehensive swimlane diagram showing the flow of operations across different layers of the AI Resume Builder application.

---

## 📋 Table of Contents
1. [User Authentication & Registration Flow](#user-authentication--registration-flow)
2. [Points System Flow](#points-system-flow)
3. [Social Media Follow & Points Earning Flow](#social-media-follow--points-earning-flow)
4. [CV Download with Points Deduction Flow](#cv-download-with-points-deduction-flow)
5. [Premium Templates Unlock Flow](#premium-templates-unlock-flow)
6. [Points Purchase with Payment Gateway Flow](#points-purchase-with-payment-gateway-flow)

---

## 🏊 Swimlane Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          USER AUTHENTICATION & REGISTRATION FLOW                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User visits          │                        │                      │
   /sign-up page        │                        │                      │
                        │                        │                      │
2. Fills form &         │                        │                      │
   submits data         │                        │                      │
   ├─ name              │                        │                      │
   ├─ email             │                        │                      │
   └─ password          │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/users/       │                      │
                        │      sign-up           │                      │
                        │                        │                      │
                        │ 3. Validate input      │                      │
                        │    data                │                      │
                        │                        │                      │
                        │ 4. Hash password       │                      │
                        │    (bcrypt)            │                      │
                        │         │              │                      │
                        │         └─────────────>│ 5. Check existing    │
                        │                        │    user by email     │
                        │                        │         │            │
                        │         ┌──────────────┤    User.findOne()    │
                        │         │              │                      │
                        │ 6. Create new user     │                      │
                        │         └─────────────>│ 7. Save user to DB   │
                        │                        │    User.create()     │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
                        │         │              │                      │
                        │ 8. Generate JWT token  │                      │
                        │    (7 days expiry)     │                      │
                        │         │              │                      │
          ┌─────────────┤ 9. Return user data    │                      │
          │             │    & token             │                      │
          │             │                        │                      │
10. Store token in      │                        │                      │
    localStorage        │                        │                      │
                        │                        │                      │
11. Update Redux state  │                        │                      │
    (authSlice)         │                        │                      │
                        │                        │                      │
12. Redirect to         │                        │                      │
    /app (Dashboard)    │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                               USER SIGN IN FLOW                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User visits          │                        │                      │
   /sign-in page        │                        │                      │
                        │                        │                      │
2. Enters credentials   │                        │                      │
   ├─ email             │                        │                      │
   └─ password          │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/users/       │                      │
                        │      sign-in           │                      │
                        │                        │                      │
                        │ 3. Validate input      │                      │
                        │         │              │                      │
                        │         └─────────────>│ 4. Find user by email│
                        │                        │    User.findOne()    │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
                        │         │              │                      │
                        │ 5. Compare password    │                      │
                        │    (bcrypt.compare)    │                      │
                        │         │              │                      │
                        │ 6. Generate JWT token  │                      │
                        │         │              │                      │
          ┌─────────────┤ 7. Return user &       │                      │
          │             │    token               │                      │
          │             │                        │                      │
8. Store token &        │                        │                      │
   update Redux state   │                        │                      │
                        │                        │                      │
9. Redirect to          │                        │                      │
   Dashboard            │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          PASSWORD RESET FLOW (OTP-BASED)                             │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User clicks          │                        │                      │
   "Forgot Password"    │                        │                      │
                        │                        │                      │
2. Enters email         │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/users/       │                      │
                        │      forgot-password   │                      │
                        │         │              │                      │
                        │         └─────────────>│ 3. Find user by email│
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
                        │         │              │                      │
                        │ 4. Generate 6-digit    │                      │
                        │    OTP (crypto)        │                      │
                        │         │              │                      │
                        │         └─────────────>│ 5. Store OTP & expiry│
                        │                        │    (10 min validity) │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
                        │         │              │                      │
                        │         └──────────────┼──────────────────────>│ 6. Send OTP email
                        │                        │                      │    (Nodemailer)
                        │         ┌──────────────┼──────────────────────┤
          ┌─────────────┤         │              │                      │
          │             │ 7. Return success      │                      │
          │             │                        │                      │
3. Show OTP input page  │                        │                      │
                        │                        │                      │
4. User enters OTP      │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/users/       │                      │
                        │      verify-otp        │                      │
                        │         │              │                      │
                        │         └─────────────>│ 5. Find user & verify│
                        │                        │    OTP & expiry      │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 6. Return success      │                      │
          │             │                        │                      │
7. Show new password    │                        │                      │
   form                 │                        │                      │
                        │                        │                      │
8. Submit new password  │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/users/       │                      │
                        │      reset-password    │                      │
                        │                        │                      │
                        │ 9. Hash new password   │                      │
                        │    (bcrypt)            │                      │
                        │         │              │                      │
                        │         └─────────────>│ 10. Update password  │
                        │                        │     Clear OTP fields │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 11. Return success     │                      │
          │             │                        │                      │
12. Redirect to         │                        │                      │
    sign-in page        │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              DASHBOARD & RESUME LIST FLOW                            │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User lands on        │                        │                      │
   /app (Dashboard)     │                        │                      │
                        │                        │                      │
2. Send request with    │                        │                      │
   JWT token            │                        │                      │
          │             │                        │                      │
          └────────────>│ GET /api/users/        │                      │
                        │     get-resumes        │                      │
                        │                        │                      │
                        │ 3. Verify JWT token    │                      │
                        │    (authMiddleware)    │                      │
                        │         │              │                      │
                        │         └─────────────>│ 4. Find all resumes  │
                        │                        │    by userId         │
                        │                        │    Resume.find()     │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 5. Return resume list  │                      │
          │             │                        │                      │
6. Display resumes in   │                        │                      │
   grid layout          │                        │                      │
   ├─ Title             │                        │                      │
   ├─ Template name     │                        │                      │
   ├─ Last updated      │                        │                      │
   └─ Actions (Edit,    │                        │                      │
      Delete, View)     │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            CREATE NEW RESUME FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User clicks          │                        │                      │
   "Create Resume"      │                        │                      │
                        │                        │                      │
2. Enters resume title  │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/resumes/     │                      │
                        │      create-resume     │                      │
                        │                        │                      │
                        │ 3. Verify JWT token    │                      │
                        │    Extract userId      │                      │
                        │         │              │                      │
                        │         └─────────────>│ 4. Create new resume │
                        │                        │    with default data │
                        │                        │    Resume.create()   │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 5. Return resume ID    │                      │
          │             │                        │                      │
6. Navigate to builder  │                        │                      │
   /app/builder/:id     │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                         RESUME BUILDER - EDIT & UPDATE FLOW                          │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. Navigate to builder  │                        │                      │
   /app/builder/:id     │                        │                      │
                        │                        │                      │
2. Fetch resume data    │                        │                      │
          │             │                        │                      │
          └────────────>│ GET /api/resumes/      │                      │
                        │     get-resume/:id     │                      │
                        │                        │                      │
                        │ 3. Verify token &      │                      │
                        │    userId              │                      │
                        │         │              │                      │
                        │         └─────────────>│ 4. Find resume       │
                        │                        │    Resume.findOne()  │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 5. Return resume data  │                      │
          │             │                        │                      │
6. Load sections:       │                        │                      │
   ├─ Personal Info     │                        │                      │
   ├─ Professional      │                        │                      │
   │  Summary           │                        │                      │
   ├─ Skills            │                        │                      │
   ├─ Experience        │                        │                      │
   ├─ Education         │                        │                      │
   ├─ Projects          │                        │                      │
   └─ Template Selector │                        │                      │
                        │                        │                      │
7. User edits fields    │                        │                      │
   (Auto-save enabled)  │                        │                      │
                        │                        │                      │
8. On field change:     │                        │                      │
   - Local state update │                        │                      │
   - Debounced save     │                        │                      │
          │             │                        │                      │
          └────────────>│ PUT /api/resumes/      │                      │
                        │     update-resume      │                      │
                        │                        │                      │
                        │ 9. Verify token        │                      │
                        │         │              │                      │
                        │         └─────────────>│ 10. Update resume    │
                        │                        │     Resume.findOne   │
                        │                        │     AndUpdate()      │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 11. Return success     │                      │
          │             │                        │                      │
12. Show success toast  │                        │                      │
                        │                        │                      │
13. Live preview updates│                        │                      │
    on right side       │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                         AI-POWERED CONTENT ENHANCEMENT FLOW                          │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
SCENARIO 1: Enhance Professional Summary
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User types summary   │                        │                      │
   in Professional      │                        │                      │
   Summary section      │                        │                      │
                        │                        │                      │
2. Clicks "Enhance      │                        │                      │
   with AI" button      │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/ai/          │                      │
                        │      enhance-pro-      │                      │
                        │      summary           │                      │
                        │                        │                      │
                        │ 3. Verify JWT token    │                      │
                        │                        │                      │
                        │ 4. Prepare OpenAI      │                      │
                        │    prompt with system  │                      │
                        │    & user content      │                      │
                        │         │              │                      │
                        │         └──────────────┼──────────────────────>│ 5. Send to OpenAI
                        │                        │                      │    GPT-4/3.5-turbo
                        │                        │                      │    Chat Completion
                        │                        │                      │         │
                        │         ┌──────────────┼──────────────────────┤         │
                        │         │              │                      │    6. Generate
                        │         │              │                      │       enhanced text
                        │         │              │                      │       (ATS-friendly)
                        │         │              │                      │         │
                        │         ┌──────────────┼──────────────────────┤         ✓
          ┌─────────────┤         │              │                      │
          │             │ 7. Return enhanced     │                      │
          │             │    summary             │                      │
          │             │                        │                      │
8. Display enhanced     │                        │                      │
   text in modal        │                        │                      │
                        │                        │                      │
9. User can accept or   │                        │                      │
   regenerate           │                        │                      │

────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
SCENARIO 2: Enhance Job Description
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User types job desc  │                        │                      │
   in Experience section│                        │                      │
                        │                        │                      │
2. Clicks "Enhance      │                        │                      │
   with AI" button      │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/ai/          │                      │
                        │      enhance-job-des   │                      │
                        │                        │                      │
                        │ 3. Process similar to  │                      │
                        │    professional summary│                      │
                        │         │              │                      │
                        │         └──────────────┼──────────────────────>│ 4. OpenAI processes
                        │                        │                      │    with job desc
                        │                        │                      │    specific prompt
                        │         ┌──────────────┼──────────────────────┤
          ┌─────────────┤         │              │                      │
          │             │ 5. Return enhanced     │                      │
8. Apply to form        │    description         │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                         AI RESUME PARSING & UPLOAD FLOW                              │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User uploads         │                        │                      │
   existing resume      │                        │                      │
   (PDF/DOCX/Text)      │                        │                      │
                        │                        │                      │
2. Extract text from    │                        │                      │
   document             │                        │                      │
                        │                        │                      │
3. Send resume text     │                        │                      │
   & title              │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/ai/          │                      │
                        │      upload-resume     │                      │
                        │                        │                      │
                        │ 4. Verify JWT token    │                      │
                        │                        │                      │
                        │ 5. Prepare AI prompt   │                      │
                        │    to extract:         │                      │
                        │    ├─ Personal info    │                      │
                        │    ├─ Summary          │                      │
                        │    ├─ Skills           │                      │
                        │    ├─ Experience       │                      │
                        │    ├─ Education        │                      │
                        │    └─ Projects         │                      │
                        │         │              │                      │
                        │         └──────────────┼──────────────────────>│ 6. OpenAI analyzes
                        │                        │                      │    resume text
                        │                        │                      │    Returns structured
                        │                        │                      │    JSON data
                        │                        │                      │         │
                        │         ┌──────────────┼──────────────────────┤         ✓
                        │         │              │                      │
                        │ 7. Parse JSON response │                      │
                        │         │              │                      │
                        │         └─────────────>│ 8. Create new resume │
                        │                        │    with extracted    │
                        │                        │    data              │
                        │                        │    Resume.create()   │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 9. Return resume ID    │                      │
          │             │    & parsed data       │                      │
          │             │                        │                      │
10. Navigate to builder │                        │                      │
    with pre-filled data│                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                      IMAGE UPLOAD & PROFILE PICTURE FLOW                             │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User uploads profile │                        │                      │
   picture in Personal  │                        │                      │
   Info section         │                        │                      │
                        │                        │                      │
2. Select image file    │                        │                      │
   (JPG/PNG)            │                        │                      │
                        │                        │                      │
3. Send as FormData     │                        │                      │
   with resume data     │                        │                      │
          │             │                        │                      │
          └────────────>│ PUT /api/resumes/      │                      │
                        │     update-resume      │                      │
                        │     (multipart)        │                      │
                        │                        │                      │
                        │ 4. Multer middleware   │                      │
                        │    handles file upload │                      │
                        │    Saves to /uploads/  │                      │
                        │         │              │                      │
                        │ 5. Read file from disk │                      │
                        │    (fs.readFileSync)   │                      │
                        │         │              │                      │
                        │         └──────────────┼──────────────────────>│ 6. Upload to
                        │                        │                      │    ImageKit CDN
                        │                        │                      │    - File buffer
                        │                        │                      │    - Unique filename
                        │                        │                      │    - Remove BG option
                        │                        │                      │         │
                        │         ┌──────────────┼──────────────────────┤         │
                        │         │              │                      │    7. Get CDN URL
                        │         │              │                      │       & file ID
                        │         │              │                      │         │
                        │         ┌──────────────┼──────────────────────┤         ✓
                        │         │              │                      │
                        │ 8. Delete local file   │                      │
                        │    (fs.unlinkSync)     │                      │
                        │         │              │                      │
                        │         └─────────────>│ 9. Update resume     │
                        │                        │    with image URL    │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 10. Return success     │                      │
          │             │     & image URL        │                      │
          │             │                        │                      │
11. Display image in    │                        │                      │
    preview             │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          TEMPLATE SELECTION & SWITCHING FLOW                         │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User in Resume       │                        │                      │
   Builder page         │                        │                      │
                        │                        │                      │
2. Opens Template       │                        │                      │
   Selector             │                        │                      │
                        │                        │                      │
3. Views available      │                        │                      │
   templates:           │                        │                      │
   ├─ Classic           │                        │                      │
   ├─ Modern            │                        │                      │
   ├─ Elegant           │                        │                      │
   ├─ Minimal           │                        │                      │
   ├─ Minimal Image     │                        │                      │
   ├─ Corporate         │                        │                      │
   ├─ ATS               │                        │                      │
   └─ ATS Image         │                        │                      │
                        │                        │                      │
4. Clicks on template   │                        │                      │
   thumbnail            │                        │                      │
                        │                        │                      │
5. Local state updates  │                        │                      │
   - Template name saved│                        │                      │
   - Preview re-renders │                        │                      │
                        │                        │                      │
6. Auto-save triggers   │                        │                      │
          │             │                        │                      │
          └────────────>│ PUT /api/resumes/      │                      │
                        │     update-resume      │                      │
                        │         │              │                      │
                        │         └─────────────>│ 7. Update template   │
                        │                        │    field in resume   │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │                        │                      │
8. Preview instantly    │                        │                      │
   updates with new     │                        │                      │
   template styling     │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        COLOR THEME CUSTOMIZATION FLOW                                │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User opens Color     │                        │                      │
   Picker component     │                        │                      │
                        │                        │                      │
2. Selects color:       │                        │                      │
   ├─ Primary color     │                        │                      │
   ├─ Secondary color   │                        │                      │
   ├─ Accent color      │                        │                      │
   └─ Text color        │                        │                      │
                        │                        │                      │
3. Color value updates  │                        │                      │
   (HEX/RGB)            │                        │                      │
                        │                        │                      │
4. Preview instantly    │                        │                      │
   shows color changes  │                        │                      │
                        │                        │                      │
5. Auto-save triggers   │                        │                      │
          │             │                        │                      │
          └────────────>│ PUT /api/resumes/      │                      │
                        │     update-resume      │                      │
                        │         │              │                      │
                        │         └─────────────>│ 6. Update color      │
                        │                        │    fields in resume  │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │                        │                      │
7. Colors applied to    │                        │                      │
   template CSS         │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                      RESUME PREVIEW & DOWNLOAD FLOW                                  │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
SCENARIO 1: Live Preview in Builder
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User edits any       │                        │                      │
   section in builder   │                        │                      │
                        │                        │                      │
2. ResumePreview        │                        │                      │
   component listens    │                        │                      │
   to state changes     │                        │                      │
                        │                        │                      │
3. Dynamically renders  │                        │                      │
   selected template    │                        │                      │
   with current data    │                        │                      │
                        │                        │                      │
4. Real-time update     │                        │                      │
   (no API call needed) │                        │                      │

────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
SCENARIO 2: Full Page Preview
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User clicks "Preview"│                        │                      │
   button               │                        │                      │
                        │                        │                      │
2. Navigate to          │                        │                      │
   /view/:resumeId      │                        │                      │
                        │                        │                      │
3. Check if public view │                        │                      │
   or private view      │                        │                      │
          │             │                        │                      │
          └────────────>│ GET /api/resumes/      │                      │
                        │     get-public-resume  │                      │
                        │     (if public)        │                      │
                        │     OR                 │                      │
                        │     get-resume         │                      │
                        │     (if private)       │                      │
                        │         │              │                      │
                        │         └─────────────>│ 4. Find resume       │
                        │                        │    Resume.findOne()  │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 5. Return resume data  │                      │
          │             │                        │                      │
6. Render full-page     │                        │                      │
   preview with selected│                        │                      │
   template             │                        │                      │
                        │                        │                      │
7. User can:            │                        │                      │
   ├─ Download PDF      │                        │                      │
   ├─ Print             │                        │                      │
   └─ Share link        │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            DELETE RESUME FLOW                                        │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User on Dashboard    │                        │                      │
   views resume list    │                        │                      │
                        │                        │                      │
2. Clicks delete icon   │                        │                      │
   on resume card       │                        │                      │
                        │                        │                      │
3. Confirmation modal   │                        │                      │
   appears              │                        │                      │
                        │                        │                      │
4. User confirms delete │                        │                      │
          │             │                        │                      │
          └────────────>│ DELETE /api/resumes/   │                      │
                        │        delete-resume/  │                      │
                        │        :resumeId       │                      │
                        │                        │                      │
                        │ 5. Verify JWT token    │                      │
                        │    & userId            │                      │
                        │         │              │                      │
                        │         └─────────────>│ 6. Find & delete     │
                        │                        │    resume            │
                        │                        │    Resume.findOne    │
                        │                        │    AndDelete()       │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 7. Return success      │                      │
          │             │                        │                      │
8. Remove from local    │                        │                      │
   state               │                        │                      │
                        │                        │                      │
9. Update UI - card     │                        │                      │
   disappears           │                        │                      │
                        │                        │                      │
10. Show success toast  │                        │                      │


┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            CONTACT FORM FLOW                                         │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User on Home page    │                        │                      │
   scrolls to Contact   │                        │                      │
   section              │                        │                      │
                        │                        │                      │
2. Fills contact form:  │                        │                      │
   ├─ Name              │                        │                      │
   ├─ Email             │                        │                      │
   ├─ Subject           │                        │                      │
   └─ Message           │                        │                      │
                        │                        │                      │
3. Submits form         │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/contact      │                      │
                        │                        │                      │
                        │ 4. Validate input      │                      │
                        │         │              │                      │
                        │         └──────────────┼──────────────────────>│ 5. Send email via
                        │                        │                      │    Nodemailer
                        │                        │                      │    To: Admin email
                        │                        │                      │    From: User email
                        │                        │                      │    Subject & Message
                        │                        │                      │         │
                        │         ┌──────────────┼──────────────────────┤         ✓
          ┌─────────────┤         │              │                      │
          │             │ 6. Return success      │                      │
          │             │                        │                      │
7. Show success message │                        │                      │
                        │                        │                      │
8. Clear form           │                        │                      │
```

---

## 🔑 Key Components & Services

### **Frontend (React + Vite)**
- **State Management**: Redux Toolkit (authSlice)
- **Routing**: React Router v6
- **UI Components**: 
  - Home landing page sections
  - Authentication pages
  - Dashboard
  - Resume Builder with live preview
  - Template components (8 templates)
- **API Client**: Axios (configured in `configs/api.js`)

### **Backend (Express.js)**
- **Authentication**: JWT with bcrypt password hashing
- **Middleware**: 
  - Auth middleware (token verification)
  - Multer (file uploads)
  - CORS enabled
- **Routes**: Users, Resumes, AI, Contact

### **Database (MongoDB)**
- **Models**: 
  - User (name, email, password, OTP fields)
  - Resume (all sections, template, colors, public status)
- **ORM**: Mongoose

### **External Services**
- **OpenAI API**: GPT-4/3.5-turbo for content enhancement & resume parsing
- **ImageKit**: CDN for profile picture storage & optimization
- **Nodemailer**: Email service for OTP & contact form

---

## 🔐 Security Features

1. **JWT Authentication**: 7-day token expiry
2. **Password Hashing**: bcrypt with salt rounds
3. **Protected Routes**: Middleware verification
4. **OTP-based Password Reset**: 10-minute expiry window
5. **User Authorization**: Resume ownership validation

---

## 🎨 Key Features

1. **8 Professional Templates**: Classic, Modern, Elegant, Minimal, Corporate, ATS-optimized
2. **AI-Powered Enhancements**: Professional summary & job descriptions
3. **AI Resume Parsing**: Upload existing resume for auto-fill
4. **Real-time Preview**: Live updates as user types
5. **Points System**: Earn points by following social media, use points to download CVs and unlock premium templates
6. **Payment Integration**: Purchase additional points through secure payment gateway

---

## 🪙 POINTS SYSTEM FLOW

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          POINTS SYSTEM INITIALIZATION                                │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. New user registers   │                        │                      │
   at /sign-up          │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/users/       │                      │
                        │      sign-up           │                      │
                        │                        │                      │
                        │ 2. Create user with    │                      │
                        │    initial points: 0   │                      │
                        │    points_history: []  │                      │
                        │    social_follows: {}  │                      │
                        │    unlocked_templates  │                      │
                        │         │              │                      │
                        │         └─────────────>│ 3. Save user with    │
                        │                        │    points data       │
                        │                        │    User.create({     │
                        │                        │      points: 0,      │
                        │                        │      social_follows, │
                        │                        │      unlocked_temps  │
                        │                        │    })                │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 4. Return user with    │                      │
          │             │    points: 0           │                      │
          │             │                        │                      │
5. Store user data      │                        │                      │
   in Redux store       │                        │                      │
   - Display points: 0  │                        │                      │
   in dashboard         │                        │                      │
```

---

## 📱 SOCIAL MEDIA FOLLOW & POINTS EARNING FLOW

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    EARN POINTS BY FOLLOWING SOCIAL MEDIA                            │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User views dashboard │                        │                      │
   Sees "Earn Points"   │                        │                      │
   section with:        │                        │                      │
   ├─ Instagram (1pt)   │                        │                      │
   ├─ Facebook (1pt)    │                        │                      │
   └─ TikTok (1pt)      │                        │                      │
                        │                        │                      │
2. User clicks          │                        │                      │
   "Follow on Instagram"│                        │                      │
          │             │                        │                      │
          └────────────>│                        │                      │─────────────────>
                        │                        │                      │  Instagram opens
                        │                        │                      │  in new tab
                        │                        │                      │  User follows @page
                        │                        │                      │         │
3. User clicks          │                        │                      │         ✓
   "Claim Points"       │                        │                      │
   button               │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/points/      │                      │
                        │      claim-social      │                      │
                        │ {                      │                      │
                        │   platform: "instagram"│                      │
                        │ }                      │                      │
                        │         │              │                      │
                        │ 4. Verify JWT token    │                      │
                        │    Get userId          │                      │
                        │         │              │                      │
                        │         └─────────────>│ 5. Check if already  │
                        │                        │    claimed           │
                        │                        │    User.findById()   │
                        │                        │    .social_follows   │
                        │                        │    .instagram        │
                        │                        │         │            │
                        │         ┌──────────────┤         │            │
                        │         │              │    If claimed:       │
                        │         │              │    return error      │
                        │         │              │         │            │
                        │         │              │    If not claimed:   │
                        │ 6. Update user:        │    continue          │
                        │    points += 1         │         │            │
                        │    social_follows      │         ✓            │
                        │    .instagram = true   │                      │
                        │    points_history.push │                      │
                        │         │              │                      │
                        │         └─────────────>│ 7. Save updates      │
                        │                        │    User.updateOne()  │
                        │                        │    $inc: {points: 1} │
                        │                        │    $set: {           │
                        │                        │      social_follows  │
                        │                        │    }                 │
                        │                        │    $push: {          │
                        │                        │      points_history  │
                        │                        │    }                 │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 8. Return updated      │                      │
          │             │    points & history    │                      │
          │             │                        │                      │
9. Update Redux store   │                        │                      │
   points: 1            │                        │                      │
                        │                        │                      │
10. Show success toast  │                        │                      │
    "Earned 1 point!"   │                        │                      │
                        │                        │                      │
11. Disable Instagram   │                        │                      │
    button (claimed)    │                        │                      │
                        │                        │                      │
12. Repeat for Facebook │                        │                      │
    and TikTok          │                        │                      │
    (Max 3 points total)│                        │                      │
```

---

## 📥 CV DOWNLOAD WITH POINTS DEDUCTION FLOW

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                     CV DOWNLOAD WITH POINTS DEDUCTION                               │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User completes resume│                        │                      │
   in Resume Builder    │                        │                      │
                        │                        │                      │
2. User clicks          │                        │                      │
   "Download PDF"       │                        │                      │
   button               │                        │                      │
          │             │                        │                      │
3. Check user points    │                        │                      │
   from Redux store     │                        │                      │
          │             │                        │                      │
   If points < 1:       │                        │                      │
   Show modal:          │                        │                      │
   "Not enough points!" │                        │                      │
   "Follow social media │                        │                      │
    or buy points"      │                        │                      │
   [STOP]               │                        │                      │
          │             │                        │                      │
   If points >= 1:      │                        │                      │
   Show confirmation    │                        │                      │
   "Download costs 1pt" │                        │                      │
          │             │                        │                      │
4. User confirms        │                        │                      │
   download             │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/resume/      │                      │
                        │      download          │                      │
                        │ {                      │                      │
                        │   resumeId: "xxx"      │                      │
                        │ }                      │                      │
                        │         │              │                      │
                        │ 5. Verify JWT token    │                      │
                        │    Get userId          │                      │
                        │         │              │                      │
                        │         └─────────────>│ 6. Check user points │
                        │                        │    User.findById()   │
                        │                        │         │            │
                        │         ┌──────────────┤         │            │
                        │         │              │    If points < 1:    │
                        │         │              │    return 403 error  │
                        │         │              │         │            │
                        │         │              │    If points >= 1:   │
                        │ 7. Deduct 1 point:     │    continue          │
                        │    points -= 1         │         ✓            │
                        │    downloads_count += 1│                      │
                        │    points_history.push │                      │
                        │         │              │                      │
                        │         └─────────────>│ 8. Update user       │
                        │                        │    User.updateOne()  │
                        │                        │    $inc: {           │
                        │                        │      points: -1,     │
                        │                        │      downloads: 1    │
                        │                        │    }                 │
                        │                        │    $push: {          │
                        │                        │      points_history  │
                        │                        │    }                 │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
                        │         │              │                      │
                        │ 9. Generate PDF        │                      │
                        │    using resume data   │                      │
                        │    & selected template │                      │
                        │         │              │                      │
          ┌─────────────┤ 10. Return PDF file    │                      │
          │             │     & updated points   │                      │
          │             │                        │                      │
11. Update Redux store  │                        │                      │
    points -= 1         │                        │                      │
                        │                        │                      │
12. Trigger browser     │                        │                      │
    download            │                        │                      │
                        │                        │                      │
13. Show success toast  │                        │                      │
    "Resume downloaded! │                        │                      │
     Points: X"         │                        │                      │
```

---

## 🔓 PREMIUM TEMPLATES UNLOCK FLOW

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        UNLOCK PREMIUM TEMPLATES                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User views Template  │                        │                      │
   Selector in Resume   │                        │                      │
   Builder              │                        │                      │
                        │                        │                      │
   Templates shown:     │                        │                      │
   ├─ Classic (FREE)    │                        │                      │
   ├─ ATS (FREE)        │                        │                      │
   ├─ Modern (2 pts) 🔒 │                        │                      │
   ├─ Elegant (3 pts) 🔒│                        │                      │
   ├─ Minimal (2 pts) 🔒│                        │                      │
   ├─ Corporate (3 pts)🔒│                        │                      │
   ├─ Minimal-Img (4pt)🔒│                        │                      │
   └─ ATS-Image (4 pts)🔒│                        │                      │
                        │                        │                      │
2. User clicks on       │                        │                      │
   "Modern" template    │                        │                      │
   (requires 2 points)  │                        │                      │
          │             │                        │                      │
3. Check if unlocked    │                        │                      │
   in user.unlocked_    │                        │                      │
   templates            │                        │                      │
          │             │                        │                      │
   If unlocked:         │                        │                      │
   Apply template       │                        │                      │
   [END]                │                        │                      │
          │             │                        │                      │
   If locked:           │                        │                      │
   Show unlock modal    │                        │                      │
   "Unlock Modern       │                        │                      │
    template for 2pts?" │                        │                      │
          │             │                        │                      │
4. Check user points    │                        │                      │
   If points < 2:       │                        │                      │
   Show "Not enough     │                        │                      │
   points" message      │                        │                      │
   [STOP]               │                        │                      │
          │             │                        │                      │
5. User confirms unlock │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/templates/   │                      │
                        │      unlock            │                      │
                        │ {                      │                      │
                        │   templateName:"modern"│                      │
                        │   cost: 2              │                      │
                        │ }                      │                      │
                        │         │              │                      │
                        │ 6. Verify JWT          │                      │
                        │    Get userId          │                      │
                        │         │              │                      │
                        │         └─────────────>│ 7. Validate:         │
                        │                        │    - User exists     │
                        │                        │    - Points >= cost  │
                        │                        │    - Not unlocked    │
                        │                        │         │            │
                        │         ┌──────────────┤         │            │
                        │         │              │    If invalid:       │
                        │         │              │    return error      │
                        │         │              │         │            │
                        │ 8. Update user:        │    If valid:         │
                        │    points -= 2         │    continue          │
                        │    unlocked_templates  │         ✓            │
                        │    .push("modern")     │                      │
                        │    points_history.push │                      │
                        │         │              │                      │
                        │         └─────────────>│ 9. Save updates      │
                        │                        │    User.updateOne()  │
                        │                        │    $inc: {points:-2} │
                        │                        │    $push: {          │
                        │                        │      unlocked_temps, │
                        │                        │      points_history  │
                        │                        │    }                 │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 10. Return success     │                      │
          │             │     & updated data     │                      │
          │             │                        │                      │
11. Update Redux:       │                        │                      │
    points -= 2         │                        │                      │
    unlocked_templates  │                        │                      │
    .push("modern")     │                        │                      │
                        │                        │                      │
12. Apply "Modern"      │                        │                      │
    template to resume  │                        │                      │
                        │                        │                      │
13. Show success:       │                        │                      │
    "Template unlocked!"│                        │                      │
    Remove 🔒 icon      │                        │                      │
```

---

## 💳 POINTS PURCHASE WITH PAYMENT GATEWAY FLOW

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                   BUY POINTS WITH PAYMENT GATEWAY (STRIPE)                          │
└─────────────────────────────────────────────────────────────────────────────────────┘

CLIENT (React)          │  SERVER (Express)      │  DATABASE (MongoDB)  │  EXTERNAL SERVICES
────────────────────────┼────────────────────────┼──────────────────────┼───────────────────
                        │                        │                      │
1. User clicks          │                        │                      │
   "Buy Points" button  │                        │                      │
   in dashboard         │                        │                      │
                        │                        │                      │
2. Show points packages:│                        │                      │
   ├─ 5 points - $2.99  │                        │                      │
   ├─ 10 points - $4.99 │                        │                      │
   ├─ 25 points - $9.99 │                        │                      │
   └─ 50 points - $16.99│                        │                      │
          │             │                        │                      │
3. User selects package │                        │                      │
   (e.g., 10 points)    │                        │                      │
          │             │                        │                      │
          └────────────>│ POST /api/payment/     │                      │
                        │      create-checkout   │                      │
                        │ {                      │                      │
                        │   packageId: "10pts",  │                      │
                        │   amount: 499 (cents), │                      │
                        │   points: 10           │                      │
                        │ }                      │                      │
                        │         │              │                      │
                        │ 4. Verify JWT token    │                      │
                        │    Get userId          │                      │
                        │         │              │                      │
                        │ 5. Create Stripe       │                      │
                        │    checkout session    │                      │
                        │         │              │                      │
                        │         └──────────────┼──────────────────────┼─────────────────>
                        │                        │                      │  Stripe API
                        │                        │                      │  POST /checkout/
                        │                        │                      │       sessions
                        │                        │                      │  {
                        │                        │                      │    amount: 499,
                        │                        │                      │    currency: USD,
                        │                        │                      │    metadata: {
                        │                        │                      │      userId,
                        │                        │                      │      points: 10
                        │                        │                      │    }
                        │                        │                      │  }
                        │                        │                      │         │
                        │         ┌──────────────┼──────────────────────┤<────────┘
                        │         │              │                      │  Returns:
                        │         │              │                      │  sessionId
                        │         │              │                      │  checkout URL
                        │         │              │                      │
                        │ 6. Store pending       │                      │
                        │    transaction         │                      │
                        │         │              │                      │
                        │         └─────────────>│ 7. Create Transaction│
                        │                        │    Transaction.create│
                        │                        │    {                 │
                        │                        │      userId,         │
                        │                        │      points: 10,     │
                        │                        │      amount: 4.99,   │
                        │                        │      status:pending, │
                        │                        │      sessionId       │
                        │                        │    }                 │
                        │                        │         │            │
                        │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 8. Return checkout URL │                      │
          │             │                        │                      │
9. Redirect user to     │                        │                      │
   Stripe checkout page │                        │                      │
          │             │                        │                      │
          └─────────────┼────────────────────────┼──────────────────────┼─────────────────>
                        │                        │                      │  Stripe Checkout
                        │                        │                      │  User enters card
                        │                        │                      │  details
                        │                        │                      │         │
                        │                        │                      │  User submits
                        │                        │                      │  payment
                        │                        │                      │         │
                        │                        │                      │<────────┘
                        │                        │                      │  Payment processed
                        │                        │                      │         │
          ┌─────────────┼────────────────────────┼──────────────────────┤         │
          │             │                        │                      │  Stripe Webhook
          │             │<───────────────────────┼──────────────────────┤  triggered
10. Payment successful  │                        │                      │  checkout.session
    User redirected to  │                        │                      │  .completed
    success page        │                        │                      │         │
          │             │                        │                      │         │
          │             │ POST /api/webhooks/    │                      │         │
          │             │      stripe<───────────┼──────────────────────┤<────────┘
          │             │ {                      │                      │
          │             │   type: "checkout.     │                      │
          │             │          session.      │                      │
          │             │          completed",   │                      │
          │             │   data: {              │                      │
          │             │     sessionId,         │                      │
          │             │     metadata: {        │                      │
          │             │       userId,          │                      │
          │             │       points: 10       │                      │
          │             │     }                  │                      │
          │             │   }                    │                      │
          │             │ }                      │                      │
          │             │         │              │                      │
          │             │ 11. Verify webhook     │                      │
          │             │     signature          │                      │
          │             │         │              │                      │
          │             │         └─────────────>│ 12. Update user:     │
          │             │                        │     points += 10     │
          │             │                        │     User.updateOne() │
          │             │                        │     $inc: {          │
          │             │                        │       points: 10     │
          │             │                        │     }                │
          │             │                        │     $push: {         │
          │             │                        │       points_history │
          │             │                        │     }                │
          │             │                        │         │            │
          │             │         ┌──────────────┤         ✓            │
          │             │         │              │                      │
          │             │         └─────────────>│ 13. Update trans     │
          │             │                        │     status:completed │
          │             │                        │         │            │
          │             │         ┌──────────────┤         ✓            │
          │             │         │              │                      │
          │             │ 14. Send email receipt │                      │
          │             │         │              │                      │
          │             │         └──────────────┼──────────────────────┼─────────────────>
          │             │                        │                      │  Nodemailer
          │             │                        │                      │  To: user email
          │             │                        │                      │  Subject: Receipt
          │             │                        │                      │  10 points added
          │             │                        │                      │         │
          │             │         ┌──────────────┼──────────────────────┤         ✓
          │             │         │              │                      │
          │             │ 15. Return 200 OK      │                      │
          │             │                        │                      │
          │<────────────┤ 16. Fetch updated user │                      │
          │             │     data               │                      │
          │             │         │              │                      │
          │             │         └─────────────>│ 17. Get user         │
          │             │                        │     User.findById()  │
          │             │                        │         │            │
          │             │         ┌──────────────┤         ✓            │
          ┌─────────────┤         │              │                      │
          │             │ 18. Return user data   │                      │
          │             │                        │                      │
19. Update Redux store  │                        │                      │
    points += 10        │                        │                      │
                        │                        │                      │
20. Show success:       │                        │                      │
    "10 points added!"  │                        │                      │
    "Current: X points" │                        │                      │
```

---

## 📊 Points System Summary

### **Point Economics**
- **New User**: Starts with 0 points
- **Social Media Follows**: 1 point each (max 3 points)
  - Instagram: 1 point
  - Facebook: 1 point
  - TikTok: 1 point
- **CV Download**: -1 point per download
- **Template Unlocks**:
  - Modern: 2 points
  - Elegant: 3 points
  - Minimal: 2 points
  - Corporate: 3 points
  - Minimal-Image: 4 points
  - ATS-Image: 4 points

### **Purchase Packages**
- 5 points: $2.99
- 10 points: $4.99 (Best Value)
- 25 points: $9.99
- 50 points: $16.99

### **Payment Gateway**
- Provider: Stripe
- Payment Methods: Credit/Debit cards, Digital wallets
- Security: PCI DSS compliant
- Webhook: Automatic points credit on successful payment

---

## 🔑 Key Components & Services

### **Frontend (React + Vite)**
- **State Management**: Redux Toolkit (authSlice, pointsSlice)
- **Routing**: React Router v6
- **UI Components**: 
  - Home landing page sections
  - Authentication pages
  - Dashboard with Points display
  - Earn Points section
  - Buy Points modal
  - Resume Builder with live preview
  - Template components (8 templates with lock/unlock)
- **API Client**: Axios (configured in `configs/api.js`)
- **Payment**: Stripe.js / Stripe React library

### **Backend (Express.js)**
- **Authentication**: JWT with bcrypt password hashing
- **Middleware**: 
  - Auth middleware (token verification)
  - Multer (file uploads)
  - CORS enabled
- **Routes**: Users, Resumes, AI, Contact, Points, Payment, Webhooks

### **Database (MongoDB)**
- **Models**: 
  - User (name, email, password, points, social_follows, unlocked_templates, points_history)
  - Resume (all sections, template, colors, public status)
  - Transaction (userId, points, amount, status, sessionId)
- **ORM**: Mongoose

### **External Services**
- **OpenAI API**: GPT-4/3.5-turbo for content enhancement & resume parsing
- **ImageKit**: CDN for profile picture storage & optimization
- **Nodemailer**: Email service for OTP, contact form & payment receipts
- **Stripe**: Payment gateway for points purchase

---

## 🔐 Security Features

1. **JWT Authentication**: 7-day token expiry
2. **Password Hashing**: bcrypt with salt rounds
3. **Protected Routes**: Middleware verification
4. **OTP-based Password Reset**: 10-minute expiry window
5. **User Authorization**: Resume ownership validation
6. **Stripe Webhook Verification**: Signature validation for payment events
7. **Points Transaction Logging**: Complete audit trail

---

## 🎨 Key Features

1. **8 Professional Templates**: Classic, Modern, Elegant, Minimal, Corporate, ATS-optimized
2. **AI-Powered Enhancements**: Professional summary & job descriptions
3. **AI Resume Parsing**: Upload existing resume for auto-fill
4. **Real-time Preview**: Live updates as user types
5. **Custom Colors**: Theme customization
6. **Image Upload**: Profile pictures with CDN storage
7. **Auto-save**: Debounced save functionality
8. **Public/Private Sharing**: Share resume links
9. **Responsive Design**: Mobile-friendly interface

---

*This swimlane diagram provides a complete overview of the AI Resume Builder application architecture and data flow across all layers.*
