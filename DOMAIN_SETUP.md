# 🌐 Connecting Your Namecheap Domain to Axira Optimizer

## Overview
This guide will help you connect your Namecheap domain to your Axira Optimizer web application.

## Prerequisites
- A domain purchased from Namecheap
- Your web app deployed (Figma Make apps typically deploy to Vercel, Netlify, or similar)

---

## Step 1: Get Your Deployment URL

First, you need to know where your app is hosted. Figma Make typically deploys to platforms like:
- **Vercel** (most common)
- **Netlify**
- **GitHub Pages**

Your app will have a default URL like:
- `your-app.vercel.app`
- `your-app.netlify.app`

---

## Step 2: Configure DNS in Namecheap

### Option A: Using A Records (Recommended for Vercel)

1. **Log into Namecheap**
   - Go to namecheap.com and sign in
   - Navigate to Dashboard → Domain List
   - Click "Manage" next to your domain

2. **Access Advanced DNS**
   - Click the "Advanced DNS" tab

3. **Add DNS Records**
   
   **For Vercel:**
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic
   
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com.
   TTL: Automatic
   ```

   **For Netlify:**
   ```
   Type: A Record
   Host: @
   Value: 75.2.60.5
   TTL: Automatic
   
   Type: CNAME Record
   Host: www
   Value: your-app.netlify.app
   TTL: Automatic
   ```

4. **Remove Namecheap Parking Page**
   - Delete any existing "URL Redirect Records" or parking page records
   - Keep only the new A and CNAME records you just added

---

## Step 3: Configure Domain in Your Hosting Platform

### For Vercel:

1. Go to your Vercel dashboard
2. Select your project (Axira Optimizer)
3. Go to Settings → Domains
4. Click "Add Domain"
5. Enter your domain (e.g., `yourdomain.com`)
6. Also add `www.yourdomain.com`
7. Vercel will automatically configure SSL certificates

### For Netlify:

1. Go to your Netlify dashboard
2. Select your site
3. Go to Domain Settings
4. Click "Add custom domain"
5. Enter your domain (e.g., `yourdomain.com`)
6. Netlify will verify DNS and set up HTTPS

---

## Step 4: Wait for Propagation

- DNS changes can take **24-48 hours** to fully propagate
- Usually works within 1-2 hours
- You can check status at: https://www.whatsmydns.net/

---

## Step 5: Verify SSL Certificate

Once DNS propagates:
1. Visit your domain in a browser
2. Check for the padlock 🔒 icon (HTTPS)
3. Your hosting platform automatically provides free SSL via Let's Encrypt

---

## Common Issues & Solutions

### "Domain Not Verified"
- **Solution**: Wait longer for DNS propagation (up to 48 hours)
- Check that you removed Namecheap's parking page redirect

### "SSL Certificate Not Active"
- **Solution**: Most platforms auto-generate certificates within 24 hours
- Try manually triggering renewal in your hosting dashboard

### "www vs non-www redirects"
- **Solution**: Set up both A record and CNAME record as shown above
- Configure redirect rules in your hosting platform settings

---

## Quick Setup Summary

**Namecheap Side:**
1. Advanced DNS → Add A Record and CNAME Record
2. Remove parking page

**Hosting Platform Side:**
1. Add custom domain in settings
2. Wait for SSL certificate

**Wait:**
- 1-48 hours for full propagation

---

## Need Help?

- **Namecheap Support**: https://www.namecheap.com/support/
- **Vercel Docs**: https://vercel.com/docs/custom-domains
- **Netlify Docs**: https://docs.netlify.com/domains-https/custom-domains/

---

## Example: yourdomain.com → Axira Optimizer

```
Before: https://axira-optimizer.vercel.app
After:  https://yourdomain.com
```

Both URLs will work, but your custom domain looks more professional! 🚀
