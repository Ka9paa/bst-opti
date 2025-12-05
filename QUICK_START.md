# ⚡ QUICK START - Get Your First User Working in 2 Minutes

## ✅ Session Error = FIXED!
Your "invalid username" error means KeyAuth is working! You just need a user account.

---

## 🚀 **2-MINUTE SETUP**

### **Step 1: Create License Key** (30 seconds)
1. Go to: **https://keyauth.cc/app/**
2. Login to KeyAuth
3. Select: **"OPTIAXIRA"**
4. Click: **"Licenses"** tab
5. Click: **"Create License"** or **"Generate"**
6. Fill in:
   - Amount: **1**
   - Duration: **30** days
   - Level/Subscription: **1** (or any)
7. Click: **"Create"**
8. **COPY THE LICENSE KEY!** (looks like: `ELITE-ABC1-DEF2-GHI3`)

---

### **Step 2: Register Account** (30 seconds)
1. **Open OPTIAXIRA app**
2. Click: **"Register"** tab
3. Enter:
   ```
   Username: testuser
   Password: test123
   License Key: (paste the key from Step 1)
   ```
4. Click: **"Register"**
5. Should say: **"Registration successful!"** ✅

---

### **Step 3: Login** (30 seconds)
1. Click: **"Login"** tab
2. Enter:
   ```
   Username: testuser
   Password: test123
   ```
   **NOTE:** No license key needed for login! ✅
3. Click: **"Login"**
4. **SUCCESS!** You should see the game selection screen! 🎉

---

## 🎯 **That's It!**

You now have a working user account!

---

## 👑 **Setup Admin Access** (Optional - 2 more minutes)

Want to access the Admin Panel?

### **Step 1: Create Your Owner License**
1. KeyAuth Dashboard → Licenses
2. Create another license with **ELITE-** prefix
3. Copy the key

### **Step 2: Register Your Owner Account**
1. In app → Register tab
2. Username: **YourRealUsername** (remember this!)
3. Password: **YourSecurePassword**
4. License: (paste ELITE key)
5. Register

### **Step 3: Update Code**
Open `/App.tsx` and find this line:
```typescript
const OWNER_USERNAME = "YOUR_OWNER_USERNAME_HERE";
```

Change it to:
```typescript
const OWNER_USERNAME = "YourRealUsername"; // ← Your username from Step 2
```

### **Step 4: Rebuild**
Run: `AUTO-FIX-AND-BUILD.bat`

### **Step 5: Test Admin Access**
1. Login with your owner credentials
2. You should see **"Admin Panel"** button! 👑
3. Click it to manage users and licenses

---

## 📊 **Summary**

| What | Time | Done? |
|------|------|-------|
| Create license key | 30 sec | ☐ |
| Register test account | 30 sec | ☐ |
| Login to app | 30 sec | ☐ |
| **(Optional)** Setup admin | 2 min | ☐ |

---

## 💡 **Key Points**

✅ **Session error is FIXED** - KeyAuth is working  
✅ **"Invalid username"** just means you need to register  
✅ **License keys** are created in KeyAuth dashboard  
✅ **Registration** requires license key (one time only)  
✅ **Login** only needs username + password (no license key!)  
✅ **Admin panel** only shows for OWNER_USERNAME  

---

## 🆘 **Having Issues?**

### **"Invalid license key"**
- Key doesn't exist in KeyAuth
- Make sure you created it in Step 1
- Copy it exactly (including dashes)

### **"License already used"**
- This key was already used to register another account
- Create a NEW license key
- Use that for registration

### **"Registration failed"**
- Check internet connection
- Check KeyAuth dashboard is working
- Make sure app credentials are correct

### **Still can't login?**
- Username and password are case-sensitive
- Make sure you registered first
- Wait 10 seconds and try again
- Check KeyAuth dashboard for your account

---

## 🎉 **You're Ready!**

Follow the 3 steps above and you'll be logged in within 2 minutes!

**Questions? Check:**
- `KEYAUTH_USER_SETUP.md` - Detailed user setup guide
- `URGENT_SESSION_FIX.md` - Session troubleshooting
- `ADMIN_SETUP.md` - Admin panel setup

---

**Let's go! Create that license key and register!** 🚀