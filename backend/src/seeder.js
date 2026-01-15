// database/seeder.js
// ==========================================
require("dotenv").config({ path: "./.env" });
const bcrypt = require("bcrypt");
const sequelize = require("./config/database.config");
const { NguoiDung, HinhAnh, BinhLuan, LuuAnh } = require("./models");

// Sample data
const sampleUsers = [
  {
    email: "john@example.com",
    mat_khau: "123456",
    ho_ten: "John Doe",
    tuoi: 25,
    anh_dai_dien: "https://i.pravatar.cc/150?img=1",
  },
  {
    email: "jane@example.com",
    mat_khau: "123456",
    ho_ten: "Jane Smith",
    tuoi: 28,
    anh_dai_dien: "https://i.pravatar.cc/150?img=2",
  },
  {
    email: "alice@example.com",
    mat_khau: "123456",
    ho_ten: "Alice Johnson",
    tuoi: 30,
    anh_dai_dien: "https://i.pravatar.cc/150?img=3",
  },
  {
    email: "bob@example.com",
    mat_khau: "123456",
    ho_ten: "Bob Wilson",
    tuoi: 27,
    anh_dai_dien: "https://i.pravatar.cc/150?img=4",
  },
  {
    email: "sarah@example.com",
    mat_khau: "123456",
    ho_ten: "Sarah Davis",
    tuoi: 26,
    anh_dai_dien: "https://i.pravatar.cc/150?img=5",
  },
];

const sampleImages = [
  {
    ten_hinh: "Beautiful Sunset",
    duong_dan:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    mo_ta: "Amazing sunset view from the beach with vibrant colors",
  },
  {
    ten_hinh: "Mountain Peak",
    duong_dan:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    mo_ta: "Majestic mountain peak covered in snow",
  },
  {
    ten_hinh: "City Lights",
    duong_dan:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600",
    mo_ta: "Stunning night view of the city skyline",
  },
  {
    ten_hinh: "Ocean Wave",
    duong_dan:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600",
    mo_ta: "Powerful ocean waves crashing on the shore",
  },
  {
    ten_hinh: "Forest Path",
    duong_dan:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
    mo_ta: "Peaceful path through a lush green forest",
  },
  {
    ten_hinh: "Desert Dunes",
    duong_dan:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600",
    mo_ta: "Golden sand dunes in the desert at sunset",
  },
  {
    ten_hinh: "Northern Lights",
    duong_dan:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600",
    mo_ta: "Spectacular aurora borealis dancing in the sky",
  },
  {
    ten_hinh: "Cherry Blossoms",
    duong_dan:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600",
    mo_ta: "Beautiful pink cherry blossoms in full bloom",
  },
  {
    ten_hinh: "Starry Night",
    duong_dan:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600",
    mo_ta: "Millions of stars lighting up the night sky",
  },
  {
    ten_hinh: "Tropical Paradise",
    duong_dan:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
    mo_ta: "Crystal clear water and white sandy beach",
  },
  {
    ten_hinh: "Autumn Colors",
    duong_dan:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    mo_ta: "Vibrant fall colors in the forest",
  },
  {
    ten_hinh: "Winter Wonderland",
    duong_dan:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600",
    mo_ta: "Snow-covered landscape in winter",
  },
  {
    ten_hinh: "Urban Architecture",
    duong_dan:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600",
    mo_ta: "Modern architectural masterpiece",
  },
  {
    ten_hinh: "Coffee Time",
    duong_dan:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    mo_ta: "Perfect cup of coffee in the morning",
  },
  {
    ten_hinh: "Flower Garden",
    duong_dan:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
    mo_ta: "Colorful flowers in a beautiful garden",
  },
];

const sampleComments = [
  "Absolutely stunning!",
  "This is amazing! Where is this?",
  "Beautiful colors!",
  "Love this shot!",
  "Wow! Incredible view!",
  "This made my day!",
  "Perfect capture!",
  "So peaceful and serene",
  "What camera did you use?",
  "Goals!",
  "Breathtaking!",
  "I need to visit this place!",
  "Great composition!",
  "This is art!",
  "Saved for inspiration!",
];

async function seedDatabase() {
  try {
    console.log("Starting database seeding...\n");

    // Connect to database
    await sequelize.authenticate();
    console.log("Database connected\n");

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("Clearing existing data...");
    await LuuAnh.destroy({ where: {} });
    await BinhLuan.destroy({ where: {} });
    await HinhAnh.destroy({ where: {} });
    await NguoiDung.destroy({ where: {} });
    console.log("Data cleared\n");

    // Seed Users
    console.log("Creating users...");
    const users = [];
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.mat_khau, salt);

      const user = await NguoiDung.create({
        ...userData,
        mat_khau: hashedPassword,
      });
      users.push(user);
      console.log(`   ✓ Created user: ${user.ho_ten}`);
    }
    console.log(`Created ${users.length} users\n`);

    // Seed Images (distribute among users)
    console.log("Creating images...");
    const images = [];
    for (let i = 0; i < sampleImages.length; i++) {
      const imageData = sampleImages[i];
      const randomUser = users[i % users.length]; // Distribute evenly

      const image = await HinhAnh.create({
        ...imageData,
        nguoi_dung_id: randomUser.nguoi_dung_id,
      });
      images.push(image);
      console.log(
        `   ✓ Created image: ${image.ten_hinh} by ${randomUser.ho_ten}`
      );
    }
    console.log(`Created ${images.length} images\n`);

    // Seed Comments (random comments on random images)
    console.log("Creating comments...");
    let commentCount = 0;
    for (const image of images) {
      // Each image gets 2-5 random comments
      const numComments = Math.floor(Math.random() * 4) + 2;

      for (let i = 0; i < numComments; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomComment =
          sampleComments[Math.floor(Math.random() * sampleComments.length)];

        await BinhLuan.create({
          nguoi_dung_id: randomUser.nguoi_dung_id,
          hinh_id: image.hinh_id,
          noi_dung: randomComment,
          ngay_binh_luan: new Date(
            Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
          ), // Random date in last 7 days
        });
        commentCount++;
      }
    }
    console.log(`Created ${commentCount} comments\n`);

    // Seed Saved Images (users save random images)
    console.log("Creating saved images...");
    let savedCount = 0;
    for (const user of users) {
      // Each user saves 3-7 random images
      const numSaves = Math.floor(Math.random() * 5) + 3;
      const shuffledImages = [...images].sort(() => Math.random() - 0.5);

      for (let i = 0; i < numSaves && i < shuffledImages.length; i++) {
        const image = shuffledImages[i];

        // Don't save own images
        if (image.nguoi_dung_id !== user.nguoi_dung_id) {
          try {
            await LuuAnh.create({
              nguoi_dung_id: user.nguoi_dung_id,
              hinh_id: image.hinh_id,
              ngay_luu: new Date(
                Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
              ),
            });
            savedCount++;
          } catch (err) {
            // Skip if already saved
          }
        }
      }
    }
    console.log(`Created ${savedCount} saved images\n`);

    // Summary
    console.log("SEEDING SUMMARY:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`   Users:         ${users.length}`);
    console.log(`   Images:        ${images.length}`);
    console.log(`   Comments:      ${commentCount}`);
    console.log(`   Saved Images:  ${savedCount}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    console.log("Database seeding completed successfully!\n");
    console.log("Test credentials:");
    console.log("   Email: john@example.com");
    console.log("   Password: 123456\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run seeder
seedDatabase();

// ==========================================
