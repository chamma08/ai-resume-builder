# Test Scenarios and Cases - AI Resume Builder

## Table of Contents
1. [Authentication & User Management](#1-authentication--user-management)
2. [Resume Management](#2-resume-management)
3. [Resume Builder Functionality](#3-resume-builder-functionality)
4. [AI Features](#4-ai-features)
5. [Template & Customization](#5-template--customization)
6. [File Upload & Image Management](#6-file-upload--image-management)
7. [Public Resume Sharing](#7-public-resume-sharing)
8. [Dashboard](#8-dashboard)
9. [Navigation & Routing](#9-navigation--routing)
10. [Security & Authorization](#10-security--authorization)
11. [Performance & Integration](#11-performance--integration)

---

## 1. Authentication & User Management

### Test Scenario 1.1: User Registration
**Objective:** Verify that new users can successfully register

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-AUTH-001 | Register with valid credentials | 1. Navigate to Sign Up page<br>2. Enter valid name, email, password<br>3. Click Sign Up button | User account created successfully, JWT token generated, redirected to dashboard | High |
| TC-AUTH-002 | Register with existing email | 1. Navigate to Sign Up page<br>2. Enter name, existing email, password<br>3. Click Sign Up | Error message: "User already exists" displayed | High |
| TC-AUTH-003 | Register with missing fields | 1. Navigate to Sign Up page<br>2. Leave one or more fields empty<br>3. Click Sign Up | Error message: "All fields are required" | High |
| TC-AUTH-004 | Register with invalid email format | 1. Navigate to Sign Up page<br>2. Enter invalid email format<br>3. Click Sign Up | Frontend validation error for email format | Medium |
| TC-AUTH-005 | Register with weak password | 1. Navigate to Sign Up page<br>2. Enter password less than minimum length<br>3. Click Sign Up | Validation error for password strength | Medium |

### Test Scenario 1.2: User Login
**Objective:** Verify that registered users can login successfully

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-AUTH-006 | Login with valid credentials | 1. Navigate to Sign In page<br>2. Enter valid email and password<br>3. Click Sign In | User logged in successfully, JWT token stored, redirected to dashboard | High |
| TC-AUTH-007 | Login with invalid email | 1. Navigate to Sign In page<br>2. Enter non-existent email<br>3. Click Sign In | Error message: "Invalid credentials" | High |
| TC-AUTH-008 | Login with wrong password | 1. Navigate to Sign In page<br>2. Enter correct email, wrong password<br>3. Click Sign In | Error message: "Invalid credentials" | High |
| TC-AUTH-009 | Login with missing fields | 1. Navigate to Sign In page<br>2. Leave email or password empty<br>3. Click Sign In | Error message: "All fields are required" | High |
| TC-AUTH-010 | Token persistence | 1. Login successfully<br>2. Close browser<br>3. Reopen and navigate to app | User remains logged in, session persists | High |

### Test Scenario 1.3: Password Reset
**Objective:** Verify password reset functionality works correctly

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-AUTH-011 | Request password reset with valid email | 1. Navigate to Forgot Password<br>2. Enter registered email<br>3. Submit | OTP sent to email, success message displayed | High |
| TC-AUTH-012 | Request password reset with non-existent email | 1. Navigate to Forgot Password<br>2. Enter non-registered email<br>3. Submit | Appropriate error message displayed | Medium |
| TC-AUTH-013 | Verify OTP with correct code | 1. Request password reset<br>2. Enter correct OTP received<br>3. Verify | OTP verified, proceed to reset password page | High |
| TC-AUTH-014 | Verify OTP with incorrect code | 1. Request password reset<br>2. Enter incorrect OTP<br>3. Verify | Error message: "Invalid OTP" | High |
| TC-AUTH-015 | Verify expired OTP | 1. Request password reset<br>2. Wait for OTP expiration<br>3. Enter OTP | Error message: "OTP expired" | Medium |
| TC-AUTH-016 | Reset password successfully | 1. Complete OTP verification<br>2. Enter new password<br>3. Confirm new password<br>4. Submit | Password reset successful, redirect to login | High |

### Test Scenario 1.4: User Session Management
**Objective:** Verify session handling and token management

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-AUTH-017 | Auto-login on app load with valid token | 1. Have valid token in localStorage<br>2. Refresh page | User data fetched, user logged in automatically | High |
| TC-AUTH-018 | Handle expired token | 1. Have expired token in localStorage<br>2. Try to access protected route | User redirected to login page | High |
| TC-AUTH-019 | Logout functionality | 1. Login as user<br>2. Click logout button | Token removed, user logged out, redirected to home | High |

---

## 2. Resume Management

### Test Scenario 2.1: Resume Creation
**Objective:** Verify users can create new resumes

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-RES-001 | Create new resume with title | 1. Login to dashboard<br>2. Click "Create Resume"<br>3. Enter resume title<br>4. Submit | New resume created, redirected to resume builder | High |
| TC-RES-002 | Create resume without title | 1. Login to dashboard<br>2. Click "Create Resume"<br>3. Leave title empty<br>4. Submit | Resume created with default title "Untitled Resume" | Medium |
| TC-RES-003 | Create multiple resumes | 1. Login to dashboard<br>2. Create first resume<br>3. Return to dashboard<br>4. Create second resume | Both resumes visible in dashboard | High |

### Test Scenario 2.2: Resume Retrieval
**Objective:** Verify users can retrieve their resumes

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-RES-004 | Get all user resumes | 1. Login as user with existing resumes<br>2. Navigate to dashboard | All user's resumes displayed correctly | High |
| TC-RES-005 | Get specific resume by ID | 1. Login and navigate to dashboard<br>2. Click on specific resume | Resume data loaded in builder | High |
| TC-RES-006 | Get resume with invalid ID | 1. Login<br>2. Navigate to /resume-builder/invalid-id | Error message: "Resume not found" | Medium |
| TC-RES-007 | Unauthorized resume access | 1. Login as User A<br>2. Try to access User B's resume ID | Error 404 or unauthorized access | High |

### Test Scenario 2.3: Resume Update
**Objective:** Verify resume update functionality

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-RES-008 | Update personal information | 1. Open resume in builder<br>2. Modify personal info fields<br>3. Save | Personal info updated successfully | High |
| TC-RES-009 | Update professional summary | 1. Open resume in builder<br>2. Edit professional summary<br>3. Save | Summary updated successfully | High |
| TC-RES-010 | Add experience entry | 1. Open resume in builder<br>2. Click "Add Experience"<br>3. Fill in details<br>4. Save | New experience entry added | High |
| TC-RES-011 | Edit existing experience | 1. Open resume with experience<br>2. Modify experience entry<br>3. Save | Experience updated successfully | High |
| TC-RES-012 | Delete experience entry | 1. Open resume with experience<br>2. Click delete on entry<br>3. Confirm | Experience entry removed | Medium |
| TC-RES-013 | Add education entry | 1. Open resume in builder<br>2. Add education details<br>3. Save | Education entry added successfully | High |
| TC-RES-014 | Add/update skills | 1. Open resume in builder<br>2. Add multiple skills<br>3. Save | Skills array updated correctly | High |
| TC-RES-015 | Add project entry | 1. Open resume in builder<br>2. Add project details<br>3. Save | Project added successfully | High |
| TC-RES-016 | Update resume title | 1. Open resume in builder<br>2. Change resume title<br>3. Save | Title updated in database and UI | Medium |

### Test Scenario 2.4: Resume Deletion
**Objective:** Verify resume deletion functionality

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-RES-017 | Delete own resume | 1. Login to dashboard<br>2. Select resume to delete<br>3. Confirm deletion | Resume deleted from database and UI | High |
| TC-RES-018 | Delete non-existent resume | 1. Login<br>2. Send delete request with invalid ID | Error message: "Resume not found" | Low |
| TC-RES-019 | Delete resume of another user | 1. Login as User A<br>2. Try to delete User B's resume | Unauthorized error, resume not deleted | High |

---

## 3. Resume Builder Functionality

### Test Scenario 3.1: Personal Information Section
**Objective:** Verify personal info input and validation

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-BUILD-001 | Enter all personal details | 1. Fill full name, email, phone, location<br>2. Add LinkedIn, website<br>3. Save | All fields saved correctly | High |
| TC-BUILD-002 | Upload profile image | 1. Click upload image<br>2. Select valid image file<br>3. Upload | Image uploaded to ImageKit, URL saved | High |
| TC-BUILD-003 | Upload invalid file type | 1. Click upload image<br>2. Select non-image file<br>3. Try to upload | Error message for invalid file type | Medium |
| TC-BUILD-004 | Upload oversized image | 1. Click upload image<br>2. Select image > size limit<br>3. Try to upload | Error message for file size | Medium |
| TC-BUILD-005 | Remove uploaded image | 1. Have image uploaded<br>2. Click remove image<br>3. Save | Image removed, default placeholder shown | Low |
| TC-BUILD-006 | Validate email format | 1. Enter invalid email format<br>2. Try to save | Validation error displayed | Medium |
| TC-BUILD-007 | Validate phone format | 1. Enter invalid phone format<br>2. Try to save | Validation warning/error displayed | Low |

### Test Scenario 3.2: Professional Summary Section
**Objective:** Verify professional summary functionality

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-BUILD-008 | Write professional summary | 1. Navigate to summary section<br>2. Enter summary text<br>3. Save | Summary saved correctly | High |
| TC-BUILD-009 | Summary character limit | 1. Enter very long summary<br>2. Check character count | Character limit enforced if applicable | Low |

### Test Scenario 3.3: Experience Section
**Objective:** Verify work experience management

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-BUILD-010 | Add new experience | 1. Click "Add Experience"<br>2. Fill company, position, dates, description<br>3. Save | Experience entry created | High |
| TC-BUILD-011 | Mark current position | 1. Add experience<br>2. Check "Currently working here"<br>3. Save | End date disabled, is_current set to true | Medium |
| TC-BUILD-012 | Add multiple experiences | 1. Add first experience<br>2. Add second experience<br>3. Save | Both experiences saved in array | High |
| TC-BUILD-013 | Edit experience entry | 1. Click edit on existing experience<br>2. Modify fields<br>3. Save | Changes saved correctly | High |
| TC-BUILD-014 | Delete experience | 1. Click delete on experience<br>2. Confirm | Experience removed from array | Medium |
| TC-BUILD-015 | Reorder experiences | 1. Have multiple experiences<br>2. Drag to reorder<br>3. Save | Order updated correctly | Low |
| TC-BUILD-016 | Validate date ranges | 1. Add experience<br>2. Set end date before start date<br>3. Save | Validation error displayed | Medium |

### Test Scenario 3.4: Education Section
**Objective:** Verify education information management

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-BUILD-017 | Add education entry | 1. Click "Add Education"<br>2. Fill institution, degree, field, date, GPA<br>3. Save | Education entry created | High |
| TC-BUILD-018 | Add multiple education entries | 1. Add first education<br>2. Add second education<br>3. Save | Both entries saved correctly | High |
| TC-BUILD-019 | Edit education entry | 1. Click edit on existing education<br>2. Modify fields<br>3. Save | Changes saved correctly | Medium |
| TC-BUILD-020 | Delete education entry | 1. Click delete on education<br>2. Confirm | Education removed | Medium |
| TC-BUILD-021 | Optional GPA field | 1. Add education without GPA<br>2. Save | Entry saved, GPA field empty | Low |

### Test Scenario 3.5: Skills Section
**Objective:** Verify skills management

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-BUILD-022 | Add single skill | 1. Navigate to skills section<br>2. Enter skill name<br>3. Add | Skill added to array | High |
| TC-BUILD-023 | Add multiple skills | 1. Add first skill<br>2. Add second skill<br>3. Continue adding | All skills saved in array | High |
| TC-BUILD-024 | Delete skill | 1. Have skills added<br>2. Click delete on skill<br>3. Confirm | Skill removed from array | Medium |
| TC-BUILD-025 | Edit skill | 1. Have skills added<br>2. Click edit on skill<br>3. Modify and save | Skill text updated | Medium |
| TC-BUILD-026 | Duplicate skill prevention | 1. Add skill "JavaScript"<br>2. Try to add "JavaScript" again | Duplicate prevented or warning shown | Low |

### Test Scenario 3.6: Project Section
**Objective:** Verify project information management

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-BUILD-027 | Add new project | 1. Click "Add Project"<br>2. Fill name, type, description<br>3. Save | Project entry created | High |
| TC-BUILD-028 | Add multiple projects | 1. Add first project<br>2. Add second project<br>3. Save | Both projects saved | High |
| TC-BUILD-029 | Edit project | 1. Click edit on project<br>2. Modify fields<br>3. Save | Changes saved correctly | Medium |
| TC-BUILD-030 | Delete project | 1. Click delete on project<br>2. Confirm | Project removed | Medium |

---

## 4. AI Features

### Test Scenario 4.1: AI Professional Summary Enhancement
**Objective:** Verify AI enhancement of professional summary

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-AI-001 | Enhance professional summary | 1. Enter basic summary<br>2. Click "Enhance with AI"<br>3. Wait for response | Enhanced summary returned from OpenAI | High |
| TC-AI-002 | Enhance empty summary | 1. Leave summary empty<br>2. Click "Enhance with AI" | Error message: "User content is required" | Medium |
| TC-AI-003 | Enhance very short summary | 1. Enter 1-2 word summary<br>2. Click enhance | AI returns expanded professional summary | Medium |
| TC-AI-004 | Apply AI suggestion | 1. Get AI enhancement<br>2. Click "Apply"<br>3. Save | Enhanced text replaces original summary | High |
| TC-AI-005 | Reject AI suggestion | 1. Get AI enhancement<br>2. Click "Cancel" or close<br>3. Check content | Original text remains unchanged | Medium |

### Test Scenario 4.2: AI Job Description Enhancement
**Objective:** Verify AI enhancement of job descriptions

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-AI-006 | Enhance job description | 1. Enter basic job description in experience<br>2. Click "Enhance with AI"<br>3. Wait | Enhanced description returned | High |
| TC-AI-007 | Enhance empty job description | 1. Leave description empty<br>2. Click enhance | Error message displayed | Medium |
| TC-AI-008 | Apply enhanced job description | 1. Get AI enhancement<br>2. Apply suggestion<br>3. Save | Enhanced text saved to experience | High |
| TC-AI-009 | Multiple AI enhancements | 1. Enhance summary<br>2. Enhance job description<br>3. Check both | Both AI calls work independently | Medium |

### Test Scenario 4.3: AI Resume Upload and Parsing
**Objective:** Verify AI can parse uploaded resume text

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-AI-010 | Upload and parse resume text | 1. Upload resume text<br>2. Provide title<br>3. Submit | AI extracts and populates all fields correctly | High |
| TC-AI-011 | Parse incomplete resume | 1. Upload resume with missing sections<br>2. Submit | AI fills available data, leaves missing fields empty | Medium |
| TC-AI-012 | Handle AI parsing errors | 1. Upload invalid text<br>2. Submit | Error handled gracefully | Medium |
| TC-AI-013 | Parse resume without title | 1. Upload resume text<br>2. Leave title empty<br>3. Submit | Error: "Resume text and title are required" | Low |

### Test Scenario 4.4: AI Error Handling
**Objective:** Verify AI feature error handling

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-AI-014 | Handle OpenAI API failure | 1. Trigger AI feature when API is down<br>2. Wait for timeout | User-friendly error message displayed | High |
| TC-AI-015 | Handle rate limiting | 1. Make multiple rapid AI requests<br>2. Exceed rate limit | Rate limit error message displayed | Medium |
| TC-AI-016 | Handle network timeout | 1. Trigger AI feature with slow connection<br>2. Wait | Timeout error handled gracefully | Medium |

---

## 5. Template & Customization

### Test Scenario 5.1: Template Selection
**Objective:** Verify users can select and apply different templates

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-TEMP-001 | Select Classic template | 1. Open template selector<br>2. Select "Classic"<br>3. Preview | Classic template applied to preview | High |
| TC-TEMP-002 | Select Modern template | 1. Open template selector<br>2. Select "Modern"<br>3. Preview | Modern template applied | High |
| TC-TEMP-003 | Select Elegant template | 1. Select "Elegant" template<br>2. Preview | Elegant template applied | High |
| TC-TEMP-004 | Select Minimal template | 1. Select "Minimal" template<br>2. Preview | Minimal template applied | High |
| TC-TEMP-005 | Select Corporate template | 1. Select "Corporate" template<br>2. Preview | Corporate template applied | High |
| TC-TEMP-006 | Select ATS template | 1. Select "ATS" template<br>2. Preview | ATS-friendly template applied | High |
| TC-TEMP-007 | Select ATS Image template | 1. Select "ATS Image" template<br>2. Preview | ATS template with image support applied | Medium |
| TC-TEMP-008 | Select Minimal Image template | 1. Select "Minimal Image" template<br>2. Preview | Minimal template with image applied | Medium |
| TC-TEMP-009 | Switch between templates | 1. Select template A<br>2. Switch to template B<br>3. Verify | Data preserved, new template applied | High |
| TC-TEMP-010 | Save template selection | 1. Select template<br>2. Save resume<br>3. Reload | Selected template persists | High |

### Test Scenario 5.2: Color Customization
**Objective:** Verify accent color customization

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-COLOR-001 | Change accent color | 1. Open color picker<br>2. Select new color<br>3. Apply | Accent color updated in preview | High |
| TC-COLOR-002 | Use custom hex color | 1. Open color picker<br>2. Enter custom hex code<br>3. Apply | Custom color applied | Medium |
| TC-COLOR-003 | Save color preference | 1. Change accent color<br>2. Save resume<br>3. Reload | Color preference persists | High |
| TC-COLOR-004 | Reset to default color | 1. Change color<br>2. Click reset<br>3. Check preview | Default color (#3B82F6) restored | Low |
| TC-COLOR-005 | Color affects all templates | 1. Change color<br>2. Switch templates<br>3. Verify | Color consistent across templates | Medium |

---

## 6. File Upload & Image Management

### Test Scenario 6.1: Profile Image Upload
**Objective:** Verify profile image upload functionality

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-IMG-001 | Upload JPG image | 1. Select JPG file<br>2. Upload | Image uploaded to ImageKit successfully | High |
| TC-IMG-002 | Upload PNG image | 1. Select PNG file<br>2. Upload | Image uploaded successfully | High |
| TC-IMG-003 | Upload JPEG image | 1. Select JPEG file<br>2. Upload | Image uploaded successfully | High |
| TC-IMG-004 | Upload invalid file type | 1. Select PDF/DOC file<br>2. Try to upload | Error: Invalid file type | Medium |
| TC-IMG-005 | Upload oversized image | 1. Select image > 5MB<br>2. Try to upload | Error: File too large | Medium |
| TC-IMG-006 | Upload with background removal | 1. Upload image<br>2. Enable "Remove Background"<br>3. Upload | Background removed, image uploaded | Medium |
| TC-IMG-007 | Replace existing image | 1. Have image uploaded<br>2. Upload new image<br>3. Save | Old image replaced with new | High |
| TC-IMG-008 | Image preview before upload | 1. Select image<br>2. Check preview | Image preview displayed before upload | Low |

### Test Scenario 6.2: ImageKit Integration
**Objective:** Verify ImageKit cloud storage integration

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-IMG-009 | ImageKit upload success | 1. Upload image<br>2. Check response | ImageKit URL returned and saved | High |
| TC-IMG-010 | Handle ImageKit failure | 1. Upload when ImageKit is down<br>2. Check error | Error handled gracefully | Medium |
| TC-IMG-011 | ImageKit URL validation | 1. Upload image<br>2. Save resume<br>3. Check stored URL | Valid ImageKit URL stored in database | High |

---

## 7. Public Resume Sharing

### Test Scenario 7.1: Resume Visibility Settings
**Objective:** Verify public/private resume functionality

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-SHARE-001 | Make resume public | 1. Open resume<br>2. Toggle "Make Public"<br>3. Save | Resume.public set to true | High |
| TC-SHARE-002 | Make resume private | 1. Have public resume<br>2. Toggle to private<br>3. Save | Resume.public set to false | High |
| TC-SHARE-003 | Access public resume without login | 1. Make resume public<br>2. Copy share link<br>3. Open in incognito | Resume accessible without authentication | High |
| TC-SHARE-004 | Access private resume without login | 1. Keep resume private<br>2. Try to access via direct link | Error: "Resume not found or is not public" | High |
| TC-SHARE-005 | Share public resume link | 1. Make resume public<br>2. Click share button<br>3. Copy link | Shareable URL generated | High |

### Test Scenario 7.2: Public Resume Preview
**Objective:** Verify public resume preview functionality

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-SHARE-006 | View public resume preview | 1. Access public resume URL<br>2. Check display | Resume displayed with correct template and data | High |
| TC-SHARE-007 | Public resume edit restriction | 1. Access public resume URL<br>2. Try to edit | Edit functionality not available | High |
| TC-SHARE-008 | Public resume download | 1. Access public resume<br>2. Click download | PDF download works for public resumes | Medium |

---

## 8. Dashboard

### Test Scenario 8.1: Dashboard Display
**Objective:** Verify dashboard shows user resumes correctly

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-DASH-001 | Display all user resumes | 1. Login with multiple resumes<br>2. Navigate to dashboard | All resumes displayed with titles and preview | High |
| TC-DASH-002 | Empty dashboard for new user | 1. Login as new user with no resumes<br>2. Check dashboard | Empty state message or prompt to create resume | High |
| TC-DASH-003 | Resume card information | 1. View dashboard<br>2. Check resume cards | Each card shows title, last modified, template | Medium |
| TC-DASH-004 | Resume thumbnail preview | 1. View dashboard<br>2. Check previews | Thumbnails generated for each resume | Low |

### Test Scenario 8.2: Dashboard Actions
**Objective:** Verify dashboard action buttons work correctly

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-DASH-005 | Open resume from dashboard | 1. Click on resume card<br>2. Check navigation | Redirected to resume builder with correct ID | High |
| TC-DASH-006 | Delete resume from dashboard | 1. Click delete on resume<br>2. Confirm | Resume deleted, dashboard updated | High |
| TC-DASH-007 | Create new resume from dashboard | 1. Click "Create New Resume"<br>2. Fill details | New resume created, redirected to builder | High |
| TC-DASH-008 | Duplicate resume | 1. Click duplicate on resume<br>2. Check result | Copy of resume created with new ID | Low |

---

## 9. Navigation & Routing

### Test Scenario 9.1: Route Protection
**Objective:** Verify protected routes require authentication

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-NAV-001 | Access dashboard without login | 1. Logout<br>2. Try to access /dashboard | Redirected to sign-in page | High |
| TC-NAV-002 | Access resume builder without login | 1. Logout<br>2. Try to access /resume-builder/:id | Redirected to sign-in page | High |
| TC-NAV-003 | Access public pages when logged in | 1. Login<br>2. Navigate to home page | Home page accessible | High |
| TC-NAV-004 | Invalid route handling | 1. Navigate to non-existent route<br>2. Check display | 404 Not Found page displayed | Medium |

### Test Scenario 9.2: Navigation Flow
**Objective:** Verify smooth navigation between pages

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-NAV-005 | Navigate from home to sign up | 1. Click "Sign Up" from home<br>2. Check page | Sign up page loaded | High |
| TC-NAV-006 | Navigate from sign in to forgot password | 1. Click "Forgot Password"<br>2. Check page | Forgot password page loaded | High |
| TC-NAV-007 | Breadcrumb navigation | 1. Navigate to nested page<br>2. Use breadcrumbs | Navigate back through breadcrumbs | Medium |
| TC-NAV-008 | Back button functionality | 1. Navigate through multiple pages<br>2. Use browser back | Browser back button works correctly | Medium |
| TC-NAV-009 | Preview mode navigation | 1. Click preview button in builder<br>2. Check display | Preview page opened with resume data | High |
| TC-NAV-010 | Return from preview to builder | 1. In preview mode<br>2. Click back/edit | Return to builder with data intact | High |

---

## 10. Security & Authorization

### Test Scenario 10.1: JWT Token Security
**Objective:** Verify JWT token handling is secure

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-SEC-001 | Token expiration handling | 1. Wait for token to expire (7 days)<br>2. Try to access protected route | Token expired error, redirect to login | High |
| TC-SEC-002 | Invalid token handling | 1. Manually modify token in localStorage<br>2. Try to access protected route | Unauthorized error, redirect to login | High |
| TC-SEC-003 | Missing token handling | 1. Remove token from localStorage<br>2. Try to access protected route | Redirect to login page | High |
| TC-SEC-004 | Token in API requests | 1. Login<br>2. Make API request<br>3. Check headers | Bearer token included in Authorization header | High |

### Test Scenario 10.2: Data Authorization
**Objective:** Verify users can only access their own data

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-SEC-005 | Access own resumes only | 1. Login as User A<br>2. Fetch resumes | Only User A's resumes returned | High |
| TC-SEC-006 | Prevent cross-user resume access | 1. Login as User A<br>2. Try to access User B's resume ID | 404 or unauthorized error | Critical |
| TC-SEC-007 | Prevent cross-user resume update | 1. Login as User A<br>2. Try to update User B's resume | Unauthorized error, no changes made | Critical |
| TC-SEC-008 | Prevent cross-user resume deletion | 1. Login as User A<br>2. Try to delete User B's resume | Unauthorized error, resume not deleted | Critical |

### Test Scenario 10.3: Password Security
**Objective:** Verify password handling is secure

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-SEC-009 | Password hashing on registration | 1. Register new user<br>2. Check database | Password stored as bcrypt hash | Critical |
| TC-SEC-010 | Password not returned in responses | 1. Login or get user data<br>2. Check response | Password field excluded from response | Critical |
| TC-SEC-011 | OTP security | 1. Request password reset<br>2. Check OTP storage | OTP hashed/encrypted in database | High |
| TC-SEC-012 | OTP expiration | 1. Generate OTP<br>2. Wait for expiration<br>3. Try to use | Expired OTP rejected | High |

### Test Scenario 10.4: Input Validation & Sanitization
**Objective:** Verify protection against malicious input

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-SEC-013 | SQL injection prevention | 1. Enter SQL injection strings in forms<br>2. Submit | Input sanitized, no SQL execution | Critical |
| TC-SEC-014 | XSS prevention | 1. Enter JavaScript code in text fields<br>2. Save and view | Script tags escaped, not executed | Critical |
| TC-SEC-015 | NoSQL injection prevention | 1. Enter MongoDB operators in inputs<br>2. Submit | Input sanitized, operators treated as strings | Critical |
| TC-SEC-016 | File upload validation | 1. Try to upload malicious files<br>2. Check processing | Only allowed file types accepted | High |

---

## 11. Performance & Integration

### Test Scenario 11.1: API Performance
**Objective:** Verify API response times are acceptable

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-PERF-001 | Login response time | 1. Measure login API time<br>2. Check duration | Response within 2 seconds | Medium |
| TC-PERF-002 | Resume load time | 1. Measure resume fetch time<br>2. Check duration | Response within 1 second | Medium |
| TC-PERF-003 | Resume save time | 1. Measure update API time<br>2. Check duration | Response within 2 seconds | Medium |
| TC-PERF-004 | AI enhancement response time | 1. Measure AI API time<br>2. Check duration | Response within 10 seconds | Low |
| TC-PERF-005 | Image upload time | 1. Measure upload time for 2MB image<br>2. Check duration | Upload completes within 5 seconds | Medium |

### Test Scenario 11.2: Frontend Performance
**Objective:** Verify frontend performance is optimized

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-PERF-006 | Initial page load time | 1. Clear cache<br>2. Load home page<br>3. Measure time | Page loads within 3 seconds | Medium |
| TC-PERF-007 | Resume builder rendering | 1. Open complex resume<br>2. Measure render time | Renders within 1 second | Medium |
| TC-PERF-008 | Real-time preview updates | 1. Type in resume fields<br>2. Check preview lag | Preview updates within 500ms | Low |
| TC-PERF-009 | Multiple resume loading | 1. Load dashboard with 20+ resumes<br>2. Check performance | Page loads without significant lag | Low |

### Test Scenario 11.3: Integration Testing
**Objective:** Verify all components work together correctly

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-INT-001 | End-to-end user flow | 1. Register<br>2. Create resume<br>3. Fill all sections<br>4. Download<br>5. Share | Complete flow works without errors | Critical |
| TC-INT-002 | Database connection | 1. Restart server<br>2. Make API requests | MongoDB connection established | High |
| TC-INT-003 | Email service integration | 1. Request password reset<br>2. Check email delivery | Email sent via transporter | High |
| TC-INT-004 | ImageKit integration | 1. Upload image<br>2. Check storage | Image stored on ImageKit CDN | High |
| TC-INT-005 | OpenAI integration | 1. Use AI features<br>2. Check responses | OpenAI API responses received | High |

### Test Scenario 11.4: Error Handling & Resilience
**Objective:** Verify application handles errors gracefully

| Test Case ID | Description | Test Steps | Expected Result | Priority |
|--------------|-------------|------------|-----------------|----------|
| TC-ERR-001 | Handle database connection failure | 1. Disconnect database<br>2. Try to fetch data | User-friendly error message displayed | High |
| TC-ERR-002 | Handle network errors | 1. Simulate offline mode<br>2. Try API calls | Network error message displayed | High |
| TC-ERR-003 | Handle API server errors | 1. Trigger 500 error<br>2. Check UI response | Error handled gracefully with message | High |
| TC-ERR-004 | Form validation errors | 1. Submit invalid form data<br>2. Check feedback | Clear validation messages displayed | High |
| TC-ERR-005 | Handle concurrent updates | 1. Open resume in 2 tabs<br>2. Update in both<br>3. Save | Last save wins or conflict resolution | Medium |

---

## Test Execution Summary Template

### Test Metrics to Track:
- **Total Test Cases:** 200+
- **Priority Breakdown:**
  - Critical: ~15%
  - High: ~50%
  - Medium: ~30%
  - Low: ~5%

### Test Coverage Areas:
1. ✅ Authentication & Authorization
2. ✅ Resume CRUD Operations
3. ✅ Resume Builder Features
4. ✅ AI Integration
5. ✅ Template & Customization
6. ✅ File Management
7. ✅ Security & Data Protection
8. ✅ Performance & Scalability
9. ✅ Error Handling
10. ✅ Integration & E2E Flows

### Recommended Testing Tools:
- **Unit Testing:** Jest, Vitest
- **Integration Testing:** Supertest, React Testing Library
- **E2E Testing:** Cypress, Playwright
- **API Testing:** Postman, Thunder Client
- **Load Testing:** Artillery, K6
- **Security Testing:** OWASP ZAP, npm audit

---

## Notes for Testers:

1. **Test Environment Setup:**
   - Use separate test database
   - Configure test API keys for OpenAI and ImageKit
   - Set up test email account for email testing

2. **Test Data Requirements:**
   - Multiple test users with different roles
   - Sample resumes with varying complexity
   - Test images of different sizes and formats

3. **Automation Priority:**
   - Prioritize automation for Critical and High priority tests
   - Focus on regression test suite for frequent releases

4. **Known Limitations:**
   - Document any known issues or limitations
   - Track technical debt items

5. **Continuous Testing:**
   - Run smoke tests on every commit
   - Run full regression suite before releases
   - Monitor production with synthetic tests

---

**Document Version:** 1.0  
**Last Updated:** November 4, 2025  
**Created By:** GitHub Copilot  
**Status:** Ready for Review
