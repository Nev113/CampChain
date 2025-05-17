// Helper script to restart the development server with new environment variables
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("✅ Checking environment configuration...");

// Check if .env.local exists
const envPath = path.join(__dirname, ".env.local");
if (!fs.existsSync(envPath)) {
  console.log("⚠️ .env.local not found. Creating from template...");

  const envContent = `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=c56afd86d6e30cd57a8555718b43e2cc
NEXT_PUBLIC_XELLAR_APP_ID=8ad5b922-429e-4faa-af59-37dcc73572b0
NEXT_PUBLIC_IMGBB_API_KEY=f33e7e5611c18b449c6bb06aef312f99
DATABASE_URL=postgresql://postgres:password@localhost:5432/campchain?schema=public`;

  fs.writeFileSync(envPath, envContent);
  console.log("✅ Created .env.local with default values");
}

console.log("🔄 Preparing to start development server...");

// Check if Prisma is needed
const prismaDir = path.join(__dirname, "prisma");
if (fs.existsSync(prismaDir)) {
  console.log("🔍 Prisma schema detected, generating Prisma client...");
  try {
    // Run Prisma generate synchronously
    const { execSync } = require("child_process");
    execSync("npx prisma generate", { stdio: "inherit" });
    console.log("✅ Prisma client generated successfully");
  } catch (err) {
    console.error("⚠️ Failed to generate Prisma client:", err);
    console.log("Continuing anyway...");
  }
}

// Start the Next.js development server
console.log("🚀 Starting Next.js development server...");
try {
  const nextProcess = exec("npm run dev", {
    stdio: "inherit",
    shell: true,
  });

  nextProcess.stdout?.on("data", (data) => {
    process.stdout.write(data);
  });

  nextProcess.stderr?.on("data", (data) => {
    process.stderr.write(data);
  });

  nextProcess.on("error", (error) => {
    console.error("Failed to start development server:", error);
  });

  nextProcess.on("close", (code) => {
    if (code !== 0) {
      console.log(`Development server exited with code ${code}`);
    }
  });

  // Handle process termination
  process.on("SIGINT", () => {
    console.log("\n👋 Shutting down development server...");
    nextProcess.kill();
    process.exit(0);
  });
} catch (err) {
  console.error("Failed to start the server:", err);
}
