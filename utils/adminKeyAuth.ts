// Admin functions for KeyAuth - Fetch all users and keys
// Documentation: https://keyauth.cc/api/

interface KeyAuthConfig {
  name: string;
  ownerid: string;
  version: string;
  sellerkey: string; // Your seller key from KeyAuth dashboard
}

// Use same config as main KeyAuth + seller key
const KEYAUTH_CONFIG: KeyAuthConfig = {
  name: "OPTIAXIRA",
  ownerid: "RohyrFsC4P",
  version: "1.0",
  sellerkey: "7cc99eabc5038b2cefe3a131942fc886", // ✅ NEW Seller key!
};

const KEYAUTH_API = "https://keyauth.win/api/seller/";

// Fetch all users from KeyAuth Seller API
export async function fetchAllUsers(): Promise<any[]> {
  try {
    console.log("Fetching all users from KeyAuth...");
    console.log("Using seller key:", KEYAUTH_CONFIG.sellerkey);
    console.log("Seller key length:", KEYAUTH_CONFIG.sellerkey.length);
    console.log("Seller key chars:", KEYAUTH_CONFIG.sellerkey.split('').length);

    // Validate seller key length
    if (KEYAUTH_CONFIG.sellerkey.length !== 32) {
      console.error(`❌ SELLER KEY LENGTH ISSUE: Expected 32, got ${KEYAUTH_CONFIG.sellerkey.length}`);
      return [];
    }

    const formData = new FormData();
    formData.append("sellerkey", KEYAUTH_CONFIG.sellerkey);
    formData.append("type", "fetchallusers");

    console.log("📤 Sending request to:", KEYAUTH_API);
    console.log("📤 FormData contents:", {
      sellerkey: KEYAUTH_CONFIG.sellerkey,
      type: "fetchallusers"
    });

    const response = await fetch(KEYAUTH_API, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    console.log(
      "KeyAuth fetchallusers FULL response:",
      JSON.stringify(data, null, 2),
    );

    if (data.success && data.users) {
      console.log(`✅ Found ${data.users.length} users`);
      // Transform KeyAuth user data to our format
      return data.users.map((user: any) => {
        // Extract package tier from subscription key
        const subscriptionKey =
          user.subscriptions?.[0]?.subscription || "";
        const prefix =
          subscriptionKey.split("-")[0]?.toUpperCase() ||
          "CHECKUP";

        return {
          key: subscriptionKey,
          username: user.username,
          packageTier: prefix,
          registeredDate: user.createdate
            ? new Date(
                parseInt(user.createdate) * 1000,
              ).toLocaleDateString()
            : "N/A",
          lastLogin: user.lastlogin
            ? new Date(
                parseInt(user.lastlogin) * 1000,
              ).toLocaleDateString()
            : "Never",
          subscription:
            user.subscriptions?.[0]?.subscription || "None",
          expiry: user.subscriptions?.[0]?.expiry || "N/A",
          hwid: user.hwid || "Not set",
          ip: user.ip || "Unknown",
          status: user.banned ? "banned" : "active",
          email: user.email || "",
        };
      });
    } else {
      console.error("❌ KeyAuth API Error:", data.message);
      console.error("❌ Success flag:", data.success);
      console.error("❌ Full response:", data);
      
      // Check if this is a seller key authentication issue
      if (data.message && data.message.includes("Seller key")) {
        console.error("⚠️ SELLER KEY VALIDATION FAILED!");
        console.error("⚠️ Make sure you're using the key from: https://keyauth.cc/app/?page=seller-settings");
        console.error("⚠️ Current key:", KEYAUTH_CONFIG.sellerkey);
        console.error("⚠️ Key length:", KEYAUTH_CONFIG.sellerkey.length);
      }
      
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching KeyAuth users:", error);
    return [];
  }
}

// Ban a user (KeyAuth API)
export async function banUser(
  username: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // Initialize session
    const sessionId = await initSession();

    const formData = new FormData();
    formData.append("type", "ban");
    formData.append("username", username);
    formData.append("sessionid", sessionId);
    formData.append("name", KEYAUTH_CONFIG.name);
    formData.append("ownerid", KEYAUTH_CONFIG.ownerid);

    const response = await fetch(KEYAUTH_API, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    return {
      success: data.success,
      message: data.message || "User banned successfully",
    };
  } catch (error) {
    console.error("Ban user error:", error);
    return {
      success: false,
      message: "Failed to ban user",
    };
  }
}

// Unban a user
export async function unbanUser(
  username: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const sessionId = await initSession();

    const formData = new FormData();
    formData.append("type", "unban");
    formData.append("username", username);
    formData.append("sessionid", sessionId);
    formData.append("name", KEYAUTH_CONFIG.name);
    formData.append("ownerid", KEYAUTH_CONFIG.ownerid);

    const response = await fetch(KEYAUTH_API, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    return {
      success: data.success,
      message: data.message || "User unbanned successfully",
    };
  } catch (error) {
    console.error("Unban user error:", error);
    return {
      success: false,
      message: "Failed to unban user",
    };
  }
}

// Initialize KeyAuth session
async function initSession(): Promise<string> {
  const formData = new FormData();
  formData.append("type", "init");
  formData.append("name", KEYAUTH_CONFIG.name);
  formData.append("ownerid", KEYAUTH_CONFIG.ownerid);
  formData.append("ver", KEYAUTH_CONFIG.version);

  try {
    const response = await fetch(KEYAUTH_API, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      return data.sessionid || data.message;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("KeyAuth init failed:", error);
    throw error;
  }
}

// Save key notes to localStorage (until you set up a backend)
export function saveKeyNotes(key: string, notes: string): void {
  const existingNotes =
    localStorage.getItem("key_notes") || "{}";
  const notesData = JSON.parse(existingNotes);
  notesData[key] = notes;
  localStorage.setItem("key_notes", JSON.stringify(notesData));
}

// Get key notes from localStorage
export function getKeyNotes(key: string): string {
  const existingNotes =
    localStorage.getItem("key_notes") || "{}";
  const notesData = JSON.parse(existingNotes);
  return notesData[key] || "";
}

// Get all key notes
export function getAllKeyNotes(): Record<string, string> {
  const existingNotes =
    localStorage.getItem("key_notes") || "{}";
  return JSON.parse(existingNotes);
}