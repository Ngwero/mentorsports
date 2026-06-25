import fs from "fs";
import path from "path";
import sharp from "sharp";

const WEBP_QUALITY = 90;

const SRC =
  process.env.IMAGE_SRC ??
  "/Users/user/.cursor/projects/Users-user-mentor-sports-website/assets";
const OUT = "/Users/user/mentor-sports-website/public/images/academy";

/** Source PNG → webp filename (prefer clearest uploads). */
const mapping = [
  {
    src: "Tournament_Mentor_Sports_International_Academy-7-61d6da7d-3422-4f51-bb33-36ea629d8de5.png",
    dest: "01-team-blue-group.webp",
  },
  {
    src: "Tournament_Mentor_Sports_International_Academy-1-33afefdf-aff2-49a7-8af6-302683672d87.png",
    dest: "22-player-peace-sign.webp",
  },
  {
    src: "Tournament_Mentor_Sports_International_Academy-8-7fddd2bc-8109-46aa-944f-e8a891eddd4d.png",
    dest: "23-charity-academy-team.webp",
  },
  {
    src: "Tournament_Mentor_Sports_International_Academy-4-5582e845-c163-44a2-ac05-3fd41492e263.png",
    dest: "15-four-players-balls.webp",
  },
  {
    src: "Tournament_Mentor_Sports_International_Academy-10-0868b7fe-86d0-40e6-b447-2422763d8282.png",
    dest: "24-first-aid-pitch.webp",
  },
  {
    src: "Tournament_Mentor_Sports_International_Academy-11-1e783cfd-06bf-4608-9f23-98abb8990444.png",
    dest: "20-players-seated-line.webp",
  },
  {
    src: "Tournament_Mentor_Sports_International_Academy-9-8e555741-c594-46f3-a36b-0e117dc89db9.png",
    dest: "25-kisasa-zone-team.webp",
  },
  {
    src: "Tournament_Mentor_Sports_International_Academy-2-7119c44f-1593-4f6d-b5ca-0099fe4b0169.png",
    dest: "17-player-portrait.webp",
  },
  {
    src: "Tournament_Mentor_Sports_International_Academy-5-169547cd-dfb0-4f47-91e4-7a91379c4e64.png",
    dest: "26-leadership-on-pitch.webp",
  },
  {
    src: "Tournament_Mentor_Sports_International_Academy-7-c9ae09b9-3a28-49bc-a91e-08cb57b25a4e.png",
    dest: "27-hero-blue-team-full.webp",
  },
];

fs.mkdirSync(OUT, { recursive: true });

for (const { src, dest } of mapping) {
  const input = path.join(SRC, src);
  const output = path.join(OUT, dest);
  if (!fs.existsSync(input)) {
    console.error("Missing:", src);
    process.exit(1);
  }
  const meta = await sharp(input).metadata();
  await sharp(input)
    .rotate()
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(output);
  const sizeKb = Math.round(fs.statSync(output).size / 1024);
  console.log(`✓ ${dest} (${meta.width}x${meta.height}, q${WEBP_QUALITY}, ${sizeKb}KB)`);
}
