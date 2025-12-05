# 👑 How to Access the Admin Panel

## 📍 **Where Is It?**

The **Admin Panel** button appears in the **top-right corner** of the game selection screen:

```
┌─────────────────────────────────────────────────────────────┐
│  🎮 Game Optimizer Pro          📦 Elite Package  [Logout]  │
│  Welcome back, YourUsername!                    [Admin Panel]│
└─────────────────────────────────────────────────────────────┘
                                                        ↑
                                                        HERE!
```

**Location:**

- ✅ After you login
- ✅ On the game selection screen
- ✅ Next to the "Logout" button
- ✅ Blue button with shield icon 🛡️

---

## 🚫 **Why Can't I See It?**

The admin panel button **only shows if:**

1. ✅ You're logged in
2. ✅ Your username matches `OWNER_USERNAME` in the code

**Current issue:** The code still has:

```typescript
const OWNER_USERNAME = "YOUR_OWNER_USERNAME_HERE"; // ⚠️ Not set!
```

---

## ✅ **How to Fix It**

### **OPTION 1: Set Your Existing Username** (Fastest)

If you already have a user account:

1. **Open:** `/App.tsx`
2. **Find line 10:**
   ```typescript
   const OWNER_USERNAME = "deccc";
   ```
3. **Change to YOUR username:**
   ```typescript
   const OWNER_USERNAME = "decc"; // ← Your actual username
   ```
4. **Save the file**
5. **Rebuild:**
   ```bash
   AUTO-FIX-AND-BUILD.bat
   ```
6. **Login again**
7. **Admin Panel button should appear!** ✅

---

### **OPTION 2: Create New Owner Account** (Recommended)

For a dedicated owner account:

#### **Step 1: Create ELITE License**

```
1. Go to https://keyauth.cc/app/
2. Select "OPTIAXIRA"
3. Licenses → Create License
4. Duration: 365 days (long-term)
5. Copy the key (should start with ELITE-)
```

#### **Step 2: Register Owner Account**

```
1. Open OPTIAXIRA app
2. Click "Sign Up" tab
3. Enter:
   - Username: YourOwnerName (e.g., "AdminRohyr")
   - Password: YourSecurePassword
   - License: (paste ELITE key)
4. Register
5. Should say "Account created successfully!"
```

#### **Step 3: Update Code**

```
1. Open: /App.tsx
2. Find line 10:
   const OWNER_USERNAME = "YOUR_OWNER_USERNAME_HERE";
3. Change to:
   const OWNER_USERNAME = "AdminRohyr"; // ← Your owner username
4. Save
```

#### **Step 4: Rebuild**

```
Run: AUTO-FIX-AND-BUILD.bat
Wait for build to complete
```

#### **Step 5: Test**

```
1. Open the app
2. Login with owner credentials
3. Should see "Admin Panel" button in top-right
4. Click to access admin features! ✅
```

---

## 🎯 **Quick Test**

To verify it's working:

1. **Check code:**

   ```typescript
   // In /App.tsx line 10
   const OWNER_USERNAME = "YourActualUsername"; // ✅ Should be real username
   ```

2. **Check login:**
   - Username you enter when logging in
   - Must match `OWNER_USERNAME` exactly
   - Case-insensitive (testuser = TestUser = TESTUSER)

3. **Check location:**
   - After login
   - On game selection screen
   - Top-right corner
   - Blue button next to "Logout"

---

## 🔍 **Troubleshooting**

### **"I still don't see the button"**

Check these:

1. **Username matches?**

   ```typescript
   // Your code
   const OWNER_USERNAME = "testuser";

   // Your login
   Username: testuser ✅
   ```

2. **Rebuilt the app?**

   ```bash
   AUTO-FIX-AND-BUILD.bat
   ```

3. **On the right screen?**
   - ✅ Game selection screen (not login)
   - ❌ Not on login screen
   - ❌ Not on optimizer screen

4. **Check console for errors:**
   - Open DevTools (F12)
   - Look for errors
   - Check `hasAdminAccess()` function

### **"Button appears but doesn't work"**

- Check browser console (F12) for errors
- Make sure `/components/AdminPanel.tsx` exists
- Try clicking "Logout" then login again

### **"I want multiple admins"**

