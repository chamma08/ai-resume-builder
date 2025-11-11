# Points System Update - Testing Checklist

## ✅ Backend Changes
- [x] Updated POINT_VALUES in `server/controllers/pointsController.js`
- [x] Updated TEMPLATE_TIERS in `server/utils/pointsManager.js`
- [x] Updated POINT_COSTS in `server/utils/pointsManager.js`

## ✅ Frontend UI Changes
- [x] Updated PointsDashboard.jsx - Social media follow text (10 points)
- [x] Updated PointsDashboard.jsx - "How to Earn Points" section
- [x] Updated PointsDashboard.jsx - Button text for claiming points
- [x] Updated PointsDashboard.jsx - Success toast message
- [x] Updated SignUp.jsx - Welcome bonus message (25 points)

## 🧪 Testing Checklist

### Test Earning Points
- [ ] **Sign Up** - Create new account, verify 25 points awarded
- [ ] **Profile Complete** - Complete profile, verify 50 points awarded
- [ ] **First Resume** - Create first resume, verify 25 points awarded
- [ ] **Social Media Follow**:
  - [ ] LinkedIn - Verify 10 points awarded
  - [ ] Facebook - Verify 10 points awarded
  - [ ] Instagram - Verify 10 points awarded
  - [ ] YouTube - Verify 10 points awarded
  - [ ] Verify "already followed" prevention works
- [ ] **Referral** - Use referral code, verify 200 points to referrer

### Test Spending Points
- [ ] **Download Resume**:
  - [ ] Classic template - Verify 50 points deducted
  - [ ] Minimal template - Verify 50 points deducted
  - [ ] Modern template - Verify 50 points deducted
  - [ ] Elegant template - Verify 50 points deducted
  - [ ] ATS template - Verify 50 points deducted
  - [ ] Check insufficient balance warning works

### Test UI Display
- [ ] Points Dashboard shows correct values:
  - [ ] Create account: +25 Points
  - [ ] Complete profile: +50 Points
  - [ ] Create first resume: +25 Points
  - [ ] Download resume: -50 Points
  - [ ] Social media follow: +10 Points
  - [ ] Refer friend: +200 Points
- [ ] Download confirmation modal shows 50 points for all templates
- [ ] Toast notifications show correct point values:
  - [ ] Signup: "25 bonus points"
  - [ ] Social follow: "+10 points earned"
  - [ ] Download: "50 points deducted"

### Test Edge Cases
- [ ] User with 0 points cannot download resume
- [ ] User with 49 points cannot download resume
- [ ] User with 50 points can download resume
- [ ] User cannot claim social media points twice on same platform
- [ ] Activity history shows correct point values

## 🚀 Next Steps

1. Restart your backend server to load new point values:
   ```bash
   cd server
   npm start
   ```

2. Restart your frontend development server:
   ```bash
   cd client
   npm run dev
   ```

3. Test with a new user account to verify all earning mechanisms
4. Test with an existing user to verify all spending mechanisms
5. Check the Activity History page to ensure point transactions display correctly

## 📝 Notes

- All templates now have a uniform download cost of 50 points
- Social media follows are now more rewarding (10x increase from 1 to 10 points)
- Users can earn up to 75 points initially (25 signup + 50 profile completion)
- First resume creation gives 25 points, allowing one free download (25 + 50 = 75, cost 50, leaving 25)
- Following all 5 social media platforms gives 50 points (enough for one download)

## ⚠️ Important

Make sure to:
1. Clear browser cache/localStorage if testing with existing accounts
2. Verify database records for points are being updated correctly
3. Check that Activity model records show accurate point values
4. Ensure Transaction model shows correct deduction amounts