You can add more admins through the admin panel:

1. Login as owner
2. Click "Admin Panel"
3. Go to "Manage Admins" tab
4. Add other usernames
5. They'll get admin access too!

---

## 📊 **Admin Access Levels**

| Role      | How to Set                     | Access Level                   |
| --------- | ------------------------------ | ------------------------------ |
| **Owner** | Set in code (`OWNER_USERNAME`) | Full access (can't be removed) |
| **Admin** | Added via Admin Panel          | Full access (can be removed)   |
| **User**  | Regular account                | No admin access                |

---

## 🎯 **What You Can Do in Admin Panel**

Once you access the admin panel:

✅ **View all users** with their:

- Username
- License key
- Package type
- Registration date
- Last login

✅ **Manage licenses:**

- See all license keys
- Check who has what package
- View expiry dates

✅ **Ban/unban users:**

- Temporarily ban users
- Unban when investigation complete
- Track banned users

✅ **Add custom notes:**

- Identify real people behind usernames
- Track user issues
- Document support cases

✅ **Manage admins:**

- Add new admins
- Remove admins
- See all admins

---

## 💡 **Best Practices**

### **For Owner Account:**

- ✅ Use strong password
- ✅ Use ELITE license (full features)
- ✅ Different from personal account
- ✅ Don't share credentials

### **For Security:**

- ✅ Only add trusted admins
- ✅ Use ban feature for investigations
- ✅ Keep notes on suspicious activity
- ✅ Regular security audits

### **For Testing:**

- ✅ Create separate test account
- ✅ Don't use owner account for testing
- ✅ Test with different package tiers
- ✅ Verify features work per package

---

## 📋 **Setup Checklist**

- [ ] Created/identified owner username
- [ ] Updated `OWNER_USERNAME` in `/App.tsx`
- [ ] Saved the file
- [ ] Ran `AUTO-FIX-AND-BUILD.bat`
- [ ] Logged in with owner credentials
- [ ] Admin Panel button appears in top-right
- [ ] Clicked button and admin panel opens
- [ ] All admin features work

---

## 🎉 **Success Indicators**

You'll know it's working when:

✅ Blue "Admin Panel" button visible in top-right  
✅ Shield icon 🛡️ next to button text  
✅ Button only shows for your username  
✅ Clicking opens full admin interface  
✅ Can see all users and licenses  
✅ All admin features accessible

---

## 🚀 **Example Setup**

### **My Setup:**

```typescript
// In /App.tsx
const OWNER_USERNAME = "Rohyr"; // My owner account

// When I login:
Username: Rohyr
Password: MySecurePassword123

// Result:
✅ Admin Panel button appears
✅ Full admin access
✅ Can manage all users
```

---

## 📞 **Still Having Issues?**

### **Quick Checks:**

```
1. Open /App.tsx
2. Check line 10: OWNER_USERNAME = ?
3. Login with that exact username
4. Should see button in top-right
```

### **Debug Steps:**

```
1. Open DevTools (F12)
2. Go to Console tab
3. Type: hasAdminAccess()
4. Should return: true
```

### **Force Refresh:**

```
1. Close all app instances
2. Run FORCE_CLOSE_INSTANCES.bat
3. Run AUTO-FIX-AND-BUILD.bat
4. Open app and login
5. Check for button
```

---

## 🎯 **Summary**

**Location:** Top-right corner after login  
**Requirement:** Username must match `OWNER_USERNAME` in code  
**Fix:** Update line 10 in `/App.tsx` with your username  
**Rebuild:** Run `AUTO-FIX-AND-BUILD.bat`  
**Test:** Login and look for blue button with shield icon

---

**Now go update that `OWNER_USERNAME` and rebuild!** 🚀

---

## 📸 **Visual Guide**

```
LOGIN SCREEN               GAME SELECTION              ADMIN PANEL
┌────────────┐            ┌──────────────┐           ┌─────────────┐
│            │            │   [Admin     │           │             │
│   [Login]  │  ──────>   │    Panel]    │  ──────>  │  Full Admin │
│            │            │              │           │  Interface  │
└────────────┘            └──────────────┘           └─────────────┘
                          Button appears here!
                          (only for owner)
```

**That's where your Admin Panel button is!** 👑